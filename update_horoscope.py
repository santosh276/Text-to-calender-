
import sys

filepath = 'ai tex to calnder.html'
with open(filepath, 'r') as f:
    content = f.read()

# Define the new data and function
new_code = r"""
        const ZodiacStaticData = {
            aries: { dates: "March 21 - April 19", element: "Fire", elementClass: "z-fire", svg: '<path fill="none" stroke="#ff5050" stroke-width="5" stroke-linecap="round" d="M30,50 L70,50 M30,30 L50,70 L70,30" />', info: "The Ram represents courage, determination, and confidence. Aries are natural leaders." },
            taurus: { dates: "April 20 - May 20", element: "Earth", elementClass: "z-earth", svg: '<circle cx="50" cy="50" r="30" fill="none" stroke="#8bc34a" stroke-width="5" /><path fill="none" stroke="#8bc34a" stroke-width="5" d="M30,50 L50,30 L70,50" />', info: "The Bull symbolizes stability, patience, and practicality. Taurus are reliable and persistent." },
            gemini: { dates: "May 21 - June 20", element: "Air", elementClass: "z-air", svg: '<path fill="none" stroke="#2196f3" stroke-width="5" d="M40,30 L40,70 M60,30 L60,70 M40,30 L60,50 M40,70 L60,50" />', info: "The Twins represent duality, communication, and adaptability. Gemini are versatile and expressive." },
            cancer: { dates: "June 21 - July 22", element: "Water", elementClass: "z-water", svg: '<path fill="none" stroke="#03a9f4" stroke-width="5" d="M30,50 Q50,30 70,50 Q50,70 30,50" />', info: "The Crab symbolizes emotion, intuition, and nurturing. Cancer are protective and empathetic." },
            leo: { dates: "July 23 - August 22", element: "Fire", elementClass: "z-fire", svg: '<circle cx="50" cy="40" r="15" fill="none" stroke="#ff5050" stroke-width="5" /><path fill="none" stroke="#ff5050" stroke-width="5" d="M50,55 Q55,70 65,70 Q70,60 75,65" /><path fill="none" stroke="#ff5050" stroke-width="5" d="M50,55 Q45,70 35,70 Q30,60 25,65" />', info: "The Lion represents charisma, leadership, and creativity. Leo are confident and generous." },
            virgo: { dates: "August 23 - September 22", element: "Earth", elementClass: "z-earth", svg: '<path fill="none" stroke="#8bc34a" stroke-width="5" d="M50,30 L50,70 M40,50 L60,50 M30,35 L50,45 L70,35" />', info: "The Virgin symbolizes precision, practicality, and service. Virgo are analytical and kind." },
            libra: { dates: "September 23 - October 22", element: "Air", elementClass: "z-air", svg: '<path fill="none" stroke="#2196f3" stroke-width="5" d="M30,50 L70,50 M50,30 L50,70 M40,35 L40,65 M60,35 L60,65" />', info: "The Scales represent balance, harmony, and justice. Libra are diplomatic and social." },
            scorpio: { dates: "October 23 - November 21", element: "Water", elementClass: "z-water", svg: '<path fill="none" stroke="#03a9f4" stroke-width="5" d="M50,30 L50,70 M50,70 L40,60 M50,70 L60,60 M30,50 L70,50" /><path fill="none" stroke="#03a9f4" stroke-width="5" d="M30,50 L25,55 M70,50 L75,55" />', info: "The Scorpion symbolizes passion, mystery, and transformation. Scorpio are resourceful and brave." },
            sagittarius: { dates: "November 22 - December 21", element: "Fire", elementClass: "z-fire", svg: '<path fill="none" stroke="#ff5050" stroke-width="5" d="M40,30 L60,50 L40,70" /><path fill="none" stroke="#ff5050" stroke-width="3" d="M60,50 L80,40" />', info: "The Archer represents adventure, optimism, and freedom. Sagittarius are philosophical and enthusiastic." },
            capricorn: { dates: "December 22 - January 19", element: "Earth", elementClass: "z-earth", svg: '<path fill="none" stroke="#8bc34a" stroke-width="5" d="M40,50 L60,30 L60,70" /><path fill="none" stroke="#8bc34a" stroke-width="3" d="M60,30 L70,25 M60,70 L70,75" />', info: "The Goat symbolizes discipline, responsibility, and ambition. Capricorn are practical and wise." },
            aquarius: { dates: "January 20 - February 18", element: "Air", elementClass: "z-air", svg: '<path fill="none" stroke="#2196f3" stroke-width="5" d="M35,40 L50,30 L65,40 M35,60 L50,50 L65,60 M35,40 L35,60 M65,40 L65,60" />', info: "The Water Bearer represents innovation, originality, and independence. Aquarius are progressive and humanitarian." },
            pisces: { dates: "February 19 - March 20", element: "Water", elementClass: "z-water", svg: '<path fill="none" stroke="#03a9f4" stroke-width="5" d="M30,40 Q50,30 70,40 M30,60 Q50,70 70,60 M35,40 L45,60 M65,40 L55,60" />', info: "The Fish symbolize intuition, compassion, and imagination. Pisces are empathetic and artistic." }
        };

        function renderHoroscope(data) {
            const grid = document.getElementById('horoscope-grid');
            const parent = grid.parentElement;

            // Apply Cosmic Theme to Parent if not already applied
            if (!parent.classList.contains('cosmic-container')) {
                parent.className = "cosmic-container rounded-xl shadow-md p-4 relative";

                // Add Star Background
                const starBg = document.createElement('div');
                starBg.className = 'stars-bg';
                parent.appendChild(starBg); // Append first, but z-index handles layering

                // Add Constellation Layer
                const constelBg = document.createElement('div');
                constelBg.className = 'constellation';
                parent.appendChild(constelBg);

                // Generate Stars
                for (let i = 0; i < 50; i++) {
                    const star = document.createElement('div');
                    star.className = 'star-dot';
                    const size = Math.random() * 2 + 1;
                    star.style.width = `${size}px`;
                    star.style.height = `${size}px`;
                    star.style.left = `${Math.random() * 100}%`;
                    star.style.top = `${Math.random() * 100}%`;
                    star.style.animationDelay = `${Math.random() * 5}s`;
                    star.style.setProperty('--duration', `${Math.random() * 3 + 2}s`);
                    starBg.appendChild(star);
                }

                // Generate Constellation Lines
                const svgNS = "http://www.w3.org/2000/svg";
                const svg = document.createElementNS(svgNS, "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");

                for (let i = 0; i < 15; i++) {
                    const line = document.createElementNS(svgNS, "line");
                    const x1 = Math.random() * 100;
                    const y1 = Math.random() * 100;
                    const x2 = x1 + (Math.random() * 20 - 10);
                    const y2 = y1 + (Math.random() * 20 - 10);

                    line.setAttribute("x1", `${x1}%`);
                    line.setAttribute("y1", `${y1}%`);
                    line.setAttribute("x2", `${x2}%`);
                    line.setAttribute("y2", `${y2}%`);
                    line.classList.add("constellation-line");
                    svg.appendChild(line);
                }
                constelBg.appendChild(svg);

                // Update header style
                const header = parent.querySelector('h3');
                if (header) {
                    header.className = "font-bold text-[#00ffff] mb-3 border-b border-[#00ffff]/30 pb-1 flex items-center relative z-20";
                    header.style.fontFamily = "'Orbitron', sans-serif";
                    const icon = header.querySelector('i');
                    if(icon) {
                        icon.className = "fa-solid fa-star text-[#ff00ff] mr-2";
                    }
                }
            }

            grid.innerHTML = '';
            // Change grid to 1 column for full cards
            grid.className = "flex flex-col gap-4 relative z-20";

            if (data.horoscope.length === 0) {
                grid.innerHTML = '<div class="text-[#a0d2eb] italic text-sm text-center py-4 relative z-20" style="font-family: \'Quicksand\', sans-serif;">No horoscope data available.</div>';
                return;
            }

            const currentLang = appState.config.language || 'en';
            const localizedHoroscopes = langData[currentLang] ? langData[currentLang].horoscopes : langData.en.horoscopes;

            data.horoscope.forEach(h => {
                const signKey = h.sign.toLowerCase();
                const staticData = ZodiacStaticData[signKey] || {
                    dates: "", element: "", elementClass: "z-air", svg: '<circle cx="50" cy="50" r="30" fill="none" stroke="#fff" stroke-width="2" />', info: ""
                };

                const card = document.createElement('div');
                card.className = "zodiac-card-cosmic";

                const localizedName = localizedHoroscopes[signKey] || h.sign;

                card.innerHTML = `
                    <svg class="zodiac-symbol-cosmic" viewBox="0 0 100 100">${staticData.svg}</svg>
                    <h2 class="zodiac-title-cosmic">${localizedName}</h2>
                    <p class="zodiac-dates-cosmic">${staticData.dates}</p>
                    <span class="z-element ${staticData.elementClass}">${staticData.element}</span>
                    <p class="sign-info-cosmic">${h.text}</p>
                `;

                card.onclick = () => openHoroscopeModal(h.sign, h.text);
                grid.appendChild(card);
            });
        }
"""

# Find the existing renderHoroscope function and replace it
# We need to find the specific block because earlier we might have replaced it.
# Or if this is the first time running this script after reset (wait, I didn't reset),
# I need to match the *current* state.
# The current state has `function renderHoroscope(data) { ... }` from my previous turn's logic?
# No, I didn't execute `update_horoscope.py` yet. I created it but didn't run it.
# So the file still has the original `renderHoroscope`.

start_marker = "function renderHoroscope(data) {"
start_idx = content.find(start_marker)

if start_idx != -1:
    idx = start_idx
    brace_count = 0
    found_start = False
    end_idx = -1

    while idx < len(content):
        char = content[idx]
        if char == '{':
            brace_count += 1
            found_start = True
        elif char == '}':
            brace_count -= 1
            if found_start and brace_count == 0:
                end_idx = idx + 1
                break
        idx += 1

    if end_idx != -1:
        final_content = content[:start_idx] + new_code + content[end_idx:]
        with open(filepath, 'w') as f:
            f.write(final_content)
        print("Successfully replaced renderHoroscope.")
    else:
        print("Could not find end of renderHoroscope function.")
else:
    print("Could not find renderHoroscope function.")
