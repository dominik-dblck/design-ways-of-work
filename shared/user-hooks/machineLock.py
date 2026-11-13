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
# the pause while another cleans a dead holder's lock: short, never a spin
BEAT = min(WAIT, 1.0)
CLEANING_STALE = 60


# a process's start, so a pid the system gave again to another process reads as gone
def started(pid):
    done = subprocess.run(
        ["ps", "-o", "lstart=", "-p", str(pid)], capture_output=True, text=True
    )
    return done.stdout.strip() or None


def holder():
    try:
        with open(LOCK, encoding="utf-8") as file:
            return json.load(file)
    except FileNotFoundError:
        return None
    except (OSError, ValueError):
        # a lock being written: held, its processes not yet named
        return {"label": "a run starting", "since": "", "processes": []}


def processes_of(now):
    return [one for one in now.get("processes", []) if isinstance(one, dict)]


def is_alive(process):
    pid = process.get("pid")
    if not isinstance(pid, int):
        return True
    try:
        os.kill(pid, 0)
    except ProcessLookupError:
        return False
    except PermissionError:
        pass
    # a start not read when the lock was taken is unknown: the pid's life decides alone
    recorded = process.get("started")
    return recorded is None or started(pid) == recorded


# held while the wrapper or its command lives: a killed wrapper leaves its command holding
def is_stale(now):
    held = processes_of(now)
    if not held:
        try:
            return time.time() - os.path.getmtime(LOCK) > CLEANING_STALE
        except OSError:
            return False
    return not any(is_alive(one) for one in held)


def written(record):
    scratch = f"{LOCK}.{os.getpid()}"
    with open(scratch, "w", encoding="utf-8") as file:
        json.dump(record, file)
    os.replace(scratch, LOCK)


def taken(label):
    os.makedirs(os.path.dirname(LOCK), exist_ok=True)
    try:
        handle = os.open(LOCK, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o644)
    except FileExistsError:
        return None
    record = {
        "label": label,
        "cwd": os.getcwd(),
        "since": datetime.now().isoformat(timespec="seconds"),
        "processes": [{"pid": os.getpid(), "started": started(os.getpid())}],
    }
    with os.fdopen(handle, "w", encoding="utf-8") as file:
        json.dump(record, file)
    return record


# a dead holder's lock removed, under the cleaner's own lock; the holder read again inside it
def cleared(dead):
    try:
        os.mkdir(CLEANING)
    except FileExistsError:
        if time.time() - os.path.getmtime(CLEANING) > CLEANING_STALE:
            os.rmdir(CLEANING)
        return False
    try:
        if holder() == dead:
            os.unlink(LOCK)
            return True
        return False
    finally:
        os.rmdir(CLEANING)


def is_ours(now):
    held = processes_of(now) if now is not None else []
    return bool(held) and held[0].get("pid") == os.getpid()


def released():
    if is_ours(holder()):
        os.unlink(LOCK)


def acquired(label):
    told = None
    while True:
        record = taken(label)
        if record is not None:
            return record
        now = holder()
        if now is None:
            continue
        if is_stale(now):
            if cleared(now):
                print(f"machineLock · {now.get('label')} left a stale lock: taken over", flush=True)
            else:
                time.sleep(BEAT)
            continue
        if told != now.get("since"):
            print(
                f"machineLock · waiting: {now.get('label')} holds the machine since {now.get('since')}",
                flush=True,
            )
            told = now.get("since")
        time.sleep(WAIT)


def run(label, command):
    if os.environ.get(HELD):
        return subprocess.call(command)
    record = acquired(label)
    try:
        child = subprocess.Popen(command, env={**os.environ, HELD: label})
        if is_ours(holder()):
            record["processes"].append({"pid": child.pid, "started": started(child.pid)})
            written(record)

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
