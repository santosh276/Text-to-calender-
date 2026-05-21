const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The logic to switch views is actually in render()
// Let's modify the visibility logic in render()

const replacement = `            const festivalContainer = document.getElementById('app-festival-view');
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
            }`;

const targetRegex = /const festivalContainer = document\.getElementById\('app-festival-view'\);\s*const moreContainer = document\.getElementById\('more-view-container'\);[\s\S]*?if\(viewBtnIcon\) viewBtnIcon\.innerHTML = CALENDAR_ICON_SVG;\s*\}/;

if (content.match(targetRegex)) {
    content = content.replace(targetRegex, replacement);
    fs.writeFileSync('ai tex to calnder.html', content);
    console.log('render() patched');
} else {
    console.log('Could not find render() target text.');
}
