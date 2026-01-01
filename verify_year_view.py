
import os

file_path = "ai tex to calnder.html"

def verify():
    if not os.path.exists(file_path):
        print("File not found")
        return

    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Check HTML Elements
    if 'id="year-view-container"' in content:
        print("[PASS] Year View Container found")
    else:
        print("[FAIL] Year View Container NOT found")

    if 'onclick="toggleYearView()"' in content:
        print("[PASS] Year View Trigger found in Header")
    else:
        print("[FAIL] Year View Trigger NOT found")

    # Check CSS
    if '.mini-month-card' in content:
        print("[PASS] Year View CSS found")
    else:
        print("[FAIL] Year View CSS NOT found")

    # Check JS
    if 'function toggleYearView()' in content:
        print("[PASS] toggleYearView function found")
    else:
        print("[FAIL] toggleYearView function NOT found")

    if 'function renderYearView()' in content:
        print("[PASS] renderYearView function found")
    else:
        print("[FAIL] renderYearView function NOT found")

    # Check Logic specifics
    if 'document.getElementById(\'year-view-title\').innerText = currentYear' in content:
        print("[PASS] Year Title update logic found")
    else:
        print("[FAIL] Year Title update logic NOT found")

if __name__ == "__main__":
    verify()
