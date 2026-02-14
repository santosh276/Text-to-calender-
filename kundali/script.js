// Odia Localization
const ODIA = {
    PLANETS: {
        "Sun": "ରବି",
        "Moon": "ଚନ୍ଦ୍ର",
        "Mars": "ମଙ୍ଗଳ",
        "Mercury": "ବୁଧ",
        "Jupiter": "ଗୁରୁ",
        "Venus": "ଶୁକ୍ର",
        "Saturn": "ଶନି",
        "Rahu": "ରାହୁ",
        "Ketu": "କେତୁ",
        "Ascendant": "ଲଗ୍ନ",
        "Uranus": "ଇନ୍ଦ୍ର",
        "Neptune": "ବରୁଣ",
        "Pluto": "ଯମ"
    },
    SIGNS: [
        "ମେଷ", "ବୃଷ", "ମିଥୁନ", "କର୍କଟ", "ସିଂହ", "କନ୍ୟା",
        "ତୁଳା", "ବିଛା", "ଧନୁ", "ମକର", "କୁମ୍ଭ", "ମୀନ"
    ],
    NAKSHATRAS: [
        "ଅଶ୍ୱିନୀ", "ଭରଣୀ", "କୃତ୍ତିକା", "ରୋହିଣୀ", "ମୃଗଶିରା", "ଆର୍ଦ୍ରା",
        "ପୁନର୍ବସୁ", "ପୁଷ୍ୟା", "ଅଶ୍ଳେଷା", "ମଘା", "ପୂର୍ବା ଫାଲ୍ଗୁନୀ", "ଉତ୍ତରା ଫାଲ୍ଗୁନୀ",
        "ହସ୍ତା", "ଚିତ୍ରା", "ସ୍ୱାତୀ", "ବିଶାଖା", "ଅନୁରାଧା", "ଜ୍ୟେଷ୍ଠା",
        "ମୂଳା", "ପୂର୍ବାଷାଢ଼ା", "ଉତ୍ତରାଷାଢ଼ା", "ଶ୍ରବଣା", "ଧନିଷ୍ଠା", "ଶତଭିଷା",
        "ପୂର୍ବ ଭାଦ୍ରପଦ", "ଉତ୍ତର ଭାଦ୍ରପଦ", "ରେବତୀ"
    ]
};

// Global State
let appState = {
    date: new Date(),
    lat: 20.2961, // Bhubaneswar
    lon: 85.8245,
    timezone: 5.5
};

document.addEventListener('DOMContentLoaded', () => {
    initTabs();
    initForm();
    loadFromStorage();
});

function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });
}

function initForm() {
    const form = document.getElementById('kundali-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        generateKundali();
    });

    // Set default datetime
    const now = new Date();
    // Use local date string YYYY-MM-DD
    const localDate = new Date(now.getTime() - (now.getTimezoneOffset() * 60000))
                        .toISOString().split('T')[0];
    document.getElementById('date').value = localDate;

    // Format time as HH:mm:ss for step=1
    const timeStr = now.getHours().toString().padStart(2, '0') + ':' +
                    now.getMinutes().toString().padStart(2, '0') + ':' +
                    now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').value = timeStr;
}

function loadFromStorage() {
    const saved = localStorage.getItem('kundali_user_data');
    if (saved) {
        const data = JSON.parse(saved);
        document.getElementById('name').value = data.name || '';
        document.getElementById('lat').value = data.lat || '';
        document.getElementById('lon').value = data.lon || '';
        document.getElementById('timezone').value = data.timezone || 5.5;
    }
}

function saveToStorage() {
    const data = {
        name: document.getElementById('name').value,
        lat: document.getElementById('lat').value,
        lon: document.getElementById('lon').value,
        timezone: document.getElementById('timezone').value
    };
    localStorage.setItem('kundali_user_data', JSON.stringify(data));
}

// Astronomy Logic
function calculateAyanamsa(jd) {
    // Lahiri Ayanamsa (Chitra Paksha)
    // J2000 Epoch: JD 2451545.0
    // Ayanamsa at J2000: 23° 51' 25.532" = 23.857092 deg
    // Precession Rate: 50.290966 arcsec/year = 0.0139697 deg/year

    const t = (jd - 2451545.0) / 365.25;
    const ayanamsa = 23.857092 + 0.0139697 * t;
    return ayanamsa;
}

function normalize(deg) {
    deg = deg % 360;
    if (deg < 0) deg += 360;
    return deg;
}

function getRahuMean(jd) {
    // Mean Node of Moon (Rahu)
    // Formula from Meeus (Tropical)
    const T = (jd - 2451545.0) / 36525.0;
    let L = 125.04452 - 1934.136261 * T + 0.0020708 * T * T + (T * T * T) / 450000;
    return normalize(L);
}

function calculatePlanets(dateObj, lat, lon) {
    // Convert Date to Astronomy.MakeTime
    const date = new Date(dateObj);
    const astroTime = Astronomy.MakeTime(date);
    const jd = astroTime.ut + 2451545.0;

    const ayanamsa = calculateAyanamsa(jd);
    // Standard Vedic planets + Uranus/Neptune
    const bodies = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune'];
    const positions = {};

    bodies.forEach(bodyName => {
        const body = Astronomy.Body[bodyName];
        if (!body) return;

        // Geocentric position
        const vector = Astronomy.GeoVector(body, astroTime, true);

        // Ecliptic coordinates (Tropical)
        const ecliptic = Astronomy.Ecliptic(vector);

        // Sidereal Longitude
        const tropicalLon = ecliptic.elon;
        const siderealLon = normalize(tropicalLon - ayanamsa);

        positions[bodyName] = {
            lon: siderealLon,
            tropical: tropicalLon,
            lat: ecliptic.elat,
            speed: 0 // Placeholder
        };
    });

    // Rahu / Ketu
    const rahuTropical = getRahuMean(jd);
    positions['Rahu'] = {
        lon: normalize(rahuTropical - ayanamsa),
        tropical: rahuTropical
    };
    positions['Ketu'] = {
        lon: normalize(rahuTropical - ayanamsa + 180),
        tropical: normalize(rahuTropical + 180)
    };

    return { positions, ayanamsa, jd, astroTime };
}

function calculateAscendant(astroTime, lat, lon) {
    const jd = astroTime.ut + 2451545.0;
    const ayanamsa = calculateAyanamsa(jd);

    // Simplification: Calculate RAMC and use formula.
    const st = Astronomy.SiderealTime(astroTime); // Greenwich Sidereal Time in hours
    const lst = (st * 15 + lon) % 360; // Local Sidereal Time in degrees
    const eps = Astronomy.e_tilt(astroTime).mobl; // Obliquity

    const rad = Math.PI / 180;
    const A = lst * rad;
    const E = eps * rad;
    const L = lat * rad;

    const y = Math.cos(A);
    const x = -Math.sin(A) * Math.cos(E) + Math.tan(L) * Math.sin(E);

    let ascTropical = Math.atan2(y, x) * 180 / Math.PI;
    ascTropical = normalize(ascTropical);

    return normalize(ascTropical - ayanamsa);
}

// Chart Logic

function getDivisionalSign(lon, div) {
    const d1Sign = Math.floor(lon / 30);
    const degInSign = lon % 30;

    if (div === 1) return d1Sign;

    if (div === 9) {
        const navamsaIndex = Math.floor(degInSign / (30/9)); // 0-8
        // Movable (0, 3, 6, 9): Starts from Sign
        // Fixed (1, 4, 7, 10): Starts from 9th from Sign
        // Dual (2, 5, 8, 11): Starts from 5th from Sign

        let startSign;
        if ([0, 3, 6, 9].includes(d1Sign)) startSign = d1Sign;
        else if ([1, 4, 7, 10].includes(d1Sign)) startSign = (d1Sign + 8) % 12;
        else startSign = (d1Sign + 4) % 12;

        return (startSign + navamsaIndex) % 12;
    }

    if (div === 10) {
        const dashamshaIndex = Math.floor(degInSign / 3); // 0-9
        // Odd Signs (0, 2, 4, 6, 8, 10): Start from Sign
        // Even Signs (1, 3, 5, 7, 9, 11): Start from 9th from Sign

        let startSign;
        if (d1Sign % 2 === 0) startSign = d1Sign;
        else startSign = (d1Sign + 8) % 12;

        return (startSign + dashamshaIndex) % 12;
    }

    return d1Sign;
}

function calculateShadbala(positions) {
    // Placeholder Shadbala Calculation
    const strengths = {};
    const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];

    planets.forEach(p => {
        if (positions[p]) {
            // Mock values for Sthana, Dig, Kaala, Chestha, Naisargika, Drik
            strengths[p] = {
                total: (Math.random() * 300 + 300).toFixed(1) // 300-600 range
            };
        }
    });
    return strengths;
}

function getNakshatra(lon) {
    const nakshatraSpan = 13.333333; // 360 / 27
    return Math.floor(lon / nakshatraSpan);
}

// Main Generation Function
function generateKundali() {
    saveToStorage();
    document.getElementById('output-section').classList.remove('hidden');

    const name = document.getElementById('name').value;
    const dateStr = document.getElementById('date').value;
    const timeStr = document.getElementById('time').value;
    const lat = parseFloat(document.getElementById('lat').value);
    const lon = parseFloat(document.getElementById('lon').value);
    const tz = parseFloat(document.getElementById('timezone').value);

    const [year, month, day] = dateStr.split('-').map(Number);
    const [hour, minute] = timeStr.split(':').map(Number);
    // Parse seconds if available, else 0
    const seconds = timeStr.split(':')[2] ? Number(timeStr.split(':')[2]) : 0;

    // Convert User Local Time to UTC
    // Construct date as if it were UTC (User Input Time)
    const userTimeBase = Date.UTC(year, month - 1, day, hour, minute, seconds);
    // Subtract timezone offset in milliseconds (tz is in hours)
    const utcDate = new Date(userTimeBase - (tz * 3600 * 1000));

    const { positions, ayanamsa, astroTime } = calculatePlanets(utcDate, lat, lon);
    const ascendant = calculateAscendant(astroTime, lat, lon);
    const shadbala = calculateShadbala(positions);

    positions['Ascendant'] = { lon: ascendant };

    renderBasicDetails({ name, dateStr, timeStr, lat, lon, ayanamsa, ascendant });

    renderEastIndianChart('d1-chart', positions, ascendant, 1);
    renderEastIndianChart('d9-chart', positions, ascendant, 9);
    renderEastIndianChart('d10-chart', positions, ascendant, 10);
    renderPlanetaryTable(positions, shadbala);
}

function renderBasicDetails(details) {
    const container = document.getElementById('basic-details-container');
    container.innerHTML = `
        <p><strong>Name:</strong> ${details.name}</p>
        <p><strong>Date:</strong> ${details.dateStr}</p>
        <p><strong>Time:</strong> ${details.timeStr}</p>
        <p><strong>Place:</strong> ${details.lat.toFixed(4)}, ${details.lon.toFixed(4)}</p>
        <p><strong>Lagna (Ascendant):</strong> ${formatDeg(details.ascendant)} (${ODIA.SIGNS[Math.floor(details.ascendant/30)]})</p>
        <p><strong>Ayanamsa (Lahiri):</strong> ${formatDeg(details.ayanamsa)}</p>
    `;
}

function formatDeg(deg) {
    const d = Math.floor(deg);
    const m = Math.floor((deg - d) * 60);
    const s = Math.round(((deg - d) * 60 - m) * 60);
    return `${d}° ${m}' ${s}"`;
}

function renderEastIndianChart(chartId, positions, ascendant, div) {
    const container = document.getElementById(chartId);

    // Clear previous content in boxes
    // Note: The boxes are static .sign-1, .sign-2 ...
    // We iterate through signs 1-12 (indices 0-11)

    for (let i = 0; i < 12; i++) {
        const signIndex = i; // 0 for Aries, etc.
        const box = container.querySelector(`.sign-${i + 1}`);
        if (!box) continue;

        box.innerHTML = ''; // Clear

        // Add Sign Number (1..12) or Name
        // In Odia chart, we might just put the number
        const numberSpan = document.createElement('span');
        numberSpan.className = 'sign-number';
        numberSpan.innerText = (i + 1);
        box.appendChild(numberSpan);

        // Check for Planets
        for (const [key, planet] of Object.entries(positions)) {
            if (key === 'Ascendant') continue; // Handled separately? No, treat as planet for location?
            // Wait, Ascendant is 'Lagna'.

            const pSign = getDivisionalSign(planet.lon, div);
            if (pSign === signIndex) {
                const pSpan = document.createElement('div');
                pSpan.className = 'planet-marker';
                pSpan.innerText = ODIA.PLANETS[key] || key;
                box.appendChild(pSpan);
            }
        }

        // Check for Ascendant (Lagna)
        const ascSign = getDivisionalSign(ascendant, div);
        if (ascSign === signIndex) {
            const ascSpan = document.createElement('div');
            ascSpan.className = 'ascendant-marker';
            ascSpan.innerText = ODIA.PLANETS['Ascendant'];
            box.appendChild(ascSpan);
        }
    }
}

function renderPlanetaryTable(positions, shadbala) {
    const tbody = document.querySelector('#planetary-table tbody');
    // Add header for Shadbala if not present
    const theadRow = document.querySelector('#planetary-table thead tr');
    if (theadRow.children.length === 4) {
        const th = document.createElement('th');
        th.innerText = 'Shadbala';
        theadRow.appendChild(th);
    }

    tbody.innerHTML = '';

    // Order: Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, Ketu, Ascendant
    const order = ['Ascendant', 'Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu', 'Uranus', 'Neptune'];

    order.forEach(key => {
        const planet = positions[key];
        if (!planet) return;

        const signIndex = Math.floor(planet.lon / 30);
        const signName = ODIA.SIGNS[signIndex];
        const degree = planet.lon % 30;
        const nakIndex = getNakshatra(planet.lon);
        const nakName = ODIA.NAKSHATRAS[nakIndex];
        const strength = (shadbala && shadbala[key]) ? shadbala[key].total : '-';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${ODIA.PLANETS[key] || key}</td>
            <td>${signName}</td>
            <td>${formatDeg(degree)}</td>
            <td>${nakName}</td>
            <td>${strength}</td>
        `;
        tbody.appendChild(row);
    });
}
