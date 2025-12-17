
import os
import sys

# Ensure we can run the test
try:
    with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Check 1: Input Toggle Default State
    # The inputs should NOT have the 'checked' attribute hardcoded
    if '<input type="checkbox" id="toggle-sync-docs" class="sr-only peer" checked' in content:
        print("FAIL: toggle-sync-docs has 'checked' attribute in HTML source!")
        sys.exit(1)

    if '<input type="checkbox" id="toggle-sync-github" class="sr-only peer" checked' in content:
        print("FAIL: toggle-sync-github has 'checked' attribute in HTML source!")
        sys.exit(1)

    print("PASS: Toggles are unchecked by default in HTML.")

    # Check 2: Verify Cancel Logic exists
    if 'else if (url === null)' not in content:
         print("FAIL: Cancel logic (url === null) not found in source.")
         sys.exit(1)

    print("PASS: Cancel logic verified.")

except Exception as e:
    print(f"FAIL: Exception during verification: {e}")
    sys.exit(1)
