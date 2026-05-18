import re

file_path = "ai tex to calnder.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

state_vars = """let preRenderQueue = [];
        let isPreRenderRunning = false;

        // Timing Analysis Toggle State
        let isNightViewActive = false;
        let lastTimingData = null;
"""

content = content.replace("let preRenderQueue = [];\n        let isPreRenderRunning = false;", state_vars)

toggle_func = """
        // --- Day/Night Timing View Toggle ---
        window.toggleTimingView = function(isNight) {
            isNightViewActive = isNight;
            if (lastTimingData) {
                renderTimings(lastTimingData);
            }
        };

        // --- UPDATED HELPER: Calculate Auspicious & Inauspicious Timings ---
"""

content = content.replace("        // --- UPDATED HELPER: Calculate Auspicious & Inauspicious Timings ---", toggle_func)


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
