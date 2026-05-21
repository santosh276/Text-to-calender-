
        // --- GLOBAL ERROR HANDLER ---
        // Catches unexpected crashes (e.g. Render errors, Logic bugs) and removes the loader
        window.onerror = function(message, source, lineno, colno, error) {
            console.error("Global Error Caught:", message, error);

            const loader = document.getElementById('app-loader');
            if (loader) {
                // If the loader is still visible, it means the app crashed during initialization.
                // Replace the loader with a Critical Error UI.
                loader.className = "fixed inset-0 z-[200] flex items-center justify-center bg-white p-6";
                loader.innerHTML = `
                    <div class="max-w-md w-full text-center">
                        <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                        <p class="text-sm text-gray-600 mb-6">The application encountered a critical error during loading.</p>
                        <div class="bg-gray-100 p-3 rounded text-left text-xs font-mono text-gray-700 overflow-x-auto mb-6 border border-gray-200">
                            ${message}
                        </div>
                        <button onclick="localStorage.clear(); window.location.reload()" class="bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 transition w-full shadow-md">
                            Reset App Data & Retry
                        </button>
                    </div>
                `;
            }
        };

        const DATA_VERSION = 2;

        const OM_ICON_SVG = `<svg viewBox="0 0 512 512" width="24" height="24" fill="#d4af37" xmlns="http://www.w3.org/2000/svg"><path d="M379.3 4.7c-6.2-6.2-16.4-6.2-22.6 0l-16 16c-6.2 6.2-6.2 16.4 0 22.6l16 16c6.2 6.2 16.4 6.2 22.6 0l16-16c6.2-6.2 6.2-16.4 0-22.6l-16-16zM281 66.7c-2.2-1.5-4.9-2.5-7.7-2.7c-.6 0-1.3-.1-1.9 0c-3.9 .2-7.4 1.7-10.1 4.2c-.9 .8-1.6 1.7-2.3 2.6c-1.7 2.4-2.7 5.3-2.9 8.5c0 .7 0 1.4 0 2.1c.2 2.2 .9 4.3 1.9 6.2l.3 .6c.3 .6 .8 1.4 1.4 2.4c1.2 2 2.9 4.8 5.1 8.2c4.4 6.7 11.1 15.5 20 24.4C302.4 141.1 330.3 160 368 160c31.2 0 56.6-10.4 73.9-20.2c8.7-5 15.6-9.9 20.4-13.8c2.4-1.9 4.3-3.6 5.7-4.9c.7-.6 1.3-1.2 1.7-1.6l.6-.5 .1-.1 .1-.1s0 0 0 0s0 0 0 0c5.9-5.8 9.5-13.9 9.5-22.8c0-17.7-14.3-32-32-32c-8.7 0-16.7 3.5-22.4 9.2c-.1 .1-.2 .2-.5 .4c-.5 .5-1.5 1.3-2.8 2.4c-2.7 2.2-6.8 5.2-12.1 8.2C399.4 90.4 384.8 96 368 96c-20.8 0-42.4-7-59.5-14.6c-8.4-3.7-15.4-7.5-20.3-10.3c-2.4-1.4-4.3-2.5-5.6-3.3c-.6-.4-1.1-.7-1.4-.9l-.3-.2zM115.2 169.6c8-6 17.9-9.6 28.8-9.6c26.5 0 48 21.5 48 48s-21.5 48-48 48l-34.2 0c-7.6 0-13.8 6.2-13.8 13.8c0 1.5 .2 2.9 .7 4.4l8 24c4.4 13.1 16.6 21.9 30.4 21.9l8.9 0 16 0c35.3 0 64 28.7 64 64s-28.7 64-64 64c-50.8 0-82.7-21.5-102.2-42.8c-9.9-10.8-16.6-21.6-20.9-29.7c-2.1-4-3.6-7.3-4.5-9.6c-.5-1.1-.8-2-1-2.5l-.2-.5c-.3-.9-.7-1.8-1.1-2.6c-1.2-2.2-2.8-4-4.7-5.4c-1.9-1.4-4.1-2.3-6.5-2.8c-1.4-.3-2.9-.3-4.4-.2c-2.5 .2-4.8 1-6.8 2.3c-1.1 .7-2.2 1.5-3.1 2.5c-2.4 2.5-4.1 5.8-4.5 9.5c-.1 .6-.1 1.1-.1 1.7c0 0 0 0 0 0c0 .8 .1 1.7 .2 2.5l0 .1c0 .3 .1 .8 .2 1.3c.2 1.1 .4 2.7 .8 4.6c.8 3.9 2 9.4 3.9 15.9c3.8 13 10.3 30.4 21.3 48C48.7 476.2 89.4 512 160 512c70.7 0 128-57.3 128-128c0-23.3-6.2-45.2-17.1-64l22.6 0c25.5 0 49.9-10.1 67.9-28.1l26.5-26.5c6-6 14.1-9.4 22.6-9.4l-48.3 0c6.9-14.5 10.8-30.8 10.8-48c0-61.9-50.1-112-112-112c-25.2 0-48.5 8.3-67.2 22.4c-14.1 10.6-17 30.7-6.4 44.8s30.7 17 44.8 6.4z"/></svg>`;

        const TEMPLE_ICON_SVG = `<svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M120 0c13.3 0 24 10.7 24 24l0 8 40 0 0-8c0-13.3 10.7-24 24-24s24 10.7 24 24l0 8 48 0 0-8c0-13.3 10.7-24 24-24s24 10.7 24 24l0 8 40 0 0-8c0-13.3 10.7-24 24-24s24 10.7 24 24l0 8 0 32 0 64c17.7 0 32 14.3 32 32l0 64c17.7 0 32 14.3 32 32l0 96c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-64 0 0-160-32 0 0-128-32 0 0-96-32 0 0 96 32 0 0 128 32 0 0 160-80 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48-80 0 0-160 32 0 0-128 32 0 0-96-32 0 0 96-32 0 0 128-32 0 0 160-64 0c-17.7 0-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32l0-96c0-17.7 14.3-32 32-32l0-64 0-17.7 14.3-32 32-32l0-64 0-32 0-8c0-13.3 10.7-24 24-24zM256 272c-17.7 0-32 14.3-32 32l0 48 64 0 0-48c0-17.7-14.3-32-32-32zm-32-80l0 32 64 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/></svg>`;
        const HOLIDAY_ICON_SVG = `<svg viewBox="0 0 576 512" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M346.3 271.8l-60.1-21.9L214 448 32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l512 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-261.9 0 64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`;
        const CALENDAR_ICON_SVG = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><path d="M8 14h.01"></path><path d="M12 14h.01"></path><path d="M16 14h.01"></path><path d="M8 18h.01"></path><path d="M12 18h.01"></path><path d="M16 18h.01"></path></svg>`;
        const SEARCH_ICON_SVG = `<svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>`;

        const WIFI_ICON_SVG = `<svg viewBox="-3 -3 30 30" width="48" height="48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="transform: translateY(3px)"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`;
        const RETRY_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>`;

        /**
         * DYNAMIC MOON PHASE GENERATOR
         * This function creates an SVG image of the moon for any given point in its cycle.
         * * @param {number} phase - A decimal number from 0 to 1 representing the moon's cycle.
         * 0 = New Moon (Dark)
         * 0.5 = Full Moon (Bright)
         * 1.0 = New Moon (Dark)
         * @returns {string} - The raw SVG code as a text string.
         */
        function getMoonPhaseIcon(phase) {
            // Keep the number strictly between 0 and 1
            phase = Math.max(0, Math.min(1, phase));

            // The size of our moon ball
            const r = 50;

            // Which side does the shadow cover? (0 for left, 1 for right)
            let outerSweep = phase < 0.5 ? 0 : 1;

            // How wide is the curved shadow edge?
            let rx = Math.abs(Math.cos(phase * 2 * Math.PI)) * r;

            // Which way does the shadow edge bow out?
            let innerSweep = (phase >= 0.25 && phase < 0.5) || (phase >= 0.75) ? 1 : 0;

            const uniqueId = Math.random().toString(36).substring(2, 9);
            const goldGradId = `moonGold_${uniqueId}`;
            const darkGradId = `moonDark_${uniqueId}`;

            const defs = `
                <defs>
                    <radialGradient id="${goldGradId}" cx="40%" cy="40%" r="70%">
                        <stop offset="0%" stop-color="#FCD34D" />
                        <stop offset="60%" stop-color="#F59E0B" />
                        <stop offset="100%" stop-color="#C2410C" />
                    </radialGradient>
                    <radialGradient id="${darkGradId}" cx="40%" cy="40%" r="70%">
                        <stop offset="0%" stop-color="#1E293B" />
                        <stop offset="60%" stop-color="#0F172A" />
                        <stop offset="100%" stop-color="#020617" />
                    </radialGradient>
                </defs>
            `;

            // Handle exact Full and New moons to prevent tiny visual glitches
            if (Math.abs(phase - 0.5) < 0.01) {
                return `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">${defs}<circle cx="50" cy="50" r="50" fill="url(#${goldGradId})" /></svg>`;
            }
            if (phase < 0.01 || phase > 0.99) {
                return `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">${defs}<circle cx="50" cy="50" r="50" fill="url(#${darkGradId})" /></svg>`;
            }

            // The shape of the dark shadow
            const path = `M 50 0 A 50 50 0 0 ${outerSweep} 50 100 A ${rx} 50 0 0 ${innerSweep} 50 0 Z`;

            // Put the bright yellow ball and the dark shadow together
            return `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            ${defs}
            <circle cx="50" cy="50" r="50" fill="url(#${goldGradId})" />
            <path d="${path}" fill="url(#${darkGradId})" />
        </svg>`.trim();
        }

        const TITHI_ICONS = {
            purnima: getMoonPhaseIcon(0.5),
            amavasya: getMoonPhaseIcon(0.0),
            ekadashi: `<svg viewBox="0 0 512 512" class="w-full h-full text-indigo-500 drop-shadow-sm" fill="currentColor"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>`,
            shukla_ekadashi: `<svg viewBox="0 0 512 512" class="w-full h-full text-amber-500 drop-shadow-sm" fill="currentColor"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>`
        };

        /**
         * READY-TO-USE STATIC ICONS
         * If you do not want to calculate the moon phases dynamically,
         * you can just use these pre-made SVG strings for the 8 major stages.
         */
        const STATIC_MOON_PHASES = {
            newMoon: getMoonPhaseIcon(0.0),        // Completely dark
            waxingCrescent: getMoonPhaseIcon(0.15), // A thin bright sliver on the right
            firstQuarter: getMoonPhaseIcon(0.25),   // Exactly half bright on the right
            waxingGibbous: getMoonPhaseIcon(0.35),  // Mostly bright, dark sliver on the left
            fullMoon: getMoonPhaseIcon(0.5),        // Completely bright
            waningGibbous: getMoonPhaseIcon(0.65),  // Mostly bright, dark sliver on the right
            lastQuarter: getMoonPhaseIcon(0.75),    // Exactly half bright on the left
            waningCrescent: getMoonPhaseIcon(0.85)  // A thin bright sliver on the left
        };

        // Season UI Component Data

        // Full SunCalc Implementation (Upgraded)
        const SunCalc = (function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
function observerAngle(height) { return -2.076 * Math.sqrt(height) / 60; }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date, latitude/longitude, and, optionally,
// the observer height (in meters) relative to the horizon

SunCalc.getTimes = function (date, lat, lng, height) {

    height = height || 0;

    var lw = rad * -lng,
        phi = rad * lat,

        dh = observerAngle(height),

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, h0, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];
        h0 = (time[0] + dh) * rad;

        Jset = getSetJ(h0, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon
    // High Precision Lunar Position (Meeus/VedicAstro Implementation)
    var T = d / 36525;
    var L0 = 218.316447 + 481267.881234 * T;
    var D = 297.850192 + 445267.111403 * T;
    var M = 357.529109 + 35999.050291 * T;
    var Mprime = 134.963396 + 477198.867505 * T;
    var F = 93.272095 + 483202.017523 * T;

    var D2R = Math.PI / 180;

    // Longitude Terms (Sine series)
    var sumL = 6.288774 * Math.sin(Mprime * D2R);
    sumL += 1.274027 * Math.sin((2 * D - Mprime) * D2R);
    sumL += 0.658309 * Math.sin(2 * D * D2R);
    sumL += 0.213618 * Math.sin(2 * Mprime * D2R);
    sumL -= 0.185116 * Math.sin(M * D2R);
    sumL -= 0.114332 * Math.sin(2 * F * D2R);
    sumL += 0.058793 * Math.sin((2 * D - 2 * Mprime) * D2R);
    sumL += 0.057066 * Math.sin((2 * D - M - Mprime) * D2R);
    sumL += 0.053322 * Math.sin((2 * D + Mprime) * D2R);
    sumL += 0.045758 * Math.sin((2 * D - M) * D2R);
    sumL -= 0.040923 * Math.sin((M - Mprime) * D2R);
    sumL -= 0.034720 * Math.sin(D * D2R);
    sumL -= 0.030383 * Math.sin((M + Mprime) * D2R);
    sumL += 0.015327 * Math.sin((2 * D - 2 * F) * D2R);
    sumL -= 0.012528 * Math.sin((2 * D - 2 * M) * D2R);

    var l = (L0 + sumL) * D2R; // Longitude in radians

    // Latitude Terms (Sine series)
    var sumB = 5.128122 * Math.sin(F * D2R)
             + 0.280602 * Math.sin((Mprime + F) * D2R)
             + 0.277693 * Math.sin((Mprime - F) * D2R)
             + 0.173237 * Math.sin((2 * D - F) * D2R)
             + 0.055413 * Math.sin((2 * D + F - Mprime) * D2R)
             + 0.046271 * Math.sin((2 * D - F - Mprime) * D2R)
             + 0.032573 * Math.sin((2 * D + F) * D2R)
             + 0.017198 * Math.sin((2 * Mprime + F) * D2R);

    var b = sumB * D2R; // Latitude in radians

    // Distance (km)
    var dt = 385000.56 - 20905.355 * Math.cos(Mprime * D2R)
             - 3699.111 * Math.cos((2 * D - Mprime) * D2R)
             - 2955.968 * Math.cos(2 * D * D2R)
             - 569.925 * Math.cos(2 * Mprime * D2R);

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};

return SunCalc;

})();

        /* --- VEDIC ASTRONOMY ALGORITHMS --- */
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
                // 15th Term (Drift Correction for High Precision)
                sumLong -= 0.012528 * Math.sin((2 * D - 2 * M) * D2R);

                return norm(Lprime + sumLong);
            }

            function getAyanamsa(jd) {
                const T = (jd - 2451545.0) / 36525;
                // True Lahiri Ayanamsa formula
                return 23.85616 + 1.396042 * T + 0.000307 * T * T;
            }

            function calculate(dateObj, hour = 6) {
                // 1. Standardize Time Zone to IST (UTC+5:30)
                // This prevents drift caused by local browser timezones.
                // Default: 6:00 AM IST corresponds to 00:30 UTC.

                const d = new Date(dateObj);
                const year = d.getFullYear();
                const month = d.getMonth();
                const day = d.getDate();

                const h = (hour === undefined || hour === null) ? 6 : hour;

                // Calculate UTC Offset from IST (IST is +5.5h ahead of UTC)
                // UTC Time = IST Time - 5.5h
                const utcOffsetMs = (h - 5.5) * 3600000;

                // Construct UTC Date explicitly
                // Date.UTC returns ms from epoch for 00:00:00 UTC on that YMD
                const utcDate = new Date(Date.UTC(year, month, day) + utcOffsetMs);

                const jd = (utcDate.getTime() / 86400000) + 2440587.5;
                const aya = getAyanamsa(jd);

                const sunSid = norm(getSunLong(jd) - aya);
                const moonSid = norm(getMoonLong(jd) - aya);

                // Tithi = (Moon - Sun) / 12. Use minimal epsilon for float safety.
                const diff = norm(moonSid - sunSid + 0.000001);
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
                    karana: KARANAS[karanaIndex],
                    jd: jd,
                    sunLon: sunSid,
                    moonLon: moonSid
                };
            }

            function getTithiTimes(jd, tithiIndex) {
                // Helper: Get Angle (0-360)
                const getAngle = (j) => {
                    // Use Ayanamsa corrected longitudes if possible, but difference is same
                    // (Moon - Aya) - (Sun - Aya) = Moon - Sun.
                    // So raw longitudes are fine for difference.
                    let diff = norm(getMoonLong(j) - getSunLong(j));
                    return diff;
                };

                // Helper: Binary Search
                // Finds time when angle == target.
                // Constraint: Tithi increases angle.
                const solve = (low, high, target) => {
                    for (let i = 0; i < 20; i++) {
                        let mid = (low + high) / 2;
                        let val = getAngle(mid);
                        let delta = val - target;
                        if (delta > 180) delta -= 360;
                        if (delta < -180) delta += 360;

                        // If delta > 0, current angle > target. We need earlier time.
                        if (delta > 0) high = mid; else low = mid;
                    }
                    return high;
                };

                // Normalize index to 0-29
                let idx = tithiIndex % 30;

                let startTarget = idx * 12;
                let endTarget = ((idx + 1) % 30) * 12;

                // Search Range: +/- 1.2 days from current JD
                // This covers Tithi length variations (19h to 26h)
                const startJD = solve(jd - 1.2, jd + 0.1, startTarget);
                const endJD = solve(jd - 0.1, jd + 1.2, endTarget);

                return { start: startJD, end: endJD };
            }

            function getNakshatraTimes(jd, nakIndex) {
                // Helper: Get Moon Longitude (0-360)
                const getMoonPos = (j) => {
                    const aya = getAyanamsa(j);
                    return norm(getMoonLong(j) - aya);
                };

                // Helper: Binary Search
                const solve = (low, high, target) => {
                    for (let i = 0; i < 20; i++) {
                        let mid = (low + high) / 2;
                        let val = getMoonPos(mid);
                        let delta = val - target;
                        if (delta > 180) delta -= 360;
                        if (delta < -180) delta += 360;
                        if (delta > 0) high = mid; else low = mid;
                    }
                    return high;
                };

                let idx = nakIndex % 27;
                let startTarget = idx * (360/27);
                let endTarget = ((idx + 1) % 27) * (360/27);

                // Search Range: +/- 1.2 days
                const startJD = solve(jd - 1.2, jd + 0.1, startTarget);
                const endJD = solve(jd - 0.1, jd + 1.2, endTarget);

                return { start: startJD, end: endJD };
            }

            // Amrit Ghati Table (Start Ghati, End Ghati)
            // 1 Ghati = 24 minutes. Each Nakshatra is divided into 60 Ghatis.
            const AMRIT_GHATIS = {
                "Ashwini": [42, 46], "Bharani": [48, 52], "Krittika": [54, 58], "Rohini": [52, 56],
                "Mrigashirsha": [38, 42], "Ardra": [35, 39], "Punarvasu": [54, 58], "Pushya": [44, 48],
                "Ashlesha": [56, 60], "Magha": [54, 58], "Purva Phalguni": [44, 48], "Uttara Phalguni": [42, 46],
                "Hasta": [45, 49], "Chitra": [44, 48], "Swati": [38, 42], "Vishakha": [38, 42],
                "Anuradha": [34, 38], "Jyeshtha": [38, 42], "Mula": [44, 48], "Purva Ashadha": [48, 52],
                "Uttara Ashadha": [44, 48], "Shravana": [34, 38], "Dhanishta": [34, 38], "Shatabhisha": [43, 46],
                "Purva Bhadrapada": [40, 44], "Uttara Bhadrapada": [48, 52], "Revati": [54, 58]
            };

            return {
                calculate: calculate,
                getTithiTimes: getTithiTimes,
                getNakshatraTimes: getNakshatraTimes,
                AMRIT_GHATIS: AMRIT_GHATIS,


                getSolarMonthDay: function(dateObj) {
                    // 1. Evaluate the Sun's Rashi at the VERY END of the target day (11:59 PM IST)
                    // 11:59 PM IST = 18:29 UTC (18.483333 hours)
                    let utcMidnightMs = Date.UTC(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
                    let jdEndIST = (utcMidnightMs / 86400000) + 2440587.5 + (18.483333 / 24);

                    const getRashi = (jd) => Math.floor(norm(getSunLong(jd) - getAyanamsa(jd)) / 30);

                    // The Rashi at the end of the day determines the month for this entire calendar day
                    let currentRashi = getRashi(jdEndIST);

                    // 2. Binary search to find EXACTLY when the Sun entered currentRashi
                    let leftJd = jdEndIST - 35;
                    let rightJd = jdEndIST;
                    let targetLon = currentRashi * 30;
                    let exactSankrantiJd = rightJd;

                    for (let step = 0; step < 20; step++) {
                        let midJd = (leftJd + rightJd) / 2;
                        let midLon = norm(getSunLong(midJd) - getAyanamsa(midJd));
                        let diff = midLon - targetLon;

                        // Handle longitude wrap around (e.g., Pisces 330 to Aries 0)
                        if (diff > 180) diff -= 360;
                        if (diff < -180) diff += 360;

                        if (diff >= 0) {
                            rightJd = midJd; // Already crossed into currentRashi, look earlier
                            exactSankrantiJd = midJd;
                        } else {
                            leftJd = midJd; // Still in previous Rashi, look later
                        }
                    }

                    // 3. Convert exact Sankranti JD to IST Date to find which calendar day it fell on
                    let sankrantiUtcMs = (exactSankrantiJd - 2440587.5) * 86400000;
                    let sankrantiIST = new Date(sankrantiUtcMs + (5.5 * 3600000)); // UTC to IST

                    // Normalize Sankranti Date to Midnight UTC for pure day difference calculation
                    let sYear = sankrantiIST.getUTCFullYear();
                    let sMonth = sankrantiIST.getUTCMonth();
                    let sDate = sankrantiIST.getUTCDate();
                    let sankrantiMidnight = Date.UTC(sYear, sMonth, sDate);

                    // 4. Calculate Day Count (Target Day - Sankranti Day + 1)
                    let dayCount = Math.round((utcMidnightMs - sankrantiMidnight) / 86400000) + 1;

                    // Fallback for extreme boundary safety
                    if (dayCount < 1) dayCount = 1;
                    if (dayCount > 32) dayCount = 1;

                    return { monthIndex: currentRashi, day: dayCount };
                },
                getUpcomingSankranti: function(baseDateObj) {

                    let jdStart = (Date.UTC(baseDateObj.getFullYear(), baseDateObj.getMonth(), baseDateObj.getDate()) / 86400000) + 2440587.5;
                    let currentSunLon = norm(getSunLong(jdStart) - getAyanamsa(jdStart));
                    let currentRashi = Math.floor(currentSunLon / 30);

                    for (let i = 1; i <= 35; i++) {
                        let jdCheck = jdStart + i;
                        let testSunLon = norm(getSunLong(jdCheck) - getAyanamsa(jdCheck));
                        let testRashi = Math.floor(testSunLon / 30);

                        if (testRashi !== currentRashi) {
                            let leftJd = jdCheck - 1;
                            let rightJd = jdCheck;
                            let targetLon = testRashi * 30;
                            let exactJd = leftJd;

                            for (let step = 0; step < 15; step++) {
                                let midJd = (leftJd + rightJd) / 2;
                                let midLon = norm(getSunLong(midJd) - getAyanamsa(midJd));

                                // Handle wrap around at 360 (Pisces to Aries)
                                let diff = midLon - targetLon;
                                if (diff > 180) diff -= 360;
                                if (diff < -180) diff += 360;

                                if (diff < 0) {
                                    leftJd = midJd;
                                } else {
                                    rightJd = midJd;
                                }
                                exactJd = midJd;
                            }

                            let exactDate = new Date((exactJd - 2440587.5) * 86400000);
                            return { rashiIndex: testRashi, exactJd: exactJd, dateObj: exactDate };
                        }
                    }
                    return null;
                },
                getTithiAtSunrise: function(dateObj) {
                    // Strict Sunrise Rule: Always check 6 AM
                    return calculate(dateObj, 6);
                }
            };
        })();

        const SeasonIcons = {
            // Sun behind small cloud
            hemant: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="sunGradH" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#FFB300;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Sun (Spinning slowly) -->
                    <g style="transform-origin: 32px 32px; animation: spin 12s linear infinite;">
                        <circle cx="32" cy="32" r="14" fill="url(#sunGradH)" />
                        <path d="M32 6V10 M32 54V58 M58 32H54 M10 32H6 M53 11L50 14 M14 50L11 53 M53 53L50 50 M14 14L11 11" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
                    </g>
                    <!-- Cloud (Floating) -->
                    <g style="animation: float 4s ease-in-out infinite;">
                        <path transform="translate(-6, 6)" d="M44 44H20C15.58 44 12 40.42 12 36C12 31.58 15.58 28 20 28C20.6 28 21.18 28.08 21.74 28.22C22.82 24.32 26.4 21.5 30.6 21.5C35.75 21.5 40 25.4 40.5 30.3C44.92 30.3 48.5 33.88 48.5 38.3C48.5 41.5 46.5 44 44 44Z" fill="#E3F2FD" stroke="#90CAF9" stroke-width="1.5"/>
                    </g>
                </svg>`,

            // Detailed Snowflake
            shishir: `
                <svg width="100" height="115" style="transform: translateY(12px);" viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <!-- Snowflake Arm Definition -->
                        <g id="snowflake-arm">
                            <!-- Main Stem -->
                            <line x1="0" y1="0" x2="0" y2="-38" />
                            <!-- Inner Branch -->
                            <path d="M-9 -14 L0 -6 L9 -14" />
                            <!-- Outer Branch -->
                            <path d="M-9 -28 L0 -20 L9 -28" />
                        </g>
                        <!-- Sparkle Definition -->
                        <path id="sparkle" d="M0 -7 C1 -2 2 -1 7 0 C 2 1 1 2 0 7 C -1 2 -2 1 -7 0 C -2 -1 -1 -2 0 -7 Z" />
                    </defs>
                    <!-- Group for Main Content to Center it -->
                    <g transform="translate(70, 65)">
                        <!-- Snowflake -->
                        <g stroke="#1F3B6F" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
                            <use href="#snowflake-arm" />
                            <use href="#snowflake-arm" transform="rotate(60)" />
                            <use href="#snowflake-arm" transform="rotate(120)" />
                            <use href="#snowflake-arm" transform="rotate(180)" />
                            <use href="#snowflake-arm" transform="rotate(240)" />
                            <use href="#snowflake-arm" transform="rotate(300)" />
                        </g>
                        <!-- Sparkles -->
                        <g fill="#2D9CDB">
                            <!-- Top Left -->
                            <use href="#sparkle" transform="translate(-40, -45) scale(1.2)" />
                            <!-- Middle Right -->
                            <use href="#sparkle" transform="translate(48, -5) scale(1.1)" />
                            <!-- Bottom Left -->
                            <use href="#sparkle" transform="translate(-38, 35) scale(1.1)" />
                        </g>
                    </g>
                </svg>`,

            // Flower with leaves
            vasant: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Stem -->
                    <path d="M32 60V40" stroke="#4CAF50" stroke-width="4" stroke-linecap="round"/>
                    <path d="M32 50Q42 45 42 35" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>
                    <path d="M32 50Q22 45 22 35" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>
                    <!-- Petals -->
                    <circle cx="32" cy="18" r="6" fill="#FF8A80"/>
                    <circle cx="32" cy="38" r="6" fill="#FF8A80"/>
                    <circle cx="42" cy="28" r="6" fill="#FF8A80"/>
                    <circle cx="22" cy="28" r="6" fill="#FF8A80"/>
                    <circle cx="39" cy="21" r="6" fill="#FF8A80"/>
                    <circle cx="25" cy="21" r="6" fill="#FF8A80"/>
                    <circle cx="39" cy="35" r="6" fill="#FF8A80"/>
                    <circle cx="25" cy="35" r="6" fill="#FF8A80"/>
                    <!-- Center -->
                    <circle cx="32" cy="28" r="8" fill="#FFD54F" stroke="#FFA000" stroke-width="1"/>
                </svg>`,

            // Bright Sun
            grishma: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="14" fill="#FF9800"/>
                    <circle cx="32" cy="32" r="14" fill="url(#sunGradient)"/>
                    <path d="M32 8L32 4M32 60L32 56M56 32L60 32M4 32L8 32M49 15L52 12M12 52L15 49M49 49L52 52M12 12L15 15" stroke="#FF9800" stroke-width="5" stroke-linecap="round"/>
                    <defs>
                        <radialGradient id="sunGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(14)">
                            <stop stop-color="#FFEB3B"/>
                            <stop offset="1" stop-color="#FF9800"/>
                        </radialGradient>
                    </defs>
                </svg>`,

            // Cloud with Rain Drops
            varsha: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M24 48V56" stroke="#42A5F5" stroke-width="3" stroke-linecap="round" style="animation: rain 0.8s infinite linear;"/>
                     <path d="M32 48V56" stroke="#42A5F5" stroke-width="3" stroke-linecap="round" style="animation: rain 0.8s infinite linear 0.2s;"/>
                     <path d="M40 48V56" stroke="#42A5F5" stroke-width="3" stroke-linecap="round" style="animation: rain 0.8s infinite linear 0.4s;"/>
                     <path d="M48 42H20C15 42 12 38 12 34C12 29 16 26 20 26C21 26 22 26 23 26C24 22 28 19 32 19C37 19 41 23 42 27C46 27 50 30 50 35C50 39 48 42 42 42" fill="#7E57C2"/>
                </svg>`,

            // Autumn Leaf
            sharad: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 58C32 58 32 40 32 30" stroke="#795548" stroke-width="2" stroke-linecap="round"/>
                    <path d="M32 54C22 52 14 42 14 30C14 18 24 10 32 6C40 10 50 18 50 30C50 42 42 52 32 54Z" fill="#FF7043"/>
                    <path d="M32 6V54" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 36L44 26" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 36L20 26" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 22L40 16" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 22L24 16" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 46L42 40" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 46L22 40" stroke="#D84315" stroke-width="1.5"/>
                </svg>`
        };


        const defaultRituImages = [
            "https://images.unsplash.com/photo-1490750967868-8f7d4b5741f2?auto=format&fit=crop&q=80&w=800", // Vasant
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800", // Grishma
            "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?auto=format&fit=crop&q=80&w=800", // Varsha
            "https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&q=80&w=800", // Sharad
            "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800", // Hemant
            "https://images.unsplash.com/photo-1478265409131-1f65c88f965c?auto=format&fit=crop&q=80&w=800"  // Shishir
        ];
const seasonUIConfig = [
            { name: "Vasant (Spring)", dateRange: "18 Feb - 19 Apr", color: "#388E3C", icon: SeasonIcons.vasant },   // 0
            { name: "Grishma (Summer)", dateRange: "20 Apr - 21 Jun", color: "#E65100", icon: SeasonIcons.grishma },  // 1
            { name: "Varsha (Monsoon)", dateRange: "22 Jun - 22 Aug", color: "#4527A0", icon: SeasonIcons.varsha },   // 2
            { name: "Sharad (Autumn)", dateRange: "23 Aug - 22 Oct", color: "#BF360C", icon: SeasonIcons.sharad },    // 3
            { name: "Hemant (Pre-Winter)", dateRange: "23 Oct - 21 Dec", color: "#D60000", icon: SeasonIcons.hemant },// 4
            { name: "Shishir (Winter)", dateRange: "22 Dec - 17 Feb", color: "#1976D2", icon: SeasonIcons.shishir }   // 5
        ];



        function saveConfigToStorage() {
            try {
                localStorage.setItem('panchangConfig', JSON.stringify(appState.config));
            } catch (e) {
                console.error("Failed to save config to localStorage", e);
            }
        }

        function toggleSection(section, isVisible) {
            if (!appState.config.sections) appState.config.sections = { festivals: true, panchang: true };
            appState.config.sections[section] = isVisible;
            saveConfigToStorage();
            render();
        }

        function getUserLocation() {
            const btn = document.getElementById('btn-location');
            const originalContent = btn ? btn.innerHTML : '';

            if (!navigator.geolocation) {
                fallbackToSavedLocation(btn, originalContent);
                return;
            }

            if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Locating...';

            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                let locName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;

                // Optimistic update
                appState.config.location = { lat: lat, lng: lng, name: locName };
                saveConfigToStorage();
                render();

                // Try reverse geocoding
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data && data.address) {
                            // Construct a friendly name
                            const city = data.address.city || data.address.town || data.address.village || data.address.county;
                            const state = data.address.state || data.address.country;
                            if (city) locName = `${city}, ${state}`;
                            else if (state) locName = state;
                        } else if (data && data.display_name) {
                             locName = data.display_name.split(',')[0];
                        }
                        appState.config.location.name = locName;
                        saveConfigToStorage();
                        render();
                    }
                } catch (e) {
                    console.log("Reverse geocoding failed, using coordinates", e);
                }

                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                showToast("Location updated: " + locName);
            }, (error) => {
                console.error(error);
                fallbackToSavedLocation(btn, originalContent);
            });
        }

        function fallbackToSavedLocation(btn, originalContent) {
            try {
                const savedConfig = localStorage.getItem('panchangConfig');
                if (savedConfig) {
                    const parsed = JSON.parse(savedConfig);
                    if (parsed.location) {
                        appState.config.location = parsed.location;
                        render();
                        showToast(`Using saved location: ${parsed.location.name || 'Coordinates'}`);
                        if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                        return;
                    }
                }
            } catch(e) { console.error("Backup location load failed", e); }

            showToast("Location unavailable. Please enable GPS.");
            if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
        }

        function getSeasonIndex(month) {
             return Math.floor((month + 10) % 12 / 2);
        }

        function cycleSeasonCard() {
            if (!appState.monthsData || appState.monthsData.length === 0) return;

            const currentMonthData = appState.monthsData[appState.activeMonthIndex];
            const currentSeason = getSeasonIndex(currentMonthData.month);

            for (let i = 1; i <= 6; i++) {
                const targetSeason = (currentSeason + i) % 6;

                // Find a month with this season, preferring the "next" one in the list
                let foundIndex = -1;
                for (let j = 1; j <= appState.monthsData.length; j++) {
                    const checkIndex = (appState.activeMonthIndex + j) % appState.monthsData.length;
                    const mData = appState.monthsData[checkIndex];
                    if (getSeasonIndex(mData.month) === targetSeason) {
                        foundIndex = checkIndex;
                        break;
                    }
                }

                if (foundIndex !== -1) {
                    appState.activeMonthIndex = foundIndex;
                    render();
                    return;
                }
            }
        }

        function updateSeasonCardUI(index) {
            const config = seasonUIConfig[index];
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const name = langObj.indianSeasons[index];

            const titleEl = document.getElementById('seasonTitle');
            const iconEl = document.getElementById('seasonIcon');

            if(titleEl) {
                titleEl.textContent = name;
                titleEl.style.color = config.color;
                // Animation Reset
                titleEl.classList.remove('fade-enter-active');
                void titleEl.offsetWidth;
                titleEl.classList.add('fade-enter-active');
            }
            if(iconEl) {
                iconEl.innerHTML = config.icon;
                iconEl.style.transform = "scale(0.8) rotate(-10deg)";
                iconEl.style.opacity = "0";
                setTimeout(() => {
                    iconEl.style.transform = "scale(1) rotate(0deg)";
                    iconEl.style.opacity = "1";
                }, 50);
            }
        }

        const editor = document.getElementById('editor');

        const DEFAULT_SYNC_LINKS = {
            en: "", hi: "", or: "", bn: "", mr: "", gu: "",
            pa: "", ta: "", te: "", kn: "", ml: "", as: ""
        };

        const LinkSecurity = {
            encrypt: (s) => {
                if (!s) return "";
                try { return btoa(s).split('').reverse().join(''); } catch(e) { return s; }
            },
            decrypt: (s) => {
                if (!s) return "";
                try { return atob(s.split('').reverse().join('')); } catch(e) { return s; }
            }
        };

        // Background Pre-rendering State
        let preRenderQueue = [];
        let isPreRenderRunning = false;
        // Polyfill for requestIdleCallback
        const reqIdleCallback = window.requestIdleCallback || function(cb) { return setTimeout(function() { cb({ timeRemaining: function() { return 50; } }); }, 1); };


const LOCATION_DATA = {
    "Andhra Pradesh": {
        "Visakhapatnam": [17.6868, 83.2185],
        "Vijayawada": [16.5062, 80.6480],
        "Guntur": [16.3067, 80.4365],
        "Nellore": [14.4426, 79.9865],
        "Kurnool": [15.8281, 78.0373],
        "Tirupati": [13.6288, 79.4192],
        "Rajahmundry": [17.0005, 81.8040]
    },
    "Arunachal Pradesh": {
        "Itanagar": [27.0844, 93.6053],
        "Tawang": [27.5861, 91.8655],
        "Pasighat": [28.0619, 95.3260]
    },
    "Assam": {
        "Guwahati": [26.1445, 91.7362],
        "Silchar": [24.8333, 92.7789],
        "Dibrugarh": [27.4728, 94.9120],
        "Jorhat": [26.7509, 94.2037]
    },
    "Bihar": {
        "Patna": [25.5941, 85.1376],
        "Gaya": [24.7914, 85.0002],
        "Bhagalpur": [25.2425, 86.9749],
        "Muzaffarpur": [26.1209, 85.3647],
        "Purnia": [25.7711, 87.4712]
    },
    "Chhattisgarh": {
        "Raipur": [21.2514, 81.6296],
        "Bhilai": [21.1938, 81.3509],
        "Bilaspur": [22.0797, 82.1391],
        "Korba": [22.3595, 82.7500]
    },
    "Goa": {
        "Panaji": [15.4909, 73.8278],
        "Margao": [15.2736, 73.9585],
        "Vasco da Gama": [15.3855, 73.8118]
    },
    "Gujarat": {
        "Ahmedabad": [23.0225, 72.5714],
        "Surat": [21.1702, 72.8311],
        "Vadodara": [22.3072, 73.1812],
        "Rajkot": [22.3039, 70.8022],
        "Bhavnagar": [21.7645, 72.1519]
    },
    "Haryana": {
        "Faridabad": [28.4089, 77.3178],
        "Gurugram": [28.4595, 77.0266],
        "Panipat": [29.3909, 76.9635],
        "Ambala": [30.3782, 76.7767],
        "Rohtak": [28.8955, 76.5892]
    },
    "Himachal Pradesh": {
        "Shimla": [31.1048, 77.1734],
        "Manali": [32.2396, 77.1887],
        "Dharamshala": [32.2190, 76.3234],
        "Mandi": [31.5892, 76.9318]
    },
    "Jharkhand": {
        "Ranchi": [23.3441, 85.3096],
        "Jamshedpur": [22.8046, 86.2029],
        "Dhanbad": [23.7957, 86.4304],
        "Bokaro": [23.6693, 85.9892]
    },
    "Karnataka": {
        "Bengaluru": [12.9716, 77.5946],
        "Mysuru": [12.2958, 76.6394],
        "Mangaluru": [12.9141, 74.8560],
        "Hubballi": [15.3647, 75.1240],
        "Belagavi": [15.8497, 74.4977]
    },
    "Kerala": {
        "Thiruvananthapuram": [8.5241, 76.9366],
        "Kochi": [9.9312, 76.2673],
        "Kozhikode": [11.2588, 75.7804],
        "Thrissur": [10.5276, 76.2144],
        "Kollam": [8.8932, 76.6141]
    },
    "Madhya Pradesh": {
        "Bhopal": [23.2599, 77.4126],
        "Indore": [22.7196, 75.8577],
        "Jabalpur": [23.1815, 79.9864],
        "Gwalior": [26.2183, 78.1828],
        "Ujjain": [23.1765, 75.7885]
    },
    "Maharashtra": {
        "Mumbai": [19.0760, 72.8777],
        "Pune": [18.5204, 73.8567],
        "Nagpur": [21.1458, 79.0882],
        "Nashik": [19.9975, 73.7898],
        "Aurangabad": [19.8762, 75.3433],
        "Thane": [19.2183, 72.9781]
    },
    "Manipur": {
        "Imphal": [24.8170, 93.9368],
        "Churachandpur": [24.3297, 93.6702]
    },
    "Meghalaya": {
        "Shillong": [25.5788, 91.8933],
        "Tura": [25.5143, 90.2030]
    },
    "Mizoram": {
        "Aizawl": [23.7271, 92.7176],
        "Lunglei": [22.8837, 92.7420]
    },
    "Nagaland": {
        "Kohima": [25.6751, 94.1086],
        "Dimapur": [25.8643, 93.7251]
    },
    "Odisha": {
        "Bhubaneswar": [20.2961, 85.8245],
        "Cuttack": [20.4625, 85.8830],
        "Rourkela": [22.2604, 84.8536],
        "Berhampur": [19.3150, 84.7941],
        "Sambalpur": [21.4669, 83.9812]
    },
    "Punjab": {
        "Ludhiana": [30.9010, 75.8573],
        "Amritsar": [31.6340, 74.8723],
        "Jalandhar": [31.3260, 75.5762],
        "Patiala": [30.3398, 76.3869],
        "Bathinda": [30.2110, 74.9455]
    },
    "Rajasthan": {
        "Jaipur": [26.9124, 75.7873],
        "Jodhpur": [26.2389, 73.0243],
        "Udaipur": [24.5854, 73.7125],
        "Kota": [25.2138, 75.8648],
        "Ajmer": [26.4499, 74.6399],
        "Bikaner": [28.0229, 73.3119]
    },
    "Sikkim": {
        "Gangtok": [27.3389, 88.6065],
        "Namchi": [27.1691, 88.3541]
    },
    "Tamil Nadu": {
        "Chennai": [13.0827, 80.2707],
        "Coimbatore": [11.0168, 76.9558],
        "Madurai": [9.9252, 78.1198],
        "Tiruchirappalli": [10.7905, 78.7047],
        "Salem": [11.6643, 78.1460]
    },
    "Telangana": {
        "Hyderabad": [17.3850, 78.4867],
        "Warangal": [17.9689, 79.5941],
        "Nizamabad": [18.6704, 78.0941],
        "Karimnagar": [18.4386, 79.1288],
        "Khammam": [17.2473, 80.1514]
    },
    "Tripura": {
        "Agartala": [23.8315, 91.2868],
        "Dharmanagar": [24.3756, 92.1641]
    },
    "Uttar Pradesh": {
        "Lucknow": [26.8467, 80.9462],
        "Kanpur": [26.4499, 80.3319],
        "Agra": [27.1767, 78.0081],
        "Varanasi": [25.3176, 82.9739],
        "Prayagraj": [25.4358, 81.8463],
        "Meerut": [28.9845, 77.7064],
        "Noida": [28.5355, 77.3910]
    },
    "Uttarakhand": {
        "Dehradun": [30.3165, 78.0322],
        "Haridwar": [29.9457, 78.1642],
        "Roorkee": [29.8543, 77.8880],
        "Haldwani": [29.2183, 79.5130],
        "Nainital": [29.3919, 79.4542]
    },
    "West Bengal": {
        "Kolkata": [22.5726, 88.3639],
        "Asansol": [23.6739, 86.9524],
        "Siliguri": [26.7271, 88.3953],
        "Durgapur": [23.5204, 87.3119],
        "Howrah": [22.5958, 88.3110]
    },
    "Delhi": {
        "New Delhi": [28.6139, 77.2090]
    },
    "Jammu and Kashmir": {
        "Srinagar": [34.0837, 74.7973],
        "Jammu": [32.7266, 74.8570],
        "Anantnag": [33.7311, 75.1487]
    },
    "Ladakh": {
        "Leh": [34.1526, 77.5771],
        "Kargil": [34.5539, 76.1349]
    },
    "Puducherry": {
        "Pondicherry": [11.9416, 79.8083]
    },
    "Chandigarh": {
        "Chandigarh": [30.7333, 76.7794]
    },
    "Andaman and Nicobar Islands": {
        "Port Blair": [11.6234, 92.7265]
    }
};



        function generateI18nKey(text, suffix = '') {
            if (!text) return '';
            let baseKey = text.trim().toLowerCase().replace(/\s+/g, '_');
            return suffix ? `${baseKey}_${suffix}` : baseKey;
        }

        let appState = {
            activeMonthIndex: 0,
            customLabels: {},
            customMonths: {},
            monthsData: [],
            recurringEvents: [],
            recurringDetails: {},
            viewDate: { month: new Date().getMonth(), year: new Date().getFullYear() },
            todayIndex: -1,
            details: {},
            manualTithis: {}, // New storage for dedicated Tithi overrides
            customSeasonDescriptions: {},
            images: {},
            activeMonthDetails: {}, // Cache for pre-rendered Day Detail HTML
            view: window.innerWidth < 768 ? 'month' : 'month',
            config: {
                title: 'Vaidik Calendar',
                logoUrl: null,
                language: 'en',
                location: null,
                sections: { festivals: true, panchang: true },
                syncLinks: { ...DEFAULT_SYNC_LINKS }
            }
        };

        let bannerInterval;
        let liveClockInterval = null;
        let bannerCurrentIndex = 0;
        let currentBannerDataHash = "";
        let isBannerDismissed = false;

        const langData = {
    en: {
        days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        nums: ["0","1","2","3","4","5","6","7","8","9"],
        filters: ["Festivals", "Auspicious", "Holidays", "Other festivals"], solarMonths: ["Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada", "Ashvina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna", "Chaitra"],
        rashis: ["Mesha", "Vrishabha", "Mithuna", "Karka", "Simha", "Kanya", "Tula", "Vrischika", "Dhanu", "Makara", "Kumbha", "Meena"],
indianMonths: ["Pausha / Magha", "Magha / Phalguna", "Phalguna / Chaitra", "Chaitra / Vaishakha", "Vaishakha / Jyeshtha", "Jyeshtha / Ashadha", "Ashadha / Shravana", "Shravana / Bhadra", "Bhadra / Ashvina", "Ashvina / Kartika", "Kartika / Margashirsha", "Margashirsha / Pausha"],
        indianSeasons: ["Vasant (Spring)", "Grishma (Summer)", "Varsha (Monsoon)", "Sharad (Autumn)", "Hemant (Pre-Winter)", "Shishir (Winter)"],
        seasonDescriptions: [],
        paksha: ["Shukla Paksha", "Krishna Paksha"],
        tithis: ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"]
    },
    hi: {
        days: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
        nums: ["०","१","२","३","४","५","६","७","८","९"],
        filters: ["त्यौहार", "शुभ दिन", "छुट्टियाँ", "अन्य त्यौहार"], solarMonths: ["वैशाख", "ज्येष्ठ", "आषाढ़", "श्रावण", "भाद्रपद", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"],
        rashis: ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तुला", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"],
indianMonths: ["पौष / माघ", "माघ / फाल्गुन", "फाल्गुन / चैत्र", "चैत्र / वैशाख", "वैशाख / ज्येष्ठ", "ज्येष्ठ / आषाढ़", "आषाढ़ / श्रावण", "श्रावण / भाद्रपद", "भाद्रपद / आश्विन", "आश्विन / कार्तिक", "कार्तिक / मार्गशीर्ष", "मार्गशीर्ष / पौष"],
        indianSeasons: ["वसंत", "ग्रीष्म", "वर्षा", "शरद", "हेमंत", "शिशिर"],
        seasonDescriptions: [],
        paksha: ["शुक्ल पक्ष", "कृष्ण पक्ष"],
        tithis: ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"]
    },
    or: {
        days: ["ରବି", "ସୋମ", "ମଙ୍ଗଳ", "ବୁଧ", "ଗୁରୁ", "ଶୁକ୍ର", "ଶନି"],
        nums: ["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯"],
        filters: ["ପର୍ବପର୍ବାଣି", "ଶୁଭ ଦିନ", "ଛୁଟି ଦିନ", "ଅନ୍ୟାନ୍ୟ ପର୍ବ"], solarMonths: ["ବୈଶାଖ", "ଜ୍ୟୈଷ୍ଠ", "ଆଷାଢ଼", "ଶ୍ରାବଣ", "ଭାଦ୍ରବ", "ଆଶ୍ୱିନ", "କାର୍ତ୍ତିକ", "ମାର୍ଗଶୀର", "ପୌଷ", "ମାଘ", "ଫାଲଗୁନ", "ଚୈତ୍ର"],
        rashis: ["ମେଷ", "ବୃଷ", "ମିଥୁନ", "କର୍କଟ", "ସିଂହ", "କନ୍ୟା", "ତୁଳା", "ବିଛା", "ଧନୁ", "ମକର", "କୁମ୍ଭ", "ମୀନ"],
indianMonths: ["ପୌଷ / ମାଘ", "ମାଘ / ଫାଲଗୁନ", "ଫାଲଗୁନ / ଚୈତ୍ର", "ଚୈତ୍ର / ବୈଶାଖ", "ବୈଶାଖ / ଜ୍ୟୈଷ୍ଠ", "ଜ୍ୟୈଷ୍ଠ / ଆଷାଢ଼", "ଆଷାଢ଼ / ଶ୍ରାବଣ", "ଶ୍ରାବଣ / ଭାଦ୍ରବ", "ଭାଦ୍ରବ / ଆଶ୍ୱିନ", "ଆଶ୍ୱିନ / କାର୍ତ୍ତିକ", "କାର୍ତ୍ତିକ / ମାର୍ଗଶୀର", "ମାର୍ଗଶୀର / ପୌଷ"],
        indianSeasons: ["ବସନ୍ତ", "ଗ୍ରୀଷ୍ମ", "ବର୍ଷା", "ଶରତ", "ହେମନ୍ତ", "ଶିଶିର"],
        seasonDescriptions: [],
        paksha: ["ଶୁକ୍ଳ ପକ୍ଷ", "କୃଷ୍ଣ ପକ୍ଷ"],
        tithis: ["ପ୍ରତିପଦା", "ଦ୍ଵିତୀୟା", "ତୃତୀୟା", "ଚତୁର୍ଥୀ", "ପଞ୍ଚମୀ", "ଷଷ୍ଠୀ", "ସପ୍ତମୀ", "ଅଷ୍ଟମୀ", "ନବମୀ", "ଦଶମୀ", "ଏକାଦଶୀ", "ଦ୍ଵାଦଶୀ", "ତ୍ରୟୋଦଶୀ", "ଚତୁର୍ଦଶୀ", "ପୂର୍ଣ୍ଣିମା", "ପ୍ରତିପଦା", "ଦ୍ଵିତୀୟା", "ତୃତୀୟା", "ଚତୁର୍ଥୀ", "ପଞ୍ଚମୀ", "ଷଷ୍ଠୀ", "ସପ୍ତମୀ", "ଅଷ୍ଟମୀ", "ନବମୀ", "ଦଶମୀ", "ଏକାଦଶୀ", "ଦ୍ଵାଦଶୀ", "ତ୍ରୟୋଦଶୀ", "ଚତୁର୍ଦଶୀ", "ଅମାବାସ୍ୟା"]
    },
    bn: {
        days: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"],
        nums: ["০","১","২","৩","৪","৫","৬","৭","৮","৯"],
        filters: ["উৎসব", "শুভ দিন", "ছুটি", "অন্যান্য উৎসব"], solarMonths: ["বৈশাখ", "জ্যৈষ্ঠ", "আষাঢ়", "শ্রাবণ", "ভাদ্র", "আশ্বিন", "কার্তিক", "অগ্রহায়ণ", "পৌষ", "মাঘ", "ফাল্গুন", "চৈত্র"],
        rashis: ["মেষ", "বৃষ", "মিথুন", "কর্কট", "সিংহ", "কন্যা", "তুলা", "বৃশ্চিক", "ধনু", "মকর", "কুম্ভ", "মীন"],
indianMonths: ["পৌষ / মাঘ", "মাঘ / ফাল্গুন", "ফাল্গুন / চৈত্র", "চৈত্র / বৈশাখ", "বৈশাখ / জ্যৈষ্ঠ", "জ্যৈষ্ঠ / আষাঢ়", "আষাঢ় / শ্রাবণ", "শ্রাবণ / ভাদ্র", "ভাদ্র / আশ্বিন", "আশ্বিন / কার্তিক", "কার্তিক / অগ্রহায়ণ", "অগ্রহায়ণ / পৌষ"],
        indianSeasons: ["বসন্ত", "গ্রীষ্ম", "বর্ষা", "শরৎ", "হেমন্ত", "শিশির"],
        seasonDescriptions: [],
        paksha: ["শুক্ল পক্ষ", "कृष्ण পক্ষ"],
        tithis: ["প্রতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুর্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নবমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্রয়োদশী", "চতুর্দশী", "পূর্ণিমা", "প্রতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুর্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নবমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্রয়োদশী", "চতুর্দশী", "অমাবস্যা"]
    },
    mr: {
        days: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],
        nums: ["०","१","२","३","४","५","६","७","८","९"],
        filters: ["सण", "शुभ दिवस", "सुट्ट्या", "इतर सण"], solarMonths: ["वैशाख", "ज्येष्ठ", "आषाढ", "श्रावण", "भाद्रपद", "आश्विन", "कार्तिक", "मार्गशीर्ष", "पौष", "माघ", "फाल्गुन", "चैत्र"],
        rashis: ["मेष", "वृषभ", "मिथुन", "कर्क", "सिंह", "कन्या", "तूळ", "वृश्चिक", "धनु", "मकर", "कुंभ", "मीन"],
indianMonths: ["पौष / माघ", "माघ / फाल्गुन", "फाल्गुन / चैत्र", "चैत्र / वैशाख", "वैशाख / ज्येष्ठ", "ज्येष्ठ / आषाढ", "आषाढ / श्रावण", "श्रावण / भाद्रपद", "भाद्रपद / आश्विन", "आश्विन / कार्तिक", "कार्तिक / मार्गशीर्ष", "मार्गशीर्ष / पौष"],
        indianSeasons: ["वसंत", "ग्रीष्म", "वर्षा", "शरद", "हेमंत", "शिशिर"],
        seasonDescriptions: [],
        paksha: ["शुक्ल पक्ष", "कृष्ण पक्ष"],
        tithis: ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पौर्णिमा", "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"]
    },
    gu: {
        days: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],
        nums: ["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"],
        filters: ["તહેવારો", "શુભ દિવસ", "રજાઓ", "અન્ય તહેવારો"], solarMonths: ["વૈશાખ", "જેઠ", "અષાઢ", "શ્રાવણ", "ભાદરવો", "આસો", "કારતક", "માગશર", "પોષ", "મહા", "ફાગણ", "ચૈત્ર"],
        rashis: ["મેષ", "વૃષભ", "મિથુન", "કર્ક", "સિંહ", "કન્યા", "તુલા", "વૃશ્ચિક", "ધન", "મકર", "કુંભ", "મીન"],
indianMonths: ["પોષ / મહા", "મહા / ફાગણ", "ફાગણ / ચૈત્ર", "ચૈત્ર / વૈશાખ", "વૈશાખ / જેઠ", "જેઠ / અષાઢ", "અષાઢ / શ્રાવણ", "શ્રાવણ / ભાદરવો", "ભાદરવો / આસો", "આસો / કારતક", "કારતક / માગશર", "માગશર / પોષ"],
        indianSeasons: ["વસંત", "ગ્રીષ્મ", "વર્ષા", "શરદ", "હેમંત", "શિશિર"],
        seasonDescriptions: [],
        paksha: ["શુક્લ પક્ષ", "કૃષ્ણ પક્ષ"],
        tithis: ["પડવો", "બીજ", "ત્રીજ", "ચોથ", "પાંચમ", "છઠ", "સાતમ", "આઠમ", "નોમ", "દશમ", "અગિયારસ", "બારસ", "તેરસ", "ચૌદશ", "પૂનમ", "પડવો", "બીજ", "ત્રીજ", "ચોથ", "પાંચમ", "છઠ", "સાતમ", "આઠમ", "નોમ", "દશમ", "અગિયારસ", "બારસ", "તેરસ", "ચૌદશ", "અમાસ"]
    },
    pa: {
        days: ["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨੀ"],
        nums: ["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯"],
        filters: ["ਤਿਉਹਾਰ", "ਸ਼ੁਭ ਦਿਨ", "ਛੁੱਟੀਆਂ", "ਹੋਰ ਤਿਉਹਾਰ"], solarMonths: ["ਵੈਸਾਖ", "ਜੇਠ", "ਹਾੜ", "ਸਾਵਣ", "ਭਾਦੋਂ", "ਅੱਸੂ", "ਕੱਤਕ", "ਮੱਘਰ", "ਪੋਹ", "ਮਾਘ", "ਫੱਗਣ", "ਚੇਤ"],
        rashis: ["ਮੇਖ", "ਵ੍ਰਿਸ਼ਭ", "ਮਿਥੁਨ", "ਕਰਕ", "ਸਿੰਘ", "ਕੰਨਿਆ", "ਤੁਲਾ", "ਵ੍ਰਿਸ਼ਚਿਕ", "ਧਨੂ", "ਮਕਰ", "ਕੁੰਭ", "ਮੀਨ"],
indianMonths: ["ਪੋਹ / ਮਾਘ", "ਮਾਘ / ਫੱਗਣ", "ਫੱਗਣ / ਚੇਤ", "ਚੇਤ / ਵੈਸਾਖ", "ਵੈਸਾਖ / ਜੇਠ", "ਜੇਠ / ਹਾੜ", "ਹਾੜ / ਸਾਵਣ", "ਸਾਵਣ / ਭਾਦੋਂ", "ਭਾਦੋਂ / ਅੱਸੂ", "ਅੱਸੂ / ਕੱਤਕ", "ਕੱਤਕ / ਮੱਘਰ", "ਮੱਘਰ / ਪੋਹ"],
        indianSeasons: ["ਬਸੰਤ", "ਗ੍ਰੀਸ਼ਮ", "ਵਰਖਾ", "ਸ਼ਰਦ", "ਹੇਮੰਤ", "ਸ਼ਿਸ਼ਿਰ"],
        seasonDescriptions: [],
        paksha: ["ਸ਼ੁਕਲ ਪੱਖ", "ਕ੍ਰਿਸ਼ਨ ਪੱਖ"],
        tithis: ["ਏਕਮ", "ਦੂਜ", "ਤੀਜ", "ਚੌਥ", "ਪੰਚਮੀ", "ਛਠ", "ਸੱਤਮੀ", "ਅਸ਼ਟਮੀ", "ਨੌਮੀ", "ਦਸਮੀ", "ਏਕਾਦਸ਼ੀ", "ਦੁਆਦਸ਼ੀ", "ਤ੍ਰਯੋਦਸ਼ੀ", "ਚਤੁਰਦਸ਼ੀ", "ਪੂਰਨਮਾਸ਼ੀ", "ਏਕਮ", "ਦੂਜ", "ਤੀਜ", "ਚੌਥ", "ਪੰਚਮੀ", "ਛਠ", "ਸੱਤਮੀ", "ਅਸ਼ਟਮੀ", "ਨੌਮੀ", "ਦਸਮੀ", "ਏਕਾਦਸ਼ੀ", "ਦੁਆਦਸ਼ੀ", "ਤ੍ਰਯੋਦਸ਼ੀ", "ਚਤੁਰਦਸ਼ੀ", "ਮੱਸਿਆ"]
    },
    ta: {
        days: ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"],
        nums: ["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯"],
        filters: ["பண்டிகைகள்", "சுப நாட்கள்", "விடுமுறை", "மற்ற பண்டிகைகள்"], solarMonths: ["சித்திரை", "வைகாசி", "ஆனி", "ஆடி", "ஆவணி", "புரட்டாசி", "ஐப்பசி", "கார்த்திகை", "மார்கழி", "தை", "மாசி", "பங்குனி"],
        rashis: ["மேஷம்", "ரிஷபம்", "மிதுனம்", "கடகம்", "சிம்மம்", "கன்னி", "துலாம்", "விருச்சிகம்", "தனுசு", "மகரம்", "கும்பம்", "மீனம்"],
indianMonths: ["மார்கழி / தை", "தை / மாசி", "மாசி / பங்குனி", "பங்குனி / சித்திரை", "சித்திரை / வைகாசி", "வைகாசி / ஆனி", "ஆனி / ஆடி", "ஆடி / ஆவணி", "ஆவணி / புரட்டாசி", "புரட்டாசி / ஐப்பசி", "ஐப்பசி / கார்த்திகை", "கார்த்திகை / மார்கழி"],
        indianSeasons: ["இளவேனில்", "முதுவேனில்", "கார்", "குளிர்", "முன்பனி", "பின்பனி"],
        seasonDescriptions: [],
        paksha: ["வளர்பிறை", "தேய்பிறை"],
        tithis: ["பிரதமை", "துவிதியை", "திருதியை", "சதுர்த்தி", "பஞ்சமி", "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி", "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "பௌர்ணமி", "பிரதமை", "துவிதியை", "திருதியை", "சதுர்த்தி", "பஞ்சமி", "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி", "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "அமாவாசை"]
    },
    te: {
        days: ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"],
        nums: ["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],
        filters: ["పండుగలు", "శుభ దినాలు", "సెలవులు", "ఇతర పండుగలు"], solarMonths: ["వైశాఖం", "జ్యేష్ఠం", "ఆషాఢం", "శ్రావణం", "భాద్రపదం", "ఆశ్వయుజం", "కార్తీకం", "మార్గశిరం", "పుష్యం", "మాఘం", "ఫాల్గుణం", "చైత్రం"],
        rashis: ["మేషం", "వృషభం", "మిథునం", "కర్కాటకం", "సింహం", "కన్య", "తుల", "వృశ్చికం", "ధనుస్సు", "మకరం", "కుంభం", "మీనం"],
indianMonths: ["పుష్యం / మాఘం", "మాఘం / ఫాల్గుణం", "ఫాల్గుణం / చైత్రం", "చైత్రం / వైశాఖం", "వైశాఖం / జ్యేష్ఠం", "జ్యేష్ఠం / ఆషాఢం", "ఆషాఢం / శ్రావణం", "శ్రావణం / భాద్రపదం", "భాద్రపదం / ఆశ్వయుజం", "ఆశ్వయుజం / కార్తీకం", "కార్తీకం / మార్గశిరం", "మార్గశిరం / పుష్యం"],
        indianSeasons: ["వసంత", "గ్రీష్మ", "వర్ష", "శరత్", "హేమంత", "శిశిర"],
        seasonDescriptions: [],
        paksha: ["శుక్ల పక్షం", "కృష్ణ పక్షం"],
        tithis: ["పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "పౌర్ణమి", "పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "అమావాస్య"]
    },
    kn: {
        days: ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"],
        nums: ["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"],
        filters: ["ಹಬ್ಬಗಳು", "ಶುಭ ದಿನಗಳು", "ರಜಾದಿನಗಳು", "ಇತರ ಹಬ್ಬಗಳು"], solarMonths: ["ವೈಶಾಖ", "ಜ್ಯೇಷ್ಠ", "ಆಷಾಢ", "ಶ್ರಾವಣ", "ಭಾದ್ರಪದ", "ಆಶ್ವಯುಜ", "ಕಾರ್ತಿಕ", "ಮಾರ್ಗಶಿರ", "ಪುಷ್ಯ", "ಮಾಘ", "ಫಾಲ್ಗುಣ", "ಚೈತ್ರ"],
        rashis: ["ಮೇಷ", "ವೃಷಭ", "ಮಿಥುನ", "ಕರ್ಕಟಕ", "ಸಿಂಹ", "ಕನ್ಯಾ", "ತುಲಾ", "ವೃಶ್ಚಿಕ", "ಧನುಸ್ಸು", "ಮಕರ", "ಕುಂಭ", "ಮೀನ"],
indianMonths: ["ಪುಷ್ಯ / ಮಾಘ", "ಮಾಘ / ಫಾಲ್ಗುಣ", "ಫಾಲ್ಗುಣ / ಚೈತ್ರ", "ಚೈತ್ರ / ವೈಶಾಖ", "ವೈಶಾಖ / ಜ್ಯೇಷ್ಠ", "ಜ್ಯೇಷ್ಠ / ಆಷಾಢ", "ಆಷಾಢ / ಶ್ರಾವಣ", "ಶ್ರಾವಣ / ಭಾದ್ರಪದ", "ಭಾದ್ರಪದ / ಆಶ್ವಯುಜ", "ಆಶ್ವಯುಜ / ಕಾರ್ತಿಕ", "ಕಾರ್ತಿಕ / ಮಾರ್ಗಶಿರ", "ಮಾರ್ಗಶಿರ / ಪುಷ್ಯ"],
        indianSeasons: ["ವಸಂತ", "ಗ್ರೀಷ್ಮ", "ವರ್ಷ", "ಶರತ್", "ಹೇಮಂತ", "ಶಿಶಿರ"],
        seasonDescriptions: [],
        paksha: ["ಶುಕ್ಲ ಪಕ್ಷ", "ಕೃಷ್ಣ ಪಕ್ಷ"],
        tithis: ["ಪಾಡ್ಯಮಿ", "ಬಿದಿಗೆ", "ತದಿಗೆ", "ಚೌತಿ", "ಪಂಚಮಿ", "ಷಷ್ಠಿ", "ಸಪ್ತಮಿ", "ಅಷ್ಟಮಿ", "ನವಮಿ", "ದಶಮಿ", "ಏಕಾದಶಿ", "ದ್ವಾದಶಿ", "ತ್ರಯೋದಶಿ", "ಚತುರ್ದಶಿ", "ಹುಣ್ಣಿಮೆ", "ಪಾಡ್ಯಮಿ", "ಬಿದಿಗೆ", "ತದಿಗೆ", "ಚೌತಿ", "ಪಂಚಮಿ", "ಷಷ್ಠಿ", "ಸಪ್ತಮಿ", "ಅಷ್ಟಮಿ", "ನವಮಿ", "ದಶಮಿ", "ಏಕಾದಶಿ", "ದ್ವಾದಶಿ", "ತ್ರಯೋದಶಿ", "ಚತುರ್ದಶಿ", "ಅಮಾವಾಸ್ಯೆ"]
    },
    ml: {
        days: ["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"],
        nums: ["൦","൧","൨","൩","൪","൫","൬","൭","൮","൯"],
        filters: ["ഉത്സവങ്ങൾ", "ശുഭദിനങ്ങൾ", "അവധി", "മറ്റ് ഉത്സവങ്ങൾ"], solarMonths: ["മേടം", "ഇടവം", "മിഥുനം", "കർക്കടകം", "ചിങ്ങം", "കന്നി", "തുലാം", "വൃശ്ചികം", "ധനു", "മകരം", "കുംഭം", "മീനം"],
        rashis: ["മേടം", "ഇടവം", "മിഥുനം", "കർക്കടകം", "ചിങ്ങം", "കന്നി", "തുലാം", "വൃശ്ചികം", "ധനു", "മകരം", "കുംഭം", "മീനം"],
indianMonths: ["ധനു / മകരം", "മകരം / കുംഭം", "കുംഭം / മീനം", "മീനം / മേടം", "മേടം / ഇടവം", "ഇടവം / മിഥുനം", "മിഥുനം / കർക്കടകം", "കർക്കടകം / ചിങ്ങം", "ചിങ്ങം / കന്നി", "കന്നി / തുലാം", "തുലാം / വൃശ്ചികം", "വൃശ്ചികം / ധനു"],
        indianSeasons: ["വസന്തം", "ഗ്രീഷ്മം", "വർഷം", "ശരത്", "ഹേമന്തം", "ശിശിരം"],
        seasonDescriptions: [],
        paksha: ["ശുക്ല പക്ഷം", "കൃഷ്ണ പക്ഷം"],
        tithis: ["പ്രഥമ", "ദ്വിതീയ", "തൃതീയ", "ചതുർത്ഥി", "പഞ്ചമി", "ഷഷ്ഠി", "സപ്തമി", "അഷ്ടമി", "നവമി", "ദശമി", "ഏകാദശി", "ദ്വാദശി", "ത്രയോദശി", "ചതുർദ്ദശി", "പൗർണ്ണമി", "പ്രഥമ", "ദ്വിതീയ", "തൃതീയ", "ചതുർത്ഥി", "പഞ്ചമി", "ഷഷ്ഠി", "സപ്തമി", "അഷ്ടമി", "നവമി", "ദശമി", "ഏകാദശി", "ദ്വാദശി", "ത്രയോദശി", "ചതുർദ്ദശി", "അമാവാസി"]
    },
    as: {
        days: ["ৰবি", "সোম", "মঙল", "বুধ", "বৃহ", "শুক্ৰ", "শনি"],
        nums: ["০","১","২","৩","৪","৫","৬","৭","৮","৯"],
        filters: ["উৎসৱ", "শুভ দিন", "বন্ধ", "অন্যান্য উৎসৱ"], solarMonths: ["বহাগ", "জেঠ", "আহাৰ", "শাওন", "ভাদ", "আহিন", "কাতি", "আঘোণ", "পুহ", "মাঘ", "ফাগুন", "চ'ত"],
        rashis: ["মেষ", "বৃষ", "মিথুন", "কৰ্কট", "সিংহ", "কন্যা", "তুলা", "বৃশ্চিক", "ধনু", "মকৰ", "কুম্ভ", "মীন"],
indianMonths: ["পুহ / মাঘ", "মাঘ / ফাগুন", "ফাগুন / চ'ত", "চ'ত / বহাগ", "বহাগ / জেঠ", "জেঠ / আহাৰ", "আহাৰ / শাওন", "শাওন / ভাদ", "ভাদ / আহিন", "আহিন / কাতি", "কাতি / আঘোণ", "আঘোণ / পুহ"],
        indianSeasons: ["বসন্ত", "গ্ৰীষ্ম", "বৰ্ষা", "শৰৎ", "হেমন্ত", "শীত"],
        seasonDescriptions: [],
        paksha: ["শুক্ল পক্ষ", "কৃষ্ণ পক্ষ"],
        tithis: ["প্ৰতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুৰ্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নৱমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্ৰয়োদশী", "চতুৰ্দশী", "পূৰ্ণিমা", "প্ৰতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুৰ্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নৱমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্ৰয়োদশী", "চতুৰ্দশী", "অমাৱস্যা"]
    }
};


        function syncTickerWithPanchang() {
            const tickerEl = document.getElementById('panchang-ticker');
            if (!tickerEl) return;

            const dateToUse = appState.selectedDate || appState.currentDate || new Date();
            const astro = calculateTithi(dateToUse);

            let sunTimesStr = { sunrise: "--:--", sunset: "--:--" };
            let moonTimesStr = { moonrise: "--:--", moonset: "--:--" };
            if (typeof SunCalc !== 'undefined') {
                let lat = 19.8135; // Default Puri
                let lng = 85.8312;
                if (appState.config && appState.config.location && appState.config.location.lat) {
                    lat = appState.config.location.lat;
                    lng = appState.config.location.lng;
                }
                const fmt = (d) => (d && !isNaN(d.getTime())) ? d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--';

                const times = SunCalc.getTimes(dateToUse, lat, lng);
                if (times.sunrise && times.sunset) {
                    sunTimesStr = {
                        sunrise: fmt(times.sunrise),
                        sunset: fmt(times.sunset)
                    };
                }

                if (SunCalc.getMoonTimes) {
                    const moonTimes = SunCalc.getMoonTimes(dateToUse, lat, lng);
                    if (moonTimes.rise || moonTimes.set) {
                        moonTimesStr = {
                            moonrise: fmt(moonTimes.rise),
                            moonset: fmt(moonTimes.set)
                        };
                    }
                }
            }

            // Also check for Odia translation for labels
            const currentLang = appState.config.language || 'en';
            const isOdia = currentLang === 'or';


            // Determine if Paksha is part of the tithi string. calculateTithi returns paksha separately, but let's just construct the final string.
            const tithiVal = astro.paksha ? `${astro.paksha} ${astro.tithi}` : astro.tithi;

            const setHtml = `
            <div class="flex items-center gap-8 px-4 whitespace-nowrap flex-nowrap">
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-moon text-gold text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="tithi">Tithi:</span>
                    <span class="text-gold font-bold text-sm tracking-wider uppercase whitespace-nowrap flex items-center justify-center">${tithiVal}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-star text-gold text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="nakshatra">Nakshatra:</span>
                    <span class="text-gold font-bold text-sm tracking-wider uppercase whitespace-nowrap flex items-center justify-center">${astro.nakshatra}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-om text-gold text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="yoga">Yoga:</span>
                    <span class="text-gold font-bold text-sm tracking-wider uppercase whitespace-nowrap flex items-center justify-center">${astro.yoga}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-circle-notch text-gold text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="karana">Karana:</span>
                    <span class="text-gold font-bold text-sm tracking-wider uppercase whitespace-nowrap flex items-center justify-center">${astro.karana}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-sun text-saffron text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="sunrise">Sunrise:</span>
                    <span class="text-white font-bold text-sm tracking-wider whitespace-nowrap flex items-center justify-center">${sunTimesStr.sunrise}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-cloud-sun text-saffron text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="sunset">Sunset:</span>
                    <span class="text-white font-bold text-sm tracking-wider whitespace-nowrap flex items-center justify-center">${sunTimesStr.sunset}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-moon text-gold text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="moonrise">Moonrise:</span>
                    <span class="text-white font-bold text-sm tracking-wider whitespace-nowrap flex items-center justify-center">${moonTimesStr.moonrise}</span>
                </div>
                <div class="flex items-center gap-2 whitespace-nowrap flex-nowrap">
                    <i class="fa-solid fa-cloud-moon text-gold text-sm shrink-0 flex items-center justify-center"></i>
                    <span class="text-white font-medium text-sm tracking-wider whitespace-nowrap flex items-center justify-center" data-i18n="moonset">Moonset:</span>
                    <span class="text-white font-bold text-sm tracking-wider whitespace-nowrap flex items-center justify-center">${moonTimesStr.moonset}</span>
                </div>
            </div>`;

            // Repeat 4 times for seamless scroll
            tickerEl.innerHTML = setHtml.repeat(4);
        }

        function calculateTithi(dateObj) {
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();

            const fullDateKey = `${day}-${month}-${year}`; // e.g., 14-01-2026
            const recDateKey = `${day}-${month}`;        // e.g., 14-01

            // 1. Check for Manual Overrides first
            let manualIndex = null;
            if (appState.manualTithis && appState.manualTithis[fullDateKey] !== undefined) {
                manualIndex = appState.manualTithis[fullDateKey];
            } else if (appState.manualTithis && appState.manualTithis[recDateKey] !== undefined) {
                manualIndex = appState.manualTithis[recDateKey];
            }

            let astro;
            if (manualIndex !== null) {
                // Hybrid: Use manual Tithi but keep math-based Nakshatra/Yoga
                const mathData = VedicAstro.calculate(dateObj);
                astro = { ...mathData, tithiIndex: manualIndex };
            } else {
                // Default: Pure mathematical calculation
                astro = VedicAstro.getTithiAtSunrise(dateObj);
            }

            // 2. Localization & Rendering
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const safeIndex = astro.tithiIndex;

            return {
                tithi: langObj.tithis ? langObj.tithis[safeIndex] : `Tithi ${safeIndex + 1}`,
                paksha: langObj.paksha ? (safeIndex < 15 ? langObj.paksha[0] : langObj.paksha[1]) : (safeIndex < 15 ? "Shukla" : "Krishna"),
                index: safeIndex,
                nakshatra: astro.nakshatra,
                yoga: astro.yoga,
                karana: astro.karana,
                jd: astro.jd,
                sunLon: astro.sunLon,
                moonLon: astro.moonLon
            };
        }

        function toNativeNum(num, langCode) {
            if (langCode === 'en' || !langData[langCode]) return num;
            return num.toString().split('').map(d => langData[langCode].nums[parseInt(d)]).join('');
        }

        // --- SCROLL HELPERS ---
        function lockScroll() {
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';

            // Special handling for Downloaded App Mode (where body has overflow-y-auto)
            if (document.body.classList.contains('overflow-y-auto')) {
                document.body.classList.remove('overflow-y-auto');
                document.body.dataset.restoreOverflowY = 'true';
            }
        }

        function unlockScroll() {
            // Restore background scrolling
            document.body.style.overflow = '';

            if (document.body.dataset.restoreOverflowY === 'true') {
                document.body.classList.add('overflow-y-auto');
                // Remove data attribute to clean up
                delete document.body.dataset.restoreOverflowY;
            }
        }

        // Update sidebar content visibility based on environment
        function initSettingsContentVisibility() {
            const isEditor = !!document.getElementById('editor');
            const syncSettingsContainer = document.getElementById('container-sync-settings');
            const langLinksContainer = document.getElementById('container-lang-links');

            if (!isEditor) {
                 // App Mode: Hide everything
                 if(syncSettingsContainer) syncSettingsContainer.style.display = 'none';
                 if(langLinksContainer) langLinksContainer.style.display = 'none';
            } else {
                 // Editor Mode: Show everything (and handle Docs Sync logic)
                 if(syncSettingsContainer) syncSettingsContainer.style.display = 'block';
                 if(langLinksContainer) langLinksContainer.style.display = 'block';

                 const docsContainer = document.getElementById('container-sync-docs');
                 if (docsContainer) {
                     docsContainer.style.display = 'flex'; // Docs sync is editor-only feature
                 }
            }
        }

        function openSettingsSidebar() {
            lockScroll();

            document.getElementById('language-select').value = appState.config.language || 'en';

            initSettingsContentVisibility();

            // Update toggle state
            const toggle = document.getElementById('banner-toggle');
            if(toggle) toggle.checked = !isBannerDismissed;

            // Sync Link Init
            if (typeof updateSyncLinkInput === 'function') updateSyncLinkInput();

            const secs = appState.config.sections || { festivals: true, panchang: true };
            if(document.getElementById('toggle-festivals')) document.getElementById('toggle-festivals').checked = secs.festivals;
            if(document.getElementById('toggle-panchang')) document.getElementById('toggle-panchang').checked = secs.panchang;

            // Update Sync Toggles
            const liveUrl = appState.config.liveUrl || "";
            const isDocs = liveUrl.includes('docs.google.com') || (appState.config.syncDocsUrl && liveUrl === appState.config.syncDocsUrl);
            const isGitHub = liveUrl.includes('github') || liveUrl.includes('jsdelivr.net') || (appState.config.syncGitHubUrl && liveUrl === appState.config.syncGitHubUrl);

            const docsToggle = document.getElementById('toggle-sync-docs');
            const githubToggle = document.getElementById('toggle-sync-github');

            if(docsToggle) docsToggle.checked = isDocs;
            if(githubToggle) githubToggle.checked = isGitHub;

            const sidebar = document.getElementById('settings-sidebar');
            const content = document.getElementById('settings-sidebar-content');

            sidebar.style.display = 'flex';
            // Force reflow
            sidebar.offsetHeight;
            content.classList.remove('translate-x-full');
        }

        function closeSettingsSidebar() {
            const sidebar = document.getElementById('settings-sidebar');
            const content = document.getElementById('settings-sidebar-content');

            content.classList.add('translate-x-full');

            unlockScroll();

            // Wait for transition to complete before hiding container
            setTimeout(() => {
                sidebar.style.display = 'none';
            }, 300);
        }




        // Secure mapping of short codes to full URL names
        const langCodeToFullMap = {
            'en': 'english', 'hi': 'hindi', 'or': 'odia', 'bn': 'bengali',
            'mr': 'marathi', 'gu': 'gujarati', 'pa': 'punjabi', 'ta': 'tamil',
            'te': 'telugu', 'kn': 'kannada', 'ml': 'malayalam', 'as': 'assamese'
        };

        // Secure mapping of full URL names to short codes
        const fullToLangCodeMap = Object.fromEntries(
            Object.entries(langCodeToFullMap).map(([short, full]) => [full, short])
        );

        function changeLanguage(langCode) {
            appState.config.language = langCode;

            // --- NEW: Update the URL seamlessly ---
            try {
                const fullLangName = langCodeToFullMap[langCode] || 'english';
                const newUrl = new URL(window.location.href);
                newUrl.searchParams.set('lang', fullLangName);
                // Use relative path to avoid strict cross-origin/iframe limitations on Blogger
                const relativeUrl = newUrl.pathname + newUrl.search + newUrl.hash;
                window.history.replaceState(null, '', relativeUrl);
            } catch(e) {
                console.error("URL update failed", e);
            }
            // --------------------------------------

            // 1. Clear Data State
            appState.monthsData = [];
            appState.customMonths = {};
            appState.customLabels = {};
            appState.recurringEvents = [];
            appState.details = {};
            appState.recurringDetails = {};
            appState.manualTithis = {};
            appState.customSeasonDescriptions = {};
            appState.images = {};

            // 2. Clear Storage & Cache
            localStorage.removeItem('panchang_autosave_text');
            localStorage.removeItem('panchang_cached_state');
            localStorage.removeItem('panchang_last_sync_ts');

            // 3. Clear Editor
            const editor = document.getElementById('editor');
            if (editor) editor.value = '';

            // 4. Check for Sync Link
            let link = null;
            if (appState.config.syncLinks && appState.config.syncLinks[langCode]) {
                link = appState.config.syncLinks[langCode];
                if (appState.config.linksEncrypted) {
                    try {
                        link = LinkSecurity.decrypt(link);
                    } catch (e) {
                        console.error("Decryption failed", e);
                        link = null;
                    }
                }
            }

            // 5. Update Config & Trigger Sync
            if (link) {
                appState.config.liveUrl = link;
                appState.config.syncGitHubUrl = link;
                saveConfigToStorage(); // Persist new language & url

                showToast(`Fetching ${langCode.toUpperCase()} dataset...`);
                fetchGitHubData(link, true);
            } else {
                delete appState.config.liveUrl;
                delete appState.config.syncGitHubUrl;
                saveConfigToStorage(); // Persist removal

                showToast(`${langCode.toUpperCase()} selected. No data available.`);
                render(); // Render blank state
            }
        }

        // --- EDITOR LOGIC START ---
        function updateSyncLinkInput() {
            const langEl = document.getElementById('sync-lang-select');
            if (!langEl) return; // Exit if elements don't exist (e.g., in downloaded app)

            const lang = langEl.value;
            const input = document.getElementById('sync-link-input');
            if (appState.config.syncLinks && appState.config.syncLinks[lang]) {
                let link = appState.config.syncLinks[lang];
                if (appState.config.linksEncrypted) {
                    try { link = LinkSecurity.decrypt(link); } catch (e) { }
                }
                input.value = link;
            } else {
                input.value = '';
            }
        }
        // --- EDITOR LOGIC END ---

        // --- EDITOR LOGIC START ---
        function saveSyncLink() {
            const langEl = document.getElementById('sync-lang-select');
            if (!langEl) return;

            const lang = langEl.value;
            const url = document.getElementById('sync-link-input').value.trim();

            if (!appState.config.syncLinks) appState.config.syncLinks = { ...DEFAULT_SYNC_LINKS };

            if (url) {
                appState.config.syncLinks[lang] = url;
                showToast(`Link saved for ${lang.toUpperCase()}`);
            } else {
                if (appState.config.syncLinks[lang]) {
                    delete appState.config.syncLinks[lang];
                    showToast(`Link removed for ${lang.toUpperCase()}`);
                }
            }

            // Auto-Fetch if affecting Active Language
            if (lang === appState.config.language) {
                if (url) {
                    appState.config.liveUrl = url;
                    appState.config.syncGitHubUrl = url;
                    showToast(`Fetching ${lang.toUpperCase()} dataset...`);
                    fetchGitHubData(url, true);
                } else {
                    delete appState.config.liveUrl;
                    delete appState.config.syncGitHubUrl;
                    showToast("Active link removed.");
                }
            }

            saveConfigToStorage();
        }
        // --- EDITOR LOGIC END ---

        function toggleBannerVisibility(checkbox) {
            isBannerDismissed = !checkbox.checked;
            if (isBannerDismissed) {
                stopBannerAutoPlay();
            }
            render();
        }

        // --- EDITOR LOGIC START ---
        function toggleLiveSyncDocs(checked) {
            const toggleGitHub = document.getElementById('toggle-sync-github');
            if (checked) {
                if (toggleGitHub) toggleGitHub.checked = false;

                if (appState.config.syncDocsUrl) {
                    appState.config.liveUrl = appState.config.syncDocsUrl;
                    saveConfigToStorage();
                    fetchLiveDoc(appState.config.liveUrl);
                } else {
                    configureLiveSync(); // Will save to syncDocsUrl and liveUrl
                }
            } else {
                // If turning off Docs, and it was the active one, clear liveUrl
                const currentUrl = appState.config.liveUrl || "";
                if (currentUrl === appState.config.syncDocsUrl || currentUrl.includes('docs.google.com')) {
                    delete appState.config.liveUrl;
                    saveConfigToStorage();
                    showToast("Live Sync disabled.");
                }
            }
        }

        function toggleLiveSyncGitHub(checked) {
            const toggleDocs = document.getElementById('toggle-sync-docs');
            if (checked) {
                if (toggleDocs) toggleDocs.checked = false;

                if (appState.config.syncGitHubUrl) {
                    appState.config.liveUrl = appState.config.syncGitHubUrl;
                    saveConfigToStorage();
                    fetchGitHubData(appState.config.liveUrl);
                } else {
                    configureGitHubSync(); // Will save to syncGitHubUrl and liveUrl
                }
            } else {
                // If turning off GitHub, and it was the active one, clear liveUrl
                const currentUrl = appState.config.liveUrl || "";
                if (currentUrl === appState.config.syncGitHubUrl || currentUrl.includes('github') || currentUrl.includes('jsdelivr.net')) {
                    delete appState.config.liveUrl;
                    saveConfigToStorage();
                    showToast("Live Sync disabled.");
                }
            }
        }
        // --- EDITOR LOGIC END ---

        let tempLinkState = { selectedType: 'logo' };
        let currentIsolationFilter = null; // null = Show All
        let currentTagFilter = null; // null = Show All Tags

        const TAG_STYLES = [
            "background: rgba(43, 62, 115, 0.15); color: #4F70B8; border: 1px solid rgba(79, 112, 184, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);", // Blue
            "background: rgba(30, 80, 56, 0.15); color: #3CB371; border: 1px solid rgba(60, 179, 113, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);", // Green
            "background: rgba(105, 50, 15, 0.15); color: #D2691E; border: 1px solid rgba(210, 105, 30, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);", // Brown/Orange
            "background: rgba(60, 40, 80, 0.15); color: #9370DB; border: 1px solid rgba(147, 112, 219, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);", // Purple
            "background: rgba(120, 30, 15, 0.15); color: #FF6347; border: 1px solid rgba(255, 99, 71, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);", // Deep Orange/Red
            "background: rgba(75, 30, 80, 0.15); color: #BA55D3; border: 1px solid rgba(186, 85, 211, 0.3); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);"  // Deep Purple
        ];

        function getTagStyle(tagName) {
            if (!tagName) return TAG_STYLES[0];
            const normalized = tagName.trim().toLowerCase();
            let hash = 0;
            for (let i = 0; i < normalized.length; i++) {
                hash = normalized.charCodeAt(i) + ((hash << 5) - hash);
            }
            return TAG_STYLES[Math.abs(hash) % TAG_STYLES.length];
        }

        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const shortMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // --- EDITOR LOGIC START ---
        function toggleSyntaxGuide() {
            const guide = document.getElementById('syntax-guide');
            guide.classList.toggle('open');
        }

        function openClearModal() {
            lockScroll();
            const modal = document.getElementById('clear-confirmation-modal');
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.remove('modal-hidden'), 10);
        }
        function closeClearModal() {
            const modal = document.getElementById('clear-confirmation-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            setTimeout(() => modal.style.display = 'none', 300);
        }
        function performClear() {
            const ed = document.getElementById('editor');
            if(ed) {
                ed.value = "";
                appState.activeMonthIndex = 0;
                parseInput("");
                closeClearModal();
            }
        }

        function insertImageToEditor(url, type, extraParam) {
            let newText = editor.value;
            if (type === 'logo') {
                const configBlockRegex = /::: config([\s\S]*?):::/;
                const logoLine = `@ Logo : ![App Logo](${url})`;
                if (configBlockRegex.test(newText)) {
                    newText = newText.replace(configBlockRegex, (match, content) => {
                        if (content.match(/@\s*Logo\s*:/)) { return match.replace(/@\s*Logo\s*:.*(\r?\n|$)/, `${logoLine}\n`); }
                        else { return `::: config\n${logoLine}${content}:::`; }
                    });
                } else { newText = `::: config\n${logoLine}\n:::\n\n` + newText; }
                appState.config.logoUrl = url;
            } else if (type === 'banner' || type === 'gridbg') {
                const date = extraParam;
                if (!date) { alert("Please select a date."); return; }
                const dateHeaderRegex = new RegExp(`(>>\\s+${date})`);
                const tagLine = type === 'banner' ? `![Banner](${url})` : `![GridBg](${url})`;
                if(newText.match(dateHeaderRegex)) { newText = newText.replace(dateHeaderRegex, `$1\n${tagLine}`); }
                else { newText += `\n\n::: details\n>> ${date}\n${tagLine}\n## tag : New Event\n:::`; }
            } else if (type === 'ritu') {
                const rituIndex = parseInt(extraParam, 10);
                const rituNames = ['Spring', 'Summer', 'Monsoon', 'Autumn', 'Pre-Winter', 'Winter'];
                const rituName = rituNames[rituIndex];
                if (!rituName) { alert("Invalid Ritu index."); return; }

                const seasonsBlockRegex = /::: seasons([\s\S]*?):::/;
                const rituImageLine = `@ ${rituName} image: ${url}`;

                if (seasonsBlockRegex.test(newText)) {
                    newText = newText.replace(seasonsBlockRegex, (match, content) => {
                        const rituImageUpdateRegex = new RegExp(`@\\s*(?:${rituName}|${rituName.toLowerCase()})\\s*image\\s*:[^\\n]*`);
                        if (rituImageUpdateRegex.test(content)) {
                            return match.replace(rituImageUpdateRegex, rituImageLine);
                        } else {
                            return match.replace('::: seasons', `::: seasons\n${rituImageLine}`);
                        }
                    });
                } else {
                    newText += `\n\n::: seasons\n${rituImageLine}\n:::`;
                }

                if (!appState.config.customRituImages) { appState.config.customRituImages = {}; }
                appState.config.customRituImages[rituIndex] = url;

                setTimeout(() => {
                    const rituImg = document.querySelector(`img[data-season-index="${rituIndex}"]`);
                    if (rituImg) rituImg.src = url;
                }, 100);
            }
            editor.value = newText;
            parseInput(newText);
            render();
        }

        function openLinkModal() {
            lockScroll();
            const modal = document.getElementById('link-modal');
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            if (appState.monthsData && appState.monthsData.length > 0) {
                const currentData = appState.monthsData[appState.activeMonthIndex];
                if (currentData) { year = currentData.year; month = currentData.month; }
            }
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const dropdown = document.getElementById('link-date-select');
            dropdown.innerHTML = '<option value="" disabled selected>Select Date</option>';
            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${String(d).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;
                const dateObj = new Date(year, month, d);
                const dayName = daysOfWeek[dateObj.getDay()];
                const option = document.createElement('option');
                option.value = dateStr;
                option.text = `${dateStr} (${dayName})`;
                dropdown.appendChild(option);
            }
            updateLinkType('logo');
            document.getElementById('link-url-input').value = '';
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.remove('modal-hidden'), 10);
        }

        function openCustomCardModal() {
            const datalist = document.getElementById('section-titles-datalist');
            if (datalist) {
                datalist.innerHTML = '';
                const uniqueTitles = new Set();
                ['customCards', 'scrollCards', 'bubbleCards'].forEach(key => {
                    if (appState[key]) {
                        appState[key].forEach(c => {
                            if (c.mainTitle && c.mainTitle.trim() !== '') uniqueTitles.add(c.mainTitle.trim());
                        });
                    }
                });
                // Add default titles if not present
                uniqueTitles.add('Discover Popular Tools');
                uniqueTitles.add('Spiritual Tools');
                uniqueTitles.add('Quick Links');

                uniqueTitles.forEach(title => {
                    const option = document.createElement('option');
                    option.value = title;
                    datalist.appendChild(option);
                });
            }

            const modal = document.getElementById('custom-card-modal');
            modal.style.display = 'flex';
            // Small timeout to allow display:flex to apply before removing hidden class for transition
            setTimeout(() => {
                modal.classList.remove('modal-hidden');
            }, 10);
        }

        function closeCustomCardModal() {
            const modal = document.getElementById('custom-card-modal');
            modal.classList.add('modal-hidden');
            setTimeout(() => { modal.style.display = 'none'; }, 300);
            document.getElementById('custom-card-form').reset();
        }

        function sanitizeInput(str) {
            if (!str) return '';
            return str.replace(/&/g, '&amp;')
                      .replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;')
                      .replace(/"/g, '&quot;')
                      .replace(/'/g, '&#039;');
        }

        function handleCustomCardSubmit(event) {
            event.preventDefault();

            const designRaw = document.getElementById('custom-card-design').value;
            const mainTitleRaw = document.getElementById('custom-card-main-title').value;
            const titleRaw = document.getElementById('custom-card-title').value;
            const descRaw = document.getElementById('custom-card-desc').value.replace(/\n/g, ' '); // remove newlines to not break syntax
            const imageRaw = document.getElementById('custom-card-image').value;
            const linkRaw = document.getElementById('custom-card-link').value;
            const colorRaw = document.getElementById('custom-card-color').value;

            const mainTitle = sanitizeInput(mainTitleRaw);
            const title = sanitizeInput(titleRaw);
            const desc = sanitizeInput(descRaw);
            const image = sanitizeInput(imageRaw);
            const link = sanitizeInput(linkRaw);
            const color = sanitizeInput(colorRaw) || '#0d9488';

            let syntaxHeader = '::: More tab';
            if (designRaw === 'scroll tab') {
                syntaxHeader = '::: Scroll tab';
            } else if (designRaw === 'bubble tab') {
                syntaxHeader = '::: Bubble tab';
            }

            // Format syntax string using sanitized variables
            let syntaxString = `\n${syntaxHeader}\n`;
            syntaxString += `Hyperlink: [${link}]\n`;
            if (mainTitle) syntaxString += `Main Title: [${mainTitle}]\n`;
            syntaxString += `Title: [${title}]\nDescription: [${desc}]\nImage Link: [${image}]\nCard Color: [${color}]\n:::\n`;

            // Append to editor
            const editor = document.getElementById('editor');
            if (editor) {
                editor.value = editor.value + syntaxString;
                // Trigger input event to re-parse and save to cache
                editor.dispatchEvent(new Event('input', { bubbles: true }));

                // Show a toast message to confirm addition
                showToast("Custom Card syntax added to editor!");
            }

            closeCustomCardModal();
        }

        function updateCustomCardPlaceholder() {
            const design = document.getElementById('custom-card-design').value;
            const input = document.getElementById('custom-card-main-title');
            if (design === 'more tab') input.placeholder = 'e.g. Discover Popular Tools';
            else if (design === 'scroll tab') input.placeholder = 'e.g. Spiritual Tools';
            else if (design === 'bubble tab') input.placeholder = 'e.g. Quick Links';
        }

        // --- EDITOR LOGIC END ---

        function renderCustomCard(cardData) {
            const bgColor = cardData.color || '#0d9488';
            return `
            <a href="${cardData.link}" target="_blank" class="block h-full group">
                <div style="background-color: ${bgColor};" class="rounded-xl p-3 flex flex-col justify-between overflow-hidden relative h-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                    <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15 pointer-events-none z-0 rounded-[inherit]"></div>
                    <div class="relative z-10 flex flex-col items-center text-center md:flex-row md:items-start md:text-left gap-3 w-full mb-3">
                        <div class="w-16 h-16 flex items-center justify-center p-2 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-300/50 dark:border-white/10 shadow-sm shrink-0 aspect-square">
                            <img src="${cardData.image}" alt="${cardData.title}" class="w-full h-full object-contain rounded-xl" onerror="this.src='https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?auto=format&fit=crop&w=800&q=80'" />
                        </div>
                        <div class="flex flex-col overflow-hidden w-full">
                            <h3 class="font-headline text-base md:text-lg font-extrabold text-white tracking-tight leading-tight truncate">${cardData.title}</h3>
                            <p class="text-black text-xs leading-snug line-clamp-2 mt-1">${cardData.desc}</p>
                        </div>
                    </div>
                    <div class="relative z-10 mt-auto w-full">
                        <button style="color: ${bgColor};" class="w-full bg-white font-bold text-xs py-1 rounded-lg text-center shadow-sm hover:bg-gray-50 transition-colors relative z-10">Open</button>
                    </div>
                </div>
            </a>
            `;
        }

        function renderScrollCard(cardData) {
            const bgColor = cardData.color || '#2e3459';
            return `
            <a href="${cardData.link}" target="_blank" class="snap-start shrink-0 flex items-center justify-between w-[260px] md:w-[280px] p-3 pr-4 rounded-[1.25rem] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 shadow-lg shadow-black/5 relative overflow-hidden" style="background-color: ${bgColor};">
                <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15 pointer-events-none z-0 rounded-[inherit]"></div>
                <div class="flex items-center gap-3 w-[85%] relative z-10">
                    <div class="w-12 h-12 min-w-[3rem] flex items-center justify-center p-2 rounded-2xl bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-300/50 dark:border-white/10 shadow-sm shrink-0 aspect-square">
                        ${cardData.image ? `<img src="${cardData.image}" class="w-full h-full object-contain rounded-xl" />` : `<i class="fa-solid fa-link text-xl drop-shadow-sm text-white"></i>`}
                    </div>
                    <div class="flex flex-col justify-center overflow-hidden w-full">
                        <span class="text-white font-bold text-[15px] leading-tight tracking-wide drop-shadow-sm truncate">${cardData.title}</span>
                        <span class="text-[11px] mt-0.5 truncate text-black">${cardData.desc}</span>
                    </div>
                </div>
                <i class="fa-solid fa-chevron-right text-xs text-white/50 relative z-10"></i>
            </a>
            `;
        }

        function renderBubbleCard(cardData) {
            const bgColor = cardData.color || '#0d9488';
            return `
            <a href="${cardData.link}" target="_blank" class="snap-start shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 rounded-xl p-3 relative overflow-hidden shadow-md" style="background-color: ${bgColor};">
                <div class="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-white/15 pointer-events-none z-0 rounded-[inherit]"></div>
                <div class="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center rounded-full bg-white/30 dark:bg-white/5 backdrop-blur-md border border-gray-300/50 dark:border-white/10 shadow-sm shrink-0 aspect-square mb-2 relative z-10">
                    ${cardData.image ? `<img src="${cardData.image}" class="w-full h-full object-contain rounded-full" />` : `<i class="fa-solid fa-link text-2xl text-white"></i>`}
                </div>
                <span class="text-center text-xs md:text-sm font-bold text-white relative z-10 tracking-tight max-w-[80px] md:max-w-[100px] leading-tight transition-colors">${cardData.title}</span>
            </a>
            `;
        }

        // --- EDITOR LOGIC START ---

        function closeLinkModal() {
            const modal = document.getElementById('link-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            setTimeout(() => modal.style.display = 'none', 300);
        }
                function updateLinkType(type) {
            tempLinkState.selectedType = type;
            document.querySelectorAll('#link-modal .radio-option').forEach(el => el.classList.remove('selected'));
            const selectedEl = document.querySelector(`#link-modal .radio-option[onclick="updateLinkType('${type}')"]`);
                                                if(selectedEl) selectedEl.classList.add('selected');

            const dateContainer = document.getElementById('link-date-container');
            const rituContainer = document.getElementById('link-ritu-container');
            if (dateContainer) dateContainer.classList.add('hidden');
            if (rituContainer) rituContainer.classList.add('hidden');

            if(type === 'banner' || type === 'gridbg') {
                if (dateContainer) dateContainer.classList.remove('hidden');
            } else if(type === 'ritu') {
                if (rituContainer) rituContainer.classList.remove('hidden');
            }
        }

        function convertGoogleDriveLink(url) {
            // 1. Check for /file/d/ID pattern (supports trailing slash, question mark, or end of line)
            const fileIdRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
            let match = url.match(fileIdRegex);

            // 2. Check for id=ID pattern (e.g. open?id=, uc?id=)
            if (!match) {
                const idParamRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
                match = url.match(idParamRegex);
            }

            if (match && match[1]) {
                // Use the thumbnail endpoint with a large size (w4096) to ensure high resolution
                // This approach bypasses the 'Virus Scan' warning page that breaks 'uc?export=view' for large files
                return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w4096`;
            }
            return url;
        }

        function performLinkInsert() {
            let url = document.getElementById('link-url-input').value.trim();
            if (!url) { alert("Please enter a URL or HTML Code."); return; }

            // Extract URL from HTML if present
            if (url.includes('<') && url.includes('>')) {
                const imgMatch = url.match(/<img[^>]+src=["']([^"']+)["']/i);
                if (imgMatch && imgMatch[1]) {
                    url = imgMatch[1];
                }
            }
                        // Convert Google Drive Links to Direct View Links
            url = convertGoogleDriveLink(url);
                        const type = tempLinkState.selectedType;
            let extraParam = null;
            if (type === 'banner' || type === 'gridbg') {
                extraParam = document.getElementById('link-date-select').value;
                if (!extraParam) { alert("Please select a date."); return; }
            } else if (type === 'ritu') {
                extraParam = document.getElementById('link-ritu-select').value;
                if (!extraParam) { alert("Please select a Ritu."); return; }
            }
            insertImageToEditor(url, type, extraParam);
            closeLinkModal();
        }

        function downloadTxtFile() {
            const text = editor.value;
                        const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Panchang_Input.txt";
            document.body.appendChild(a);
            a.click();
                        document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
                // --- EDITOR LOGIC START ---
        // --- NEW FUNCTION: Fetch Text from Google Drive ---
        async function fetchDriveData() {
            // 1. Ask user for the link
            const url = prompt("Paste your Google Drive Sharing Link (.txt files only):");
            if (!url) return;

            // 2. Extract the File ID using Regex
                    // Matches /d/FILE_ID or id=FILE_ID patterns
            let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);

            if (match && match[1]) {
                const fileId = match[1];
                const btn = event.target.closest('button'); // Get button to show loading state
                                        const originalText = btn ? btn.innerHTML : '';

                if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Loading...';

                // 3. Construct Proxy URL (Bypasses CORS security block)
                // We use 'allorigins' proxy to fetch the Google Drive download link
                const driveDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(driveDownloadUrl)}`;

                try {
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error("Failed to connect to file.");
                                                            const text = await response.text();

                    // 4. Update the Editor and App
                    const editor = document.getElementById('editor');
                                        if (editor) {
                        editor.value = text;
                        parseInput(text); // Call your existing parser
                        render();         // Refresh the view
                        showToast("Data imported from Google Drive successfully!");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error: Could not fetch file. Make sure the Drive link is 'Anyone with the link can view' and the file is text.");
                } finally {
                    if(btn) btn.innerHTML = originalText;
                }
            } else {
                alert("Invalid Google Drive Link. Please use a standard sharing link.");
                                            }
                    }
        // --- LIVE GOOGLE DOC SYNC FEATURE ---

        // 1. Configure the Link (User clicks button)
        function configureLiveSync() {            const currentUrl = appState.config.liveUrl || "";
                        let url = prompt("Paste your Published Google Doc Link:\n(The App will auto-fetch this every time it opens)", currentUrl);
                        if (url) {                url = url.trim();

                // GitHub Logic (Redirect to dedicated function if user pastes GitHub here)
                if (url.includes('github.com') || url.includes('raw.githubusercontent.com')) {
                                        if (url.includes('github.com') && url.includes('/blob/')) {
                                                                     url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                    }
                                                                                                }
                // Google Doc Logic: Validation
                                                                                            else if (url.includes('docs.google.com') && !url.includes('/pub')) {                                        alert("Warning: Google Doc link does not look like a 'Published to Web' link (should end in /pub).");
                                                                                                                                                                                }

                                                      // Save to App State (So it persists in Downloaded File)
                                                     appState.config.liveUrl = url;
                                                                                                                      if (!url.includes('github') && !url.includes('jsdelivr.net')) {
                                        appState.config.syncDocsUrl = url;
                }

                saveConfigToStorage();

                // Fetch immediately to test
                if (url.includes('github.com') || url.includes('raw.githubusercontent.com') || url.includes('jsdelivr.net')) {
                    fetchGitHubData(url);
                } else {
                    fetchLiveDoc(url);
                }

                                                      // Update Settings UI if open
                const docsToggle = document.getElementById('toggle-sync-docs');
                const githubToggle = document.getElementById('toggle-sync-github');
                                                  if (docsToggle && !url.includes('github') && !url.includes('jsdelivr.net')) {
                    docsToggle.checked = true;
                    if(githubToggle) githubToggle.checked = false;
                }

            } else if (url === "") {
                // User cleared the input
                delete appState.config.liveUrl;
                saveConfigToStorage();
                showToast("Live Sync removed.");

                const docsToggle = document.getElementById('toggle-sync-docs');
                if (docsToggle) docsToggle.checked = false;
            }
        }

        // --- NEW: Configure GitHub Sync ---
        function configureGitHubSync() {
            const currentUrl = (appState.config.liveUrl && (appState.config.liveUrl.includes('github') || appState.config.liveUrl.includes('raw.githubusercontent') || appState.config.liveUrl.includes('jsdelivr.net'))) ? appState.config.liveUrl : "";
            let url = prompt("Paste your GitHub File Link (e.g., github.com/.../data.txt):", currentUrl);

            if (url) {
                url = url.trim();

                // Smart Conversion: GitHub Blob -> Raw
                if (url.includes('github.com') && url.includes('/blob/')) {
                    url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                                    }

                // Save to App State
                appState.config.liveUrl = url;
                                appState.config.syncGitHubUrl = url;

                saveConfigToStorage();

                // Trigger Fetch
                fetchGitHubData(url);

                // Update Settings UI if open
                const docsToggle = document.getElementById('toggle-sync-docs');
                const githubToggle = document.getElementById('toggle-sync-github');
                if (githubToggle) {
                    githubToggle.checked = true;
                    if(docsToggle) docsToggle.checked = false;
                }

            } else if (url === "") {
                delete appState.config.liveUrl;
                saveConfigToStorage();
                // showToast("GitHub Sync removed.");

                const githubToggle = document.getElementById('toggle-sync-github');
                if (githubToggle) githubToggle.checked = false;
            }
        }
        // --- EDITOR LOGIC END ---

/**
 * Smart URL Converter (ସ୍ମାର୍ଟ ଲିଙ୍କ୍ ପରିବର୍ତ୍ତକ)
 * ଏହା ସାଧାରଣ GitHub ଲିଙ୍କ୍ କୁ ଅତି-ଦ୍ରୁତ jsDelivr CDN ଲିଙ୍କ୍ ରେ ବଦଳାଇଥାଏ।
 */
function getCDNUrl(originalUrl) {
    if (!originalUrl) return originalUrl;
    try {
        const urlObj = new URL(originalUrl);

        // ୧. ଯଦି ଲିଙ୍କ୍ ଟି GitHub Pages (ଉଦାହରଣ: username.github.io) ର ଅଟେ
        if (urlObj.hostname.includes('.github.io')) {
            const hostParts = urlObj.hostname.split('.');
            const username = hostParts[0]; // ୟୁଜରନେମ୍ ବାହାର କରିବା

            const pathParts = urlObj.pathname.split('/').filter(part => part !== '');
            if (pathParts.length >= 2) {
                const repo = pathParts[0]; // ପ୍ରୋଜେକ୍ଟ (Repo) ନାମ ବାହାର କରିବା
                const filePath = pathParts.slice(1).join('/'); // ଫାଇଲ୍ ର ରାସ୍ତା

                // ସୁପର୍-ଫାଷ୍ଟ jsDelivr ଲିଙ୍କ୍ ତିଆରି କରିବା (Default branch 'main' ରଖାଯାଇଛି)
                return `https://cdn.jsdelivr.net/gh/${username}/${repo}@main/${filePath}`;
            }
        }

        // ୨. ଯଦି ଲିଙ୍କ୍ ଟି Raw GitHub (ଉଦାହରଣ: raw.githubusercontent.com) ର ଅଟେ
        else if (urlObj.hostname === 'raw.githubusercontent.com') {
            const pathParts = urlObj.pathname.split('/').filter(part => part !== '');
            if (pathParts.length >= 4) {
                const username = pathParts[0];
                const repo = pathParts[1];
                const branch = pathParts[2]; // main କିମ୍ବା master
                const filePath = pathParts.slice(3).join('/');

                return `https://cdn.jsdelivr.net/gh/${username}/${repo}@${branch}/${filePath}`;
            }
        }

        // ଯଦି ଲିଙ୍କ୍ ଟି ଅଲଗା ପ୍ରକାରର, ତେବେ ମୂଳ ଲିଙ୍କ୍ ଟି ଫେରାଇଦେବ (ସୁରକ୍ଷା ପାଇଁ)
        return originalUrl;

    } catch (error) {
        console.error("URL ବଦଳାଇବାରେ ସମସ୍ୟା ହେଲା:", error);
        return originalUrl; // ଭୁଲ୍ ହେଲେ ପୁରୁଣା ରାସ୍ତା ବ୍ୟବହାର କରିବ
    }
}

        // --- NEW: Fetch GitHub Data (Direct) ---
        async function fetchGitHubData(url, force = false) {
            if (!url) return;

            // Auto-detect Editor Mode to enforce Force Update
            if (document.getElementById('editor')) {
                force = true;
            }

            // --- EDITOR LOGIC START ---
            // UI Feedback (Target specific button if possible, else fallback)
            const syncBtn = document.querySelector('button[onclick="configureGitHubSync()"]');
            const originalText = syncBtn ? syncBtn.innerHTML : '';
            if(syncBtn) syncBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Syncing...';
            // --- EDITOR LOGIC END ---

            // TIMER LOGIC (Only if NOT forced)
            if (!force) {
                const lastSync = localStorage.getItem('panchang_last_sync_ts');
                const interval = appState.config.syncInterval || (24 * 60 * 60 * 1000); // Default 24h
                const now = Date.now();

                if (lastSync && (now - parseInt(lastSync) < interval)) {
                    console.log(`Sync Timer Valid. Elapsed: ${now - parseInt(lastSync)}ms < Interval: ${interval}ms`);
                    // --- EDITOR LOGIC START ---
                    if(syncBtn) syncBtn.innerHTML = originalText;
                    // --- EDITOR LOGIC END ---
                    return; // Stop.
                }
            }

            try {
                // Convert to ultra-fast jsDelivr CDN URL
                const cdnUrl = getCDNUrl(url);

                // Add timestamp to bypass caching
                let fetchUrl = cdnUrl.includes('?') ? `${cdnUrl}&t=${Date.now()}` : `${cdnUrl}?t=${Date.now()}`;

                // Add Timeout (15 seconds)
                let controller = new AbortController();
                let timeoutId = setTimeout(() => controller.abort(), 15000);

                let response;

                try {
                    // Try the CDN URL first
                    response = await fetch(fetchUrl, { signal: controller.signal });
                    if (!response.ok) throw new Error(`CDN Fetch Failed: ${response.status}`);
                } catch (cdnError) {
                    // Fallback to original URL if CDN fails
                    console.warn("CDN failed, falling back to original URL:", cdnError);
                    clearTimeout(timeoutId);

                    fetchUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;
                    controller = new AbortController();
                    timeoutId = setTimeout(() => controller.abort(), 15000);

                    response = await fetch(fetchUrl, { signal: controller.signal });
                    if (!response.ok) throw new Error(`Original Fetch Failed: ${response.status}`);
                }

                clearTimeout(timeoutId);

                const cleanText = await response.text();

                // VALIDATION
                if (!cleanText || cleanText.length < 10) throw new Error("Document seems empty or invalid");

                // SMART DIFF (Only if NOT forced)
                if (!force) {
                    const cachedString = localStorage.getItem('panchang_autosave_text');
                    if (cachedString && cleanText === cachedString) {
                         console.log("Smart Diff: Data is identical. Update timestamp only.");
                         localStorage.setItem('panchang_last_sync_ts', Date.now());
                         // --- EDITOR LOGIC START ---
                         if(syncBtn) showToast("Sync: No changes found.");
                         // --- EDITOR LOGIC END ---
                         return;
                    }
                }

                // Update & Save Logic (Shared)
                await updateAppWithFetchedData(cleanText);

                // Update Timestamp
                localStorage.setItem('panchang_last_sync_ts', Date.now());

            } catch (e) {
                console.error("GitHub Sync Error:", e);
                // --- EDITOR LOGIC START ---
                showToast("Sync Error: " + e.message);
                // --- EDITOR LOGIC END ---
            } finally {
                // --- EDITOR LOGIC START ---
                if(syncBtn) syncBtn.innerHTML = originalText;
                // --- EDITOR LOGIC END ---
            }
        }

        // 2. The Fetching Logic (Google Docs - Legacy/Proxy)
        async function fetchLiveDoc(url, force = false) {
            if (!url) return;

            // STRICT ENV CHECK: Proxy is ONLY allowed in Editor Mode
            const isEditor = !!document.getElementById('editor');
            if (!isEditor) {
                console.warn("Security Restriction: Proxy fetch (Live Sync Docs) is disabled in Downloaded App Mode.");
                return;
            }

            // Check if it's actually a GitHub URL that got routed here
            if (url.includes('github.com') || url.includes('raw.githubusercontent.com') || url.includes('jsdelivr.net')) {
                return fetchGitHubData(url, force);
            }

            // Auto-detect Editor Mode to enforce Force Update
            if (isEditor) {
                force = true;
            }

            // --- EDITOR LOGIC START ---
            // UI Feedback
            const syncBtn = document.querySelector('button[onclick="configureLiveSync()"]');
            const originalText = syncBtn ? syncBtn.innerHTML : '';
            if(syncBtn) syncBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Syncing...';
            // --- EDITOR LOGIC END ---

            // TIMER LOGIC (Only if NOT forced)
            if (!force) {
                const lastSync = localStorage.getItem('panchang_last_sync_ts');
                const interval = appState.config.syncInterval || (24 * 60 * 60 * 1000); // Default 24h
                const now = Date.now();

                if (lastSync && (now - parseInt(lastSync) < interval)) {
                    console.log(`Sync Timer Valid (Docs). Elapsed: ${now - parseInt(lastSync)}ms < Interval: ${interval}ms`);
                    // --- EDITOR LOGIC START ---
                    if(syncBtn) syncBtn.innerHTML = originalText;
                    // --- EDITOR LOGIC END ---
                    return; // Stop.
                }
            }

            try {
                // Add timestamp to bypass browser caching
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}&t=${Date.now()}`;

                // Add Timeout (15 seconds)
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);

                const response = await fetch(proxyUrl, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error("Proxy Connection failed");

                const html = await response.text();

                // Parse HTML to get raw text syntax
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // CLEANUP
                const unwanted = doc.querySelectorAll('style, script, link, meta, title, noscript, svg');
                unwanted.forEach(el => el.remove());
                const header = doc.querySelector('#header'); if (header) header.remove();
                const footer = doc.querySelector('#footer'); if (footer) footer.remove();

                // Custom text extractor
                function getText(node) {
                    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        let text = '';
                        for (let child of node.childNodes) text += getText(child);
                        const tag = node.tagName.toLowerCase();
                        if (['p', 'div', 'br', 'li', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) text += '\n';
                        return text;
                    }
                    return '';
                }

                const contentNode = doc.querySelector('#contents') || doc.body;
                let cleanText = getText(contentNode);
                cleanText = cleanText.replace(/\n\s*\n/g, '\n\n').trim();

                // VALIDATION
                if (!cleanText || cleanText.length < 10) throw new Error("Document seems empty or invalid");

                // SMART DIFF (Only if NOT forced)
                if (!force) {
                    const cachedString = localStorage.getItem('panchang_autosave_text');
                    if (cachedString && cleanText === cachedString) {
                         console.log("Smart Diff (Docs): Data is identical. Update timestamp only.");
                         localStorage.setItem('panchang_last_sync_ts', Date.now());
                         // --- EDITOR LOGIC START ---
                         if(syncBtn) showToast("Sync: No changes found.");
                         // --- EDITOR LOGIC END ---
                         return;
                    }
                }

                // Update & Save
                await updateAppWithFetchedData(cleanText);

                // Update Timestamp
                localStorage.setItem('panchang_last_sync_ts', Date.now());

            } catch (e) {
                console.error("Live Sync Error:", e);
                // --- EDITOR LOGIC START ---
                showToast("Sync Error: " + e.message);
                // --- EDITOR LOGIC END ---
            } finally {
                // --- EDITOR LOGIC START ---
                if(syncBtn) syncBtn.innerHTML = originalText;
                // --- EDITOR LOGIC END ---
            }
        }

        // Shared Logic for updating app state from fetched text
        function updateAppWithFetchedData(cleanText) {
            return new Promise((resolve, reject) => {
                // 1. Save to Local Storage (Auto-Save)
                localStorage.setItem('panchang_autosave_text', cleanText);

                // 2. Non-Blocking Render
                requestAnimationFrame(() => {
                    try {
                        // --- EDITOR LOGIC START ---
                        const editor = document.getElementById('editor');
                        if (editor) {
                            if (editor.value !== cleanText) {
                                editor.value = cleanText;
                            }
                        }
                        // --- EDITOR LOGIC END ---

                        // Heavy lifting
                        parseInput(cleanText);
                        render();
                        saveStateToCache(); // Update JSON Cache

                        // Reset Retry Counter on Success
                        sessionStorage.removeItem('panchang_retry_count');

                        // Optional: Update title if changed in config
                        if (appState.config && appState.config.title) {
                             const titleEl = document.getElementById('app-title');
                             if(titleEl) titleEl.innerText = appState.config.title;
                        }

                        // --- EDITOR LOGIC START ---
                        if (document.getElementById('editor')) showToast("Calendar updated from Cloud!");
                        else
                        // --- EDITOR LOGIC END ---
                        console.log("App updated seamlessly from background cloud fetch.");

                        resolve();
                    } catch (e) {
                        console.error("Critical Parse/Render Error:", e);
                        reject(e);
                    }
                });
            });
        }

        function syncAndResetApp() {
            // 1. Deep Cleanup (Data only - preserve User Config)
            localStorage.removeItem('panchang_cached_state');
            localStorage.removeItem('panchang_autosave_text');
            localStorage.removeItem('panchang_last_sync_ts');
            sessionStorage.removeItem('panchang_retry_count');

            // 2. Identify Language & Link
            const currentLang = appState.config.language || 'en';
            let link = null;

            if (appState.config.syncLinks && appState.config.syncLinks[currentLang]) {
                link = appState.config.syncLinks[currentLang];
                // Decrypt if needed
                if (appState.config.linksEncrypted) {
                    try {
                        link = LinkSecurity.decrypt(link);
                    } catch (e) {
                        console.error("Link decryption failed during syncAndReset", e);
                        link = null;
                    }
                }
            }

            // 3. Action
            if (link) {
                // Update Live URL to match current language source
                appState.config.liveUrl = link;
                appState.config.syncGitHubUrl = link;
                saveConfigToStorage();

                showToast(`Resetting and syncing ${currentLang.toUpperCase()} data...`);

                // Force Fetch (bypass cache/timer)
                fetchGitHubData(link, true);
            } else {
                // Fallback to standard retry (reloads page) if no source is configured
                showToast("No sync source. Performing full reset...");
                retryAppInitialization();
            }
        }

        function retryAppInitialization() {
            const retryCount = parseInt(sessionStorage.getItem('panchang_retry_count') || '0');

            // Always clear data cache
            localStorage.removeItem('panchang_cached_state');
            localStorage.removeItem('panchang_autosave_text');
            localStorage.removeItem('panchang_last_sync_ts');

            if (retryCount > 0) {
                // 2nd Attempt: Nuclear Option (Reset Config too)
                localStorage.removeItem('panchangConfig');
                sessionStorage.removeItem('panchang_retry_count');
            } else {
                // 1st Attempt: Mark for next time
                sessionStorage.setItem('panchang_retry_count', '1');
            }

            window.location.reload();
        }

        function showRetryUI(loader) {
            if (!loader) return;
            loader.className = "fixed inset-0 z-[200] flex items-center justify-center bg-gray-50/90 backdrop-blur-sm transition-opacity duration-500 p-4";

            loader.innerHTML = `
                <div class="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm md:max-w-md text-center border border-gray-100 transform scale-100 transition-all relative" style="position: relative;">
                    <button onclick="document.getElementById('app-loader').remove()" class="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100" style="position: absolute; top: 12px; right: 12px; z-index: 50;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div class="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 shadow-sm mt-2">
                        <span class="text-red-500 scale-90 md:scale-100 transform transition-transform">${WIFI_ICON_SVG}</span>
                    </div>

                    <h2 class="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 md:mb-3 tracking-tight">Connection Failed</h2>
                    <p class="text-gray-500 mb-6 md:mb-8 text-sm leading-relaxed px-2">
                        We couldn't fetch the latest calendar data. Please check your internet connection and try again.
                    </p>

                    <div class="mt-2 md:mt-4">
                        <button onclick="retryAppInitialization()" class="w-full bg-orange-500 hover:opacity-90 text-white font-bold py-3 px-4 md:px-6 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 group text-sm md:text-base">
                            <span class="group-hover:rotate-180 transition-transform duration-500 inline-block">${RETRY_ICON_SVG}</span> Retry / Reset App Data
                        </button>
                    </div>
                </div>
            `;
        }

        // New Helper: Verify if Data is actually meaningful (Not just skeleton)
        function hasValidData(state) {
            if (!state || !state.monthsData || state.monthsData.length === 0) return false;
            // If more than 1 month, it is likely valid data
            if (state.monthsData.length > 1) return true;

            // If single month (could be default), check for content
            const m = state.monthsData[0];
            const hasEvents = m.events && m.events.length > 0;
            const hasPanchang = m.panchang && Object.keys(m.panchang).length > 0;

            return hasEvents || hasPanchang;
        }

        function initApp() {
            // 1. Attempt Cache Load
            let dataFound = false;

            // Priority 1: JSON Cache
            // Updated Check: Must have VALID data, not just skeleton
            if (loadStateFromCache() && hasValidData(appState)) {
                console.log("Loaded valid data from JSON Cache");
                dataFound = true;
            }
            // Priority 2: Text Cache
            else {
                const cachedText = localStorage.getItem('panchang_autosave_text');
                if (cachedText) {
                    console.log("Loaded from Text Cache");
                    parseInput(cachedText); // This populates appState

                    // Double check if the parsed text actually produced valid data
                    if (hasValidData(appState)) {
                        dataFound = true;
                    } else {
                        console.log("Text Cache present but data deemed invalid/empty.");
                    }
                }
            }

            // --- EDITOR LOGIC START ---
            if (document.getElementById('editor')) {
                // Editor Mode
                const editor = document.getElementById('editor');
                if (dataFound) {
                    const cachedText = localStorage.getItem('panchang_autosave_text');
                    if (cachedText && editor.value !== cachedText) editor.value = cachedText;
                } else {
                    // Initial parse of default content
                    parseInput(editor.value);
                    dataFound = true; // Editor always has default data
                }

                // Auto-Save Listener
                let timeout;
                editor.addEventListener('input', (e) => {
                    const val = e.target.value;
                    parseInput(val);
                    clearTimeout(timeout);
                    timeout = setTimeout(() => localStorage.setItem('panchang_autosave_text', val), 500);
                });
            }
            // --- EDITOR LOGIC END ---

            // App Mode Logic
            if (window.exportedData) {
                // App Mode
                const editorPanel = document.getElementById('editor-panel');
                if (editorPanel) editorPanel.style.display = 'none';
                const previewPanel = document.getElementById('preview-container');
                if (previewPanel) {
                    previewPanel.classList.remove('md:w-[65%]');
                    previewPanel.classList.add('w-full');
                }

                if (!dataFound) {
                    // Use skeleton but mark as not found so we force sync
                    appState = window.exportedData;

                    // Safety Patch: Ensure recurringDetails exists (Fix for older exports)
                    if (!appState.recurringDetails) appState.recurringDetails = {};
                    if (!appState.details) appState.details = {};
                }

                if (appState.config && appState.config.urlsEncrypted) {
                    try {
                        if (appState.config.liveUrl) appState.config.liveUrl = LinkSecurity.decrypt(appState.config.liveUrl);
                        if (appState.config.syncDocsUrl) appState.config.syncDocsUrl = LinkSecurity.decrypt(appState.config.syncDocsUrl);
                        if (appState.config.syncGitHubUrl) appState.config.syncGitHubUrl = LinkSecurity.decrypt(appState.config.syncGitHubUrl);
                        delete appState.config.urlsEncrypted;
                    } catch (e) {
                        console.error("URL decryption failed during init", e);
                    }
                }
            }

            // Render whatever we have (Data or Skeleton)
            render();

            const loader = document.getElementById('app-loader');

            // 2. Conditional Fetching Logic
            if (appState.config && appState.config.liveUrl) {
                const url = appState.config.liveUrl;
                const isGitHub = url.includes('github') || url.includes('raw.githubusercontent') || url.includes('jsdelivr.net');

                let allowProxy = false;
                // --- EDITOR LOGIC START ---
                // In Editor Mode, we allow Proxy Sync (Google Docs)
                if (document.getElementById('editor')) allowProxy = true;
                // --- EDITOR LOGIC END ---

                // ENFORCE RESTRICTION: In App Mode, ONLY GitHub Direct Sync is allowed.
                if (!allowProxy && !isGitHub) {
                    console.warn("App Mode Restriction: Live Sync Docs (Proxy) is disabled. Ignoring URL.");
                    if (loader) setTimeout(() => loader.remove(), 500);
                    return;
                }

                if (dataFound) {
                    // Scenario A: Data Exists (Show it instantly, remove loader, update in background)
                    if (loader) setTimeout(() => loader.remove(), 500);

                    // Background Sync (respecting timer)
                    setTimeout(() => {
                        console.log("Scenario A: Background Sync...");
                        let shouldForce = false;
                        // --- EDITOR LOGIC START ---
                        if (document.getElementById('editor')) shouldForce = true;
                        // --- EDITOR LOGIC END ---

                        if (isGitHub) fetchGitHubData(url, shouldForce);
                        else fetchLiveDoc(url, shouldForce);
                    }, 2000);
                } else {
                    // Scenario B: No Data (Blank) -> FORCE Sync Immediately & Keep Loader
                    console.log("Scenario B: Cold Start - Force Syncing...");

                    // Force Sync (ignore timer)
                    const promise = isGitHub ? fetchGitHubData(url, true) : fetchLiveDoc(url, true);

                    if (promise && typeof promise.then === 'function') {
                        promise.then(() => {
                            // Check if we actually got data (monthsData should not be empty)
                            if (hasValidData(appState)) {
                                if (loader) loader.remove();
                            } else {
                                // Still no data? Show Retry
                                showRetryUI(loader);
                            }
                        }).catch(() => {
                            showRetryUI(loader);
                        });
                    } else {
                        // If logic fails to produce a promise, remove loader as safety
                        if (loader) loader.remove();
                    }
                }
            } else {
                // No Sync Configured
                if (loader) setTimeout(() => loader.remove(), 500);
            }
        }

        // Start Up
        initApp();

        document.addEventListener('DOMContentLoaded', () => {
            // Sync the navigation UI with the loaded state (fixes caching issue)
            toggleView(appState.view || 'month');
        });

        initCalendarSwipe();

        if (typeof syncTickerWithPanchang === 'function') {
            syncTickerWithPanchang();
        }

        // Show location prompt after a small delay to not block initial render
        setTimeout(() => {
            showLocationPrompt();
        }, 1500);

        // --- EDITOR LOGIC START ---
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                editor.value = e.target.result;
                parseInput(editor.value);
            };
            reader.readAsText(file);
            event.target.value = '';
        }
        // --- EDITOR LOGIC END ---


        // Load config from localStorage if available
        try {
            const savedConfig = localStorage.getItem('panchangConfig');

            if (savedConfig) {
                // Case A: Returning User (Load Config)
                const parsed = JSON.parse(savedConfig);
                // Merge saved config into defaults
                if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en', location: null, syncLinks: { ...DEFAULT_SYNC_LINKS } };
                appState.config = { ...appState.config, ...parsed };
                if (!appState.config.syncLinks) appState.config.syncLinks = { ...DEFAULT_SYNC_LINKS };

                // If location exists, trigger a silent update to refresh it
                if (appState.config.location) {
                    // Slight delay to allow render to happen first
                    setTimeout(() => getUserLocation(), 2000);
                }
            } else {
                // Case B: First Time User (Set Default EN & Fetch)
                console.log("First time user detected. Setting default to English.");

                if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en', location: null, syncLinks: { ...DEFAULT_SYNC_LINKS } };

                // 1. Force English
                appState.config.language = 'en';

                // 2. Initial Save
                saveConfigToStorage();

                // 3. Update UI (Language Dropdown)
                const langSelect = document.getElementById('language-select');
                if (langSelect) langSelect.value = 'en';

                // 4. Auto-Fetch English Data
                if (appState.config.syncLinks && appState.config.syncLinks['en']) {
                    let link = appState.config.syncLinks['en'];

                    // Decrypt if needed
                    if (appState.config.linksEncrypted) {
                        try {
                            link = LinkSecurity.decrypt(link);
                        } catch (e) {
                            console.error("Link decryption failed during init", e);
                            link = null;
                        }
                    }

                    if (link) {
                        console.log("Auto-fetching default English dataset...");
                        appState.config.liveUrl = link;
                        appState.config.syncGitHubUrl = link;
                        saveConfigToStorage(); // Save liveUrl

                        // Show Loader Message
                        const loaderTitle = document.querySelector('#app-loader h2');
                        if (loaderTitle) loaderTitle.innerText = "Loading English Calendar...";

                        fetchGitHubData(link, true);
                    }
                }
            }
        } catch (e) {
            console.error("Failed to load config from localStorage", e);
        }

        // --- NEW: Secure URL Language Reader ---
        function applyLanguageFromURL() {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const langParam = urlParams.get('lang');

                if (langParam) {
                    // Strict allowlist validation via map lookup (case-insensitive)
                    const sanitizedInput = langParam.toLowerCase().trim();
                    const matchedShortCode = fullToLangCodeMap[sanitizedInput];

                    if (matchedShortCode && appState.config.language !== matchedShortCode) {
                        console.log(`Language from URL differs from cached/default. Switching to ${matchedShortCode}...`);

                        // Update the dropdown menu visually if it exists
                        const langSelect = document.getElementById('language-select');
                        if (langSelect) langSelect.value = matchedShortCode;

                        // Trigger the full language change process
                        changeLanguage(matchedShortCode);
                    }
                }
            } catch (e) {
                console.error("Error applying language from URL", e);
            }
        }

        // Execute URL language check AFTER config is loaded
        applyLanguageFromURL();
        // ---------------------------------------

        // Initialization logic moved to initAutoSync()

        function parseInput(text) {
            const lines = text.split('\n');
            let currentBlock = null;
            let parsedCustomLabels = {};
            let parsedCustomMonths = {};
            let parsedMonths = [];
            let parsedRecurring = [];
            let currentMonthObj = null;
            let parsedDetails = {};
            let parsedRecurringDetails = {};
            let parsedManualTithis = {};
            let currentDetailKey = null;
            let parsedSeasonDescs = {};
            let currentSeasonIdx = -1;
            let parsedCustomCards = [];
            let currentCustomCard = null;
            let parsedScrollCards = [];
            let currentScrollCard = null;
            let parsedBubbleCards = [];
            let currentBubbleCard = null;

            // Preserve existing config (Language, Location, LiveUrl) while parsing
            let tempConfig = appState.config ? JSON.parse(JSON.stringify(appState.config)) : { title: 'Panchang App', logoUrl: null, language: 'en', location: null, syncLinks: { ...DEFAULT_SYNC_LINKS } };
            if (!tempConfig.syncLinks) tempConfig.syncLinks = { ...DEFAULT_SYNC_LINKS };

            // Reset viewDate only if we don't have one, or maybe we want to keep current view?
            // For now, let's keep current view logic separate, but init default month just in case.
            const createMonth = (mIndex, year) => ({ month: mIndex, year: year, events: [], panchang: {} });

            // We don't push a default month immediately. We wait to see if 'calendar' block exists.
            // If parsedMonths ends up empty, we handle that later.

            lines.forEach(line => {
                line = line.trim();
                if (!line) return;
                if (line.startsWith('---')) return;
                if (line.startsWith(':::')) {
                    // Handle both "::: block" and "::: block :::" styles
                    const blockName = line.replace(/:::/g, '').trim().toLowerCase();
                    if (blockName === '') { currentBlock = null; currentDetailKey = null; currentHoroSign = null; }
                    else currentBlock = blockName;
                    return;
                }
                if (currentBlock === 'config') {
                    const titleMatch = line.match(/^@\s*Title\s*:\s*(.+)/i);
                    const logoMatch = line.match(/^@\s*Logo\s*:\s*!\[(.*?)\]\((.*?)\)/i);
                    const syncMatch = line.match(/^@\s*Live Sync GitHub trigger in every\s*:\s*(\d+)\s*(minute|hour|day)s?/i);

                    if (titleMatch) tempConfig.title = titleMatch[1];
                    if (logoMatch) tempConfig.logoUrl = logoMatch[2];
                    if (syncMatch) {
                         const val = parseInt(syncMatch[1]);
                         const unit = syncMatch[2].toLowerCase();
                         let multiplier = 1000 * 60 * 60 * 24; // Default day
                         if (unit.startsWith('minute')) multiplier = 1000 * 60;
                         if (unit.startsWith('hour')) multiplier = 1000 * 60 * 60;
                         tempConfig.syncInterval = val * multiplier;
                    }
                }
                else if (currentBlock === 'labels') {
                    const labelMatch = line.match(/^([^:]+)\s*:\s*(.+)/);
                    if (labelMatch) {
                        const key = labelMatch[1].trim().toLowerCase().replace(/\s+/g, '_');
                        parsedCustomLabels[key] = labelMatch[2].trim();
                    }
                }
                else if (currentBlock === 'months') {
                    const monthMatch = line.match(/^(\d{1,2})\s*:\s*(.+)/);
                    if (monthMatch) {
                        parsedCustomMonths[parseInt(monthMatch[1]) - 1] = monthMatch[2].trim();
                    }
                }
                else if (currentBlock === 'calendar') {
                    const headerMatch = line.match(/\+\+\s+(\w+)\s+(\d{4})\s+\+\+/);
                    if (headerMatch) {
                        const mIndex = months.findIndex(m => m.toLowerCase() === headerMatch[1].toLowerCase());
                        if (mIndex !== -1) {
                            const newMonth = createMonth(mIndex, parseInt(headerMatch[2]));
                            parsedMonths.push(newMonth);
                            currentMonthObj = newMonth;
                        }
                    } else {
                        const eventMatch = line.match(/^(\d+)\s+([!^*>])\s+(.+)/);
                        if (eventMatch && currentMonthObj) {
                            const date = parseInt(eventMatch[1]);
                            const symbol = eventMatch[2];
                            let rawText = eventMatch[3];
                            let engPart = rawText;
                            let locPart = "";
                            const nameMatch = rawText.match(/(.*?)\[(.*?)\]/);
                            if (nameMatch) { engPart = nameMatch[1]; locPart = nameMatch[2]; }

                            currentMonthObj.events.push({ date, symbol, engName: engPart.trim(), locName: locPart ? locPart.trim() : "" });
                        }
                    }
                }
                else if (currentBlock === 'recurring') {
                    // Format: DD-MM Symbol Name
                    const recMatch = line.match(/^(\d{1,2})-(\d{1,2})\s+([!^*>])\s+(.+)/);
                    if (recMatch) {
                        const day = parseInt(recMatch[1]);
                        const month = parseInt(recMatch[2]) - 1; // 0-indexed
                        const symbol = recMatch[3];
                        let rawText = recMatch[4];
                        let engPart = rawText;
                        let locPart = "";
                        const nameMatch = rawText.match(/(.*?)\[(.*?)\]/);
                        if (nameMatch) { engPart = nameMatch[1]; locPart = nameMatch[2]; }

                        parsedRecurring.push({ day, month, symbol, engName: engPart.trim(), locName: locPart ? locPart.trim() : "" });
                    }
                }
                else if (currentBlock === 'tithi') {
                    // Matches format "DD-MM-YYYY : TithiName" or "DD-MM : TithiName"
                    const tithiEntry = line.match(/^(\d{1,2}-\d{1,2}(?:-\d{4})?)\s*:\s*(.+)/);
                    if (tithiEntry) {
                        const dateKey = tithiEntry[1];
                        const tValue = tithiEntry[2].trim().toLowerCase();
                        let index = null;

                        // Map common terms to their internal indices
                        if (tValue.includes('purnima')) index = 14;
                        else if (tValue.includes('amavasya')) index = 29;
                        else if (tValue.includes('ekadashi')) index = 10;
                        else index = parseInt(tValue);

                        if (!isNaN(index) && index !== null) {
                            // Save the override using the date string as the key
                            parsedManualTithis[dateKey] = index;
                        }
                    }
                }
                else if (currentBlock === 'details') {
                    const dateHeader = line.match(/^>>\s+(\d{1,2}-\d{1,2}-\d{4})/);
                    const recurringHeader = line.match(/^>>\s+(\d{1,2}-\d{1,2})\s*$/); // Strict end anchor

                    if (dateHeader) {
                        const parts = dateHeader[1].split('-');
                        // Key: YYYY-MonthIndex-Day
                        currentDetailKey = `${parts[2]}-${parseInt(parts[1]) - 1}-${parseInt(parts[0])}`;
                        if (!parsedDetails[currentDetailKey]) parsedDetails[currentDetailKey] = [];
                        parsedDetails[currentDetailKey].push({ tags: [], bodyLines: [], bannerUrl: null, gridBgUrl: null });
                    }
                    else if (recurringHeader) {
                        const parts = recurringHeader[1].split('-');
                        // Key: MonthIndex-Day (e.g. 0-14 for Jan 14)
                        currentDetailKey = `rec-${parseInt(parts[1]) - 1}-${parseInt(parts[0])}`;
                        if (!parsedRecurringDetails[currentDetailKey]) parsedRecurringDetails[currentDetailKey] = [];
                        parsedRecurringDetails[currentDetailKey].push({ tags: [], bodyLines: [], bannerUrl: null, gridBgUrl: null });
                    }
                    else if (currentDetailKey) {
                        // Check where to push
                        let currentDetail;
                        if (currentDetailKey.startsWith('rec-')) {
                            const list = parsedRecurringDetails[currentDetailKey];
                            currentDetail = list[list.length - 1];
                        } else {
                            const list = parsedDetails[currentDetailKey];
                            currentDetail = list[list.length - 1];
                        }

                        // Support single line multi-tag like "## tag : Major Festival, Public Holiday" or just multiple lines.
                        // Implemented requested new tag syntax parsing, splitting comma-separated items
                        const tagMatch = line.match(/^##\s*tag\s*:\s*(.+)/i);
                        const bannerMatch = line.match(/^!\[Banner\]\((.*?)\)/i);
                        const gridBgMatch = line.match(/^!\[GridBg\]\((.*?)\)/i);
                        const tithiMatch = line.match(/^@\s*Tithi\s*:\s*(.+)/i);

                        if (tagMatch) {
                            // Split by comma for multiple tags on one line and push as distinct items
                            const tags = tagMatch[1].split(',').map(t => t.trim()).filter(t => t.length > 0);
                            currentDetail.tags.push(...tags);
                        }
                        else if (bannerMatch) currentDetail.bannerUrl = bannerMatch[1];
                        else if (gridBgMatch) currentDetail.gridBgUrl = gridBgMatch[1];
                        else if (tithiMatch) {
                            let tVal = tithiMatch[1].trim().toLowerCase();
                            // Map names to indices
                            if (tVal.includes('purnima')) currentDetail.manualTithiIndex = 14;
                            else if (tVal.includes('amavasya')) currentDetail.manualTithiIndex = 29;
                            else if (tVal.includes('ekadashi')) currentDetail.manualTithiIndex = 10;
                            else {
                                const parsedInt = parseInt(tVal);
                                if (!isNaN(parsedInt)) currentDetail.manualTithiIndex = parsedInt;
                            }
                        }
                        else currentDetail.bodyLines.push(line);
                    }
                }
                else if (currentBlock === 'seasons') {
                    const match = line.match(/^@\s*(.+?)\s*:\s*(.*)/);
                    if (match) {
                        const key = match[1].trim().toLowerCase();
                        let val = match[2].trim();

                        let idx = -1;
                        if (key.includes('spring') || key.includes('vasant')) idx = 0;
                        else if (key.includes('summer') || key.includes('grishma')) idx = 1;
                        else if (key.includes('monsoon') || key.includes('varsha')) idx = 2;
                        else if (key.includes('autumn') || key.includes('sharad')) idx = 3;
                        else if (key.includes('pre-winter') || key.includes('hemant')) idx = 4;
                        else if (key.includes('winter') || key.includes('shishir')) idx = 5;

                        if (idx !== -1) {
                            if (key.includes('image')) {
                                if (!appState.config.customRituImages) {
                                    appState.config.customRituImages = {};
                                }
                                appState.config.customRituImages[idx] = val;
                                currentSeasonIdx = -1;
                            } else {
                                currentSeasonIdx = idx;
                                parsedSeasonDescs[idx] = [];
                                if (val) parsedSeasonDescs[idx].push(val);
                            }
                        } else {
                            currentSeasonIdx = -1;
                        }
                    } else if (currentSeasonIdx !== -1 && line.trim() !== '') {
                        parsedSeasonDescs[currentSeasonIdx].push(line.trim());
                    }
                }
                else if (currentBlock === 'panchang') {
                    const panMatch = line.match(/^@\s+(.+?)\s*:\s*(.+)/);
                    if (panMatch && currentMonthObj) currentMonthObj.panchang[panMatch[1]] = panMatch[2];
                }
                else if (currentBlock === 'more tab') {
                    // Start of a new card if Hyperlink is found
                    const linkMatch = line.match(/^Hyperlink:\s*\[(.*?)\]/i);
                    const mainTitleMatch = line.match(/^Main Title:\s*\[(.*?)\]/i);
                    const titleMatch = line.match(/^Title:\s*\[(.*?)\]/i);
                    const descMatch = line.match(/^Description:\s*\[(.*?)\]/i);
                    const imgMatch = line.match(/^Image Link:\s*\[(.*?)\]/i);
                    const colorMatch = line.match(/^Card Color:\s*\[(.*?)\]/i);

                    if (linkMatch) {
                        currentCustomCard = { link: linkMatch[1], title: '', desc: '', image: '', color: '#0d9488' };
                        parsedCustomCards.push(currentCustomCard);
                    } else if (currentCustomCard) {
                        if (mainTitleMatch) currentCustomCard.mainTitle = mainTitleMatch[1];
                        else if (titleMatch) currentCustomCard.title = titleMatch[1];
                        else if (descMatch) currentCustomCard.desc = descMatch[1];
                        else if (imgMatch) currentCustomCard.image = imgMatch[1];
                        else if (colorMatch) currentCustomCard.color = colorMatch[1];
                    }
                }
                else if (currentBlock === 'scroll tab') {
                    const linkMatch = line.match(/^Hyperlink:\s*\[(.*?)\]/i);
                    const mainTitleMatch = line.match(/^Main Title:\s*\[(.*?)\]/i);
                    const titleMatch = line.match(/^Title:\s*\[(.*?)\]/i);
                    const descMatch = line.match(/^Description:\s*\[(.*?)\]/i);
                    const imgMatch = line.match(/^Image Link:\s*\[(.*?)\]/i);
                    const colorMatch = line.match(/^Card Color:\s*\[(.*?)\]/i);

                    if (linkMatch) {
                        currentScrollCard = { link: linkMatch[1], title: '', desc: '', image: '', color: '#2e3459' };
                        parsedScrollCards.push(currentScrollCard);
                    } else if (currentScrollCard) {
                        if (mainTitleMatch) currentScrollCard.mainTitle = mainTitleMatch[1];
                        else if (titleMatch) currentScrollCard.title = titleMatch[1];
                        else if (descMatch) currentScrollCard.desc = descMatch[1];
                        else if (imgMatch) currentScrollCard.image = imgMatch[1];
                        else if (colorMatch) currentScrollCard.color = colorMatch[1];
                    }
                }
                else if (currentBlock === 'bubble tab') {
                    const linkMatch = line.match(/^Hyperlink:\s*\[(.*?)\]/i);
                    const mainTitleMatch = line.match(/^Main Title:\s*\[(.*?)\]/i);
                    const titleMatch = line.match(/^Title:\s*\[(.*?)\]/i);
                    const descMatch = line.match(/^Description:\s*\[(.*?)\]/i);
                    const imgMatch = line.match(/^Image Link:\s*\[(.*?)\]/i);
                    const colorMatch = line.match(/^Card Color:\s*\[(.*?)\]/i);

                    if (linkMatch) {
                        currentBubbleCard = { link: linkMatch[1], title: '', desc: '', image: '', color: '#0d9488' };
                        parsedBubbleCards.push(currentBubbleCard);
                    } else if (currentBubbleCard) {
                        if (mainTitleMatch) currentBubbleCard.mainTitle = mainTitleMatch[1];
                        else if (titleMatch) currentBubbleCard.title = titleMatch[1];
                        else if (descMatch) currentBubbleCard.desc = descMatch[1];
                        else if (imgMatch) currentBubbleCard.image = imgMatch[1];
                        else if (colorMatch) currentBubbleCard.color = colorMatch[1];
                    }
                }
            });

            // If parsedMonths is empty (no explicit calendar block), verify if we need a default one?
            // Actually, if infinite nav is enabled, we don't *need* any explicit months.

            appState.monthsData = parsedMonths;
            appState.customMonths = parsedCustomMonths;
            appState.recurringEvents = parsedRecurring;
            appState.recurringDetails = parsedRecurringDetails;
            appState.manualTithis = parsedManualTithis;
            appState.details = parsedDetails;
            appState.customSeasonDescriptions = parsedSeasonDescs;
            appState.config = tempConfig;
            appState.customLabels = parsedCustomLabels;
            appState.customCards = parsedCustomCards;
            appState.scrollCards = parsedScrollCards;
            appState.bubbleCards = parsedBubbleCards;

            findTodayIndex();

            // Set viewDate if not already meaningful (e.g. initial load)
            // If we have explicit months, jump to first one. Else use Today.
            if (appState.monthsData.length > 0) {
                // If we haven't set viewDate logic before, or if we want to reset on parse?
                // Standard behavior: Reset to first available month in data, OR today if present.
                if (appState.todayIndex !== -1) {
                    const d = appState.monthsData[appState.todayIndex];
                    appState.viewDate = { month: d.month, year: d.year };
                    appState.activeMonthIndex = appState.todayIndex;
                } else {
                    const d = appState.monthsData[0];
                    appState.viewDate = { month: d.month, year: d.year };
                    appState.activeMonthIndex = 0;
                }
            } else {
                // No data? Use today.
                const today = new Date();
                appState.viewDate = { month: today.getMonth(), year: today.getFullYear() };
                appState.activeMonthIndex = -1;
            }

            render();
        }

        function findTodayIndex() {
            const today = new Date();
            appState.todayIndex = appState.monthsData.findIndex(d => d.month === today.getMonth() && d.year === today.getFullYear());
        }

        function getEffectiveMonthData(month, year) {
            // 1. Try to find explicit data
            const explicit = appState.monthsData.find(m => m.month === month && m.year === year);

            // 2. Base Object (Clone or Create)
            let result = explicit ? JSON.parse(JSON.stringify(explicit)) : {
                month: month,
                year: year,
                events: [],
                panchang: {}
            };

            // 3. Merge Recurring Events
            if (appState.recurringEvents && appState.recurringEvents.length > 0) {
                const recurring = appState.recurringEvents.filter(e => e.month === month);

                recurring.forEach(rec => {
                    // Check validity (e.g. Feb 29 in non-leap year)
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    if (rec.day > daysInMonth) return;

                    // Append to events
                    // Optional: Avoid duplicates if exact same name exists on same day
                    const exists = result.events.some(e => e.date === rec.day && e.engName === rec.engName);
                    if (!exists) {
                        result.events.push({
                            date: rec.day,
                            symbol: rec.symbol,
                            engName: rec.engName,
                            locName: rec.locName
                        });
                    }
                });
            }

            // Sort events by date
            result.events.sort((a,b) => a.date - b.date);

            return result;
        }

        function changeMonth(direction) {
            let { month, year } = appState.viewDate;
            month += direction;

            // Handle Year Rollover
            if (month > 11) {
                month = 0;
                year++;
            } else if (month < 0) {
                month = 11;
                year--;
            }

            appState.viewDate = { month, year };

            // Update activeMonthIndex just in case legacy logic relies on it (e.g. findTodayIndex results)
            appState.activeMonthIndex = appState.monthsData.findIndex(m => m.month === month && m.year === year);

            render();
        }

        function changeYear(offset) {
            let { month, year } = appState.viewDate;
            year += offset;
            appState.viewDate = { month, year };

            // Sync activeMonthIndex if possible
            appState.activeMonthIndex = appState.monthsData.findIndex(m => m.month === month && m.year === year);

            render();
        }

        function jumpToToday() {
            const today = new Date();
            appState.viewDate = { month: today.getMonth(), year: today.getFullYear() };
            appState.activeMonthIndex = appState.monthsData.findIndex(m => m.month === today.getMonth() && m.year === today.getFullYear());
            render();
        }
        function resolveImageUrls(text) {
            return text.replace(/local-image:\/\/[^\)]+/g, (match) => appState.images[match] || match);
        }

        function processPreRenderQueue(deadline) {
            while (preRenderQueue.length > 0 && deadline.timeRemaining() > 5) {
                const task = preRenderQueue.shift();
                if (!appState.activeMonthDetails) appState.activeMonthDetails = {};

                const dateKey = `${task.monthData.year}-${task.monthData.month}-${task.day}`;
                if (!appState.activeMonthDetails[dateKey]) {
                    appState.activeMonthDetails[dateKey] = generateDayModalHTML(task.day, task.monthData);
                }
            }

            if (preRenderQueue.length > 0) {
                reqIdleCallback(processPreRenderQueue);
            } else {
                isPreRenderRunning = false;
            }
        }

        function startBackgroundPreRender() {
            if (!isPreRenderRunning && preRenderQueue.length > 0) {
                isPreRenderRunning = true;
                reqIdleCallback(processPreRenderQueue);
            }
        }

        function render() {
            // Use viewDate to generate data on the fly (Infinite Navigation)
            if (typeof syncTickerWithPanchang === 'function') {
                syncTickerWithPanchang();
            }
            // Fallback to activeMonthIndex if viewDate is missing (Legacy safety)
            let month, year;
            if (appState.viewDate) {
                month = appState.viewDate.month;
                year = appState.viewDate.year;
            } else if (appState.activeMonthIndex !== -1 && appState.monthsData[appState.activeMonthIndex]) {
                month = appState.monthsData[appState.activeMonthIndex].month;
                year = appState.monthsData[appState.activeMonthIndex].year;
            } else {
                // Total fallback
                const now = new Date();
                month = now.getMonth();
                year = now.getFullYear();
            }

            const currentData = getEffectiveMonthData(month, year);
            // if (!currentData) return; // Should never happen with getEffectiveMonthData

            // Ensure title is clean without extra badges
            if (appState.config.title) {
                document.getElementById('app-title').innerText = appState.config.title;
            }

            // Toggle Views
            const monthContainer = document.getElementById('month-view-container');
            const yearContainer = document.getElementById('year-view-container');
            const viewBtnText = document.getElementById('view-btn-text');
            const viewBtnIcon = document.getElementById('view-btn-icon');

                                    const festivalContainer = document.getElementById('app-festival-view');
            const moreContainer = document.getElementById('more-view-container');
            const timingsContainer = document.getElementById('timings-view-container');

            if (appState.view === 'year') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.remove('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Month View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
                renderYearView();
            } else if (appState.view === 'festivals') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.remove('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
                renderAppFestivalView();
            } else if (appState.view === 'more') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.remove('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
            } else if (appState.view === 'timings') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.remove('hidden');
            } else {
                if(monthContainer) monthContainer.classList.remove('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Year View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
            }

            const logoContainer = document.getElementById('logo-container');
            if (appState.config.logoUrl) {
                const src = resolveImageUrls(appState.config.logoUrl);
                logoContainer.innerHTML = `<img id="app-logo-img" src="${src}" alt="Logo" class="w-12 h-12 rounded-full object-cover border border-white/10 shadow-lg">`;
            } else {
                logoContainer.innerHTML = `
    <!-- COMPONENT START -->
    <div class="coin-wrapper ripple-effect">
        <div class="ripple-shadow"></div>
        <div class="coin">
            <svg class="om-symbol" version="1.1" id="Layer_1" xmlns:svg="http://www.w3.org/2000/svg" xmlns:cc="http://creativecommons.org/ns#" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="465.9997 -33.2869 1628.0002 1666.5739" enable-background="new 465.9997 -33.2869 1628.0002 1666.5739" xml:space="preserve" fill="currentColor">
                <g id="layer1_1_" transform="translate(-210.63 -364.11)">
                    <path id="path2396_1_" d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/>
                    <path id="path3168_1_" d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915L1383.3402,445.9915z"/>
                    <path id="path3170_1_" d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/>
                </g>
            </svg>
        </div>
    </div>
    <!-- COMPONENT END -->`;
            }

            // Updated for new Header
            const customMonthName = appState.customMonths ? appState.customMonths[currentData.month] : null;
            const calMonthEl = document.getElementById('cal-month');
            const calYearEl = document.getElementById('cal-year');

            if (customMonthName) {
                calMonthEl.innerText = customMonthName;
                calYearEl.innerText = "-" + currentData.year;
                calYearEl.style.display = '';
            } else {
                calMonthEl.innerText = months[currentData.month];
                calYearEl.innerText = currentData.year;
                calYearEl.style.display = '';
            }

            const indianMonthEl = document.getElementById('cal-indian-month');
            const currentLang = appState.config.language || 'en';
            const currentLangData = langData[currentLang];

            if (currentLangData && currentLangData.indianMonths) {
                indianMonthEl.classList.remove('hidden');
                indianMonthEl.innerText = currentLangData.indianMonths[currentData.month];
            } else {
                indianMonthEl.classList.add('hidden');
            }

            const btnToday = document.getElementById('btn-today');
            const realToday = new Date();
            const isViewingToday = (month === realToday.getMonth() && year === realToday.getFullYear());

            if (!isViewingToday) {
                btnToday.classList.remove('hidden'); btnToday.classList.add('flex');
            } else {
                btnToday.classList.add('hidden'); btnToday.classList.remove('flex');
            }

            renderCalendarGrid(currentData);
            renderPanchang(currentData);
            renderTimings(currentData);
            renderFestivals(currentData);
            renderMonthBanner(currentData);

            // Render Dynamic Custom Cards
            const dynamicContainer = document.getElementById('dynamic-cards-container');
            if (dynamicContainer) {
                dynamicContainer.innerHTML = '';

                const groupCards = (cards) => {
                    const grouped = {};
                    (cards || []).forEach(card => {
                        const title = (card.mainTitle || "Custom Tools").trim();
                        if (!grouped[title]) grouped[title] = [];
                        grouped[title].push(card);
                    });
                    return grouped;
                };

                const groupedBubbles = groupCards(appState.bubbleCards);
                const groupedScrolls = groupCards(appState.scrollCards);
                const groupedGrids = groupCards(appState.customCards);

                const renderGroup = (title, cards, renderFunc, containerClasses, innerWrapperClasses = '') => {
                    if (!cards || cards.length === 0) return '';
                    const firstCardColor = cards[0].color || '#ef4444';
                    const cardsHtml = cards.map(c => renderFunc(c)).join('');
                    return `
                        <div class="max-w-screen-2xl mx-auto dynamic-custom-section mb-6 -mx-2 md:-mx-8 w-full first-of-type:mt-4 md:mt-10">
                            <div class="px-4 tools-section-container flex justify-center">
                                <div class="inline-flex flex-col w-fit max-w-full mb-8 px-4 items-center">
                                    <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 text-center">${title}</h2>
                                    <div class="relative flex justify-center mt-2 h-[2px] self-center mx-auto" style="width: 110%;">
                                        <div class="absolute inset-0 z-10 opacity-90 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstCardColor}, transparent);"></div>
                                        <div class="absolute inset-0 blur-[6px] z-0 opacity-80 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstCardColor}, transparent);"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="${containerClasses}">
                                ${cardsHtml}
                                ${innerWrapperClasses ? '<div class="' + innerWrapperClasses + '"></div>' : ''}
                            </div>
                        </div>
                    `;
                };

                let finalHtml = '';

                for (const [title, cards] of Object.entries(groupedBubbles)) {
                    finalHtml += renderGroup(title, cards, renderBubbleCard, 'flex overflow-x-auto no-scrollbar snap-x snap-mandatory pt-3 pb-6 px-4 md:px-6 lg:px-12 gap-6 md:gap-8 max-w-screen-2xl mx-auto w-full scroll-smooth', 'shrink-0 w-1 md:w-4');
                }

                for (const [title, cards] of Object.entries(groupedScrolls)) {
                    finalHtml += renderGroup(title, cards, renderScrollCard, 'flex overflow-x-auto no-scrollbar snap-x snap-mandatory pt-3 pb-6 px-4 md:px-6 lg:px-12 gap-3 md:gap-4 max-w-screen-2xl mx-auto w-full scroll-smooth', 'shrink-0 w-1 md:w-4');
                }

                for (const [title, cards] of Object.entries(groupedGrids)) {
                    finalHtml += renderGroup(title, cards, renderCustomCard, 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4');
                }

                dynamicContainer.innerHTML = finalHtml;
            }

            // --- NEW LOGIC: Hide/Show Sections based on Config ---
            const secs = appState.config.sections || { festivals: true, panchang: true };

            const secFest = document.getElementById('sec-festivals');
            const secPan = document.getElementById('sec-panchang');

            if (secFest) secFest.style.display = secs.festivals ? 'block' : 'none';
            if (secPan) secPan.style.display = secs.panchang ? 'block' : 'none';

            // --- NEW LOGIC: Pre-Render Day Details HTML ---
            // Clear cache entirely on every render to ensure user edits are reflected immediately
            appState.activeMonthDetails = {};

            // Clear the queue for the new view
            preRenderQueue = [];
            isPreRenderRunning = false;

            const daysInMonth = new Date(currentData.year, currentData.month + 1, 0).getDate();
            const realTodayDate = new Date();

            for (let d = 1; d <= daysInMonth; d++) {
                const dateKey = `${currentData.year}-${currentData.month}-${d}`;

                // 1. Instant Render for "Today" if we are viewing the current month
                if (d === realTodayDate.getDate() && currentData.month === realTodayDate.getMonth() && currentData.year === realTodayDate.getFullYear()) {
                    appState.activeMonthDetails[dateKey] = generateDayModalHTML(d, currentData);
                } else {
                    // 2. Queue the rest for background processing
                    preRenderQueue.push({ day: d, monthData: currentData });
                }
            }

            // Start the background idle task
            startBackgroundPreRender();

            // Step 1: Cache the state
            saveStateToCache();

            applyCustomLabels();
        }

        function applyCustomLabels() {
            if (!appState.customLabels) return;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n').toLowerCase();
                if (appState.customLabels[key]) {
                    if (el.tagName === 'INPUT') {
                        if (el.placeholder) el.placeholder = appState.customLabels[key];
                        if (el.value) el.value = appState.customLabels[key];
                    } else {
                        el.innerHTML = appState.customLabels[key];
                    }
                }
            });
        }

        function dismissBanner(e) {
            if (e) e.stopPropagation();
            isBannerDismissed = true;
            stopBannerAutoPlay();
            const container = document.getElementById('month-banner-container');
            if (container) container.classList.add('hidden');
        }

        function renderMonthBanner(data) {
            const container = document.getElementById('month-banner-container');

            if (isBannerDismissed) {
                if (container) container.classList.add('hidden');
                return;
            }

            const slidesContainer = document.getElementById('banner-slides');
            const dotsContainer = document.getElementById('banner-dots');

            // Collect banners for the current month
            const daysInMonth = new Date(data.year, data.month + 1, 0).getDate();
            const banners = [];

            for (let d = 1; d <= daysInMonth; d++) {
                const dateKey = `${data.year}-${data.month}-${d}`;
                const recKey = `rec-${data.month}-${d}`;

                let details = appState.details[dateKey]; // specific
                if (!details) details = appState.recurringDetails[recKey]; // fallback

                if (details && Array.isArray(details)) {
                     details.forEach(detail => {
                         if (detail.bannerUrl) {
                             // Find event name if possible for caption
                             const dayEvents = data.events.filter(e => e.date === d);
                             let caption = '';
                             if (dayEvents.length > 0) {
                                 caption = dayEvents[0].engName;
                             }

                             banners.push({
                                 url: resolveImageUrls(detail.bannerUrl),
                                 date: d,
                                 caption: caption
                             });
                         }
                     });
                } else if (details && details.bannerUrl) {
                    // Fallback for old object structure if applicable
                     const dayEvents = data.events.filter(e => e.date === d);
                     let caption = '';
                     if (dayEvents.length > 0) caption = dayEvents[0].engName;
                     banners.push({ url: resolveImageUrls(details.bannerUrl), date: d, caption: caption });
                }
            }

            // Optimization: If banners list is same, don't rebuild DOM
            const newHash = JSON.stringify(banners);
            if (newHash === currentBannerDataHash) {
                if (banners.length === 0) {
                     container.classList.add('hidden');
                } else {
                     container.classList.remove('hidden');
                }
                return;
            }
            currentBannerDataHash = newHash;

            // Clear previous
            slidesContainer.innerHTML = '';
            dotsContainer.innerHTML = '';
            clearInterval(bannerInterval);
            bannerCurrentIndex = 0;

            if (banners.length === 0) {
                container.classList.add('hidden');
                return;
            }

            container.classList.remove('hidden');
            slidesContainer.style.transform = `translateX(0)`;

            // Render slides
            banners.forEach((banner, index) => {
                const slide = document.createElement('div');
                slide.className = 'w-full flex-shrink-0 h-full relative cursor-pointer';
                slide.onclick = () => openDayModal(banner.date, data); // Click banner to open day

                slide.innerHTML = `
                    <img src="${banner.url}" class="w-full h-full" style="object-fit: cover;">
                    <div class="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white pt-10" style="background: linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.4), transparent);">

                        <div class="text-xs md:text-sm opacity-90 font-semibold uppercase tracking-wide bg-black/30 inline-block px-2 py-0.5 rounded mt-1 backdrop-blur-sm border border-white/20">${months[data.month]} ${banner.date}</div>
                    </div>
                `;
                slidesContainer.appendChild(slide);

                // Dot
                const dot = document.createElement('button');
                dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`;
                dot.onclick = (e) => { e.stopPropagation(); goToBannerSlide(index, banners.length); };
                dotsContainer.appendChild(dot);
            });

            // Initialize Swipe & Auto-play
            startBannerAutoPlay(banners.length);

            // Swipe support (Touch)
            let touchStartX = 0;
            let touchEndX = 0;

            container.ontouchstart = (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopBannerAutoPlay();
            };

            container.ontouchend = (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleBannerSwipe(banners.length, touchStartX, touchEndX);
                startBannerAutoPlay(banners.length);
            };

            // Arrow Listeners
            const prevBtn = document.getElementById('banner-prev');
            const nextBtn = document.getElementById('banner-next');

            // Cloning to remove old event listeners if any (though we rebuild the DOM logic, buttons are static)
            // Actually buttons are static in HTML, so we should assign onclick carefully.
            // Since this function runs often, we are reassigning onclick.

            prevBtn.onclick = (e) => {
                e.stopPropagation();
                stopBannerAutoPlay();
                prevBannerSlide(banners.length);
                startBannerAutoPlay(banners.length);
            };
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                stopBannerAutoPlay();
                nextBannerSlide(banners.length);
                startBannerAutoPlay(banners.length);
            };
        }

        function updateBannerSlidePosition() {
            const slidesContainer = document.getElementById('banner-slides');
            slidesContainer.style.transform = `translateX(-${bannerCurrentIndex * 100}%)`;

            // Update dots
            const dots = document.getElementById('banner-dots').children;
            Array.from(dots).forEach((dot, idx) => {
                if (idx === bannerCurrentIndex) {
                    dot.className = 'w-2 h-2 rounded-full bg-white w-6 transition-all duration-300';
                } else {
                    dot.className = 'w-2 h-2 rounded-full bg-white/50 transition-all duration-300 hover:bg-white/80';
                }
            });
        }

        function goToBannerSlide(index, total) {
            bannerCurrentIndex = index;
            updateBannerSlidePosition();
            stopBannerAutoPlay();
            startBannerAutoPlay(total);
        }

        function nextBannerSlide(total) {
            bannerCurrentIndex = (bannerCurrentIndex + 1) % total;
            updateBannerSlidePosition();
        }

        function prevBannerSlide(total) {
            bannerCurrentIndex = (bannerCurrentIndex - 1 + total) % total;
            updateBannerSlidePosition();
        }

        function startBannerAutoPlay(total) {
            clearInterval(bannerInterval);
            if(total > 1) {
                bannerInterval = setInterval(() => {
                    nextBannerSlide(total);
                }, 4000);
            }
        }

        function stopBannerAutoPlay() {
            clearInterval(bannerInterval);
        }

        function handleBannerSwipe(total, startX, endX) {
            if (endX < startX - 50) nextBannerSlide(total);
            if (endX > startX + 50) prevBannerSlide(total);
        }

        // --- CALENDAR SWIPE LOGIC ---
        let calTouchStartX = 0;
        let calTouchStartY = 0;

        function initCalendarSwipe() {
            const el = document.getElementById('calendar-swipe-area');
            if(!el) return;

            el.addEventListener('touchstart', (e) => {
                calTouchStartX = e.changedTouches[0].screenX;
                calTouchStartY = e.changedTouches[0].screenY;
            }, {passive: true});

            el.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].screenX;
                const endY = e.changedTouches[0].screenY;
                handleCalendarSwipe(calTouchStartX, calTouchStartY, endX, endY);
            }, {passive: true});
        }

        function handleCalendarSwipe(startX, startY, endX, endY) {
            const diffX = endX - startX;
            const diffY = endY - startY;

            // Thresholds
            const minSwipeDistance = 50;
            const maxVerticalVariance = 50; // Strict vertical limit to prevent scroll interference

            if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < maxVerticalVariance) {
                if (diffX < 0) {
                    // Swipe Left -> Next Month
                    changeMonth(1);
                } else {
                    // Swipe Right -> Prev Month
                    changeMonth(-1);
                }
            }
        }

        function toggleSeasonDescription(btn, event) {
            event.stopPropagation();
            const card = btn.closest('.season-ui-card');
            if (!card) return;

            const desc = card.querySelector('.season-desc-container');
            const icon = btn.querySelector('.season-toggle-icon') || btn.querySelector('i');

            if (desc) {
                desc.classList.toggle('hidden');
                if (icon) {
                    if (desc.classList.contains('hidden')) {
                         icon.classList.remove('fa-chevron-up');
                         icon.classList.add('fa-chevron-down');
                    } else {
                         icon.classList.remove('fa-chevron-down');
                         icon.classList.add('fa-chevron-up');
                    }
                }
            }
        }

        var heroCountdownInterval = null;

        function renderAppFestivalView() {
            const heroContainer = document.getElementById('hero-festival-banner');
            const gridContainer = document.getElementById('upcoming-festivals-grid');
            if (!heroContainer || !gridContainer) return;

            // Stop existing countdown
            if (heroCountdownInterval) clearInterval(heroCountdownInterval);

            // 1. Gather all upcoming festivals globally
            let upcomingFestivals = [];
            const today = new Date();

            if (appState.monthsData) {
                appState.monthsData.forEach(m => {
                    const mEvents = m.events.filter(e => e.symbol === '!' || e.symbol === '^' || e.symbol === '*');
                    mEvents.forEach(e => {
                        const eDate = new Date(m.year, m.month, e.date);
                        if (eDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {

                            // Check for banner image in details
                            const dateKey = `${m.year}-${m.month}-${e.date}`;
                            const recKey = `rec-${m.month}-${e.date}`;
                            let details = appState.details[dateKey] || appState.recurringDetails[recKey];

                            let imgUrl = '';
                            if (details && Array.isArray(details)) {
                                const dWithBanner = details.find(d => d.bannerUrl);
                                if (dWithBanner) imgUrl = resolveImageUrls(dWithBanner.bannerUrl);
                            } else if (details && details.bannerUrl) {
                                imgUrl = resolveImageUrls(details.bannerUrl);
                            }

                            upcomingFestivals.push({
                                event: e,
                                monthData: m,
                                dateObj: eDate,
                                imgUrl: imgUrl
                            });
                        }
                    });
                });
            }

            // Sort chronologically
            upcomingFestivals.sort((a, b) => a.dateObj - b.dateObj);

            // Need at least one festival to show
            if (upcomingFestivals.length === 0) {
                heroContainer.innerHTML = '<div class="p-6 text-center text-gray-500">No upcoming festivals found.</div>';
                gridContainer.innerHTML = '';
                return;
            }

            // --- HERO BANNER (The very next festival) ---
            const heroEvent = upcomingFestivals[0];
            const hasHeroImg = heroEvent.imgUrl !== '';

            let heroBg = hasHeroImg
                ? `background-image: url('${heroEvent.imgUrl}'); background-size: cover; background-position: center;`
                : `background: linear-gradient(135deg, #1e3a8a, #581c87);`; // fallback gradient

            heroContainer.onclick = () => openDayModal(heroEvent.event.date, heroEvent.monthData);

            heroContainer.innerHTML = `
                <div class="absolute inset-0" style="${heroBg}"></div>
                <!-- Left-side transparent dark gradient layer for text contrast -->
                <div class="absolute top-0 left-0 pointer-events-none" style="width: 50%; height: 100%; background: linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, transparent 100%);"></div>
                <!-- Left-aligned bottom corner transparent dark gradient layer for text contrast -->
                <div class="absolute bottom-0 left-0 w-3/4 md:w-1/2 h-full pointer-events-none" style="background: linear-gradient(to top right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 40%, transparent 100%);"></div>

                <div class="absolute bottom-2 right-2 md:bottom-4 md:right-4 opacity-10 pointer-events-none">
                    <svg class="w-24 h-24 md:w-40 md:h-40" viewBox="465.9997 -33.2869 1628.0002 1666.5739" fill="white">
                        <g transform="translate(-210.63 -364.11)">
                            <path d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/>
                            <path d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135 c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915 L1383.3402,445.9915z"/>
                            <path d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037 l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869 c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077 c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576 c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626 c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602 c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248 c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093 c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/>
                        </g>
                    </svg>
                </div>
                <div class="absolute bottom-2 left-2 p-5 w-full flex flex-col gap-1 z-10">
                    <div class="flex items-center gap-2 text-white font-bold tracking-wider uppercase" style="font-size: 0.55rem; text-shadow: 0 1px 2px rgb(0 0 0 / 100%);" id="hero-festival-label">
                        <div class="w-1.5 h-1.5 rounded-full bg-white relative" id="hero-festival-pulse">
                            <div class="absolute inset-0 rounded-full bg-white" style="opacity: 0.75; animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>
                        </div>
                        <span id="hero-festival-text" data-i18n="next_upcoming_festival">Next Upcoming Festival</span>
                    </div>

                    <p class="text-white text-xs font-medium mb-1" style="text-shadow: 0 1px 3px rgb(0 0 0 / 100%);">${months[heroEvent.monthData.month]} ${heroEvent.event.date}, ${heroEvent.monthData.year}</p>

                    <div class="flex gap-2 md:gap-3 mt-1 hero-cd-container">
                        <div id="hero-cd-days-container" class="bg-white/20 backdrop-blur-md rounded-xl p-1.5 md:p-2 min-w-[50px] md:min-w-[60px] text-center border border-white/30 hero-cd-badge" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                            <div id="hero-cd-days" class="text-lg md:text-xl font-bold text-white leading-none hero-cd-num" style="text-shadow: 0 2px 4px rgb(0 0 0 / 100%);">--</div>
                            <div class="text-[8px] text-white font-semibold uppercase mt-0.5 md:mt-1 hero-cd-label" style="text-shadow: 0 1px 2px rgb(0 0 0 / 100%);">Days</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-1.5 md:p-2 min-w-[50px] md:min-w-[60px] text-center border border-white/30 hero-cd-badge" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                            <div id="hero-cd-hours" class="text-lg font-bold text-white leading-none hero-cd-num" style="text-shadow: 0 2px 4px rgb(0 0 0 / 100%);">--</div>
                            <div class="text-[8px] text-white font-semibold uppercase mt-0.5 md:mt-1 hero-cd-label" style="text-shadow: 0 1px 2px rgb(0 0 0 / 100%);">Hours</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-1.5 md:p-2 min-w-[50px] md:min-w-[60px] text-center border border-white/30 hero-cd-badge" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                            <div id="hero-cd-mins" class="text-lg font-bold text-white leading-none hero-cd-num" style="text-shadow: 0 2px 4px rgb(0 0 0 / 100%);">--</div>
                            <div class="text-[8px] text-white font-semibold uppercase mt-0.5 md:mt-1 hero-cd-label" style="text-shadow: 0 1px 2px rgb(0 0 0 / 100%);">Mins</div>
                        </div>
                        <div id="hero-cd-secs-container" class="bg-white/20 backdrop-blur-md rounded-xl p-1.5 md:p-2 min-w-[50px] md:min-w-[60px] text-center border border-white/30 hero-cd-badge" style="box-shadow: 0 4px 12px rgba(0,0,0,0.5);">
                            <div id="hero-cd-secs" class="text-lg font-bold text-white leading-none hero-cd-num" style="text-shadow: 0 2px 4px rgb(0 0 0 / 100%);">--</div>
                            <div class="text-[8px] text-white font-semibold uppercase mt-0.5 md:mt-1 hero-cd-label" style="text-shadow: 0 1px 2px rgb(0 0 0 / 100%);">Secs</div>
                        </div>
                    </div>
                </div>
            `;

            // Countdown Timer Logic
            const targetDate = new Date(heroEvent.dateObj.getTime());

            // Check if the festival is today
            const isToday = (today.getDate() === targetDate.getDate() &&
                             today.getMonth() === targetDate.getMonth() &&
                             today.getFullYear() === targetDate.getFullYear());

            if (isToday) {
                document.getElementById('hero-festival-text').innerText = "Live Today Festival";
                const pulseEl = document.getElementById('hero-festival-pulse');
                pulseEl.classList.remove('bg-white');
                pulseEl.classList.add('bg-red-500');
                pulseEl.innerHTML = '<div class="absolute inset-0 rounded-full bg-red-500" style="opacity: 0.75; animation: radar-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;"></div>';
                // Set target to end of day
                targetDate.setHours(23, 59, 59, 999);
            } else {
                // Set target to start of day for the festival
                targetDate.setHours(0, 0, 0, 0);
            }

            const updateCountdown = () => {
                const now = new Date();
                const diff = targetDate - now;

                const elDaysContainer = document.getElementById('hero-cd-days-container');
                const elSecsContainer = document.getElementById('hero-cd-secs-container');

                if (diff <= 0) {
                    document.getElementById('hero-cd-days').innerText = "0";
                    document.getElementById('hero-cd-hours').innerText = "0";
                    document.getElementById('hero-cd-mins').innerText = "0";
                    document.getElementById('hero-cd-secs').innerText = "0";
                    if (elDaysContainer) elDaysContainer.style.display = 'none';
                    if (elSecsContainer) elSecsContainer.style.display = '';
                    clearInterval(heroCountdownInterval);
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / 1000 / 60) % 60);
                const s = Math.floor((diff / 1000) % 60);

                if (elDaysContainer && elSecsContainer) {
                    if (d <= 0) {
                        elDaysContainer.style.display = 'none';
                        elSecsContainer.style.display = '';
                    } else {
                        elDaysContainer.style.display = '';
                        elSecsContainer.style.display = 'none';
                    }
                }

                const elD = document.getElementById('hero-cd-days');
                const elH = document.getElementById('hero-cd-hours');
                const elM = document.getElementById('hero-cd-mins');
                const elS = document.getElementById('hero-cd-secs');

                if(elD) elD.innerText = d;
                if(elH) elH.innerText = h;
                if(elM) elM.innerText = m;
                if(elS) elS.innerText = s;
            };

            updateCountdown();
            heroCountdownInterval = setInterval(updateCountdown, 1000); // update every second

            // --- GRID SECTION (Remaining festivals) ---
            gridContainer.innerHTML = '';


            const gridEvents = upcomingFestivals; // Keep full regular list

            gridEvents.forEach(item => {
                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer active:scale-95 flex flex-col w-full min-w-0 relative";
                card.onclick = () => openDayModal(item.event.date, item.monthData);

                // Calculate days remaining
                const itemTargetDate = new Date(item.dateObj.getTime());
                itemTargetDate.setHours(0, 0, 0, 0);
                const todayStart = new Date(today.getTime());
                todayStart.setHours(0, 0, 0, 0);

                const diffTime = itemTargetDate - todayStart;
                const daysDiff = Math.round(diffTime / (1000 * 60 * 60 * 24));

                let badgeHtml = '';
                if (daysDiff === 0) {
                    badgeHtml = `<div class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full border" style="background-color: rgba(255, 237, 213, 0.9); border-color: rgba(251, 146, 60, 0.4); box-shadow: 0 1px 2px rgba(0,0,0,0.05); z-index: 10;">
                        <svg class="text-orange-600" style="width: 10px; height: 10px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span class="font-bold text-orange-600 tracking-wider" style="font-size: 8px; line-height: 1;">TODAY</span>
                    </div>`;
                } else {
                    badgeHtml = `<div class="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full border" style="background-color: rgba(255, 237, 213, 0.9); border-color: rgba(251, 146, 60, 0.4); box-shadow: 0 1px 2px rgba(0,0,0,0.05); z-index: 10;">
                        <svg class="text-orange-600" style="width: 10px; height: 10px;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span class="font-bold text-orange-600 tracking-wider" style="font-size: 8px; line-height: 1;">${daysDiff} DAYS</span>
                    </div>`;
                }

                let cardImgHtml = '';
                if (item.imgUrl) {
                    // Use background-image with bg-left (mobile) and bg-[15%_center] (desktop) to strictly crop the right side text out.
                    cardImgHtml = `
                        <div class="w-full h-32 md:h-auto md:aspect-[3/1] overflow-hidden relative bg-left md:bg-center bg-cover" style="background-image: url('${item.imgUrl}');" title="${item.event.engName}">
                        </div>
                    `;
                } else {
                    // Fallback visual
                    const gradients = [
                        'from-orange-400 to-red-500',
                        'from-blue-400 to-indigo-500',
                        'from-emerald-400 to-teal-500',
                        'from-purple-400 to-pink-500'
                    ];
                    // Pick pseudo-randomly based on date
                    const grad = gradients[(item.event.date + item.monthData.month) % gradients.length];
                    cardImgHtml = `
                        <div class="w-full h-32 md:h-auto md:aspect-[3/1] bg-gradient-to-br ${grad} flex items-center justify-center opacity-80">
                            <i class="fa-solid fa-om text-white/30 text-5xl"></i>
                        </div>
                    `;
                }

                card.innerHTML = `
                    ${badgeHtml}
                    ${cardImgHtml}
                    <div class="p-3 flex-1 flex flex-col justify-between">
                        <h3 class="font-bold text-gray-900 text-sm leading-snug mb-1 line-clamp-2">${item.event.engName}</h3>
                        <p class="text-gray-500 text-xs font-medium">${months[item.monthData.month]} ${item.event.date}, ${item.monthData.year}</p>
                    </div>
                `;

                gridContainer.appendChild(card);
            });
        }

        function toggleSmartView() {
            if (appState.view === 'year') {
                toggleView('month');
            } else {
                toggleView('year');
            }
        }


        function toggleView(viewName) {

            appState.view = viewName;

            // Default to month if undefined (handles initial cache hit logic)
            const safeView = viewName || 'month';

            // Handle mobile bottom nav button states
            const allNavBtns = document.querySelectorAll('#mobile-bottom-nav button');
            allNavBtns.forEach(btn => {
                btn.classList.remove('text-orange-600', 'text-gray-400');
                if (btn.querySelector('.fa-calendar')) {
                    if (safeView === 'month' || safeView === 'year') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.querySelector('.festivals-icon')) {
                    if (safeView === 'festivals') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.querySelector('.fa-clock')) {
                    if (safeView === 'timings') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.classList.contains('menu-icon-btn')) {
                    if (safeView === 'more') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else {
                    btn.classList.add('text-gray-400');
                }
            });

            // Handle desktop top nav button states
            const allDesktopNavBtns = document.querySelectorAll('#desktop-top-nav button');
            allDesktopNavBtns.forEach(btn => {
                btn.classList.remove('text-white', 'text-white/80');
                if (btn.querySelector('.fa-calendar')) {
                    if (viewName === 'month' || viewName === 'year') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.festivals-icon')) {
                    if (viewName === 'festivals') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.fa-clock')) {
                    if (viewName === 'timings') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.classList.contains('menu-icon-btn')) {
                    if (viewName === 'more') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else {
                    btn.classList.add('text-white/80');
                }
            });

            render();
        }

        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        }

        function renderYearView() {
            const grid = document.getElementById('year-grid');
            if (!grid) return;
            grid.innerHTML = '';

            const todayDate = new Date();
            const currentRealMonth = todayDate.getMonth();
            const currentRealYear = todayDate.getFullYear();
            const currentRealDay = todayDate.getDate();

            let year = currentRealYear;
            // Use year from current viewDate if available
            if (appState.viewDate) {
                year = appState.viewDate.year;
            } else if (appState.monthsData && appState.monthsData.length > 0 && appState.activeMonthIndex !== -1) {
                year = appState.monthsData[appState.activeMonthIndex].year;
            }

            document.getElementById('year-view-title').innerText = `${year} Year View`;

            // LEAP YEAR BADGE LOGIC
            const headerContainer = document.getElementById('year-view-header');
            let existingBadge = document.getElementById('leap-year-badge');

            if (isLeapYear(year)) {
                if (!existingBadge && headerContainer) {
                    const badge = document.createElement('span');
                    badge.id = 'leap-year-badge';
                    badge.innerText = 'LEAP YEAR';
                    badge.className = 'mt-1 px-3 py-0.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-[10px] font-bold tracking-widest uppercase shadow-sm transition-all duration-300';
                    headerContainer.appendChild(badge);
                }
            } else {
                if (existingBadge) {
                    existingBadge.remove();
                }
            }

            // Generate 12 months
            for (let m = 0; m < 12; m++) {
                // Use getEffectiveMonthData to include recurring events
                const monthData = getEffectiveMonthData(m, year);
                const isCurrentMonth = (m === currentRealMonth && year === currentRealYear);

                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl border border-gray-100 hover:border-orange-300 shadow-sm p-4 hover:shadow-lg transition-all relative overflow-hidden group cursor-pointer hover:-translate-y-1";
                card.onclick = () => {
                    // Navigate to this month
                    // Update viewDate
                    appState.viewDate = { month: m, year: year };
                    // Try to sync activeMonthIndex if exists
                    appState.activeMonthIndex = appState.monthsData.findIndex(d => d.month === m && d.year === year);
                    toggleView('month');
                };

                // Badge for Event Count
                let eventCount = 0;
                if (monthData) {
                    eventCount = monthData.events.filter(e => ['!','*','^'].includes(e.symbol)).length;
                }

                // Header Section
                const headerDiv = document.createElement('div');
                headerDiv.className = "flex items-center justify-between gap-2 mb-3 px-1";

                const title = document.createElement('h3');
                title.className = "font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors";
                title.innerText = months[m];

                headerDiv.appendChild(title);

                if (eventCount > 0) {
                    const badge = document.createElement('span');
                    badge.className = "badge-glass-orange-light text-[9px] font-bold px-2 py-0.5 rounded-full";
                    badge.innerText = `${eventCount} Events`;
                    headerDiv.appendChild(badge);
                }

                card.appendChild(headerDiv);

                const daysContainer = document.createElement('div');
                daysContainer.className = "grid grid-cols-7 gap-0.5 text-center mb-2";
                daysContainer.innerHTML = `
                    <div class="text-[9px] text-red-500 font-bold mb-1">S</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">M</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">T</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">W</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">T</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">F</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">S</div>
                `;

                const firstDay = new Date(year, m, 1).getDay();
                const daysInMonth = new Date(year, m + 1, 0).getDate();

                // Empty slots
                for (let i = 0; i < firstDay; i++) {
                    daysContainer.innerHTML += `<div></div>`;
                }

                // Days
                for (let d = 1; d <= daysInMonth; d++) {
                    let containerClass = "w-6 h-6 flex flex-col items-center justify-center text-[9px] mx-auto rounded-full transition-all duration-200";
                    let textClass = "text-gray-600 font-medium";
                    let bgClass = "hover:bg-gray-50";
                    let dotHtml = "";

                    const isSunday = new Date(year, m, d).getDay() === 0;
                    const isToday = (isCurrentMonth && d === currentRealDay);

                    if (isSunday) textClass = "text-red-500 font-medium";

                    if (monthData) {
                        const ev = monthData.events.find(e => e.date === d);
                        if (ev) {
                            textClass = "text-gray-900 font-bold"; // Bold for event days
                            let dotColor = "bg-gray-400";
                            if (ev.symbol === '!') dotColor = "bg-red-500";
                            else if (ev.symbol === '^') dotColor = "bg-green-500";
                            else if (ev.symbol === '*') dotColor = "bg-blue-500";

                            dotHtml = `<div class="w-1 h-1 rounded-full ${dotColor} mt-0.5"></div>`;
                        }
                    }

                    if (isToday) {
                        bgClass = "bg-orange-500 shadow-md transform scale-110";
                        textClass = "text-white font-bold";
                        dotHtml = ""; // Hide dot on Today
                    }

                    daysContainer.innerHTML += `<div class="${containerClass} ${bgClass} ${textClass}">${d}${dotHtml}</div>`;
                }

                card.appendChild(daysContainer);

                // Smart Reveal Footer
                if (isCurrentMonth && monthData) {
                    let footerHtml = '';
                    const todayEvent = monthData.events.find(e => e.date === currentRealDay && ['!','*','^'].includes(e.symbol));

                    if (todayEvent) {
                         const locText = todayEvent.locName ? ` <span class="font-oriya opacity-80 font-normal">(${todayEvent.locName})</span>` : '';
                         footerHtml = `<div class="mt-2 text-[9px] text-center truncate border-t border-gray-50 pt-1">
                                         <span class="text-orange-600 font-bold animate-pulse" data-i18n="today_festival">Today:</span> <span class="text-gray-700 font-semibold">${todayEvent.engName}${locText}</span>
                                       </div>`;
                    } else {
                         const nextEvent = monthData.events
                             .filter(e => e.date > currentRealDay && ['!','*','^'].includes(e.symbol))
                             .sort((a,b) => a.date - b.date)[0];

                         if (nextEvent) {
                              const locText = nextEvent.locName ? ` <span class="font-oriya opacity-80 font-normal">(${nextEvent.locName})</span>` : '';
                              footerHtml = `<div class="mt-2 text-[9px] text-center truncate border-t border-gray-50 pt-1">
                                              <span class="text-gray-400 font-bold">Next:</span> <span class="text-gray-600">${nextEvent.engName}${locText}</span>
                                            </div>`;
                         }
                    }

                    if (footerHtml) {
                        card.innerHTML += footerHtml;
                    }
                }

                grid.appendChild(card);
            }
        }

function renderCalendarGrid(data) {
    const grid = document.getElementById('calendar-grid');
    const headerRow = document.getElementById('grid-header');
    const currentLang = appState.config.language || 'en';
    const localizedDays = langData[currentLang] ? langData[currentLang].days : langData.en.days;
    const englishDays = langData.en.days;

    // --- 1. RENDER HEADER (Responsive Text Sizing) ---
    headerRow.innerHTML = '';
    localizedDays.forEach((day, index) => {
        const isSunday = index === 0;
        const engDay = englishDays[index].substring(0, 3).toUpperCase();

        // Conditional Font Size for Tamil (Prevent Overlap)
        const localTextSize = (currentLang === 'ta') ? 'text-[9px] md:text-[11px]' : 'text-xs md:text-sm';

        const div = document.createElement('div');
        div.className = `w-full min-w-[3rem] md:min-w-[4rem] py-3 flex flex-col items-center justify-center text-center`;
        div.innerHTML = `
            <span class="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wider ${isSunday ? 'text-red-500' : ''}">${engDay}</span>
            ${currentLang !== 'en' ? `<span class="${localTextSize} font-bold text-red-600 font-oriya mt-0.5">${day}</span>` : ''}
        `;
        headerRow.appendChild(div);
    });

    // --- 2. RENDER GRID CELLS ---
    grid.innerHTML = '';
    const firstDay = new Date(data.year, data.month, 1).getDay();
    const daysInMonth = new Date(data.year, data.month + 1, 0).getDate();
    const today = new Date();

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('div');
        cell.className = 'bg-transparent'; // Invisible placeholder
        grid.appendChild(cell);
    }

    // Days
    let lastTithiIndex = -1;
    for (let d = 1; d <= daysInMonth; d++) {
        const isSunday = new Date(data.year, data.month, d).getDay() === 0;
        const isToday = (d === today.getDate() && data.month === today.getMonth() && data.year === today.getFullYear());
        const dateKey = `${data.year}-${data.month}-${d}`;
        const dateObj = new Date(data.year, data.month, d);

        // Calculations
        const astro = calculateTithi(dateObj);

        // --- DUPLICATE & KSHAYA FIXES ---
        let effectiveTithiIndex = astro.index;

        // 1. Amavasya Duplicate Fix (Hide 2nd Amavasya)
        if (astro.index === 29 && lastTithiIndex === 29) {
            effectiveTithiIndex = -1;
        }

        // 2. Kshaya Ekadashi Fix (If skipped, force visual on Dwadashi)
        // Checks: Jump from 9->11 (Shukla) or 24->26 (Krishna)
        if ((astro.index === 11 && lastTithiIndex === 9) || (astro.index === 26 && lastTithiIndex === 24)) {
            effectiveTithiIndex = astro.index - 1; // Force 10 or 25 (Ekadashi)
        }

        // 3. Double Ekadashi Fix (Hide First Day)
        // Check if current is Ekadashi (10 or 25)
        if (effectiveTithiIndex === 10 || effectiveTithiIndex === 25) {
            // Look ahead to next day
            if (d < daysInMonth) {
                const nextDateObj = new Date(data.year, data.month, d + 1);
                const nextAstro = calculateTithi(nextDateObj);
                if (nextAstro.index === effectiveTithiIndex) {
                    effectiveTithiIndex = -1; // Hide icon on first day
                }
            }
        }

        // 4. Double Purnima Fix (Hide Second Day)
        if (astro.index === 14 && lastTithiIndex === 14) {
            effectiveTithiIndex = -1;
        }

        // 5. Kshaya Purnima Fix (Skipped 14, Force on 13)
        // Check if current is Chaturdashi (13)
        if (effectiveTithiIndex === 13) {
            // Look ahead to next day to see if it jumps to Pratipada (15)
            if (d < daysInMonth) {
                const nextDateObj = new Date(data.year, data.month, d + 1);
                const nextAstro = calculateTithi(nextDateObj);
                if (nextAstro.index === 15) {
                    effectiveTithiIndex = 14; // Force Purnima
                }
            }
        }

        // Update tracker
        lastTithiIndex = astro.index;
        // -------------------------------

        const dayEvents = data.events.filter(e => e.date === d);

        // ==========================================
        // CONFIG 1: MOBILE STYLES (ORIGINAL)
        // ==========================================

        // 1. Mobile Background Logic (Exact Original Priority)
        let mobileBgClass = 'bg-white';
        if (isSunday) mobileBgClass = 'bg-red-50'; // Base Sunday color

        if (dayEvents.length > 0) {
            // Override Sunday if event exists
            if (dayEvents.some(e => e.symbol === '!')) mobileBgClass = 'bg-red-100';      // Festival
            else if (dayEvents.some(e => e.symbol === '^')) mobileBgClass = 'bg-green-100'; // Auspicious
            else if (dayEvents.some(e => e.symbol === '*')) mobileBgClass = 'bg-blue-100';  // Holiday
            else if (dayEvents.some(e => e.symbol === '>')) mobileBgClass = 'bg-gray-100';  // Other
        }

        // Today overrides everything on Mobile
        if (isToday) {
            mobileBgClass = 'bg-deep-red';
        }

        // 2. Mobile Tithi Icons (Exact Original SVGs)
        let originalIconHtml = '';
        if (effectiveTithiIndex === 14) originalIconHtml = TITHI_ICONS.purnima;
        else if (effectiveTithiIndex === 29) originalIconHtml = TITHI_ICONS.amavasya;
        else if (effectiveTithiIndex === 10) originalIconHtml = TITHI_ICONS.shukla_ekadashi;
        else if (effectiveTithiIndex === 25) originalIconHtml = TITHI_ICONS.ekadashi;

        // Wrap for mobile positioning
        if (originalIconHtml) {
             // Inject the class directly into the SVG string if needed, or wrap it
             // TITHI_ICONS strings usually contain absolute positioning styles inline.
             // We ensure they appear only on mobile by wrapping in a div.
             originalIconHtml = `<div class="mobile-tithi-icon md:hidden">${originalIconHtml}</div>`;
        }

        // ==========================================
        // CONFIG 2: DESKTOP STYLES (REFERENCE)
        // ==========================================

        // Helper: Get Color for Tithi
        const getTithiDotColor = (idx, pakshaName) => {
            if (idx === 10 || idx === 25) return "bg-purple-500";
            if (idx === 14) return "bg-orange-500";
            if (idx === 29) return "bg-rose-500";
            if (idx < 15) return "bg-green-400"; // Shukla Paksha
            return "bg-blue-400"; // Krishna Paksha
        };

        // --- NEW: Paksha Badge Logic ---
        const isShukla = astro.index < 15;
        const pakshaColor = isShukla
            ? "bg-amber-50 text-amber-700 border border-amber-200"
            : "bg-indigo-50 text-indigo-700 border border-indigo-200";

        const pakshaIcon = isShukla
            ? '<i class="fa-solid fa-sun text-[9px] text-amber-500"></i>'
            : '<i class="fa-solid fa-moon text-[9px] text-indigo-500"></i>';

        const pakshaLabel = astro.paksha.split(' ')[0]; // First word (Shukla/Krishna)

        const pakshaBadgeHtml = `
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${pakshaColor}">
                ${pakshaIcon} ${pakshaLabel}
            </span>
        `;

        // Desktop Pills
        let desktopPills = '';
        dayEvents.slice(0, 2).forEach(ev => {
            let pillColor = "bg-gray-100 text-gray-600";
            if(ev.symbol === '!') pillColor = "bg-red-50 text-red-800";
            else if(ev.symbol === '*') pillColor = "bg-blue-50 text-blue-700";
            else if(ev.symbol === '^') pillColor = "bg-orange-100 text-orange-800";
            desktopPills += `<span class="event-pill ${pillColor}">${ev.engName}</span>`;
        });

        // ==========================================
        // CONSTRUCT HTML
        // ==========================================
        const cell = document.createElement('div');

        // CONTAINER CLASSES MERGE:
        // Mobile: Uses 'mobileBgClass', 'min-h-[4rem]', 'p-1' (Compact)
        // Desktop: Uses 'md:bg-white', 'md:min-h-[140px]', 'md:p-3' (Spacious)
        let containerClasses = `grid-cell relative border rounded-lg md:rounded-xl p-1 md:p-3 cursor-pointer transition-all hover:shadow-md ${mobileBgClass} md:${mobileBgClass}`;

        // BORDER COLOR MERGE:
        // Mobile: Orange Border (Original)
        // Desktop: Green Border (Reference)
        if (isToday) containerClasses += " border-orange-400 md:border-green-500 shadow-md today-glow";
        else containerClasses += " border-gray-200";

        // Height classes match Original (mobile) vs Reference (desktop)
        containerClasses += " min-h-[4rem] md:min-h-[140px] h-auto flex flex-col overflow-hidden group";

        cell.className = containerClasses;
        cell.onclick = () => openDayModal(d, data);

        // --- 1. MOBILE INNER HTML (Matches Original EXACTLY) ---
        // text-lg, centered, absolute icon
        const mobileView = `
            <div class="md:hidden w-full h-full flex flex-col items-center justify-center cell-content-relative">
                <span class="text-lg font-bold leading-none ${isToday ? 'text-white' : (isSunday ? 'text-deepred' : 'text-gray-700')}">
                    ${toNativeNum(d, currentLang)}
                </span>
                ${originalIconHtml}
            </div>
        `;

        // --- 2. DESKTOP INNER HTML ---
        // Render Single Tithi (Primary)
        const dotColor = getTithiDotColor(astro.index, astro.paksha);
        const tithiRows = `
            <div class="flex items-center gap-2 pl-0.5 mt-1">
                 <div class="w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0 shadow-sm"></div>
                 <div class="text-sm font-extrabold text-gray-900 truncate leading-tight tracking-tight">
                    ${astro.tithi}
                 </div>
            </div>
        `;

        const desktopView = `
            <div class="hidden md:flex flex-col h-full justify-between w-full">
                ${isToday ? '<div class="today-badge">TODAY</div>' : ''}

                <div class="flex justify-between items-start">
                    <span class="text-2xl font-bold text-gray-800 ${isSunday ? 'text-red-600' : ''}">
                        ${toNativeNum(d, currentLang)}
                    </span>
                     <span class="w-4 h-4 opacity-80 block mt-2 drop-shadow-sm">
                        ${getMoonPhaseIcon((astro.index + 1) / 30)}
                    </span>
                </div>

                <div class="mt-2 flex flex-col gap-1">
                    <div class="flex items-center mb-0.5">
                        ${pakshaBadgeHtml}
                    </div>

                    ${tithiRows}

                    <div class="text-[11px] text-green-600 font-bold pl-3 truncate leading-tight">
                        ${astro.nakshatra}
                    </div>

                    <div class="flex flex-wrap gap-1 mt-1.5">
                        ${desktopPills}
                    </div>
                </div>
            </div>
        `;

        cell.innerHTML = mobileView + desktopView;
        grid.appendChild(cell);
    }
}

        // --- UPDATED HELPER: Calculate Auspicious & Inauspicious Timings ---
        function getSpecialTimes(date, sunrise, sunset) {
            if (!sunrise || !sunset) return { auspicious: [], inauspicious: [] };

            const dayOfWeek = date.getDay(); // 0 = Sunday
            const duration = (sunset - sunrise); // Duration in ms
            const part = duration / 8; // Rahu/Yama/Gulika use 8 parts
            const muhurta = duration / 15; // Auspicious timings use 15 parts

            // Slots (0-indexed parts of the day)
            const rahuSlots = [7, 1, 6, 4, 5, 3, 2];
            const yamaSlots = [4, 3, 2, 1, 0, 6, 5];
            const gulikaSlots = [6, 5, 4, 3, 2, 1, 0];

            const createTimeObj = (name, startMs, endMs, type, description, gradientClass, iconColor, themeKey) => {
                const s = new Date(startMs);
                const e = new Date(endMs);
                return {
                    name,
                    start: s,
                    end: e,
                    type,
                    description,
                    gradientClass,
                    iconColor,
                    themeKey,
                    duration: Math.round((e - s) / 60000) + 'm'
                };
            };

            const auspicious = [];
            const inauspicious = [];

            // --- INAUSPICIOUS ---

            // Rahu Kalam
            const rahuStart = sunrise.getTime() + (rahuSlots[dayOfWeek] * part);
            inauspicious.push(createTimeObj(
                "Rahu Kalam", rahuStart, rahuStart + part,
                "bad", "Strictly avoid for any new undertaking.",
                "bg-rust-gradient", "dot-rust", "rust"
            ));

            // Yamaganda
            const yamaStart = sunrise.getTime() + (yamaSlots[dayOfWeek] * part);
            inauspicious.push(createTimeObj(
                "Yamaganda", yamaStart, yamaStart + part,
                "bad", "Inauspicious period. Avoid travel.",
                "bg-crimson-gradient", "dot-crimson", "crimson"
            ));

            // Gulika Kalam
            const gulikaStart = sunrise.getTime() + (gulikaSlots[dayOfWeek] * part);
            inauspicious.push(createTimeObj(
                "Gulika Kalam", gulikaStart, gulikaStart + part,
                "neutral", "Period for repeating activities.",
                "bg-slate-gradient", "dot-slate", "slate"
            ));


            // --- AUSPICIOUS ---

            // Brahma Muhurta (Sunrise - 96m to -48m)
            const brahmaStart = sunrise.getTime() - (96 * 60000);
            const brahmaEnd = sunrise.getTime() - (48 * 60000);
            auspicious.push(createTimeObj(
                "Brahma Muhurta", brahmaStart, brahmaEnd,
                "good", "Ideal for meditation and learning.",
                "bg-gold-gradient", "dot-gold", "gold"
            ));

            // Pratah Sandhya (Sunrise - 48m to Sunrise)
            const pratahStart = sunrise.getTime() - (48 * 60000);
            auspicious.push(createTimeObj(
                "Pratah Sandhya", pratahStart, sunrise.getTime(),
                "good", "Time for morning prayers.",
                "bg-lavender-gradient", "dot-lavender", "lavender"
            ));

            // Abhijit Muhurat (8th Muhurta) - Usually skipped on Wednesday (3), but requested to always show.
            const abhijitStart = sunrise.getTime() + (7 * muhurta);
            const abhijitEnd = sunrise.getTime() + (8 * muhurta);
            auspicious.push(createTimeObj(
                "Abhijit Muhurat", abhijitStart, abhijitEnd,
                "good", "Victory over obstacles. Best for new beginnings.",
                "bg-emerald-gradient", "dot-emerald", "emerald"
            ));

            // Vijaya Muhurta (11th Muhurta)
            const vijayaStart = sunrise.getTime() + (10 * muhurta);
            const vijayaEnd = sunrise.getTime() + (11 * muhurta);
            auspicious.push(createTimeObj(
                "Vijaya Muhurta", vijayaStart, vijayaEnd,
                "good", "Time for victory and success.",
                "bg-royal-gradient", "dot-royal", "royal"
            ));

            // Amrit Kalam (Nakshatra Based)
            try {
                // Get Nakshatra Active at Sunrise to determine Amrit Kalam for the day
                const astro = VedicAstro.calculate(sunrise, 6);
                const nakName = astro.nakshatra;

                // Find index using keys since we don't have access to internal NAKSHATRAS array
                // But AMRIT_GHATIS keys match NAKSHATRAS names
                const nakIndex = Object.keys(VedicAstro.AMRIT_GHATIS).indexOf(nakName);

                if (nakIndex !== -1) {
                     const jd = astro.jd;
                     const times = VedicAstro.getNakshatraTimes(jd, nakIndex); // Returns JD {start, end}

                     // Convert JD to Date
                     const jdToDate = (j) => new Date((j - 2440587.5) * 86400000);
                     const nakStart = jdToDate(times.start);
                     const nakEnd = jdToDate(times.end);
                     const nakDur = nakEnd - nakStart;

                     const ghatis = VedicAstro.AMRIT_GHATIS[nakName]; // [start, end]
                     if (ghatis) {
                         const amritStart = new Date(nakStart.getTime() + (ghatis[0]/60 * nakDur));
                         const amritEnd = new Date(nakStart.getTime() + (ghatis[1]/60 * nakDur));

                         auspicious.push(createTimeObj(
                            "Amrit Kalam", amritStart, amritEnd,
                            "good", "Most auspicious time for any work.",
                            "bg-skyblue-gradient", "dot-skyblue", "skyblue"
                         ));
                     }
                }
            } catch (e) { console.error("Amrit Kalam Calc Failed", e); }


            // Sort
            auspicious.sort((a, b) => a.start - b.start);
            inauspicious.sort((a, b) => a.start - b.start);

            return { auspicious, inauspicious };
        }

        // --- UPDATED MAIN RENDER FUNCTION ---
        function renderPanchang(data) {
            const section = document.getElementById('sec-panchang');
            const pillsContainer = document.getElementById('panchang-pills');
            const list = document.getElementById('panchang-list');

            // Clear containers
            pillsContainer.innerHTML = '';
            list.innerHTML = '';

            // 1. Season (Ritu) Logic (Kept mostly same, but cleaner injection)
            const seasonIndex = getSeasonIndex(data.month);
            const seasonConfig = seasonUIConfig[seasonIndex];
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const seasonName = langObj.indianSeasons[seasonIndex];
            const seasonEmojis = ["🌸", "☀️", "⛈️", "🌾", "🌥️", "❄️"];
            // Colors for different seasons (Vasant: Pink, Grishma: Orange, Varsha: Blue, Sharad: Yellow, Hemant: Purple, Shishir: Sky Blue)
            const seasonTitleColors = ["#E83E8C", "#F97316", "#3B82F6", "#F59E0B", "#8B5CF6", "#0EA5E9"];

            // Retrieve detailed description
            const rawSeasonDesc = (appState.customSeasonDescriptions && appState.customSeasonDescriptions[seasonIndex])
                               ? appState.customSeasonDescriptions[seasonIndex]
                               : (langObj.seasonDescriptions ? langObj.seasonDescriptions[seasonIndex] : "");
            const seasonDescHtml = formatSeasonDescription(rawSeasonDesc);

            // Inject Season Card at the top of the list container
            const seasonCard = document.createElement('div');
            seasonCard.className = "season-ui-card group mb-4 flex-col items-start gap-4"; // Changed layout to column for better fit
            seasonCard.onclick = cycleSeasonCard;

            const rituImgUrl = (appState.config.customRituImages && appState.config.customRituImages[seasonIndex]) || defaultRituImages[seasonIndex];

            // Re-structured inner HTML to include banner image and glassmorphic layout
            seasonCard.innerHTML = `
                <div class="ritu-glass-card relative h-[160px] shrink-0" style="background-color: ${seasonTitleColors[seasonIndex]};">
                    <img src="${rituImgUrl}" data-season-index="${seasonIndex}" class="absolute inset-0 w-full h-full object-cover" alt="Ritu Banner" onerror="this.style.display='none';">
                    <div class="absolute inset-0 bg-gradient-to-tr from-black/90 to-transparent pointer-events-none"></div>
                    <div class="absolute inset-x-0 bottom-0 px-2 pt-4 flex flex-col pointer-events-none z-10" style="padding-bottom: 18px;">
                        <div class="flex items-center gap-1">
                            <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-sm text-base">${seasonEmojis[seasonIndex]}</div>
                            <span class="text-lg font-bold drop-shadow-lg leading-none" style="color: ${seasonTitleColors[seasonIndex]};">${seasonName}</span>
                        </div>
                        <span class="text-white/90 drop-shadow-lg font-medium" style="margin-left: 36px; margin-top: -2px; font-size: 12.5px;">${seasonConfig.dateRange}</span>
                    </div>
                </div>

                ${seasonDescHtml.trim() ? `
                <div class="ritu-glass-card p-4" style="background-color: ${seasonTitleColors[seasonIndex]}15; border: 1px solid ${seasonTitleColors[seasonIndex]}40;">
                    <div class="text-sm text-gray-700 leading-relaxed font-sans">
                        ${seasonDescHtml}
                    </div>
                </div>` : ''}
            `;

            const rituContainer = document.getElementById('ritu-content');
            if (rituContainer) {
                rituContainer.innerHTML = '';
                rituContainer.appendChild(seasonCard);
            } else {
                list.appendChild(seasonCard);
            }


            // 2. Astronomical Calculations (Sun/Moon/Times)
            const today = new Date();
            // Use Today if active month matches current, else 1st of active month
            const calcDate = (data.month === today.getMonth() && data.year === today.getFullYear())
                           ? new Date()
                           : new Date(data.year, data.month, 1);

            const autoData = calculateTithi(calcDate);

            // SunCalc Times
            let sunTimes = { sunrise: null, sunset: null };
            let moonTimes = { rise: null, set: null }; // Placeholder

            if (appState.config.location && SunCalc) {
                sunTimes = SunCalc.getTimes(calcDate, appState.config.location.lat, appState.config.location.lng);
                // Calculate Moon Times (SunCalc supports this)
                // Note: SunCalc library included in your file might be minimal.
                // If getMoonTimes exists use it, otherwise skip.
                if (SunCalc.getMoonTimes) {
                    moonTimes = SunCalc.getMoonTimes(calcDate, appState.config.location.lat, appState.config.location.lng);
                }
            }

            // 3. Render Astro Timeline (Sun/Moon Visual Strip)
            if (sunTimes.sunrise && sunTimes.sunset) {
                const fmt = (d) => d ? d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--';

                const timelineContainer = document.createElement('div');
                timelineContainer.className = "grid grid-cols-2 gap-2 md:gap-4 mb-6 -mx-2 md:mx-0";

                // Sun Card
                const sunCard = document.createElement('div');
                sunCard.className = "astro-timeline-modern flex flex-col justify-center h-full";
                sunCard.style.cssText = "background: linear-gradient(to right, rgb(173, 111, 38), rgb(188, 72, 67)); margin-bottom: 0 !important; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding-top: 12px; padding-bottom: 12px;";
                sunCard.innerHTML = `
    <div class="w-full text-center pb-2">
        <span class="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#FFD479]" data-i18n="solar_times" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">SOLAR TIMES</span>
    </div>
    <div class="flex justify-between items-center w-full relative">
        <div class="flex flex-col items-center flex-1">
            <span style="filter: drop-shadow(0 0 8px rgba(255,215,0,0.8)); display: inline-block; margin-bottom: 0.5rem;"><i class="fas fa-sun" style="font-size: 25px; background: linear-gradient(to bottom, #FFF3B0, #FFB347); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i></span>
            <span class="text-[9px] md:text-[10px] font-bold text-white/90 uppercase tracking-wider mb-1" data-i18n="sunrise">SUNRISE</span>
            <span class="text-[11px] md:text-base font-bold text-white tracking-wide">${fmt(sunTimes.sunrise)}</span>
        </div>
        <div class="h-16 md:h-20 w-px bg-white/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div class="flex flex-col items-center flex-1">
            <span style="filter: drop-shadow(0 0 8px rgba(255,215,0,0.8)); display: inline-block; margin-bottom: 0.5rem;"><i class="fas fa-cloud-sun" style="font-size: 25px; background: linear-gradient(to bottom, #FFF3B0, #FFB347); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i></span>
            <span class="text-[9px] md:text-[10px] font-bold text-white/90 uppercase tracking-wider mb-1" data-i18n="sunset">SUNSET</span>
            <span class="text-[11px] md:text-base font-bold text-white tracking-wide">${fmt(sunTimes.sunset)}</span>
        </div>
    </div>
`;

                // Moon Card
                const moonCard = document.createElement('div');
                moonCard.className = "astro-timeline-modern flex flex-col justify-center h-full relative overflow-hidden";
                moonCard.style.cssText = "background: linear-gradient(to right, rgb(61, 59, 109), rgb(60, 58, 108)); margin-bottom: 0 !important; border: 1px solid rgba(255, 255, 255, 0.2); border-radius: 20px; padding-top: 12px; padding-bottom: 12px;";
                moonCard.innerHTML = `

    <div class="w-full text-center pb-2">
        <span class="text-[10px] md:text-xs font-bold tracking-widest uppercase text-[#B6C2FF]" data-i18n="lunar_times" style="text-shadow: 0 1px 2px rgba(0,0,0,0.2);">LUNAR TIMES</span>
    </div>

    <!-- Twinkle Stars -->
    <div class="absolute text-white" style="top: 15px; left: 12%; width: 10px; height: 10px; filter: drop-shadow(0 0 3px rgba(255,255,255,1)); z-index: 10;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z"/>
</svg>
</div>
    <div class="absolute text-white/90" style="top: 25px; right: 15%; width: 12px; height: 12px; filter: drop-shadow(0 0 2px rgba(255,255,255,0.8)); z-index: 10;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z"/>
</svg>
</div>
    <div class="absolute text-white/80" style="top: 42px; left: 48%; transform: translateX(-50%); width: 6px; height: 6px; filter: drop-shadow(0 0 2px rgba(255,255,255,0.8)); z-index: 10;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z"/>
</svg>
</div>
    <div class="absolute text-white/90" style="bottom: 30px; right: 10%; width: 8.5px; height: 8.5px; filter: drop-shadow(0 0 2px rgba(255,255,255,0.8)); z-index: 10;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 0C12.5 8 16 11.5 24 12C16 12.5 12.5 16 12 24C11.5 16 8 12.5 0 12C8 11.5 11.5 8 12 0Z"/>
</svg>
</div>

    <!-- Background Tiny Dots -->
    <div class="absolute top-3 left-4 text-white/40" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute top-8 left-20 text-white/30" style="width: 3px; height: 3px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute top-4 right-20 text-white/50" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute top-10 right-6 text-white/30" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute bottom-10 left-5 text-white/40" style="width: 3px; height: 3px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute bottom-5 left-16 text-white/20" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute bottom-8 right-12 text-white/30" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute bottom-4 right-5 text-white/50" style="width: 3px; height: 3px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute top-1/2 left-3 text-white/30" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>
    <div class="absolute top-1/2 right-4 text-white/50" style="width: 2px; height: 2px;">
<svg viewBox="0 0 24 24" fill="currentColor" style="width: 100%; height: 100%;" xmlns="http://www.w3.org/2000/svg">
  <circle cx="12" cy="12" r="6"/>
</svg>
</div>

    <div class="flex justify-between items-center w-full relative">

        <div class="flex flex-col items-center flex-1">
            <span style="filter: drop-shadow(0 0 8px rgba(135,206,235,0.8)); display: inline-block; margin-bottom: 0.5rem;"><i class="fas fa-cloud-moon" style="font-size: 25px; background: linear-gradient(to bottom, #E0FFFF, #00BFFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i></span>
            <span class="text-[9px] md:text-[10px] font-bold text-white/90 uppercase tracking-wider mb-1" data-i18n="moonrise">MOONRISE</span>
            <span class="text-[11px] md:text-base font-bold text-white tracking-wide">${(typeof moonTimes !== 'undefined' && moonTimes && moonTimes.rise) ? fmt(moonTimes.rise) : '--:--'}</span>
        </div>
        <div class="h-16 md:h-20 w-px bg-white/20 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div class="flex flex-col items-center flex-1">
            <span style="filter: drop-shadow(0 0 8px rgba(135,206,235,0.8)); display: inline-block; margin-bottom: 0.5rem;"><i class="fas fa-moon" style="font-size: 25px; background: linear-gradient(to bottom, #E0FFFF, #00BFFF); -webkit-background-clip: text; -webkit-text-fill-color: transparent;"></i></span>
            <span class="text-[9px] md:text-[10px] font-bold text-white/90 uppercase tracking-wider mb-1" data-i18n="moonset">MOONSET</span>
            <span class="text-[11px] md:text-base font-bold text-white tracking-wide">${(typeof moonTimes !== 'undefined' && moonTimes && moonTimes.set) ? fmt(moonTimes.set) : '--:--'}</span>
        </div>
    </div>
`;

                timelineContainer.appendChild(sunCard);
                timelineContainer.appendChild(moonCard);
                list.appendChild(timelineContainer);
            }

            // 4. Merge Data (Manual > Auto)
            let displayData = { ...data.panchang };
            if (!displayData['Tithi']) displayData['Tithi'] = `${autoData.tithi} (${autoData.paksha})`;
            if (!displayData['Nakshatra']) displayData['Nakshatra'] = autoData.nakshatra;
            if (!displayData['Yoga']) displayData['Yoga'] = autoData.yoga;
            if (!displayData['Karana']) displayData['Karana'] = autoData.karana;


            // Add Upcoming Sankranti directly to displayData if it happens today
            const sankrantiToday = VedicAstro.getUpcomingSankranti(calcDate);
            if (sankrantiToday) {
                // If the exact date of sankranti matches calcDate
                if (sankrantiToday.dateObj.getDate() === calcDate.getDate() &&
                    sankrantiToday.dateObj.getMonth() === calcDate.getMonth() &&
                    sankrantiToday.dateObj.getFullYear() === calcDate.getFullYear()) {
                    let exactTimeFormatted = sankrantiToday.dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                    displayData['Sankranti'] = `${langObj.rashis[sankrantiToday.rashiIndex]} (${exactTimeFormatted})`;
                }
            }

            // Remove Sunrise/Sunset from grid (since we showed them in visual strip)

            delete displayData['Sunrise'];
            delete displayData['Sunset'];
            delete displayData['Month']; // Usually shown in header


            const solarInfo = VedicAstro.getSolarMonthDay(calcDate);
            const solarMonthName = langObj.solarMonths ? langObj.solarMonths[solarInfo.monthIndex] : langData.en.solarMonths[solarInfo.monthIndex];
            const solarDayNum = toNativeNum(solarInfo.day, currentLang);

            const solarCardDiv = document.createElement('div');
            solarCardDiv.className = "bg-orange-50/80 border border-orange-200 rounded-xl p-3 flex items-center gap-3 mb-4 shadow-sm";
            solarCardDiv.innerHTML = `
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
                    <i class="fa-solid fa-sun text-lg"></i>
                </div>
                <div>
                    <div class="text-[10px] font-bold text-gray-500 uppercase tracking-widest" data-i18n="solar_date">Solar Date</div>
                    <div class="text-sm font-extrabold text-gray-900">${solarMonthName} - <span data-i18n="day">Day</span> <span class="text-orange-600">${solarDayNum}</span></div>
                </div>
            `;
            list.appendChild(solarCardDiv);

            // 5. Render Data Grid (Tithi, Nakshatra, Yoga, Karana)

            const gridDiv = document.createElement('div');
            gridDiv.className = "panchang-grid";

            const keys = ['Tithi', 'Nakshatra', 'Yoga', 'Karana'];
            const icons = {
                'tithi': 'fa-cloud-moon',
                'nakshatra': 'fa-star',
                'yoga': 'fa-dharmachakra',
                'karana': 'fa-hourglass-half'
            };
            const colors = {
                'tithi': 'text-purple-600',
                'nakshatra': 'text-amber-500',
                'yoga': 'text-blue-500',
                'karana': 'text-teal-500'
            };

            keys.forEach(key => {
                let val = displayData[key] || displayData[key.toLowerCase()] || '-';
                let icon = icons[key.toLowerCase()] || 'fa-circle';
                let color = colors[key.toLowerCase()] || 'text-gray-500';

                // Helper to bold the Paksha part in Tithi
                if(key === 'Tithi' && val.includes('(')) {
                    val = val.replace(/\((.*?)\)/, '<span class="text-[9px] block text-gray-400 font-normal uppercase tracking-wide">$1</span>');
                }

                gridDiv.innerHTML += `
                    <div class="panchang-item">
                        <div class="panchang-label ${color}">
                            <i class="fa-solid ${icon}"></i> <span data-i18n="${key.toLowerCase()}">${key}</span>
                        </div>
                        <div class="panchang-value truncate" title="${val.replace(/<[^>]*>/g, '')}">
                            ${val}
                        </div>
                    </div>
                `;
            });

            // Add manual entries that are NOT in the standard keys
            Object.keys(displayData).forEach(k => {
                if (!keys.includes(k) && !keys.includes(k.charAt(0).toUpperCase() + k.slice(1))) {
                     gridDiv.innerHTML += `
                        <div class="panchang-item">
                            <div class="panchang-label text-gray-500"><i class="fa-solid fa-info-circle"></i> ${k}</div>
                            <div class="panchang-value truncate">${displayData[k]}</div>
                        </div>
                    `;
                }
            });

            list.appendChild(gridDiv);

            // Upcoming Tithis (Scan next 30 days)
            const upcoming = [];
            let scanDate = new Date(calcDate);
            scanDate.setDate(scanDate.getDate() + 1);
            for(let i=0; i<30; i++) {
                if (upcoming.length >= 3) break;
                const astro = calculateTithi(scanDate);
                if ([14, 29, 10, 25].includes(astro.index)) {
                    upcoming.push({
                        date: new Date(scanDate),
                        tithi: astro.tithi,
                        index: astro.index,
                        paksha: astro.paksha
                    });
                }
                scanDate.setDate(scanDate.getDate() + 1);
            }

            // Build Upcoming HTML
            if (upcoming.length > 0) {
                let upcomingHtml = '';
                upcoming.forEach(item => {
                    let bgColor = 'bg-amber-100 text-amber-800 border border-amber-200';
                    let iconHtml = TITHI_ICONS.ekadashi;
                    let title = 'Ekadashi';

                    if (item.index === 14) { bgColor = 'bg-orange-200 text-orange-900 border border-orange-300'; iconHtml = TITHI_ICONS.purnima; title = 'Purnima'; }
                    else if (item.index === 29) { bgColor = 'bg-gray-200 text-gray-800 border border-gray-300'; iconHtml = TITHI_ICONS.amavasya; title = 'Amavasya'; }

                    const dateStr = item.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

                    upcomingHtml += `
                        <div class="${bgColor} rounded-xl p-3 flex flex-col items-center text-center shadow-sm transform hover:scale-105 transition">
                            <div class="w-6 h-6 mb-1 drop-shadow-sm">${iconHtml}</div>
                            <div class="font-bold text-xs mb-0.5"><span data-i18n="${generateI18nKey(title)}">${title}</span></div>
                            <div class="text-[9px] opacity-80 uppercase font-bold leading-tight">${dateStr}</div>
                        </div>
                    `;
                });

                const upcomingContainer = document.createElement('div');
                upcomingContainer.className = "mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4";
                upcomingContainer.innerHTML = `
                    <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                        <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-regular fa-calendar-check"></i></div>
                        <span class="font-bold text-gray-600 text-xs uppercase tracking-wider" data-i18n="upcoming_tithis">Upcoming Tithis</span>
                    </div>
                    <div class="grid grid-cols-3 gap-3">
                        ${upcomingHtml}
                    </div>
                `;
                list.appendChild(upcomingContainer);
            }

            // Build Upcoming/Today Sankranti HTML
            let sankrantiScanDate = new Date(calcDate);
            const nextSankranti = VedicAstro.getUpcomingSankranti(sankrantiScanDate);

            if (nextSankranti) {
                let isTodaySankranti = (nextSankranti.dateObj.getDate() === calcDate.getDate() &&
                                        nextSankranti.dateObj.getMonth() === calcDate.getMonth() &&
                                        nextSankranti.dateObj.getFullYear() === calcDate.getFullYear());

                let exactTimeFormatted = nextSankranti.dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                let dateStr = nextSankranti.dateObj.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
                let rashiName = langObj.rashis[nextSankranti.rashiIndex];
                let titleText = isTodaySankranti ? "Today's Sankranti" : "Upcoming Sankranti";
                let dataI18n = isTodaySankranti ? "today_sankranti" : "upcoming_sankranti";
                let displayDateStr = isTodaySankranti ? `TODAY • ${exactTimeFormatted}` : `${dateStr} • ${exactTimeFormatted}`;

                const sankrantiContainer = document.createElement('div');
                sankrantiContainer.className = "mt-4 bg-white rounded-xl shadow-sm border border-gray-100 p-4";
                sankrantiContainer.innerHTML = `
                    <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                        <div class="w-7 h-7 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xs"><i class="fa-solid fa-sun"></i></div>
                        <span class="font-bold text-gray-600 text-xs uppercase tracking-wider" data-i18n="${dataI18n}">${titleText}</span>
                    </div>
                    <div class="bg-orange-50 border border-orange-200 text-orange-800 rounded-xl p-3 flex flex-col items-center text-center shadow-sm transform hover:scale-105 transition">
                        <div class="text-2xl mb-1 text-orange-500"><i class="fa-solid fa-sun"></i></div>
                        <div class="font-bold text-sm mb-0.5">${rashiName} Sankranti</div>
                        <div class="text-xs opacity-80 uppercase font-bold leading-tight">${displayDateStr}</div>
                    </div>
                `;
                list.appendChild(sankrantiContainer);
            }


        }

        function stopLiveClock() {
            if (liveClockInterval) {
                clearInterval(liveClockInterval);
                liveClockInterval = null;
            }
        }

        function updateLiveTimers() {
            const cards = document.querySelectorAll('.timeline-card[data-start][data-end]');
            const now = new Date();

            cards.forEach(card => {
                const start = parseInt(card.getAttribute('data-start'));
                const end = parseInt(card.getAttribute('data-end'));

                const badge = card.querySelector('.progress-badge');
                const pulseText = card.querySelector('.pulse-text');

                if (!badge) return;

                if (now < start) {
                    // FUTURE
                    const waitMs = start - now;
                    const waitMins = Math.ceil(waitMs / 60000);
                    const h = Math.floor(waitMins / 60);
                    const m = waitMins % 60;

                    badge.innerText = `UPCOMING IN ${h}H ${m}M`;
                    badge.classList.remove('badge-ending-soon');
                    if (pulseText) pulseText.style.display = 'none';
                    card.classList.remove('completed');

                } else if (now >= start && now <= end) {
                    // ACTIVE
                    const remainingMs = end - now;
                    const remMins = Math.ceil(remainingMs / 60000);
                    const h = Math.floor(remMins / 60);
                    const m = remMins % 60;

                    // "Ending Soon" Logic (less than 15 mins)
                    if (remMins <= 15) {
                        badge.innerText = "Ending Soon";
                        badge.classList.add('badge-ending-soon');
                    } else {
                        badge.innerText = `ENDS IN ${h}H ${m}M`;
                        badge.classList.remove('badge-ending-soon');
                    }

                    if (pulseText) pulseText.style.display = 'inline-block';
                    card.classList.remove('completed');

                } else {
                    // COMPLETED
                    badge.innerHTML = `<span data-i18n="completed">Completed</span>`;
                    badge.classList.remove('badge-ending-soon');
                    if (pulseText) pulseText.style.display = 'none';
                    card.classList.add('completed');
                }
            });
        }

        function startLiveClock() {
            stopLiveClock();

            const updateTime = () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
                const el = document.getElementById('live-clock-time');
                if (el) {
                    el.innerText = timeString;
                }
                const el2 = document.getElementById('timings-clock');
                if (el2) {
                    el2.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                }

                // Dynamic Timers Hook
                updateLiveTimers();
            };

            updateTime();
            liveClockInterval = setInterval(updateTime, 1000);
        }

        function adjustUpNextIcon(card) {
            const wrapper = card.querySelector('.up-next-om-wrapper');
            const icon = card.querySelector('.up-next-om-icon');
            if (!wrapper || !icon) return;

            const w = card.offsetWidth;
            const h = card.offsetHeight;

            // Default constraints for mobile and desktop
            let maxSize = 240;
            let size = Math.max(140, Math.min(w * 0.4, h * 1.8, maxSize));
            let bottomOffset = -size * 0.15;
            let rightOffset = -size * 0.05;

            // On wide-screen tablets, the icon was getting cut off, slightly decrease the size
            if (window.innerWidth >= 768 && window.innerWidth < 1024) {
                maxSize = 140;
                size = Math.max(100, Math.min(w * 0.28, h * 1.5, maxSize));
                bottomOffset = -size * 0.20; // shift slightly up from previous iteration
                rightOffset = -size * 0.05; // use same right proportional shift
            }

            icon.style.width = `${size}px`;
            icon.style.height = `${size}px`;
            wrapper.style.bottom = `${bottomOffset}px`;
            wrapper.style.right = `${rightOffset}px`;
        }

        function renderTimings(data) {
            const container = document.getElementById('sec-timings');
            if (!container) return;

            const today = new Date();
            const calcDate = (data.month === today.getMonth() && data.year === today.getFullYear())
                           ? new Date()
                           : new Date(data.year, data.month, 1);

            let sunTimes = { sunrise: null, sunset: null };
            let result = { auspicious: [], inauspicious: [] };

            if (appState.config.location && SunCalc) {
                sunTimes = SunCalc.getTimes(calcDate, appState.config.location.lat, appState.config.location.lng);
                if (sunTimes.sunrise && sunTimes.sunset) {
                    result = getSpecialTimes(calcDate, sunTimes.sunrise, sunTimes.sunset);
                }
            }

            if (result.auspicious.length === 0 && result.inauspicious.length === 0) {
                container.classList.add('hidden');
                return;
            }

            container.classList.remove('hidden');
            const dateStr = calcDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
            const now = new Date();
            const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            // Timing Analysis Visualization logic
            let timingAnalysisHtml = '';
            const dayStart = new Date(calcDate);
            dayStart.setHours(6, 0, 0, 0); // View window start (e.g., 06:00)
            const dayEnd = new Date(calcDate);
            dayEnd.setHours(18, 0, 0, 0);   // View window end (e.g., 18:00)
            const totalMs = dayEnd - dayStart;

            if (totalMs > 0) {
                // Calculate "NOW" position
                let nowPercent = ((now - dayStart) / totalMs) * 100;
                nowPercent = Math.max(0, Math.min(100, nowPercent)); // Clamp between 0 and 100

                // Generate events
                let eventsHtml = '';

                // Helper to add events
                const addEventToTimeline = (eventItem, cssClass) => {
                    // Only show specific major ones for cleanliness or all if preferred. Let's do Abhijit and Rahu Kalam as requested, or generally filter.
                    const name = eventItem.name.toUpperCase();
                    if (name.includes("ABHIJIT") || name.includes("RAHU")) {
                        let startPercent = ((eventItem.start - dayStart) / totalMs) * 100;
                        let endPercent = ((eventItem.end - dayStart) / totalMs) * 100;

                        // Only render if it falls within our view window
                        if (endPercent > 0 && startPercent < 100) {
                            startPercent = Math.max(0, startPercent);
                            endPercent = Math.min(100, endPercent);
                            const width = endPercent - startPercent;

                            // Clean up name for label (remove "Kalam", "Muhurat")
                            let displayName = name.replace(" KALAM", "").replace(" MUHURAT", "").trim();

                            eventsHtml += `
                                <div class="timing-event ${cssClass}" style="left: ${startPercent}%; width: ${width}%;">
                                    <div class="timing-event-label">${displayName}</div>
                                </div>
                            `;
                        }
                    }
                };

                result.auspicious.forEach(item => addEventToTimeline(item, 'auspicious'));
                result.inauspicious.forEach(item => addEventToTimeline(item, 'inauspicious'));

                timingAnalysisHtml = `
                <div class="timing-analysis-wrapper">
                    <div class="timing-analysis-header">
                        <div class="timing-analysis-title"><span data-i18n="timing_analysis">TIMING ANALYSIS</span></div>
                        <div class="timing-analysis-live">LIVE</div>
                    </div>
                    <div class="timing-track-container">
                        <div class="timing-baseline"></div>

                        <!-- Timeline Markers (6:00 AM, 12:00 PM, 6:00 PM) -->
                        <div class="timing-marker" style="left: 0%;">
                            <div class="timing-marker-label text-center">6:00 AM</div>
                        </div>
                        <div class="timing-marker" style="left: 50%;">
                            <div class="timing-marker-label text-center">12:00 PM</div>
                        </div>
                        <div class="timing-marker" style="left: 100%;">
                            <div class="timing-marker-label text-center">6:00 PM</div>
                        </div>

                        ${eventsHtml}

                        <!-- NOW Indicator -->
                        <div class="timing-now-indicator" style="left: ${nowPercent}%;">
                            <div class="timing-now-badge"><span data-i18n="now">NOW</span></div>
                        </div>
                    </div>
                </div>
                `;
            }

            let html = `
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
            `;

            // Helper to render a list
            const renderList = (list, title, titleColorClass, iconHtml, bgIconClass) => {
                if (list.length === 0) return '';

                let listHtml = `
                <div class="mt-8 mb-4 flex items-center gap-3 relative z-30">
                    <div class="w-8 h-8 rounded-full ${bgIconClass} flex items-center justify-center ${titleColorClass} shadow-sm">
                        ${iconHtml}
                    </div>
                    <h4 class="font-bold ${titleColorClass} text-sm uppercase tracking-widest m-0">${title}</h4>
                    <div class="flex-grow h-px bg-gradient-to-r from-gray-200 to-transparent"></div>
                </div>
                <div class="timeline-container mt-2">`;

                list.forEach(m => {
                    const isActive = (now >= m.start && now <= m.end);
                    const isUpcoming = (now < m.start);
                    const isCompleted = (!isActive && !isUpcoming);

                    const startStr = m.start.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                    const endStr = m.end.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                    // Pill Footer Logic
                    let footerHtml = '';
                    const [startTime, startPeriod] = startStr.split(' ');
                    const [endTime, endPeriod] = endStr.split(' ');

                    // Determine status text for active/upcoming
                    let statusText = '';
                    let isEndingSoon = false;

                    if (isActive) {
                        const remainingMs = m.end - now;
                        const remMins = Math.ceil(remainingMs / 60000);
                        const h = Math.floor(remMins / 60);
                        const mTime = remMins % 60;

                        if(remMins <= 15) {
                            statusText = "Ending Soon";
                            isEndingSoon = true;
                        } else {
                            statusText = `ENDS IN ${h}H ${mTime}M`;
                        }
                    } else if (isUpcoming) {
                        const waitMs = m.start - now;
                        const waitMins = Math.ceil(waitMs / 60000);
                        const h = Math.floor(waitMins / 60);
                        const mTime = waitMins % 60;
                        statusText = `UPCOMING IN ${h}H ${mTime}M`;
                    } else {
                        statusText = `<span data-i18n="completed">Completed</span>`;
                    }

                    const pillClass = `badge-${m.themeKey}`;
                    const footerClass = `footer-${m.themeKey}`;
                    const badgeClass = isEndingSoon ? 'badge-ending-soon' : '';

                    // Unified Footer HTML (Compatible with Live Updates)
                    footerHtml = `
                    <div class="card-footer ${footerClass}" style="display: block;">
                        <div class="flex justify-center items-center">
                            <div class="glass-time-box border-r-0" style="border-radius: 12px 0 0 12px;">
                                    <span class="label">Start</span>
                                    <span class="time">${startTime}</span>
                                    <span class="period">${startPeriod}</span>
                            </div>

                            <div class="glass-time-box" style="border-radius: 0 12px 12px 0;">
                                    <span class="label">End</span>
                                    <span class="time">${endTime}</span>
                                    <span class="period">${endPeriod}</span>
                            </div>
                        </div>
                    </div>`;

                    listHtml += `
                        <div class="timeline-item">
                            <div class="timeline-card ${m.gradientClass} ${isCompleted ? 'completed' : ''} overflow-visible mt-1" data-start="${m.start.getTime()}" data-end="${m.end.getTime()}">

                                <!-- Status Badge (Top Left) -->
                                <div class="absolute top-0 left-0 z-20" style="top: -6px; left: -1px;">
                                    <span class="progress-badge ${pillClass} ${badgeClass} shadow-lg border-white/20 backdrop-blur-md uppercase tracking-wider px-2 py-0.5 text-[8px] font-bold block" style="border-radius: 10px 0 10px 0; border-width: 1px 1px 1px 0px;">${statusText}</span>
                                </div>

                                <div class="relative w-full h-full overflow-hidden rounded-xl">
                                    <div class="card-content relative pt-4">
                                        <div class="card-text-area mt-1">
                                            <h2 class="card-title"><span data-i18n="${generateI18nKey(m.name, 'title')}">${m.name}</span></h2>
                                            <p class="card-desc" style="color: rgba(255,255,255,0.9);"><span data-i18n="${generateI18nKey(m.name, 'desc')}">${m.description}</span></p>
                                        </div>

                                        <!-- Footer Wrapper to allow relative positioning for Active Badge -->
                                        <div class="relative mt-auto pt-3">
                                            <div class="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30" style="display: ${isActive ? 'block' : 'none'}">
                                                <span class="pulse-text bg-amber-600/90 border-amber-400/50 shadow-lg px-2 py-0.5 text-[8px] tracking-widest whitespace-nowrap" style="backdrop-filter: blur(12px); border-radius: 9999px;">ACTIVE NOW</span>
                                            </div>
                                            ${footerHtml}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                });
                listHtml += `</div>`;
                return listHtml;
            };

            html += renderList(result.auspicious, '<span data-i18n="auspicious_timings_header">Auspicious Timings</span>', 'text-green-700', '<i class="fa-solid fa-star text-xs"></i>', 'bg-green-50 border border-green-100');
            html += renderList(result.inauspicious, '<span data-i18n="inauspicious_timings_header">Inauspicious Timings</span>', 'text-red-700', '<i class="fa-solid fa-circle-exclamation text-xs"></i>', 'bg-red-50 border border-red-100');

            container.innerHTML = html;
            applyCustomLabels();
            startLiveClock(); // Ensure clock restarts
        }

        function renderFestivals(data) {
            stopLiveClock();
            const section = document.getElementById('sec-festivals');
            section.innerHTML = '';

            // 0. Decoration (Quarter-Circle)
            const deco = document.createElement('div');
            deco.className = "absolute top-0 right-0 -mr-4 -mt-4 pointer-events-none";
            Object.assign(deco.style, {
                width: '6rem', // w-24
                height: '6rem', // h-24
                background: 'linear-gradient(to right bottom, rgba(239, 68, 68, 0.1), transparent)', // bg-gradient-to-br from-red-500/10
                borderBottomLeftRadius: '100%' // rounded-bl-full
            });
            section.appendChild(deco);

            // 1. Header
            const header = document.createElement('div');
            header.className = "flex justify-between items-center mb-4 relative z-10 min-w-0 gap-2";

            const titleHtml = `<h3 class="font-bold text-gray-900 text-base flex items-center gap-2 m-0 shrink-0"><i class="fa-solid fa-bell text-red-600 text-lg"></i> <span data-i18n="festivals_header">Festivals</span></h3>`;

            let locBtnHtml = '';
            if (appState.config.location) {
                 const locName = appState.config.location.name || `${appState.config.location.lat.toFixed(2)}, ${appState.config.location.lng.toFixed(2)}`;
                 locBtnHtml = `
                    <button onclick="openLocationModal()" class="flex items-center gap-1.5 transition active:scale-95 min-w-0 max-w-[60%] sm:max-w-[70%] cursor-pointer bg-transparent border-0 p-0 text-left">
                        <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-500 text-sm shrink-0"></i>
                        <div class="bg-green-50 hover:bg-green-100 text-green-700 py-1 rounded-lg text-[10px] font-bold border border-green-200 shadow-sm min-w-0 flex-1">
                            <span style="display: inline-block; max-width: 150px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; padding-left: 8px; padding-right: 8px; vertical-align: middle;">${locName}</span>
                        </div>
                    </button>
                 `;
            } else {
                 locBtnHtml = `
                    <button onclick="openLocationModal()" class="flex items-center gap-1.5 transition active:scale-95 min-w-0 cursor-pointer bg-transparent border-0 p-0 text-left">
                        <i class="fa-solid fa-location-dot animate-slight-bounce text-orange-500 text-sm shrink-0"></i>
                        <div class="bg-orange-50 hover:bg-orange-100 text-orange-700 px-3.5 py-1 rounded-lg text-[10px] font-bold border border-orange-200 shadow-sm">
                            <span style="display: inline-block; white-space: nowrap; padding-left: 8px; padding-right: 8px; vertical-align: middle;">Location</span>
                        </div>
                    </button>
                 `;
            }

            header.innerHTML = `${titleHtml}${locBtnHtml}`;
            section.appendChild(header);

            // 2. Up Next Card logic
            const listEvents = data.events
                .filter(e => (e.symbol === '!' || e.symbol === '^' || e.symbol === '*' || e.symbol === '>'))
                .sort((a, b) => a.date - b.date);

            const upNextEvents = listEvents.filter(e => e.symbol !== '>');

            let upNextEvent = null;
            let upNextMonthData = data;
            const realToday = new Date();
            const isCurrentMonth = (data.month === realToday.getMonth() && data.year === realToday.getFullYear());
            const isFutureMonth = new Date(data.year, data.month, 1) > realToday;

            if (isCurrentMonth) {
                upNextEvent = upNextEvents.find(e => e.date >= realToday.getDate());
            } else if (isFutureMonth) {
                upNextEvent = upNextEvents[0];
            }

            // If no upcoming festival found in the viewed month (but we are in current or future month), look ahead globally
            if (!upNextEvent && (isCurrentMonth || isFutureMonth)) {
                if (appState.monthsData) {
                    const futureMonths = appState.monthsData.filter(m => {
                        return (m.year > data.year) || (m.year === data.year && m.month > data.month);
                    }).sort((a, b) => {
                        if (a.year !== b.year) return a.year - b.year;
                        return a.month - b.month;
                    });

                    for (const m of futureMonths) {
                        const mEvents = m.events
                            .filter(e => (e.symbol === '!' || e.symbol === '^' || e.symbol === '*'))
                            .sort((a, b) => a.date - b.date);
                        if (mEvents.length > 0) {
                            upNextEvent = mEvents[0];
                            upNextMonthData = m;
                            break;
                        }
                    }
                }
            }

            if (upNextEvent) {
                const eventDate = new Date(upNextMonthData.year, upNextMonthData.month, upNextEvent.date);

                // Diff days
                const t1 = new Date(realToday.getFullYear(), realToday.getMonth(), realToday.getDate());
                const t2 = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
                const diffTime = t2 - t1;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let badgeText = "";
                if (diffDays === 0) badgeText = "Today";
                else if (diffDays === 1) badgeText = "Tomorrow";
                else if (diffDays < 7) badgeText = `In ${diffDays} days`;
                else badgeText = `${upNextEvent.date} ${shortMonths[upNextMonthData.month]}`;

                // --- CARD 1: Event Details ---
                const eventCard = document.createElement('div');
                eventCard.className = "mb-3 relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-95";
                eventCard.onclick = () => openDayModal(upNextEvent.date, upNextMonthData);
                eventCard.style.background = "linear-gradient(135deg, #f15a24 0%, #ed1c24 50%, #800000 100%)";
                eventCard.style.boxShadow = "0 10px 15px -3px rgba(249, 115, 22, 0.4), 0 4px 6px -4px rgba(249, 115, 22, 0.4)";

                eventCard.innerHTML = `
                    <div class="p-4 relative z-10 text-white flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                             <div class="text-[10px] font-bold opacity-90 tracking-widest uppercase flex items-center gap-2">
                                <i class="fa-regular fa-calendar"></i> UP NEXT
                             </div>
                             <div class="bg-white/20 backdrop-blur-[10px] px-3 py-1 rounded-full text-[10px] font-bold border border-white/50 shadow-lg">
                                ${badgeText}
                             </div>
                        </div>

                        <div>
                            <h3 class="font-extrabold text-lg leading-tight mb-1 drop-shadow-sm whitespace-normal">${upNextEvent.engName}</h3>
                            <p class="text-sm font-medium opacity-90 font-oriya leading-relaxed">${upNextEvent.locName || ''}</p>
                        </div>
                    </div>
                    <div class="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 rounded-full bg-black/5 blur-xl pointer-events-none"></div>
                    <div class="absolute bottom-0 right-0 opacity-12 pointer-events-none up-next-om-wrapper">
                        <svg class="text-white up-next-om-icon" viewBox="465.9997 -33.2869 1628.0002 1666.5739" fill="currentColor">
                            <g transform="translate(-210.63 -364.11)">
                                <path d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/>
                                <path d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135 c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915 L1383.3402,445.9915z"/>
                                <path d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037 l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869 c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077 c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576 c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626 c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602 c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248 c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093 c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/>
                            </g>
                        </svg>
                    </div>
                `;
                section.appendChild(eventCard);

                // Automatic fitting algorithm
                adjustUpNextIcon(eventCard);
                const ro = new ResizeObserver(() => adjustUpNextIcon(eventCard));
                ro.observe(eventCard);

            }

            // --- CARD 2: Clock (Always Visible) ---
            const clockCard = document.createElement('div');
            clockCard.className = "mb-4 relative overflow-hidden rounded-xl shadow-lg";
            clockCard.style.background = "linear-gradient(135deg, #f15a24 0%, #ed1c24 50%, #800000 100%)"; // Same gradient aesthetic
            clockCard.style.boxShadow = "0 10px 15px -3px rgba(249, 115, 22, 0.4), 0 4px 6px -4px rgba(249, 115, 22, 0.4)";

            clockCard.innerHTML = `
                <div class="p-3 relative z-10 text-white text-center flex flex-col items-center justify-center h-full">
                     <div id="live-clock-time" class="text-xl md:text-2xl font-mono font-bold tracking-tight drop-shadow-md whitespace-nowrap">--:--:-- --</div>
                     <div class="text-[9px] uppercase tracking-[0.2em] opacity-80 font-semibold mt-1"><span data-i18n="current_time">Current Time</span></div>
                </div>
                <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
            `;
            section.appendChild(clockCard);

            startLiveClock();

            // 3. Search Bar
            const searchWrapper = document.createElement('div');
            searchWrapper.className = "relative mb-3 group";
            searchWrapper.innerHTML = `
                <div class="absolute inset-y-0 left-0 pl-4 z-10 flex items-center pointer-events-none">
                    ${SEARCH_ICON_SVG.replace('<svg', '<svg class="text-gray-400 group-focus-within:text-orange-500 transition-colors"')}
                </div>
                <input type="text" id="festival-search"
                    class="block w-full pl-10 pr-10 py-2.5 text-sm text-gray-700 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-400 placeholder-gray-400 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="Search..."
                    autocomplete="off">
                <button id="search-clear" class="absolute inset-y-0 right-2 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer hidden">
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
            `;
            section.appendChild(searchWrapper);

            // --- SMART-LINE FILTER BUTTONS ---
            const filterContainer = document.createElement('div');
            filterContainer.id = "festival-filters";
            filterContainer.className = "flex flex-wrap gap-2 mb-4 justify-center";

            const currentLang = appState.config.language || 'en';
            const localizedFilters = langData[currentLang] ? langData[currentLang].filters : langData.en.filters;

            const filters = [
                { id: '!', label: localizedFilters[0], icon: TEMPLE_ICON_SVG.replace('width="24" height="24"', 'width="14" height="14"').replace('fill="currentColor"', 'fill="currentColor"'), color: 'red' },
                { id: '^', label: localizedFilters[1], icon: '<svg width="14" height="14" viewBox="465.9997 -33.2869 1628.0002 1666.5739" fill="currentColor"><g transform="translate(-210.63 -364.11)"><path d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/><path d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135 c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915 L1383.3402,445.9915z"/><path d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037 l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869 c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077 c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576 c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626 c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602 c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248 c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093 c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/></g></svg>', color: 'green' },
                { id: '*', label: localizedFilters[2], icon: HOLIDAY_ICON_SVG.replace('width="24" height="24"', 'width="14" height="14"').replace('fill="currentColor"', 'fill="currentColor"'), color: 'blue' },
                { id: '>', label: localizedFilters[3] || "Other Events", icon: CALENDAR_ICON_SVG.replace('width="24" height="24"', 'width="14" height="14"').replace('fill="currentColor"', 'fill="currentColor"'), color: 'gray' }
            ];

            filters.forEach(f => {
                const isSelected = (currentIsolationFilter === f.id);
                const btn = document.createElement('button');

                // RESPONSIVE LOGIC: flex-1 on mobile, sm:flex-none on desktop
                let className = `
                    filter-btn relative px-5 py-2.5 rounded-full
                    text-sm font-bold whitespace-nowrap outline-none
                    flex items-center justify-center gap-2
                    flex-1 sm:flex-none min-w-[fit-content]
                    transition-all duration-200 hover:scale-105 active:scale-95
                `;

                let colorClass = "";
                // SOLID GLOW LOGIC (Both Active & Inactive are solid)
                if (f.color === 'red') {
                    colorClass = "bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-red-600";
                } else if (f.color === 'green') {
                    colorClass = "bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-green-600";
                } else if (f.color === 'blue') {
                    colorClass = "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-blue-600";
                } else if (f.color === 'gray') {
                    colorClass = "bg-gray-600 text-white shadow-lg shadow-gray-200 hover:bg-gray-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-gray-600";
                }

                btn.className = `${className} ${colorClass}`;
                btn.innerHTML = `${f.icon} <span>${f.label}</span>`;
                btn.onclick = () => toggleFilter(f.id);
                filterContainer.appendChild(btn);
            });
            section.appendChild(filterContainer);

            // --- TAG FILTER BUTTONS ---
            const allTags = new Set();
            if (data && data.year !== undefined && data.month !== undefined) {
                const detailsPrefix = `${data.year}-${data.month}-`;
                const recurringPrefix1 = `${data.month}-`;
                const recurringPrefix2 = `rec-${data.month}-`;

                Object.keys(appState.details).forEach(key => {
                    if (key.startsWith(detailsPrefix)) {
                        const dArray = appState.details[key] || [];
                        dArray.forEach(d => {
                            if (d.tags) d.tags.forEach(t => allTags.add(t));
                        });
                    }
                });

                Object.keys(appState.recurringDetails).forEach(key => {
                    if (key.startsWith(recurringPrefix1) || key.startsWith(recurringPrefix2)) {
                        const dArray = appState.recurringDetails[key] || [];
                        dArray.forEach(d => {
                            if (d.tags) d.tags.forEach(t => allTags.add(t));
                        });
                    }
                });
            }

            if (allTags.size > 0) {
                const tagContainer = document.createElement('div');
                tagContainer.id = "festival-tag-filters";
                tagContainer.className = "flex flex-wrap gap-2 mb-4 justify-center";

                const sortedTags = Array.from(allTags).sort();
                sortedTags.forEach(tag => {
                    const displayTag = tag.startsWith('#') ? tag.toLowerCase() : '#' + tag.toLowerCase();
                    const isSelected = (currentTagFilter === displayTag);
                    const tagBtn = document.createElement('button');
                    tagBtn.className = `inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 ${isSelected ? 'ring-2 ring-offset-2 ring-gray-400 scale-105' : 'opacity-80 hover:opacity-100'}`;
                    tagBtn.style.cssText = getTagStyle(displayTag);
                    tagBtn.innerText = displayTag;
                    tagBtn.onclick = () => toggleTagFilter(displayTag);
                    tagContainer.appendChild(tagBtn);
                });
                section.appendChild(tagContainer);
            }

            // 5. Festival List Container
            const list = document.createElement('ul');
            list.id = 'festival-list';
            list.className = "space-y-2 text-sm max-h-[350px] overflow-y-auto pr-1 custom-scroll";
            section.appendChild(list);

            const input = searchWrapper.querySelector('input');
            const clearBtn = searchWrapper.querySelector('#search-clear');

            input.oninput = (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length > 0) {
                    clearBtn.classList.remove('hidden');
                    // Global Search: Aggregate all events
                    let allEvents = [];
                    if (appState.monthsData) {
                        appState.monthsData.forEach(m => {
                            // Filter allowed symbols first (using same logic as listEvents)
                            const mEvents = m.events.filter(ev => ['!','^','*','>'].includes(ev.symbol));
                            mEvents.forEach(ev => {
                                // Attach context for global rendering
                                allEvents.push({ ...ev, monthIndex: m.month, year: m.year, _monthData: m });
                            });
                        });
                        // Sort by Date (Year, Month, Day)
                        allEvents.sort((a,b) => {
                            if (a.year !== b.year) return a.year - b.year;
                            if (a.monthIndex !== b.monthIndex) return a.monthIndex - b.monthIndex;
                            return a.date - b.date;
                        });
                    }
                    renderFestivalListItems(list, allEvents, null, query);
                }
                else {
                    clearBtn.classList.add('hidden');
                    renderFestivalListItems(list, listEvents, data, "");
                }
            };

            clearBtn.onclick = () => {
                input.value = '';
                clearBtn.classList.add('hidden');
                input.focus();
                renderFestivalListItems(list, listEvents, data, "");
            };

            renderFestivalListItems(list, listEvents, data, "");
        }

        function renderFestivalListItems(container, events, monthData, query) {
            container.innerHTML = '';
            const filtered = events.filter(e => {
                const matchesQuery = (e.engName.toLowerCase().includes(query) || (e.locName && e.locName.toLowerCase().includes(query)));
                // ISOLATION LOGIC: Show if filter is null OR matches specific symbol
                const matchesFilter = (currentIsolationFilter === null) || (e.symbol === currentIsolationFilter);

                let matchesTag = true;
                if (currentTagFilter !== null) {
                    const monthInfo = monthData || appState.monthsData.find(m => m.month === e.monthIndex && m.year === e.year);
                    const dateKey = `${monthInfo.year}-${monthInfo.month}-${e.date}`;
                    const detailsObj = appState.details[dateKey] || [];
                    const recurringObj = appState.recurringDetails[`${monthInfo.month}-${e.date}`] || [];
                    const allDayDetails = [...detailsObj, ...recurringObj];

                    let hasTag = false;
                    allDayDetails.forEach(d => {
                        if (d.tags) {
                            d.tags.forEach(t => {
                                const dt = t.startsWith('#') ? t.toLowerCase() : '#' + t.toLowerCase();
                                if (dt === currentTagFilter) hasTag = true;
                            });
                        }
                    });
                    matchesTag = hasTag;
                }

                return matchesQuery && matchesFilter && matchesTag;
            });

            if (filtered.length === 0) {
                const msg = query ? "No events found" : "No events selected";
                container.innerHTML = `<li class="text-center text-gray-400 text-xs py-4 italic">${msg}</li>`;
                return;
            }

            // Group events by date (YYYY-MM-DD) to prevent double badges
            const groups = [];
            const seenKeys = new Set();

            filtered.forEach(ev => {
                 const mData = monthData || ev._monthData;
                 const mIndex = (monthData) ? monthData.month : ev.monthIndex;
                 const year = (monthData) ? monthData.year : ev.year;
                 const key = `${year}-${mIndex}-${ev.date}`;

                 if (!seenKeys.has(key)) {
                     seenKeys.add(key);
                     groups.push({
                        date: ev.date,
                        monthIndex: mIndex,
                        year: year,
                        mData: mData,
                        events: [ev]
                     });
                 } else {
                     const g = groups.find(g => g.year === year && g.monthIndex === mIndex && g.date === ev.date);
                     if (g) g.events.push(ev);
                 }
            });

            const today = new Date();

            groups.forEach(group => {
                const li = document.createElement('li');

                li.onclick = () => openDayModal(group.date, group.mData);

                // Determine Badge Color (Priority: ! > ^ > * > >)
                const symbols = group.events.map(e => e.symbol);
                let symbol = '>';
                if (symbols.includes('!')) symbol = '!';
                else if (symbols.includes('^')) symbol = '^';
                else if (symbols.includes('*')) symbol = '*';

                // Highlight ONLY if it is exactly today's date
                const isToday = (group.date === today.getDate() && group.monthIndex === today.getMonth() && group.year === today.getFullYear());

                let badgeClass = "badge-glass-gray";
                let liClass = "flex gap-3 items-center p-2 rounded-lg transition-all cursor-pointer group ";
                let badgeStyle = "";
                let shadowClass = "shadow-md";

                if (symbol === '!') {
                    badgeClass = "badge-glass-red";
                    liClass += isToday ? "bg-red-50 border-2 border-red-200 hover:bg-red-100" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #dc2626;"'; // Exact hex for red
                        shadowClass = "shadow-glow-red";
                    }
                } else if (symbol === '^') {
                    badgeClass = "badge-glass-green";
                    liClass += isToday ? "bg-green-50 border-2 border-green-200 hover:bg-green-100" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #16a34a;"'; // Exact hex for green
                        shadowClass = "shadow-glow-green";
                    }
                } else if (symbol === '*') {
                    badgeClass = "badge-glass-blue";
                    liClass += isToday ? "bg-blue-50 border-2 border-blue-200 hover:bg-blue-100" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #2563eb;"'; // Exact hex for blue
                        shadowClass = "shadow-glow-blue";
                    }
                } else {
                    liClass += isToday ? "bg-gray-100 border-2 border-gray-300 hover:bg-gray-200" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #4b5563;"'; // Exact hex for gray
                    }
                }

                li.className = liClass;

                const monthName = shortMonths[group.monthIndex];

                // Render Multiple Events Stacked
                const eventsHtml = group.events.map((ev, idx) => {
                    const mt = idx > 0 ? 'mt-1 pt-1 border-t border-gray-100' : '';
                    const titleClass = isToday ? 'font-extrabold text-gray-900 text-base' : 'font-bold text-gray-900 text-sm';
                    return `
                    <div class="${mt}">
                        <div class="${titleClass} whitespace-normal leading-tight group-hover:text-orange-700 transition-colors">${ev.engName}</div>
                        <div class="text-[11px] text-gray-500 font-oriya whitespace-normal leading-snug">${ev.locName || ''}</div>
                    </div>
                    `;
                }).join('');

                li.innerHTML = `
                    <div class="${badgeClass} w-10 h-10 rounded-lg flex flex-col items-center justify-center text-white ${shadowClass} shrink-0 transition-transform group-hover:scale-105" ${badgeStyle}>
                        <span class="text-[9px] font-bold uppercase leading-none tracking-wide opacity-90">${monthName}</span>
                        <span class="text-lg font-bold leading-none mt-0.5 shadow-sm">${group.date}</span>
                    </div>
                    <div class="flex-grow min-w-0 flex flex-col justify-center">
                        ${eventsHtml}
                    </div>
                `;
                container.appendChild(li);
            });
        }

        function toggleFilter(symbol) {
            if (currentIsolationFilter === symbol) {
                currentIsolationFilter = null;
            } else {
                currentIsolationFilter = symbol;
                currentTagFilter = null; // Mutually exclusive
            }
            render();
        }

        function toggleTagFilter(tag) {
            if (currentTagFilter === tag) {
                currentTagFilter = null;
            } else {
                currentTagFilter = tag;
                currentIsolationFilter = null; // Mutually exclusive
            }
            render();
        }


        function formatSeasonDescription(desc) {
            if (!desc) return '';
            const lines = Array.isArray(desc) ? desc : [desc];
            let html = '';
            let inList = false;

            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                    if (!inList) {
                        html += '<ul class="list-disc pl-5 mb-2 text-gray-600">';
                        inList = true;
                    }
                    html += `<li>${trimmed.substring(1).trim()}</li>`;
                } else {
                    if (inList) {
                        html += '</ul>';
                        inList = false;
                    }
                    if (trimmed) html += `<p class="mb-2 last:mb-0">${trimmed}</p>`;
                }
            });

            if (inList) html += '</ul>';
            return html;
        }

        function renderRichBody(container, lines) {
            container.innerHTML = '';
            lines.forEach(line => {
                const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (imgMatch) {
                    const alt = imgMatch[1];
                    const src = resolveImageUrls(imgMatch[2]);
                    const figure = document.createElement('figure');
                    figure.innerHTML = `<img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption>`;
                    container.appendChild(figure);
                } else if (line.startsWith('#')) {
                    const titleText = line.replace('#', '').trim();
                    const h3 = document.createElement('h3');
                    let iconHtml = '<i class="fa-solid fa-scroll"></i>';
                    if (titleText.toLowerCase().includes('ritual')) iconHtml = '<i class="fa-solid fa-fire-burner"></i>';
                    if (titleText.toLowerCase().includes('significance')) iconHtml = '<i class="fa-solid fa-book-open-reader"></i>';
                    h3.innerHTML = `${iconHtml} ${titleText}`;
                    container.appendChild(h3);
                } else if (line.startsWith('-')) {
                    let ul = container.lastElementChild;
                    if (!ul || ul.tagName !== 'UL') {
                        ul = document.createElement('ul');
                        container.appendChild(ul);
                    }
                    const li = document.createElement('li');
                    li.innerText = line.replace('-', '').trim();
                    ul.appendChild(li);
                } else if (line.trim() !== "") {
                    const p = document.createElement('p');
                    p.innerText = line;
                    container.appendChild(p);
                }
            });
        }

        let currentModalDetails = [];
        let currentModalIndex = 0;
        let currentModalDayEvents = [];
        let currentModalTithiBlock = "";

        // --- EDITOR LOGIC START ---
        let currentUploadDateKey = null;

        function triggerBannerUpload(dateKey) {
            currentUploadDateKey = dateKey;
            document.getElementById('bannerInput').click();
        }

        function handleBannerUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result;
                if (currentUploadDateKey) {
                    if (!appState.details[currentUploadDateKey]) {
                        appState.details[currentUploadDateKey] = [{ tags: [], bodyLines: [], bannerUrl: null }];
                    }

                    let detailList = appState.details[currentUploadDateKey];
                    if (!Array.isArray(detailList)) {
                        // Legacy support (though parseInput makes arrays)
                        detailList = [detailList];
                        appState.details[currentUploadDateKey] = detailList;
                    }

                    if (detailList.length === 0) {
                        detailList.push({ tags: [], bodyLines: [], bannerUrl: null });
                    }

                    // Update the FIRST detail's banner for now (simplification)
                    detailList[0].bannerUrl = base64;

                    saveStateToCache();

                    // Update global currentModalDetails if we are currently viewing this date
                    if (currentModalDetails.length > 0) {
                        currentModalDetails[0].bannerUrl = base64;
                    } else {
                        currentModalDetails = detailList;
                    }

                    // Refresh Modal
                    const [y, m, d] = currentUploadDateKey.split('-').map(Number);
                    const monthData = getEffectiveMonthData(m, y);
                    openDayModal(d, monthData);

                    render();
                }
            };
            reader.readAsDataURL(file);
            event.target.value = '';
        }

        function removeBanner(dateKey) {
            if (confirm("Remove this banner image?")) {
                 if (appState.details[dateKey]) {
                    const details = appState.details[dateKey];
                    if (Array.isArray(details) && details.length > 0) {
                        details[0].bannerUrl = null;
                    } else if (details.bannerUrl) {
                        details.bannerUrl = null;
                    }

                    saveStateToCache();

                    // Update current view if open
                    if (currentModalDetails.length > 0) {
                        currentModalDetails[0].bannerUrl = null;
                    }

                    // Refresh Modal
                    const [y, m, d] = dateKey.split('-').map(Number);
                    const monthData = getEffectiveMonthData(m, y);
                    openDayModal(d, monthData);

                    render();
                 }
            }
        }
        // --- EDITOR LOGIC END ---

        function formatBodyLines(lines) {
            let html = '';
            let inList = false;
            lines.forEach(line => {
                let trimmed = line.trim();
                const isListItem = trimmed.startsWith('-');

                // Process brackets and parentheses for localized text styling
                // We use 'ml-1' for space before the translation but omit 'mr-1' so trailing punctuation isn't pushed away
                trimmed = trimmed.replace(/\[([^\]]+)\]/g, '<span class="text-sm text-gray-500 font-oriya ml-1">$1</span>');
                trimmed = trimmed.replace(/\(([^)]+)\)/g, '<span class="text-sm text-gray-500 font-oriya ml-1">$1</span>');

                if (isListItem) {
                    if (!inList) {
                        html += '<ul class="list-disc pl-6 mb-2">';
                        inList = true;
                    }
                    // Strip the leading hyphen (which might have space after it) from the transformed text
                    let liContent = trimmed.replace(/^-/, '').trim();
                    html += `<li class="mb-1 text-gray-600">${liContent}</li>`;
                } else {
                    if (inList) {
                        html += '</ul>';
                        inList = false;
                    }
                    // Dynamic section headings starting with '#'
                    if (trimmed.startsWith('#')) {
                        // Extract heading text and render as dynamic sub-heading
                        const headingText = trimmed.replace(/#/g, '').trim();
                        html += `<h4 class="text-deepred font-bold mt-3 mb-1 text-base">${headingText}</h4>`;
                    } else if (trimmed !== "") {
                        html += `<p class="mb-2 text-gray-700">${trimmed}</p>`;
                    }
                }
            });
            if (inList) html += '</ul>';
            return html;
        }

        function generateDayModalHTML(day, monthData) {
            const dateObj = new Date(monthData.year, monthData.month, day);
            const dateKey = `${monthData.year}-${monthData.month}-${day}`;

            // --- 1. PREPARE DATA ---
            const tithiInfo = calculateTithi(dateObj);

            // Calculate Sun/Moon Times
            let sunTimes = { sunrise: null, sunset: null };
            let moonTimes = { rise: null, set: null };
            if (appState.config.location && SunCalc) {
                sunTimes = SunCalc.getTimes(dateObj, appState.config.location.lat, appState.config.location.lng);
                if (SunCalc.getMoonTimes) {
                    moonTimes = SunCalc.getMoonTimes(dateObj, appState.config.location.lat, appState.config.location.lng);
                }
            }

            const fmtAstroTime = (d) => d ? d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--';

            // Astro Data
            const jd = tithiInfo.jd || 0;
            const sunLon = tithiInfo.sunLon || 0;
            const moonLon = tithiInfo.moonLon || 0;
            const elongation = (moonLon - sunLon + 360) % 360;
            const tithiProgress = ((elongation % 12) / 12 * 100).toFixed(1);

            // Tithi Timings
            let tithiTimes = { start: 0, end: 0 };
            try {
                if (VedicAstro.getTithiTimes) {
                    tithiTimes = VedicAstro.getTithiTimes(jd, tithiInfo.index);
                }
            } catch(e) { console.error("Tithi timing calc failed", e); }

            const fmtTime = (j) => {
                if(!j) return "--";
                const d = new Date((j - 2440587.5) * 86400000);
                // Check if date is different from current view date
                const isSameDay = d.getDate() === day && d.getMonth() === monthData.month && d.getFullYear() === monthData.year;
                const timeStr = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                if (isSameDay) return timeStr;
                return `${d.toLocaleDateString([], {month:'short', day:'numeric'})}, ${timeStr}`;
            };

            // Panchang Extra Data
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const seasonIndex = getSeasonIndex(monthData.month);
            const seasonName = langObj.indianSeasons[seasonIndex];
            const hinduMonthName = langObj.indianMonths[monthData.month];


            // Solar Info
            const solarInfo = VedicAstro.getSolarMonthDay(dateObj);
            const solarMonthName = langObj.solarMonths ? langObj.solarMonths[solarInfo.monthIndex] : langData.en.solarMonths[solarInfo.monthIndex];
            const solarDayNum = toNativeNum(solarInfo.day, currentLang);

            // Main Icon
            let mainIcon = getMoonPhaseIcon((tithiInfo.index + 1) / 30);
            if (tithiInfo.index === 14) mainIcon = TITHI_ICONS.purnima;
            if (tithiInfo.index === 29) mainIcon = TITHI_ICONS.amavasya;

            // Details/Events
            let detailsRaw = appState.details[dateKey];
            if (!detailsRaw) {
                const recKey = `rec-${monthData.month}-${day}`;
                detailsRaw = appState.recurringDetails[recKey];
            }
            let details = (detailsRaw && Array.isArray(detailsRaw)) ? detailsRaw : (detailsRaw ? [detailsRaw] : []);

            // Events for this day
            const dayEvents = monthData.events.filter(e => e.date === day);

            // Banner
            let bannerUrl = '';
            if (details.length > 0 && details[0].bannerUrl) bannerUrl = resolveImageUrls(details[0].bannerUrl);

            // Paksha Badge Logic
            const paksha = tithiInfo.paksha;
            const isShukla = paksha.toLowerCase().includes('shukla');
            let pakshaBadgeHtml = '';

            if (isShukla) {
                pakshaBadgeHtml = `
                <div class="paksha-badge-shukla">
                    <i class="fa-solid fa-sun icon"></i>
                    <span class="text">${paksha}</span>
                </div>
                `;
            } else {
                pakshaBadgeHtml = `
                <div class="paksha-badge-krishna">
                    <i class="fa-solid fa-moon icon"></i>
                    <span class="text">${paksha}</span>
                </div>
                `;
            }

            // --- 2. BUILD HTML STRUCTURE (Light Page Layout) ---
            const contentHtml = `
                <div class="flex flex-col h-full relative overflow-hidden">

                    <!-- Persistent Header -->
                    <div class="shrink-0 z-10 relative backdrop-blur-md bg-white/30 text-center pt-16 pb-4 border-b border-white/20 shadow-sm">
                        <button onclick="closeDayModal()" class="absolute top-4 right-4 z-[100] bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-lg border border-gray-200"><i class="fa-solid fa-times"></i></button>

                        <div class="w-16 h-16 mx-auto mb-2 moon-glow transform scale-90 origin-bottom">${mainIcon}</div>
                        <h2 class="text-xl font-extrabold text-deepred mb-3 tracking-tight leading-none">${daysOfWeek[dateObj.getDay()]}, ${months[monthData.month]} ${day}, ${monthData.year}</h2>
                        ${pakshaBadgeHtml}
                    </div>

                    <!-- Scrollable Body -->
                    <div class="flex-grow overflow-y-auto scrollbar-aurora scroll-smooth-fast pb-[75px] md:pb-8 px-4 pt-4 space-y-2 max-w-lg mx-auto w-full transform-gpu will-change-transform overscroll-none touch-pan-y max-h-[90vh]" style="-webkit-overflow-scrolling: touch; contain: content;">

                        <!-- 1. Current Tithi -->
                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-solid fa-moon"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Current Tithi</span>
                            </div>
                            <h3 class="text-3xl font-extrabold text-deepred mb-1 leading-none">${tithiInfo.tithi}</h3>
                            <p class="text-xs text-gray-500 font-bold mb-4 uppercase tracking-wide">Tithi Index ${tithiInfo.index + 1}</p>

                            <div class="mt-5 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner relative overflow-hidden">
                                <div class="absolute inset-0 bg-amber-500/5 pointer-events-none"></div>
                                <div class="flex justify-between items-center mb-2 relative z-10">
                                    <span class="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Tithi Progress</span>
                                    <div class="flex items-baseline gap-1">
                                        <span class="text-2xl font-extrabold text-amber-500 drop-shadow-sm font-sans">${tithiProgress}</span>
                                        <span class="text-xs text-amber-600 font-bold">%</span>
                                    </div>
                                </div>
                                <div class="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner ring-1 ring-gray-200 relative">
                                    <!-- Track Pattern -->
                                    <div class="absolute inset-0 opacity-20" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px);"></div>

                                    <!-- Bar -->
                                    <div class="h-full rounded-full relative transition-all duration-1000 ease-out group" style="width: ${tithiProgress}%; background: linear-gradient(90deg, #f59e0b, #ef4444);">
                                        <!-- Gloss -->
                                        <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mt-3 px-0.5">
                                    <div class="flex flex-col items-start">
                                        <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Start</span>
                                        <div class="flex items-center gap-1">
                                            <i class="fa-regular fa-clock text-gray-400 text-[10px]"></i>
                                            <span class="text-[10px] text-gray-600 font-bold font-mono leading-none">${fmtTime(tithiTimes.start)}</span>
                                        </div>
                                    </div>
                                    <div class="h-6 w-px bg-gray-200 mx-4"></div>
                                    <div class="flex flex-col items-end">
                                        <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">End</span>
                                        <div class="flex items-center gap-1">
                                            <i class="fa-regular fa-clock text-amber-500 text-[10px]"></i>
                                            <span class="text-[10px] text-amber-500 font-bold font-mono leading-none">${fmtTime(tithiTimes.end)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <!-- Solar Date Sub Card -->
                        <div class="modal-card bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 mb-3 p-3">
                            <div class="flex items-center gap-3">
                                 <div class="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-orange-500 shrink-0">
                                     <i class="fa-solid fa-calendar-day text-lg"></i>
                                 </div>
                                 <div>
                                     <span class="block text-[10px] font-bold text-gray-500 uppercase tracking-widest" data-i18n="solar_date">Solar Date</span>
                                     <span class="block font-extrabold text-gray-900 text-sm">${solarMonthName} - <span data-i18n="day">Day</span> <span class="text-orange-600">${solarDayNum}</span></span>
                                 </div>
                            </div>
                        </div>

                        <!-- 2. Panchang Details -->

                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-solid fa-calendar-week"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Panchang Details</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-xs mb-2">
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase" data-i18n="nakshatra">Nakshatra</div>
                                    <div class="font-mono text-gray-900 font-bold">${tithiInfo.nakshatra}</div>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase" data-i18n="yoga">Yoga</div>
                                    <div class="font-mono text-gray-900 font-bold">${tithiInfo.yoga}</div>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase" data-i18n="karana">Karana</div>
                                    <div class="font-mono text-gray-900 font-bold">${tithiInfo.karana}</div>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Hindu Month</div>
                                    <div class="font-mono text-gray-900 font-bold">${hinduMonthName}</div>
                                </div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 text-xs">
                                <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Ritu (Season)</div>
                                <div class="font-mono text-gray-900 font-bold">${seasonName}</div>
                            </div>
                        </div>

                        <!-- 2a. Astro Details -->
                        ${sunTimes.sunrise ? `
                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-solid fa-cloud-sun"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Astro Details</span>
                            </div>
                            <div class="grid grid-cols-2 gap-3 text-center">
                                 <div class="bg-orange-50 rounded-xl p-2 border border-orange-100 flex flex-col items-center">
                                     <i class="fa-solid fa-sun text-orange-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase" data-i18n="sunrise">Sunrise</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(sunTimes.sunrise)}</span>
                                 </div>
                                 <div class="bg-purple-50 rounded-xl p-2 border border-purple-100 flex flex-col items-center">
                                     <i class="fa-solid fa-cloud-sun text-purple-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase" data-i18n="sunset">Sunset</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(sunTimes.sunset)}</span>
                                 </div>
                                 <div class="bg-blue-50 rounded-xl p-2 border border-blue-100 flex flex-col items-center">
                                     <i class="fa-solid fa-cloud-moon text-blue-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase" data-i18n="moonrise">Moonrise</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(moonTimes ? moonTimes.rise : null)}</span>
                                 </div>
                                 <div class="bg-gray-50 rounded-xl p-2 border border-gray-200 flex flex-col items-center">
                                     <i class="fa-solid fa-moon text-gray-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase" data-i18n="moonset">Moonset</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(moonTimes ? moonTimes.set : null)}</span>
                                 </div>
                            </div>
                        </div>` : ''}

                        <!-- 4. Banner Display (Only if URL exists) -->
                        ${bannerUrl ? `
                        <div id="modal-banner-container" class="modal-card p-0 overflow-hidden relative group aspect-[3/1] md:aspect-[5/1] transition-all duration-500 ease-out flex items-center justify-center border border-gray-200 bg-gray-50">
                            <!-- View Mode -->
                            <img src="${bannerUrl}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>` : ''}

                        <!-- 5. Rich Details (Notes/Events) -->
                        <div id="new-modal-rich-body" class="space-y-3 pt-2 pb-0">
                            ${dayEvents.map(ev => `
                                <div class="modal-card relative overflow-hidden p-4 pl-5 border-l-4 ${ev.symbol==='!'?'border-red-500':(ev.symbol==='*'?'border-blue-500':'border-gray-500')} mb-3 last:mb-0">
                                    <h4 class="font-bold text-gray-900 text-lg leading-tight mb-1">${ev.engName.replace(/[\(\)\[\]]/g, '').trim()}</h4>
                                    ${ev.locName ? `<p class="text-sm text-gray-600 font-oriya">${ev.locName.replace(/[\(\)\[\]]/g, '').trim()}</p>` : ''}
                                </div>
                            `).join('')}

                            ${details.length > 0 ? details.map(d => {
                                    let content = '<div class="modal-card relative overflow-hidden p-4 pl-5 text-gray-700 text-sm leading-relaxed rich-content mb-3 last:mb-0">';

                                    // Render tags if present
                                    if (d.tags && d.tags.length > 0) {
                                        content += `<div class="flex flex-wrap gap-2 mb-3">`;

                                        d.tags.forEach((tag, idx) => {
                                            // Format the tag for display (e.g. #scripture)
                                            const displayTag = tag.startsWith('#') ? tag.toLowerCase() : '#' + tag.toLowerCase();
                                            // Use deterministic global tag style
                                            const style = getTagStyle(displayTag);

                                            content += `<span class="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold tracking-wide uppercase shadow-sm" style="${style}">${displayTag}</span>`;
                                        });
                                        content += `</div>`;
                                    }

                                    content += formatBodyLines(d.bodyLines);
                                    content += '</div>';
                                    return content;
                                }).join('') : ''}
                        </div>

                    </div>
                </div>
            `;

            return contentHtml;
        }

        let scrollPositionBeforeModal = 0;

        function openDayModal(day, monthData) {
            lockScroll();

            // Bulletproof scroll lock for mobile/iOS
            scrollPositionBeforeModal = window.scrollY;
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollPositionBeforeModal}px`;
            document.body.style.width = '100%';

            const modal = document.getElementById('day-modal');
            const dateKey = `${monthData.year}-${monthData.month}-${day}`;

            let contentHtml = "";
            if (appState.activeMonthDetails && appState.activeMonthDetails[dateKey]) {
                contentHtml = appState.activeMonthDetails[dateKey];
            } else {
                contentHtml = generateDayModalHTML(day, monthData);
                // Cache it for next time to ensure instant open on subsequent clicks
                if (!appState.activeMonthDetails) appState.activeMonthDetails = {};
                appState.activeMonthDetails[dateKey] = contentHtml;
            }

            const modalContent = modal.querySelector('.modal-content');
            modalContent.innerHTML = contentHtml;
            applyCustomLabels();

            // Remove legacy listeners (simplified view now)

            modal.style.display = 'flex';
            // Use double rAF to ensure layout is calculated before animating opacity/transform
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    modal.classList.remove('modal-hidden');
                });
            });
        }

        // Placeholder for legacy call (if any)
        function updateModalContent() {}

        function nextModalSlide(e) {
            if(e) e.stopPropagation();
            if (currentModalDetails.length <= 1) return;
            currentModalIndex = (currentModalIndex + 1) % currentModalDetails.length;
            updateModalContent();
        }

        function prevModalSlide(e) {
            if(e) e.stopPropagation();
            if (currentModalDetails.length <= 1) return;
            currentModalIndex = (currentModalIndex - 1 + currentModalDetails.length) % currentModalDetails.length;
            updateModalContent();
        }

        function closeDayModal() {
            const modal = document.getElementById('day-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();

            // Restore from bulletproof scroll lock
            document.body.style.position = '';
            document.body.style.top = '';
            document.body.style.width = '';
            window.scrollTo(0, scrollPositionBeforeModal);

            // Match the 0.25s CSS animation duration
            setTimeout(() => { modal.style.display = 'none'; }, 250);
        }


        function saveStateToCache() {
            try {
                // Include version in the saved state
                const stateToSave = { ...appState, version: DATA_VERSION };
                const jsonString = JSON.stringify(stateToSave);
                localStorage.setItem('panchang_cached_state', jsonString);
            } catch (e) {
                console.error("Failed to cache state", e);
            }
        }

        function loadStateFromCache() {
            try {
                const cached = localStorage.getItem('panchang_cached_state');
                if (cached) {
                    const parsed = JSON.parse(cached);

                    // 1. Version Check
                    if (parsed.version !== DATA_VERSION) {
                        console.warn("⚠️ Cache Version Mismatch! Invalidating...");
                        localStorage.removeItem('panchang_cached_state');
                        return false;
                    }

                    // 2. Sanity Check
                    if (parsed && parsed.monthsData && Array.isArray(parsed.monthsData)) {
                        appState = parsed;
                        return true;
                    }
                }
            } catch (e) {
                console.error("Failed to load state from cache", e);
                // In case of parsing error, clear cache too
                localStorage.removeItem('panchang_cached_state');
            }
            return false;
        }

        // --- EDITOR LOGIC START ---
        function downloadCalendar() {
            // 1. Clone the current document structure
            const clone = document.documentElement.cloneNode(true);

            // --- OPTIMIZATION: PURGE HEAVY CONTAINERS ---
            const idsToEmpty = ['calendar-grid', 'year-grid', 'festival-list', 'panchang-list', 'panchang-pills', 'banner-slides', 'banner-dots'];
            idsToEmpty.forEach(id => {
                const el = clone.querySelector(`#${id}`);
                if(el) el.innerHTML = '';
            });

            // 2. Remove Editor Components (The "White-Label" Scrub)
            const removeSelectors = [
                '#editor-panel',             // The entire editor
                '#clear-confirmation-modal', // Editor modal
                '#link-modal',               // Editor modal
                '#bannerInput',              // Upload input
                '#fileInput',                // Upload input
                '#container-sync-settings',  // Developer settings
                '#container-lang-links',     // Developer settings
                '#app-loader'                // Existing loader
            ];
            removeSelectors.forEach(sel => {
                const el = clone.querySelector(sel);
                if(el) el.remove();
            });

            // Adjust layout for App Mode
            const mainWrapper = clone.querySelector('.flex.flex-col.md\\:flex-row');
            if(mainWrapper) mainWrapper.classList.remove('h-full', 'overflow-hidden');

            const body = clone.querySelector('body');
            if(body) {
                body.classList.remove('h-screen', 'overflow-hidden');
                body.classList.add('min-h-screen', 'overflow-y-auto', 'bg-[#fdfbf7]');
            }

            const previewPanel = clone.querySelector('#preview-container');
            if(previewPanel) {
                previewPanel.className = 'w-full h-auto pb-4 p-2 md:p-8 relative z-0';
                previewPanel.style.overflow = 'visible';
            }

            // 3. Scrub Script (Remove Editor Logic)
            const scripts = clone.querySelectorAll('script');
            scripts.forEach(script => {
                let code = script.innerHTML;
                // Only modify if markers are present
                if (code.includes('EDITOR LOGIC START')) {
                    // Remove marked blocks
                    code = code.replace(/\/\/ --- EDITOR LOGIC START ---[\s\S]*?\/\/ --- EDITOR LOGIC END ---/g, '');
                    // Remove empty lines
                    code = code.replace(/^\s*[\r\n]/gm, '');
                    script.innerHTML = code;
                }
            });

            // Scrub Styles
            const styles = clone.querySelectorAll('style');
            styles.forEach(style => {
                let css = style.innerHTML;
                if (css.includes('EDITOR STYLES START')) {
                    css = css.replace(/\/\* --- EDITOR STYLES START --- \*\/[\s\S]*?\/\* --- EDITOR STYLES END --- \*\//g, '');
                    style.innerHTML = css;
                }
            });

            // 4. Inject Loading Screen
            const loaderHtml = `
            <div id="app-loader" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm pointer-events-none transition-opacity duration-500">
                <div class="mb-6 animate-pulse">
                    <svg viewBox="0 0 512 512" width="60" height="60" fill="#ea580c" xmlns="http://www.w3.org/2000/svg">
                        <path d="M379.3 4.7c-6.2-6.2-16.4-6.2-22.6 0l-16 16c-6.2 6.2-6.2 16.4 0 22.6l16 16c6.2 6.2 16.4 6.2 22.6 0l16-16c6.2-6.2 6.2-16.4 0-22.6l-16-16zM281 66.7c-2.2-1.5-4.9-2.5-7.7-2.7c-.6 0-1.3-.1-1.9 0c-3.9 .2-7.4 1.7-10.1 4.2c-.9 .8-1.6 1.7-2.3 2.6c-1.7 2.4-2.7 5.3-2.9 8.5c0 .7 0 1.4 0 2.1c.2 2.2 .9 4.3 1.9 6.2l.3 .6c.3 .6 .8 1.4 1.4 2.4c1.2 2 2.9 4.8 5.1 8.2c4.4 6.7 11.1 15.5 20 24.4C302.4 141.1 330.3 160 368 160c31.2 0 56.6-10.4 73.9-20.2c8.7-5 15.6-9.9 20.4-13.8c2.4-1.9 4.3-3.6 5.7-4.9c.7-.6 1.3-1.2 1.7-1.6l.6-.5 .1-.1 .1-.1s0 0 0 0s0 0 0 0c5.9-5.8 9.5-13.9 9.5-22.8c0-17.7-14.3-32-32-32c-8.7 0-16.7 3.5-22.4 9.2c-.1 .1-.2 .2-.5 .4c-.5 .5-1.5 1.3-2.8 2.4c-2.7 2.2-6.8 5.2-12.1 8.2C399.4 90.4 384.8 96 368 96c-20.8 0-42.4-7-59.5-14.6c-8.4-3.7-15.4-7.5-20.3-10.3c-2.4-1.4-4.3-2.5-5.6-3.3c-.6-.4-1.1-.7-1.4-.9l-.3-.2zM115.2 169.6c8-6 17.9-9.6 28.8-9.6c26.5 0 48 21.5 48 48s-21.5 48-48 48l-34.2 0c-7.6 0-13.8 6.2-13.8 13.8c0 1.5 .2 2.9 .7 4.4l8 24c4.4 13.1 16.6 21.9 30.4 21.9l8.9 0 16 0c35.3 0 64 28.7 64 64s-28.7 64-64 64c-50.8 0-82.7-21.5-102.2-42.8c-9.9-10.8-16.6-21.6-20.9-29.7c-2.1-4-3.6-7.3-4.5-9.6c-.5-1.1-.8-2-1-2.5l-.2-.5c-.3-.9-.7-1.8-1.1-2.6c-1.2-2.2-2.8-4-4.7-5.4c-1.9-1.4-4.1-2.3-6.5-2.8c-1.4-.3-2.9-.3-4.4-.2c-2.5 .2-4.8 1-6.8 2.3c-1.1 .7-2.2 1.5-3.1 2.5c-2.4 2.5-4.1 5.8-4.5 9.5c-.1 .6-.1 1.1-.1 1.7c0 0 0 0 0 0c0 .8 .1 1.7 .2 2.5l0 .1c0 .3 .1 .8 .2 1.3c.2 1.1 .4 2.7 .8 4.6c.8 3.9 2 9.4 3.9 15.9c3.8 13 10.3 30.4 21.3 48C48.7 476.2 89.4 512 160 512c70.7 0 128-57.3 128-128c0-23.3-6.2-45.2-17.1-64l22.6 0c25.5 0 49.9-10.1 67.9-28.1l26.5-26.5c6-6 14.1-9.4 22.6-9.4l5.5 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32c-25.7 0-41.4-12.5-51.2-25.6c-5-6.7-8.4-13.4-10.5-18.6c-1.1-2.5-1.8-4.6-2.2-6c-.2-.7-.4-1.2-.5-1.5l-.1-.2c-.3-1.3-.8-2.6-1.5-3.8c-1.1-2-2.6-3.8-4.4-5.1c-2.7-2-6-3.2-9.6-3.2l-.2 0c-8 .1-14.6 6.1-15.6 13.9c0 0 0 0 0 0c0 .3-.1 .6-.2 1.1c-.1 .9-.3 2.1-.4 3.6c-.3 3-.6 7.3-.6 12.4c0 10.1 1.1 23.9 5.8 38.1c4.8 14.3 13.4 29.3 28.6 40.7C368.7 473.3
389.3 480 416 480c53 0 96-43 96-96l0-96c0-53-43-96-96-96l-5.5 0c-25.5 0-49.9 10.1-67.9 28.1l-26.5 26.5c-6 6-14.1 9.4-22.6 9.4l-48.3 0c6.9-14.5 10.8-30.8 10.8-48c0-61.9-50.1-112-112-112c-25.2 0-48.5 8.3-67.2 22.4c-14.1 10.6-17 30.7-6.4 44.8s30.7 17 44.8 6.4z"/>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Initializing...</h2>
            </div>`;
            if(body) {
                const loaderDiv = document.createElement('div');
                loaderDiv.innerHTML = loaderHtml;
                body.prepend(loaderDiv.firstElementChild);
            }

            // 5. Encrypt Config & Create State
            const exportConfig = JSON.parse(JSON.stringify(appState.config));
            if (exportConfig.syncLinks) {
                Object.keys(exportConfig.syncLinks).forEach(k => {
                    if(exportConfig.syncLinks[k]) {
                        exportConfig.syncLinks[k] = LinkSecurity.encrypt(exportConfig.syncLinks[k]);
                    }
                });
                exportConfig.linksEncrypted = true;
            }

            if (exportConfig.liveUrl) exportConfig.liveUrl = LinkSecurity.encrypt(exportConfig.liveUrl);
            if (exportConfig.syncDocsUrl) exportConfig.syncDocsUrl = LinkSecurity.encrypt(exportConfig.syncDocsUrl);
            if (exportConfig.syncGitHubUrl) exportConfig.syncGitHubUrl = LinkSecurity.encrypt(exportConfig.syncGitHubUrl);
            exportConfig.urlsEncrypted = true;

            const stateToSave = {
                activeMonthIndex: appState.activeMonthIndex || 0,
                monthsData: appState.monthsData || [],
                todayIndex: appState.todayIndex || -1,
                details: appState.details || {},
                recurringDetails: appState.recurringDetails || {},
                manualTithis: appState.manualTithis || {},
                customSeasonDescriptions: appState.customSeasonDescriptions || {},
                images: appState.images || {},
                customCards: appState.customCards || [],
                scrollCards: appState.scrollCards || [],
                bubbleCards: appState.bubbleCards || [],
                config: exportConfig
            };

            const title = clone.querySelector('title');
            if(title) title.innerText = appState.config.title || "My Panchang App";

            // 6. Inject Data Script
            const dataScript = document.createElement('script');
            dataScript.textContent = `window.exportedData = ${JSON.stringify(stateToSave)};`;
            if(body) body.prepend(dataScript);

            // 7. Download
            let htmlContent = "<!DOCTYPE html>" + clone.outerHTML;
            // Scrub HTML Comments
            htmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, "");

            const blob = new Blob([htmlContent], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Panchang_Lite.html`;
            document.body.appendChild(a);

            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        // --- EDITOR LOGIC END ---

        function showToast(message, type = 'default') {
            // Remove existing toasts to prevent stacking
            const existing = document.querySelectorAll('.custom-toast');
            existing.forEach(t => t.remove());

            const toast = document.createElement('div');
            // Aurora Style: Animated Gradient, Light Border, Shadow
            toast.className = 'custom-toast fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[300] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl shadow-orange-100/50 transition-all duration-500 ease-out translate-y-10 opacity-0 border border-white/60 bg-aurora cursor-pointer';

            // Auto-detect type
            const msgLower = message.toLowerCase();
            if (type === 'default') {
                if (msgLower.includes('error') || msgLower.includes('failed')) type = 'error';
                else if (msgLower.includes('success') || msgLower.includes('saved') || msgLower.includes('imported')) type = 'success';
            }

            // Icons & Colors
            let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
            let iconColor = 'text-orange-600'; // Deeper orange for contrast on gradient
            let textColor = 'text-gray-900'; // Darker text

            if (type === 'success') {
                iconHtml = '<i class="fa-solid fa-circle-check"></i>';
                iconColor = 'text-green-600';
                toast.classList.add('border-green-200/50');
            } else if (type === 'error') {
                iconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';
                iconColor = 'text-red-600';
                toast.classList.add('border-red-200/50');
            } else {
                // Info / Default
                iconHtml = '<i class="fa-solid fa-circle-info"></i>';
                iconColor = 'text-orange-600';
                toast.classList.add('border-orange-200/50');
            }

            toast.innerHTML = `
                <div class="text-lg ${iconColor} drop-shadow-sm">${iconHtml}</div>
                <div class="font-bold text-sm ${textColor} tracking-wide leading-snug">${message}</div>
            `;

            // Click to dismiss
            toast.onclick = () => {
                toast.classList.add('opacity-0', 'translate-y-10', 'scale-95');
                setTimeout(() => toast.remove(), 300);
            };

            document.body.appendChild(toast);

            // Animate In
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    toast.classList.remove('opacity-0', 'translate-y-10');
                });
            });

            // Animate Out
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-10', 'scale-95');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }

        function handleLearnMore() {
            const titleEl = document.getElementById('modal-main-title');
            if (titleEl) {
                const title = titleEl.innerText.trim();
                const query = encodeURIComponent(`${title} festival significance`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
            }
        }



        // --- LOCATION SELECTION LOGIC ---        // Handle Location Search
        function handleLocationSearch(event) {
            const query = event.target.value.trim().toLowerCase();
            const resultsContainer = document.getElementById('location-search-results');

            if (!query) {
                resultsContainer.classList.add('hidden');
                return;
            }

            const results = [];
            const MAX_RESULTS = 10;

            if (typeof LOCATION_DATA !== 'undefined') {
                const states = Object.keys(LOCATION_DATA).sort();
                for (const state of states) {
                    const citiesData = LOCATION_DATA[state];
                    const cities = Object.keys(citiesData).sort();

                    for (const city of cities) {
                        if (city.toLowerCase().includes(query) || state.toLowerCase().includes(query)) {
                            results.push({ state, city, coords: citiesData[city] });
                        }
                    }
                }
            }

            if (results.length > 0) {
                // Limit results
                const limitedResults = results.slice(0, MAX_RESULTS);

                resultsContainer.innerHTML = limitedResults.map(result => `
                    <div class="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors" onclick="selectSearchedLocation('${result.state.replace(/'/g, "\\'")}', '${result.city.replace(/'/g, "\\'")}', ${result.coords[0]}, ${result.coords[1]})">
                        <div class="font-semibold text-gray-800">${result.city}</div>
                        <div class="text-xs text-gray-500">${result.state}</div>
                    </div>
                `).join('');
                resultsContainer.classList.remove('hidden');
            } else {
                resultsContainer.innerHTML = `
                    <div class="px-4 py-4 text-center text-sm text-gray-500">
                        No locations found
                    </div>
                `;
                resultsContainer.classList.remove('hidden');
            }
        }
        function selectSearchedLocation(state, city, lat, lng) {
            const resultsContainer = document.getElementById('location-search-results');
            const searchInput = document.getElementById('location-search-input');
            const stateSelect = document.getElementById('location-state-select');
            const citySelect = document.getElementById('location-city-select');

            // Hide dropdown
            resultsContainer.classList.add('hidden');
            searchInput.value = '';

            // Update dropdowns automatically
            if (stateSelect && citySelect) {
                stateSelect.value = state;
                onStateChange();
                citySelect.value = city;
            }

            // Update app state
            appState.config.location = {
                name: `${city}, ${state}`,
                lat: lat,
                lng: lng
            };

            saveConfig();

            // Re-render location UI
            renderLocation();

            // Update URL params with new coordinates if needed
            const urlParams = new URLSearchParams(window.location.search);
            urlParams.set('lat', lat);
            urlParams.set('lng', lng);
            urlParams.delete('loc');

            const newUrl = window.location.pathname + '?' + urlParams.toString() + window.location.hash;
            window.history.replaceState({path: newUrl}, '', newUrl);

            // Re-render UI
            render();
            closeLocationModal();
            showToast('Location updated via search!', 'success');
        }

        // Close search results when clicking outside
        document.addEventListener('click', function(event) {
            const searchContainer = document.getElementById('location-search-results');
            const searchInput = document.getElementById('location-search-input');

            if (searchContainer && searchInput) {
                if (!searchContainer.contains(event.target) && event.target !== searchInput) {
                    searchContainer.classList.add('hidden');
                }
            }
        });

        function openLocationModal() {
            const modal = document.getElementById('location-modal');
            const stateSelect = document.getElementById('location-state-select');

            // Populate State Dropdown if empty
            if (stateSelect.options.length <= 1) {
                stateSelect.innerHTML = '<option value="" disabled selected>All Select Region / State</option>';
                const states = Object.keys(LOCATION_DATA);
                states.forEach(state => {
                    const option = document.createElement('option');
                    option.value = state;
                    option.textContent = state;
                    stateSelect.appendChild(option);
                });
            }

            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('modal-hidden');
            }, 10);
        }

        let locationPromptTimer = null;

        function showLocationPrompt() {
            if (appState.config.location && appState.config.location.name) return; // Already set
            const prompt = document.getElementById('location-prompt-toast');
            if (!prompt) return;

            prompt.style.display = 'block';
            // Force reflow for transition
            void prompt.offsetWidth;

            prompt.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
            prompt.classList.add('opacity-100', 'translate-y-0');
        }

        function hideLocationPrompt() {
            const prompt = document.getElementById('location-prompt-toast');
            if (!prompt) return;
            if (locationPromptTimer) clearTimeout(locationPromptTimer);

            prompt.classList.remove('opacity-100', 'translate-y-0');
            prompt.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
            setTimeout(() => {
                prompt.style.display = 'none';
            }, 500);
        }

        function closeLocationModal() {
            const modal = document.getElementById('location-modal');
            modal.classList.add('modal-hidden');
            setTimeout(() => { modal.style.display = 'none'; }, 250);
        }

        function onStateChange() {
            const stateSelect = document.getElementById('location-state-select');
            const citySelect = document.getElementById('location-city-select');
            const selectedState = stateSelect.value;

            citySelect.innerHTML = '<option value="" disabled selected>Select City</option>';

            if (selectedState && LOCATION_DATA[selectedState]) {
                const cities = Object.keys(LOCATION_DATA[selectedState]);
                cities.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
                citySelect.disabled = false;
            } else {
                citySelect.disabled = true;
            }
        }

        function handleAutoLocation() {
            closeLocationModal();
            hideLocationPrompt();
            getUserLocation();
        }

        function selectManualLocation() {
            const stateSelect = document.getElementById('location-state-select');
            const citySelect = document.getElementById('location-city-select');
            const selectedState = stateSelect.value;
            const selectedCity = citySelect.value;

            if (!selectedState || !selectedCity) {
                showToast("Please select both State and City", "error");
                return;
            }

            const coords = LOCATION_DATA[selectedState][selectedCity];

            if (coords) {
                appState.config.location = {
                    lat: coords[0],
                    lng: coords[1],
                    name: `${selectedCity}, ${selectedState}`
                };

                saveConfigToStorage();
                render();
                closeLocationModal();
                showToast(`Location set to: ${selectedCity}, ${selectedState}`, "success");
            } else {
                showToast("Invalid location selected", "error");
            }
        }

        // --- TOOLS AUTOCOMPLETE SEARCH ---
        document.addEventListener('DOMContentLoaded', () => {
            const toolsSearchInput = document.getElementById('tools-search-input');
            const toolsSearchDropdown = document.getElementById('tools-search-dropdown');

            if (!toolsSearchInput || !toolsSearchDropdown) return;

            toolsSearchInput.addEventListener('input', (e) => {
                const query = e.target.value.trim().toLowerCase();

                if (!query) {
                    toolsSearchDropdown.classList.add('hidden');
                    return;
                }

                // Get all cards in the more-view-container
                const moreContainer = document.getElementById('more-view-container');
                if (!moreContainer) return;

                const cardElements = moreContainer.querySelectorAll('.snap-start, .grid > div, .grid > a');
                let results = [];

                cardElements.forEach(el => {
                    let titleEl = el.querySelector('h3, span.font-bold, .font-headline, .font-bold.text-\\[15px\\]');
                    let descEl = el.querySelector('p, span.text-\\[11px\\]');

                    if (titleEl) {
                        let title = titleEl.innerText.trim();
                        let desc = descEl ? descEl.innerText.trim() : '';
                        let href = el.getAttribute('href');

                        if (!href && el.tagName.toLowerCase() !== 'a') {
                            const aTag = el.querySelector('a');
                            if (aTag) href = aTag.getAttribute('href');
                        }

                        if (!href) href = '#'; // Fallback if no href found

                        let mainTitle = '';
                        const sectionWrapper = el.closest('.dynamic-custom-section');
                        if (sectionWrapper) {
                            const h2 = sectionWrapper.querySelector('h2');
                            if (h2) mainTitle = h2.innerText.trim();
                        }

                        if (title.toLowerCase().includes(query) || (desc && desc.toLowerCase().includes(query)) || (mainTitle && mainTitle.toLowerCase().includes(query))) {
                            results.push({ title, desc, href, mainTitle });
                        }
                    }
                });

                if (results.length > 0) {
                    // Render results
                    // Escape query for regex
                    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                    const regex = new RegExp(`(${escapedQuery})`, 'gi');

                    // Simple HTML escape function to prevent XSS
                    const escapeHTML = (str) => {
                        return str.replace(/[&<>'"]/g,
                            tag => ({
                                '&': '&amp;',
                                '<': '&lt;',
                                '>': '&gt;',
                                "'": '&#39;',
                                '"': '&quot;'
                            }[tag] || tag)
                        );
                    };

                    toolsSearchDropdown.innerHTML = results.map(item => {
                        const safeTitle = escapeHTML(item.title);
                        const safeHref = escapeHTML(item.href);

                        const highlightedTitle = safeTitle.replace(regex, '<strong>$1</strong>');
                        let highlightedDescHTML = '';

                        if (item.desc) {
                            const safeDesc = escapeHTML(item.desc);
                            const highlightedDesc = safeDesc.replace(regex, '<strong>$1</strong>');
                            highlightedDescHTML = `<div class="text-xs text-gray-500 line-clamp-1">${highlightedDesc}</div>`;
                        }

                        let highlightedMainTitleHTML = '';
                        if (item.mainTitle) {
                            const safeMainTitle = escapeHTML(item.mainTitle);
                            const highlightedMainTitle = safeMainTitle.replace(regex, '<strong>$1</strong>');
                            highlightedMainTitleHTML = `<div class="mb-0.5"><span class="bg-gray-100 text-[10px] px-1.5 py-0.5 rounded text-gray-500 font-medium inline-block">${highlightedMainTitle}</span></div>`;
                        }

                        return `
                            <div class="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors" onclick="if('${safeHref}' !== '#') { window.open('${safeHref}', '_blank'); } else { window.location.href = '#'; }">
                                ${highlightedMainTitleHTML}
                                <div class="font-bold text-sm text-gray-800">${highlightedTitle}</div>
                                ${highlightedDescHTML}
                            </div>
                        `;
                    }).join('');
                    toolsSearchDropdown.classList.remove('hidden');
                } else {
                    toolsSearchDropdown.innerHTML = `
                        <div class="px-4 py-4 text-center text-sm text-gray-500">
                            No tools found matching "${e.target.value}"
                        </div>
                    `;
                    toolsSearchDropdown.classList.remove('hidden');
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (e) => {
                if (!toolsSearchDropdown.contains(e.target) && e.target !== toolsSearchInput) {
                    toolsSearchDropdown.classList.add('hidden');
                }
            });

            // Note: We intentionally do NOT manipulate the display state of grid cards here to prevent grid filtering.
        });
