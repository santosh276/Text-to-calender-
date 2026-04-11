const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Add onclick="toggleView('more')" to both "More" buttons
html = html.replace(/<button class="menu-icon-btn (flex flex-col items-center[^>]*?)"(?! onclick)/g, '<button class="menu-icon-btn $1" onclick="toggleView(\'more\')"');
// The other one might have an ID or slightly different classes. Let's find it.
html = html.replace(/<button class="menu-icon-btn([^>]*?)"([^>]*)>/g, (match, p1, p2) => {
    if (match.includes("onclick")) return match;
    return `<button class="menu-icon-btn${p1}" onclick="toggleView('more')"${p2}>`;
});

// Update render() function
let renderFunc = html.match(/function render\(\) \{[\s\S]*?const festivalContainer = document\.getElementById\('app-festival-view'\);/)[0];
let newRenderFunc = renderFunc + `\n            const moreContainer = document.getElementById('more-view-container');`;

html = html.replace(renderFunc, newRenderFunc);

let toggleViewsBlock = `            if (appState.view === 'year') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.remove('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Month View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
                renderYearView();
            } else if (appState.view === 'festivals') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.remove('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                renderAppFestivalView();
            } else if (appState.view === 'more') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.remove('hidden');
            } else {
                if(monthContainer) monthContainer.classList.remove('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(moreContainer) moreContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Year View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
            }`;

html = html.replace(/if \(appState\.view === 'year'\) \{[\s\S]*?if\(viewBtnIcon\) viewBtnIcon\.innerHTML = CALENDAR_ICON_SVG;\n            \}/, toggleViewsBlock);

// Update toggleView() function highlighting
let toggleViewFunc = `        function toggleView(viewName) {

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
        }`;

html = html.replace(/function toggleView\(viewName\) \{[\s\S]*?render\(\);\n        \}/, toggleViewFunc);

fs.writeFileSync('ai tex to calnder.html', html);
