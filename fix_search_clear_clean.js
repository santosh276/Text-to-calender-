const fs = require('fs');
const filename = 'ai tex to calnder.html';
let content = fs.readFileSync(filename, 'utf-8');

const targetStr = `autocomplete="off">

                        <!-- Search Results Dropdown -->`;
const replacementStr = `autocomplete="off">
                        <i id="clear-search-btn" class="fa-solid fa-xmark absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer hidden hover:text-gray-600 transition-colors" onclick="document.getElementById('location-search-input').value = ''; handleLocationSearch({target: {value: ''}}); this.classList.add('hidden'); document.getElementById('location-search-results').classList.add('hidden');"></i>
                        <!-- Search Results Dropdown -->`;
content = content.replace(targetStr, replacementStr);

const handleTarget = `function handleLocationSearch(event) {
            const query = event.target.value.toLowerCase().trim();`;

const handleReplacement = `function handleLocationSearch(event) {
            const query = event.target.value.toLowerCase().trim();
            const clearBtn = document.getElementById('clear-search-btn');
            if(clearBtn) {
                if(query.length > 0) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }`;
content = content.replace(handleTarget, handleReplacement);
fs.writeFileSync(filename, content);
