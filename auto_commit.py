import os
import subprocess
import time
import arrow

def has_changes():
    status_output = subprocess.run(["git", "status", "--porcelain"], capture_output=True, text=True)
    return bool(status_output.stdout.strip())

def add_changes():
    subprocess.run(["git", "add", "."])

def commit_changes():
    subprocess.run(["git", "commit", "-m", f"Auto-commit: Update ban data ({arrow.now().to('+08:00').format('YYYY-MM-DD HH:mm:ss')} GMT+08:00)"])

def push_changes():
    subprocess.run(["git", "push"])

def main():
    if has_changes():
        add_changes()
        commit_changes()
        push_changes()
    else:
        print("No changes detected.")

if __name__ == "__main__":
    while True:
        os.system("python3 ../ban_spider.py")
        main()
        
        time.sleep(300) # 5min
