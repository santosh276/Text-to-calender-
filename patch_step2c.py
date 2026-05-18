import re

file_path = "ai tex to calnder.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Try to find and fix the specific block directly
content = re.sub(
    r'(\} catch \(e\) \{ console\.error\("Amrit Kalam Calc Failed", e\); \}\n\s*\})[\s\}]+// Sort',
    r'\1\n\n            // Sort',
    content
)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
