// Minimal SunCalc from the file
const SunCalc = (function() {
    var J1970 = 2440588, dayMs = 1000 * 60 * 60 * 24, J2000 = 2451545, rad = Math.PI / 180, e = rad, J0 = 0.0; // CHANGED J0 to 0.0
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

// Bhubaneswar coordinates
const lat = 20.296;
const lng = 85.8245;

const dateSunset = new Date('2025-12-03T12:00:00Z');
const dateSunrise = new Date('2025-12-04T12:00:00Z');

const timesSunset = SunCalc.getTimes(dateSunset, lat, lng);
const timesSunrise = SunCalc.getTimes(dateSunrise, lat, lng);

const fmt = (d) => {
    if (!d) return 'Invalid';
    const istTime = new Date(d.getTime() + (5.5 * 60 * 60 * 1000));
    let h = istTime.getUTCHours();
    let m = istTime.getUTCMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    h = h % 12;
    h = h ? h : 12;
    m = m < 10 ? '0'+m : m;
    return `${h}:${m} ${ampm}`;
};

console.log('Calculation with J0=0 (IST):');
console.log('Dec 3 Sunset:', fmt(timesSunset.sunset));
console.log('Dec 4 Sunrise:', fmt(timesSunrise.sunrise));
