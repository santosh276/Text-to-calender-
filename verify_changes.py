
import re

def verify_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Check for new constants and functions
    checks = [
        "const CACHE_KEY_STATE = 'panchang_cached_state';",
        "function saveStateToCache()",
        "function loadStateFromCache()",
        "saveStateToCache();",
        "const isAppMode = !!window.exportedData;",
        "const loadedFromCache = loadStateFromCache();",
        "Smart Diff: Data is identical",
        "requestAnimationFrame"
    ]

    for check in checks:
        if check not in content:
            print(f"FAILED: Missing '{check}'")
            return False
        else:
            print(f"PASSED: Found '{check}'")

    # Basic brace balance check (very rough)
    open_braces = content.count('{')
    close_braces = content.count('}')
    # HTML/CSS/JS mixed file, so this is not accurate for logic, but might catch catastrophic cut-off
    print(f"Open braces: {open_braces}, Close braces: {close_braces}")

    return True

if __name__ == "__main__":
    if verify_file("ai tex to calnder.html"):
        print("Verification Successful")
    else:
        print("Verification Failed")
