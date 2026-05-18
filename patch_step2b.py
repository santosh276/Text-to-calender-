import re

file_path = "ai tex to calnder.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Wrap auspicious timings inside `if (!isNightViewActive) {` block
wrap_start = """            // Pratah Sandhya (Sunrise - 48m to Sunrise)"""
wrap_end = """            } catch (e) { console.error("Amrit Kalam Calc Failed", e); }"""

if wrap_start in content and wrap_end in content:
    idx_start = content.find(wrap_start)
    idx_end = content.find(wrap_end) + len(wrap_end)
    wrapped_content = content[idx_start:idx_end] + "\n            }\n" # close the if block
    content = content[:idx_start] + wrapped_content + content[idx_end:]


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
