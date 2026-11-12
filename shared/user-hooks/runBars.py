"""
- a design-side run's progress, printed by a script, never computed in a reply (as ticketRunKeepsTheTurn's bars)
- `runBars.py show` · `runBars.py close <stage> <words>`: the bars, the stages' table, the run's history
- `runBars.py after-tool` · a PostToolUse hook: a show or close puts the bars in front of the PM
"""
import json
import os
import re
import sys
from datetime import datetime

RUN_FILE = os.path.join(".claude", "run.json")
ROW = re.compile(r"^\|\s*(\d+)\s*\|\s*([^|]+?)\s*\|\s*(\d+)\s*\|\s*(\d+)\s*\|")
HISTORY = "## History"


# a hook's line in the chat, set apart from the replies
def banner(name, text):
    return f"🔵 **{name}** - {text}"


def bar_of(done, cells):
    filled = round(done * cells)
    return "▓" * filled + "░" * (cells - filled) + f" {round(done * 100)}%"


# the run in hand: its name and its notes file, from the repository's run.json; none when absent or done
def the_run(cwd):
    try:
        with open(os.path.join(cwd, RUN_FILE), encoding="utf-8") as file:
            run = json.load(file)
    except (OSError, ValueError):
        return None
    if run.get("done") is True or not run.get("notes"):
        return None
    return run


# the stages' table: number, words, done, of
def stages_of(text):
    return [
        (int(m.group(1)), m.group(2), int(m.group(3)), int(m.group(4)))
        for m in map(ROW.match, text.splitlines())
        if m is not None
    ]


def bars(run, stages):
    total = sum(of for _, _, _, of in stages)
    done = sum(min(d, of) for _, _, d, of in stages)
    now = next((s for s in stages if s[2] < s[3]), stages[-1])
    number, words, d, of = now
    colour = "🟢"
    whole = f"{colour} {run['run'].split(' · ')[0]} · krok {number} z {len(stages)} {bar_of(done / total, len(stages))}"
    piece = f"etap {number} {words} · zadanie {min(d + 1, of)} z {of} {bar_of(d / of, of)}"
    table = [
        f"{'✅' if d2 >= of2 else ('⏳' if s == now else '·')} {n2} {w2:<14} {d2}/{of2}  {bar_of(d2 / of2, 5)}"
        for s in stages
        for n2, w2, d2, of2 in [s]
    ]
    return [whole, piece, "", f"Run · {done}/{total} zadań", *table]


def read_notes(run):
    with open(run["notes"], encoding="utf-8") as file:
        return file.read()


def close(run, number, words):
    text = read_notes(run)
    lines = text.splitlines()
    hits = [i for i, line in enumerate(lines) if (m := ROW.match(line)) and int(m.group(1)) == number]
    if not hits:
        sys.exit(f"no stage {number} in {run['notes']}")
    m = ROW.match(lines[hits[0]])
    done, of = int(m.group(3)), int(m.group(4))
    if done >= of:
        sys.exit(f"stage {number} is whole already: {done} of {of}")
    # the third cell by position · a formatter pads a table's cells, so the row is never matched as written
    lines[hits[0]] = re.sub(
        r"^(\|\s*\d+\s*\|\s*[^|]+?\s*\|\s*)\d+",
        lambda found: f"{found.group(1)}{done + 1}",
        lines[hits[0]],
        count=1,
    )
    stamp = datetime.now().strftime("%H:%M")
    entry = f"- {stamp} · stage {number} · {done + 1} of {of} · {words}"
    if HISTORY in lines:
        at = lines.index(HISTORY) + 1
        while at < len(lines) and lines[at].startswith("- "):
            at += 1
        lines.insert(at, entry)
    else:
        lines += ["", HISTORY, entry]
    with open(run["notes"], "w", encoding="utf-8") as file:
        file.write("\n".join(lines) + "\n")
    print(f"closed stage {number} · {words}")


def after_tool():
    try:
        event = json.load(sys.stdin)
    except ValueError:
        return
    command = ((event.get("tool_input") or {}).get("command")) or ""
    if "runBars.py" not in command or not re.search(r"runBars\.py\s+(show|close)\b", command):
        return
    out = event.get("tool_response") or {}
    stdout = out.get("stdout", "") if isinstance(out, dict) else str(out)
    shown = list(dict.fromkeys(line for line in stdout.splitlines() if line.startswith(("🟢", "🟡", "🔴", "etap ", "Run ", "✅", "⏳", "· "))))
    if not shown:
        return
    headline = [line for line in shown if line.startswith(("🟢", "🟡", "🔴", "etap "))]
    print(json.dumps({
        "systemMessage": banner("runBars", "postęp\n" + "\n".join(shown)),
        "hookSpecificOutput": {
            "hookEventName": "PostToolUse",
            "additionalContext": "progress shown to the PM already · open the next text with these two lines only, never the whole list again:\n" + "\n".join(headline),
        },
    }, ensure_ascii=False))


def main():
    args = sys.argv[1:]
    if args[:1] == ["after-tool"]:
        after_tool()
        return
    run = the_run(os.getcwd())
    if run is None:
        sys.exit("no run in hand: .claude/run.json names none, or no notes")
    if args[:1] == ["close"] and len(args) >= 3:
        close(run, int(args[1]), " ".join(args[2:]))
    elif args[:1] != ["show"]:
        sys.exit("runBars.py show | close <stage> <words> | after-tool")
    for line in bars(run, stages_of(read_notes(run))):
        print(line)


if __name__ == "__main__":
    main()
