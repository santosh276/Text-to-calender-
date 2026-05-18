import re

file_path = "ai tex to calnder.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update renderTimings for Timing Analysis visualization
old_timeline_logic = """            // Timing Analysis Visualization logic
            let timingAnalysisHtml = '';
            const dayStart = new Date(calcDate);
            dayStart.setHours(6, 0, 0, 0); // View window start (e.g., 06:00)
            const dayEnd = new Date(calcDate);
            dayEnd.setHours(18, 0, 0, 0);   // View window end (e.g., 18:00)
            const totalMs = dayEnd - dayStart;"""

new_timeline_logic = """            // Timing Analysis Visualization logic
            let timingAnalysisHtml = '';
            const dayStart = new Date(calcDate);
            dayStart.setHours(isNightViewActive ? 18 : 6, 0, 0, 0);
            const dayEnd = new Date(calcDate);
            dayEnd.setHours(isNightViewActive ? 30 : 18, 0, 0, 0); // 30 is 6 AM next day
            const totalMs = dayEnd - dayStart;"""

content = content.replace(old_timeline_logic, new_timeline_logic)

old_markers = """                        <!-- Timeline Markers (6:00 AM, 12:00 PM, 6:00 PM) -->
                        <div class="timing-marker" style="left: 0%;">
                            <div class="timing-marker-label text-center">6:00 AM</div>
                        </div>
                        <div class="timing-marker" style="left: 50%;">
                            <div class="timing-marker-label text-center">12:00 PM</div>
                        </div>
                        <div class="timing-marker" style="left: 100%;">
                            <div class="timing-marker-label text-center">6:00 PM</div>
                        </div>"""

new_markers = """                        <!-- Timeline Markers -->
                        <div class="timing-marker" style="left: 0%;">
                            <div class="timing-marker-label text-center">${isNightViewActive ? '6:00 PM' : '6:00 AM'}</div>
                        </div>
                        <div class="timing-marker" style="left: 50%;">
                            <div class="timing-marker-label text-center">${isNightViewActive ? '12:00 AM' : '12:00 PM'}</div>
                        </div>
                        <div class="timing-marker" style="left: 100%;">
                            <div class="timing-marker-label text-center">${isNightViewActive ? '6:00 AM' : '6:00 PM'}</div>
                        </div>"""

content = content.replace(old_markers, new_markers)

old_html = """            let html = `
                <div class="section-title">
                    <h3 class="font-bold text-green-700 mb-0"><i class="fa-solid fa-clock text-orange-600 mr-2"></i><span data-i18n="timings">Timings</span></h3>
                    <span class="badge">${dateStr}</span>
                </div>

                <div class="current-time">
                    <div class="label"><span data-i18n="now">NOW</span></div>
                    <div class="line-container">
                        <div class="pulse-beacon"></div>
                        <div class="gradient-line"></div>
                    </div>
                    <div class="time" id="timings-clock">${timeStr}</div>
                </div>

                ${timingAnalysisHtml}
            `;"""

new_html = """
            // Toggle Buttons
            const activeClass = "bg-blue-600 text-white shadow-md";
            const inactiveClass = "bg-white/50 text-gray-600 hover:bg-white border border-gray-200";

            let html = `
                <div class="section-title">
                    <h3 class="font-bold text-green-700 mb-0"><i class="fa-solid fa-clock text-orange-600 mr-2"></i><span data-i18n="timings">Timings</span></h3>
                    <span class="badge">${dateStr}</span>
                </div>

                <div class="flex items-center gap-2 mb-4 bg-gray-100 p-1 rounded-lg w-fit">
                    <button onclick="toggleTimingView(false)" class="px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${!isNightViewActive ? activeClass : inactiveClass}">
                        <i class="fa-solid fa-sun"></i> Day
                    </button>
                    <button onclick="toggleTimingView(true)" class="px-4 py-1.5 rounded-md text-sm font-bold transition-all flex items-center gap-2 ${isNightViewActive ? activeClass : inactiveClass}">
                        <i class="fa-solid fa-moon"></i> Night
                    </button>
                </div>

                <div class="current-time">
                    <div class="label"><span data-i18n="now">NOW</span></div>
                    <div class="line-container">
                        <div class="pulse-beacon"></div>
                        <div class="gradient-line"></div>
                    </div>
                    <div class="time" id="timings-clock">${timeStr}</div>
                </div>

                ${timingAnalysisHtml}
            `;"""

content = content.replace(old_html, new_html)

# To support global access via lastTimingData
content = content.replace("""            let result = { auspicious: [], inauspicious: [] };""", """            lastTimingData = data;
            let result = { auspicious: [], inauspicious: [] };""")


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
