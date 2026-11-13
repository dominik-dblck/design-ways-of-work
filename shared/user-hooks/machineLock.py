"""
- `machineLock.py run <label> -- <command>` · one heavy run on this machine at a time
- `machineLock.py status` · who holds the machine, or that it is free
- a run waits while a live one holds it; a nested run passes; a dead holder's lock is taken
"""
import json
import os
import signal
import subprocess
import sys
import time
from datetime import datetime

LOCK = os.path.join(os.path.expanduser("~"), ".claude", "locks", "heavy.json")
# one cleaner of a dead holder's lock at a time, so a fresh lock is never taken for a dead one
CLEANING = LOCK + ".cleaning"
HELD = "MACHINE_LOCK_HELD"
WAIT = float(os.environ.get("MACHINE_LOCK_WAIT", "15"))
CLEANING_STALE = 60


def holder():
    try:
        with open(LOCK, encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return None
    except (OSError, ValueError):
        # a lock being written: held, its holder not yet named
        return {"pid": None, "label": "a run starting", "since": ""}


def is_alive(pid):
    if not isinstance(pid, int):
        return True
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        return True
    return True


def taken(label):
    os.makedirs(os.path.dirname(LOCK), exist_ok=True)
    try:
        handle = os.open(LOCK, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o644)
    except FileExistsError:
        return False
    with os.fdopen(handle, "w", encoding="utf-8") as file:
        json.dump(
            {
                "pid": os.getpid(),
                "label": label,
                "cwd": os.getcwd(),
                "since": datetime.now().isoformat(timespec="seconds"),
            },
            file,
        )
    return True


# a dead holder's lock removed, under the cleaner's own lock; the holder read again inside it
def cleared(dead_pid):
    try:
        os.mkdir(CLEANING)
    except FileExistsError:
        if time.time() - os.path.getmtime(CLEANING) > CLEANING_STALE:
            os.rmdir(CLEANING)
        return False
    try:
        now = holder()
        if now is not None and now.get("pid") == dead_pid:
            os.unlink(LOCK)
            return True
        return False
    finally:
        os.rmdir(CLEANING)


def released():
    now = holder()
    if now is not None and now.get("pid") == os.getpid():
        os.unlink(LOCK)


def is_stale(now):
    if now.get("pid") is None:
        try:
            return time.time() - os.path.getmtime(LOCK) > CLEANING_STALE
        except OSError:
            return False
    return not is_alive(now.get("pid"))


def acquired(label):
    told = None
    while not taken(label):
        now = holder()
        if now is None:
            continue
        if is_stale(now):
            if cleared(now.get("pid")):
                print(f"machineLock · {now.get('label')} left a stale lock: taken over", flush=True)
            continue
        if told != now.get("pid"):
            print(
                f"machineLock · waiting: {now.get('label')} holds the machine since {now.get('since')}",
                flush=True,
            )
            told = now.get("pid")
        time.sleep(WAIT)


def run(label, command):
    if os.environ.get(HELD):
        return subprocess.call(command)
    acquired(label)
    child = None
    try:
        child = subprocess.Popen(command, env={**os.environ, HELD: label})

        def forwarded(signum, _frame):
            child.send_signal(signum)

        signal.signal(signal.SIGINT, forwarded)
        signal.signal(signal.SIGTERM, forwarded)
        return child.wait()
    finally:
        released()


def status():
    now = holder()
    if now is None:
        return "machineLock · free"
    state = "left a stale lock on" if is_stale(now) else "holds"
    return f"machineLock · {now.get('label')} {state} the machine since {now.get('since')}"


def main(args):
    if args[:1] == ["status"]:
        print(status())
        return 0
    if args[:1] == ["run"] and len(args) >= 4 and args[2] == "--":
        return run(args[1], args[3:])
    print("machineLock.py run <label> -- <command> · machineLock.py status")
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
