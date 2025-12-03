import re

file_path = 'ai tex to calnder.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Update iconMap
icon_map_search = "const iconMap = { 'tithi': 'fa-moon', 'nakshatra': 'fa-star', 'yoga': 'fa-bahai', 'karana': 'fa-hourglass-half', 'sunrise': 'fa-sun', 'sunset': 'fa-cloud-sun', 'month': 'fa-calendar' };"
icon_map_replace = "const iconMap = { 'tithi': 'fa-moon', 'nakshatra': 'fa-star', 'yoga': 'fa-bahai', 'karana': 'fa-hourglass-half', 'sunrise': 'fa-sun', 'sunset': 'fa-cloud-sun', 'month': 'fa-calendar', 'location': 'fa-location-dot' };"

content = content.replace(icon_map_search, icon_map_replace)

# 2. Add Location to calculatedPanchang
# We look for the block where we check for appState.config.location and SunCalc
calc_block_search = """
                if (times.sunrise && times.sunset) {
                    const fmt = (d) => {
                        let h = d.getHours();
                        let m = d.getMinutes();
                        const ampm = h >= 12 ? 'PM' : 'AM';
                        h = h % 12;
                        h = h ? h : 12;
                        m = m < 10 ? '0'+m : m;
                        return `${h}:${m} ${ampm}`;
                    };
                    calculatedPanchang['Sunrise'] = fmt(times.sunrise) + " (GPS)";
                    calculatedPanchang['Sunset'] = fmt(times.sunset) + " (GPS)";
                }
            }
"""

calc_block_replace = """
                if (times.sunrise && times.sunset) {
                    const fmt = (d) => {
                        let h = d.getHours();
                        let m = d.getMinutes();
                        const ampm = h >= 12 ? 'PM' : 'AM';
                        h = h % 12;
                        h = h ? h : 12;
                        m = m < 10 ? '0'+m : m;
                        return `${h}:${m} ${ampm}`;
                    };
                    calculatedPanchang['Sunrise'] = fmt(times.sunrise) + " (GPS)";
                    calculatedPanchang['Sunset'] = fmt(times.sunset) + " (GPS)";
                }
                if (appState.config.location.name) {
                    calculatedPanchang['Location'] = appState.config.location.name;
                }
            }
"""

content = content.replace(calc_block_search, calc_block_replace)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
