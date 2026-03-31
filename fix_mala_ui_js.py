import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# I need to fix the JS math for the new radius of 88 (circumference = 2 * PI * 88 = ~552.92)
js_mala = """const percentage = Math.min((currentMalaCount / 108) * 100, 100);
                const offset = 440 - (440 * percentage) / 100;
                progressRing.style.strokeDashoffset = offset;"""
js_mala_new = """const percentage = Math.min((currentMalaCount / 108) * 100, 100);
                const offset = 553 - (553 * percentage) / 100;
                progressRing.style.strokeDashoffset = offset;"""

content = content.replace(js_mala, js_mala_new)
content = content.replace("if (progressRing) progressRing.style.strokeDashoffset = 440;", "if (progressRing) progressRing.style.strokeDashoffset = 553;")
content = content.replace("progressRing.style.strokeDasharray = '440';", "progressRing.style.strokeDasharray = '553';")
content = content.replace("progressRing.style.strokeDashoffset = '440';", "progressRing.style.strokeDashoffset = '553';")

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(content)
