import re

file_path = 'ai tex to calnder.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Insert SunCalc
suncalc_code = """
        // Minimal SunCalc Implementation
        const SunCalc = (function() {
            var J1970 = 2440588, dayMs = 1000 * 60 * 60 * 24, J2000 = 2451545, rad = Math.PI / 180, e = rad, J0 = 0.0009;
            function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
            function fromJulian(j) { return new Date((j + 0.5 - J1970) * dayMs); }
            function toDays(date) { return toJulian(date) - J2000; }
            function getSolarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }
            function getEquationOfCenter(M) { return rad * (1.9148 * Math.sin(M) + 0.02 * Math.sin(2 * M) + 0.0003 * Math.sin(3 * M)); }
            function getEclipticLongitude(M) { var C = getEquationOfCenter(M), P = rad * 102.9372; return M + C + P + Math.PI; }
            function getSunCoords(d) {
                var M = getSolarMeanAnomaly(d), L = getEclipticLongitude(M);
                return { dec: Math.asin(Math.sin(L) * Math.sin(rad * 23.4397)), ra: Math.atan2(Math.cos(rad * 23.4397) * Math.sin(L), Math.cos(L)) };
            }
            function getTimes(date, lat, lng) {
                var lw = rad * -lng, phi = rad * lat, d = toDays(date), n = Math.round(d - J0 - lw / (2 * Math.PI)), ds = J0 + lw / (2 * Math.PI) + n, M = getSolarMeanAnomaly(ds), L = getEclipticLongitude(M), dec = Math.asin(Math.sin(L) * Math.sin(rad * 23.4397)), Jnoon = 2451545 + ds + 0.0053 * Math.sin(M) - 0.0069 * Math.sin(2 * L);
                function getRiseSetJ(h) { var w = Math.acos((Math.sin(h) - Math.sin(phi) * Math.sin(dec)) / (Math.cos(phi) * Math.cos(dec))); return w; }
                try {
                    var w = getRiseSetJ(-0.833 * rad);
                    return { sunrise: fromJulian(Jnoon - w / (2 * Math.PI)), sunset: fromJulian(Jnoon + w / (2 * Math.PI)) };
                } catch(e) { return { sunrise: null, sunset: null }; } // Polar night/day
            }
            return { getTimes: getTimes };
        })();
"""

if "const SeasonIcons =" in content:
    content = content.replace("const SeasonIcons =", suncalc_code + "\n        const SeasonIcons =")
else:
    print("Error: Could not find 'const SeasonIcons =' anchor.")

# 2. Update appState initialization
if "config: { title: 'Panchang App', logoUrl: null, language: 'en' }" in content:
    content = content.replace("config: { title: 'Panchang App', logoUrl: null, language: 'en' }", "config: { title: 'Panchang App', logoUrl: null, language: 'en', location: null }")
    content = content.replace("let tempConfig = { title: 'Panchang App', logoUrl: null, language: 'en' };", "let tempConfig = { title: 'Panchang App', logoUrl: null, language: 'en', location: null };")
    content = content.replace("if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en' };", "if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en', location: null };")

# 3. Add getUserLocation function
user_location_code = """
        function getUserLocation() {
            if (!navigator.geolocation) {
                showToast("Geolocation is not supported by your browser.");
                return;
            }
            const btn = document.getElementById('btn-location');
            const originalContent = btn ? btn.innerHTML : '';
            if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Locating...';

            navigator.geolocation.getCurrentPosition((position) => {
                appState.config.location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                render();
                showToast("Location updated! Sunrise times adjusted.");
            }, (error) => {
                console.error(error);
                showToast("Unable to retrieve your location.");
                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
            });
        }
"""
if "function getSeasonIndex(month) {" in content:
    content = content.replace("function getSeasonIndex(month) {", user_location_code + "\n        function getSeasonIndex(month) {")

# 4. Modify calculateTithi to use location
calculate_tithi_search = """        function calculateTithi(dateObj) {
            // Use 06:00 AM Local Time for Tithi calculation to approximate Sunrise Tithi
            // This ensures the Tithi is consistent for the "day".
            const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), 6, 0, 0);"""

calculate_tithi_replace = """        function calculateTithi(dateObj) {
            // Use 06:00 AM Local Time for Tithi calculation to approximate Sunrise Tithi, or calculated Sunrise
            let hour = 6;
            let minute = 0;

            if (appState.config.location && SunCalc) {
                const times = SunCalc.getTimes(dateObj, appState.config.location.lat, appState.config.location.lng);
                if (times.sunrise && !isNaN(times.sunrise.getTime())) {
                    hour = times.sunrise.getHours();
                    minute = times.sunrise.getMinutes();
                }
            }

            const targetDate = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate(), hour, minute, 0);"""

content = content.replace(calculate_tithi_search, calculate_tithi_replace)

# 5. Modify renderPanchang
panchang_html_search = '<ul id="panchang-list" class="text-sm space-y-2"></ul>'
panchang_html_replace = '<ul id="panchang-list" class="text-sm space-y-2"></ul><div id="location-btn-container" class="mt-3 pt-2 border-t border-red-100 flex justify-center"></div>'
content = content.replace(panchang_html_search, panchang_html_replace)

render_panchang_pills_str = "const pillsContainer = document.getElementById('panchang-pills');"

render_panchang_btn_logic = """
            const locContainer = document.getElementById('location-btn-container');
            if (locContainer) {
                if (appState.config.location) {
                     locContainer.innerHTML = `<div class="text-center"><div class="text-xs text-green-600 font-bold mb-1"><i class="fa-solid fa-check-circle"></i> Using GPS Location</div><button id="btn-location" onclick="getUserLocation()" class="text-xs text-gray-500 hover:text-deepred underline">Update Location</button></div>`;
                } else {
                     locContainer.innerHTML = `<button id="btn-location" onclick="getUserLocation()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2 px-4 rounded-full shadow-sm border border-gray-300 transition flex items-center gap-2"><i class="fa-solid fa-location-crosshairs text-red-500"></i> Use My Location</button>`;
                }
            }
"""

content = content.replace(render_panchang_pills_str, render_panchang_pills_str + "\n" + render_panchang_btn_logic)

loop_search = "for (const [key, value] of Object.entries(data.panchang)) {"
render_panchang_calc_logic = """
            // Calculate Sunrise/Sunset if location exists
            let calculatedPanchang = { ...data.panchang };

            if (appState.config.location && SunCalc) {
                // Use today's date or 1st of month for the display
                const today = new Date();
                let calcDate;
                if (data.month === today.getMonth() && data.year === today.getFullYear()) {
                    calcDate = today;
                } else {
                    calcDate = new Date(data.year, data.month, 1);
                }

                const times = SunCalc.getTimes(calcDate, appState.config.location.lat, appState.config.location.lng);
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

            for (const [key, value] of Object.entries(calculatedPanchang)) {
"""
content = content.replace(loop_search, render_panchang_calc_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
