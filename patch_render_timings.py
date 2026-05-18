import re

file_path = "ai tex to calnder.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Update renderTimings to calculate tomorrowSunrise
old_calc_call = """                if (sunTimes.sunrise && sunTimes.sunset) {
                    result = getSpecialTimes(calcDate, sunTimes.sunrise, sunTimes.sunset);
                }"""

new_calc_call = """                if (sunTimes.sunrise && sunTimes.sunset) {
                    // Calculate tomorrow's sunrise for Night Choghadiya
                    const tomorrow = new Date(calcDate);
                    tomorrow.setDate(tomorrow.getDate() + 1);
                    const tomorrowSunTimes = SunCalc.getTimes(tomorrow, appState.config.location.lat, appState.config.location.lng);
                    result = getSpecialTimes(calcDate, sunTimes.sunrise, sunTimes.sunset, tomorrowSunTimes.sunrise);
                }"""

content = content.replace(old_calc_call, new_calc_call)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
