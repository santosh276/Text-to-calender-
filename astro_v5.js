        /* --- VEDIC ASTRONOMY ENGINE (V5.0 - Professional Grade) --- */
        const VedicAstro = (function() {
            const NAKSHATRAS = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
            const YOGAS = ["Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"];
            const KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga", "Kimstughna"];

            const D2R = Math.PI / 180;
            const norm = (d) => ((d % 360) + 360) % 360;

            // High Precision Solar Longitude (Meeus Algorithms)
            function getSunLong(jd) {
                const T = (jd - 2451545.0) / 36525;
                const L0 = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
                const M = norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
                const C = (1.914602 - 0.004817 * T) * Math.sin(M * D2R)
                        + (0.019993 - 0.000101 * T) * Math.sin(2 * M * D2R)
                        + 0.000289 * Math.sin(3 * M * D2R);
                return norm(L0 + C);
            }

            // Professional Lunar Longitude (15 Periodic Terms)
            function getMoonLong(jd) {
                const T = (jd - 2451545.0) / 36525;
                const Lprime = norm(218.316447 + 481267.881234 * T); // Mean Long
                const D = norm(297.850192 + 445267.111403 * T);    // Elongation
                const M = norm(357.529109 + 35999.050291 * T);     // Sun Mean Anomaly
                const Mprime = norm(134.963396 + 477198.867505 * T); // Moon Mean Anomaly
                const F = norm(93.272095 + 483202.017523 * T);     // Dist from Node

                let sumLong = 6.288774 * Math.sin(Mprime * D2R);
                sumLong += 1.274027 * Math.sin((2 * D - Mprime) * D2R);
                sumLong += 0.658309 * Math.sin(2 * D * D2R);
                sumLong += 0.213618 * Math.sin(2 * Mprime * D2R);
                sumLong -= 0.185116 * Math.sin(M * D2R);
                sumLong -= 0.114332 * Math.sin(2 * F * D2R);
                sumLong += 0.058793 * Math.sin((2 * D - 2 * Mprime) * D2R);
                sumLong += 0.057066 * Math.sin((2 * D - M - Mprime) * D2R);
                sumLong += 0.053322 * Math.sin((2 * D + Mprime) * D2R);
                sumLong += 0.045758 * Math.sin((2 * D - M) * D2R);
                sumLong -= 0.040923 * Math.sin((M - Mprime) * D2R);
                sumLong -= 0.034720 * Math.sin(D * D2R);
                sumLong -= 0.030383 * Math.sin((M + Mprime) * D2R);
                sumLong += 0.015327 * Math.sin((2 * D - 2 * F) * D2R);

                return norm(Lprime + sumLong);
            }

            function getAyanamsa(jd) {
                const T = (jd - 2451545.0) / 36525;
                // True Lahiri Ayanamsa formula
                return 23.85616 + 1.396042 * T + 0.000307 * T * T;
            }

            function calculate(dateObj, hour = 6) {
                const d = new Date(dateObj);
                // Reference: 6:00 AM IST is approx 00:30 UTC.
                // Support legacy hour argument but normalize minutes/seconds
                const h = (hour === undefined || hour === null) ? 6 : hour;
                const hours = Math.floor(h);
                const minutes = Math.floor((h % 1) * 60);
                d.setHours(hours, minutes, 0, 0);

                const jd = (d.getTime() / 86400000) + 2440587.5;
                const aya = getAyanamsa(jd);

                const sunSid = norm(getSunLong(jd) - aya);
                const moonSid = norm(getMoonLong(jd) - aya);

                // Tithi = (Moon - Sun) / 12. Add 0.001 buffer for precision.
                const diff = norm(moonSid - sunSid + 0.001);
                const tithiIndex = Math.floor(diff / 12);

                // Nakshatra: Moon / 13.3333
                const nakIndex = Math.floor(moonSid / (13 + 1/3));

                // Yoga: (Sun + Moon) / 13.3333
                const yogaIndex = Math.floor(norm(sunSid + moonSid) / (13 + 1/3));

                // Karana logic
                const kIndexTotal = Math.floor(diff / 6);
                let karanaIndex = 0;
                if (kIndexTotal === 0) karanaIndex = 10; // Kimstughna
                else if (kIndexTotal >= 57) karanaIndex = 7 + (kIndexTotal - 57); // Fixed
                else karanaIndex = (kIndexTotal - 1) % 7; // Movable

                return {
                    tithiIndex: tithiIndex % 30,
                    nakshatra: NAKSHATRAS[nakIndex % 27],
                    yoga: YOGAS[yogaIndex % 27],
                    karana: KARANAS[karanaIndex]
                };
            }

            return {
                calculate: calculate,
                getTithiAtSunrise: function(dateObj) {
                    // Strict Sunrise Rule: Always check 6 AM
                    return calculate(dateObj, 6);
                }
            };
        })();
