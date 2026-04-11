import re

with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    html = f.read()

render_logic_search = """            const festivalContainer = document.getElementById('app-festival-view');

            if (appState.view === 'year') {"""

render_logic_replace = """            const festivalContainer = document.getElementById('app-festival-view');
            const moreContainer = document.getElementById('more-view-container');

            if (appState.view === 'year') {
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
            }"""

# We'll need to use a regex to replace the entire if-else block because it might vary slightly.
pattern = re.compile(r"const festivalContainer = document\.getElementById\('app-festival-view'\);\s+if \(appState\.view === 'year'\) \{[\s\S]*?if\(viewBtnIcon\) viewBtnIcon\.innerHTML = CALENDAR_ICON_SVG;\s+\}")

new_html = pattern.sub(render_logic_replace, html)

if new_html != html:
    with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
        f.write(new_html)
    print("Render logic updated.")
else:
    print("No changes made to render logic.")
