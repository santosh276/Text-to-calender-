import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# 1, 2, 3, 4: Update the settings-modal HTML
modal_pattern = re.compile(
    r'<!-- SETTINGS MODAL \(Redesigned as Menu Overlay\) -->.*?<div id="settings-modal" class="fixed inset-0 z-\[200\] flex items-center justify-center modal-hidden menu-overlay" style="display: none;">.*?<div class="modal-backdrop absolute inset-0 bg-black/20 backdrop-blur-sm" onclick="closeSettingsModal\(\)"></div>.*?<div class="modal-content w-full h-full md:w-\[90%\] md:h-\[90%\] bg-aurora rounded-none md:rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col glass">.*?<!-- Glassmorphism Header -->.*?<div class="glass-header p-6 border-b border-gray-200/50 flex justify-between items-center bg-white/90 sticky top-0 z-20">.*?<h3 class="font-bold text-2xl text-gray-800 flex items-center gap-3">.*?<i class="fa-solid fa-bars text-orange-500"></i> Menu.*?</h3>.*?<button onclick="closeSettingsModal\(\)" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition shadow-sm">.*?<i class="fa-solid fa-times text-lg"></i>.*?</button>.*?</div>(.*?)</div>.*?</div>',
    re.DOTALL
)

def replace_modal(match):
    inner_content = match.group(1)

    # We want to remove the specific padding/scroll classes from inner_content wrapper if needed,
    # but the wrapper `div class="overflow-y-auto p-6 md:p-10 custom-scroll flex-grow"` is inside `inner_content`
    # Let's check what `inner_content` actually starts with.

    return f"""<!-- SETTINGS MODAL (Redesigned as Menu Overlay) -->
    <div id="app-menu-view" class="hidden w-full max-w-2xl mx-auto h-full overflow-y-auto px-2 md:px-4">
        <div class="w-full h-full pb-24">
            <!-- Header for inline tab -->
            <div class="flex justify-between items-center mb-4 mt-2">
                <h2 class="text-xl font-extrabold text-gray-900 flex items-center gap-2"><i class="fa-solid fa-bars text-orange-500"></i> Menu</h2>
            </div>
{inner_content}
        </div>
    </div>"""

content = modal_pattern.sub(replace_modal, content)

# 5. Update toggleView logic
toggle_pattern = re.compile(
    r'(function toggleView\(viewName\) {.*?appState\.view = viewName;.*?)(\s*// Handle mobile bottom nav button states.*?const allNavBtns = document\.querySelectorAll\(\'#mobile-bottom-nav button\'\);.*?allNavBtns\.forEach\(btn => {.*?btn\.classList\.replace\(\'text-orange-600\', \'text-gray-400\'\);.*?if \(btn\.querySelector\(\'\.fa-calendar\'\)\) {.*?if \(viewName === \'month\' \|\| viewName === \'year\'\) btn\.classList\.replace\(\'text-gray-400\', \'text-orange-600\'\);.*?} else if \(btn\.querySelector\(\'\.festivals-icon\'\)\) {.*?if \(viewName === \'festivals\'\) btn\.classList\.replace\(\'text-gray-400\', \'text-orange-600\'\);.*?}.*?}\);)(\s*// Handle desktop top nav button states.*?const allDesktopNavBtns = document\.querySelectorAll\(\'#desktop-top-nav button\'\);.*?allDesktopNavBtns\.forEach\(btn => {.*?btn\.classList\.replace\(\'text-white\', \'text-white/80\'\);.*?if \(btn\.querySelector\(\'\.fa-calendar\'\)\) {.*?if \(viewName === \'month\' \|\| viewName === \'year\'\) btn\.classList\.replace\(\'text-white/80\', \'text-white\'\);.*?} else if \(btn\.querySelector\(\'\.festivals-icon\'\)\) {.*?if \(viewName === \'festivals\'\) btn\.classList\.replace\(\'text-white/80\', \'text-white\'\);.*?}.*?}\);)',
    re.DOTALL
)

def replace_toggle(match):
    prefix = match.group(1)
    mobile_nav = match.group(2)
    desktop_nav = match.group(3)

    mobile_nav = mobile_nav.replace('} else if (btn.querySelector(\'.festivals-icon\')) {', '} else if (btn.querySelector(\'.festivals-icon\')) {').replace('}\n            });', '} else if (btn.querySelector(\'svg circle\') || btn.textContent.includes(\'More\')) {\n                    if (viewName === \'menu\') btn.classList.replace(\'text-gray-400\', \'text-orange-600\');\n                }\n            });')

    desktop_nav = desktop_nav.replace('} else if (btn.querySelector(\'.festivals-icon\')) {', '} else if (btn.querySelector(\'.festivals-icon\')) {').replace('}\n            });', '} else if (btn.querySelector(\'svg circle\') || btn.textContent.includes(\'More\')) {\n                    if (viewName === \'menu\') btn.classList.replace(\'text-white/80\', \'text-white\');\n                }\n            });')

    return prefix + mobile_nav + desktop_nav

content = toggle_pattern.sub(replace_toggle, content)

# 5.b Update render() logic
render_pattern = re.compile(
    r'(const festivalContainer = document\.getElementById\(\'app-festival-view\'\);)(.*?if \(appState\.view === \'year\'\) {.*?)(} else if \(appState\.view === \'festivals\'\) {.*?)(} else {.*?)(if\(monthContainer\) monthContainer\.classList\.remove\(\'hidden\'\);)',
    re.DOTALL
)

def replace_render(match):
    decl = match.group(1)
    year_logic = match.group(2)
    fest_logic = match.group(3)
    else_logic = match.group(4)
    else_body = match.group(5)

    decl += "\n            const menuContainer = document.getElementById('app-menu-view');"

    year_logic = year_logic.replace("if(festivalContainer) festivalContainer.classList.add('hidden');", "if(festivalContainer) festivalContainer.classList.add('hidden');\n                if(menuContainer) menuContainer.classList.add('hidden');")

    fest_logic = fest_logic.replace("if(festivalContainer) festivalContainer.classList.remove('hidden');", "if(festivalContainer) festivalContainer.classList.remove('hidden');\n                if(menuContainer) menuContainer.classList.add('hidden');")

    else_logic = else_logic.replace("} else {", "} else if (appState.view === 'menu') {\n                if(monthContainer) monthContainer.classList.add('hidden');\n                if(yearContainer) yearContainer.classList.add('hidden');\n                if(festivalContainer) festivalContainer.classList.add('hidden');\n                if(menuContainer) menuContainer.classList.remove('hidden');\n            } else {")

    else_body = "if(menuContainer) menuContainer.classList.add('hidden');\n                " + else_body

    return decl + year_logic + fest_logic + else_logic + else_body

content = render_pattern.sub(replace_render, content)

# 6. Change openSettingsModal() to toggleView('menu')
content = content.replace("openSettingsModal()", "toggleView('menu')")

# 7. Remove openSettingsModal / closeSettingsModal functions
remove_func_pattern = re.compile(
    r'function openSettingsModal\(\) \{[\s\S]*?\}[\s\S]*?function closeSettingsModal\(\) \{[\s\S]*?\}',
    re.DOTALL
)
content = remove_func_pattern.sub('', content)


with open("ai tex to calnder.html", "w") as f:
    f.write(content)
