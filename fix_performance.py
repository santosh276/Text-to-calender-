import re

with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

# 1. Update updateLiveTimers
# Old:
#                     badge.innerText = `UPCOMING IN ${h}H ${m}M`;
#                     badge.classList.remove('badge-ending-soon');
# ...
update_live_timers_code = """
        function updateLiveTimers() {
            const now = new Date();
            const cards = document.querySelectorAll('.timeline-card');

            cards.forEach(card => {
                const startTimeStr = card.getAttribute('data-start');
                const endTimeStr = card.getAttribute('data-end');
                if (!startTimeStr || !endTimeStr) return;

                const start = new Date(startTimeStr);
                const end = new Date(endTimeStr);

                const badge = card.querySelector('.live-badge');
                if (!badge) return;

                const pulseText = card.querySelector('.pulse-text');

                if (now < start) {
                    // UPCOMING
                    const diffMs = start - now;
                    const remMins = Math.floor(diffMs / 60000);
                    const h = Math.floor(remMins / 60);
                    const m = remMins % 60;

                    const newText = `UPCOMING IN ${h}H ${m}M`;
                    if (badge.innerText !== newText) badge.innerText = newText;

                    if (badge.classList.contains('badge-ending-soon')) badge.classList.remove('badge-ending-soon');
                    if (pulseText && pulseText.style.display !== 'none') pulseText.style.display = 'none';
                    if (card.classList.contains('completed')) card.classList.remove('completed');

                } else if (now >= start && now <= end) {
                    // ACTIVE
                    const diffMs = end - now;
                    const remMins = Math.floor(diffMs / 60000);
                    const h = Math.floor(remMins / 60);
                    const m = remMins % 60;

                    if (remMins <= 15) {
                        const newText = "Ending Soon";
                        if (badge.innerText !== newText) badge.innerText = newText;
                        if (!badge.classList.contains('badge-ending-soon')) badge.classList.add('badge-ending-soon');
                    } else {
                        const newText = `ENDS IN ${h}H ${m}M`;
                        if (badge.innerText !== newText) badge.innerText = newText;
                        if (badge.classList.contains('badge-ending-soon')) badge.classList.remove('badge-ending-soon');
                    }

                    if (pulseText && pulseText.style.display !== 'inline-block') pulseText.style.display = 'inline-block';
                    if (card.classList.contains('completed')) card.classList.remove('completed');

                } else {
                    // COMPLETED
                    const newHtml = `<span data-i18n="completed">Completed</span>`;
                    if (badge.innerHTML !== newHtml) badge.innerHTML = newHtml;
                    if (badge.classList.contains('badge-ending-soon')) badge.classList.remove('badge-ending-soon');
                    if (pulseText && pulseText.style.display !== 'none') pulseText.style.display = 'none';
                    if (!card.classList.contains('completed')) card.classList.add('completed');
                }
            });
        }
"""

old_update_live_timers = re.search(r'function updateLiveTimers\(\) \{.*?\n        \}', content, re.DOTALL)
if old_update_live_timers:
    content = content[:old_update_live_timers.start()] + update_live_timers_code.strip() + content[old_update_live_timers.end():]


# 2. Update startLiveClock
# Old:
#         function startLiveClock() {
#             if (liveClockInterval) clearInterval(liveClockInterval);
#             liveClockInterval = setInterval(() => {
#                 const now = new Date();
#                 const el = document.getElementById('live-clock');
#                 if (el) el.innerText = now.toLocaleTimeString();
#                 const el2 = document.getElementById('timings-clock');
#                 if (el2) el2.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
#                 updateLiveTimers();
#             }, 1000);
#         }
start_live_clock_code = """
        function startLiveClock() {
            if (liveClockInterval) clearInterval(liveClockInterval);
            liveClockInterval = setInterval(() => {
                const now = new Date();
                const el = document.getElementById('live-clock');
                if (el) {
                    const timeStr = now.toLocaleTimeString();
                    if (el.innerText !== timeStr) el.innerText = timeStr;
                }
                const el2 = document.getElementById('timings-clock');
                if (el2) {
                    const timeStr2 = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    if (el2.innerText !== timeStr2) el2.innerText = timeStr2;
                }
                updateLiveTimers();
            }, 1000);
        }
"""
old_start_live_clock = re.search(r'function startLiveClock\(\) \{.*?\n        \}', content, re.DOTALL)
if old_start_live_clock:
    content = content[:old_start_live_clock.start()] + start_live_clock_code.strip() + content[old_start_live_clock.end():]


# 3. CSS Filter removals

# .badge-ending-soon
content = content.replace("            backdrop-filter: blur(8px) !important;\n            -webkit-backdrop-filter: blur(8px) !important;\n", "")
# .pulse-text
content = content.replace("            backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);\n", "")

# inline styles
# 1. <span class="pulse-text ... style="backdrop-filter: blur(12px); ...">
content = content.replace("style=\"backdrop-filter: blur(12px); border-radius: 9999px;\"", "style=\"border-radius: 9999px;\"")

# 2. sunCard and moonCard filter: drop-shadow(...)
content = content.replace('style="filter: drop-shadow(0 0 8px rgba(255,215,0,0.8)); display: inline-block; margin-bottom: 0.5rem;"', 'style="display: inline-block; margin-bottom: 0.5rem;"')
content = content.replace('style="filter: drop-shadow(0 0 8px rgba(135,206,235,0.8)); display: inline-block; margin-bottom: 0.5rem;"', 'style="display: inline-block; margin-bottom: 0.5rem;"')


with open('ai tex to calnder.html', 'w') as f:
    f.write(content)
