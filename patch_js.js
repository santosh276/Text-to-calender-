const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

const replacement = `        function toggleView(viewName) {

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
                } else if (btn.querySelector('.fa-headphones')) {
                    if (safeView === 'listen') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.id === 'nav-btn-chat') {
                     if (safeView === 'chat') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                }
            });

            // Handle desktop top nav button states
            const allDesktopBtns = document.querySelectorAll('#desktop-top-nav button');
            allDesktopBtns.forEach(btn => {
                btn.classList.remove('text-white', 'text-white/80');
                if (btn.querySelector('.fa-calendar')) {
                    if (safeView === 'month' || safeView === 'year') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.festivals-icon')) {
                    if (safeView === 'festivals') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.fa-clock')) {
                    if (safeView === 'timings') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.fa-headphones')) {
                    if (safeView === 'listen') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.id === 'desktop-nav-chat') {
                    if (safeView === 'chat') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                }
            });

            const monthContainer = document.getElementById('month-view-container');
            const yearContainer = document.getElementById('year-view-container');
            const festivalContainer = document.getElementById('app-festival-view');
            const moreContainer = document.getElementById('more-view-container');
            const timingsContainer = document.getElementById('timings-view-container');

            if (safeView === 'month') {
                if(monthContainer) monthContainer.classList.remove('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
            } else if (safeView === 'year') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.remove('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
                if(appState.monthsData.length > 0 && !document.getElementById('year-grid').innerHTML) {
                    renderYearView();
                }
            } else if (safeView === 'festivals') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.remove('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
                renderAppFestivalView();
            } else if (safeView === 'timings') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(timingsContainer) timingsContainer.classList.remove('hidden');
            } else if (safeView === 'more') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.remove('hidden');
                if(timingsContainer) timingsContainer.classList.add('hidden');
            }`;

const targetRegex = /function toggleView\(viewName\) \{[\s\S]*?if\(moreContainer\) moreContainer\.classList\.remove\('hidden'\);\n\s*\}/;

if (content.match(targetRegex)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync('ai tex to calnder.html', content);
    console.log('toggleView patched');
} else {
    console.log('Target toggleView not found, performing partial replacements...');
}
