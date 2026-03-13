const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Replace handleLocationSearch to toggle clear-search-btn
const targetFunctionStart = html.indexOf('function handleLocationSearch(event)');
const targetFunctionEnd = html.indexOf('function selectSearchedLocation(state, city, lat, lng)');

const originalFunction = html.substring(targetFunctionStart, targetFunctionEnd);

const newFunction = `function handleLocationSearch(event) {
            const query = event.target.value.trim().toLowerCase();
            const resultsContainer = document.getElementById('location-search-results');
            const clearBtn = document.getElementById('clear-search-btn');

            if (!query) {
                resultsContainer.classList.add('hidden');
                if (clearBtn) clearBtn.classList.add('hidden');
                return;
            } else {
                if (clearBtn) clearBtn.classList.remove('hidden');
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

                resultsContainer.innerHTML = limitedResults.map(result => \`
                    <div class="px-4 py-3 hover:bg-orange-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors" onclick="selectSearchedLocation('\${result.state.replace(/'/g, "\\\\'")}', '\${result.city.replace(/'/g, "\\\\'")}', \${result.coords[0]}, \${result.coords[1]})">
                        <div class="font-semibold text-gray-800">\${result.city}</div>
                        <div class="text-xs text-gray-500">\${result.state}</div>
                    </div>
                \`).join('');
                resultsContainer.classList.remove('hidden');
            } else {
                resultsContainer.innerHTML = \`
                    <div class="px-4 py-4 text-center text-sm text-gray-500">
                        No locations found
                    </div>
                \`;
                resultsContainer.classList.remove('hidden');
            }
        }
        `;

html = html.replace(originalFunction, newFunction);

// Also need to clear the clear-search-btn on selectSearchedLocation
html = html.replace("searchInput.value = '';", `searchInput.value = '';\n            const clearBtn = document.getElementById('clear-search-btn');\n            if (clearBtn) clearBtn.classList.add('hidden');`);

fs.writeFileSync('ai tex to calnder.html', html);
console.log("Patched!");
