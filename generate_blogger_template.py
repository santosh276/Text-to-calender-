import re

INPUT_FILE = "ai tex to calnder.html"
OUTPUT_FILE = "blogger_template.xml"

def generate_template():
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Extract CSS
    css_blocks = re.findall(r'<style.*?>(.*?)</style>', content, re.DOTALL)
    full_css = "\n".join(css_blocks)

    # 2. Extract Head Scripts/Links (excluding styles)
    head_content_match = re.search(r'<head>(.*?)</head>', content, re.DOTALL)
    if head_content_match:
        head_inner = head_content_match.group(1)
        # Remove all style blocks first
        head_inner = re.sub(r'<style.*?>.*?</style>', '', head_inner, flags=re.DOTALL)

        head_lines = []
        for line in head_inner.split('\n'):
            if '<title>' in line or '<meta name="viewport"' in line or '<meta charset' in line:
                continue
            if line.strip():
                head_lines.append(line)
        head_assets = "\n".join(head_lines)
    else:
        head_assets = ""

    # 3. Extract Body Content
    body_match = re.search(r'<body.*?>(.*?)</body>', content, re.DOTALL)
    if body_match:
        full_body = body_match.group(1)
    else:
        full_body = ""

    # 4. Extract Main Script
    scripts = re.findall(r'<script>(.*?)</script>', full_body, re.DOTALL)
    if scripts:
        main_js = scripts[-1]
        script_tag = f'<script>{main_js}</script>'
        full_body = full_body.replace(script_tag, '')
    else:
        main_js = ""

    # 5. Extract Guide
    guide_match = re.search(r'(<div id="syntax-guide".*?</div>)\s*<textarea', full_body, re.DOTALL)
    guide_html = ""
    guide_html_clean = ""
    if guide_match:
        guide_html = guide_match.group(1)
        guide_html_clean = guide_html.replace('max-h-0', '').replace('opacity-0', '').replace('hidden', '')
        guide_html_clean = guide_html_clean.replace('style="display: none;"', '')

    # 6. Prepare App Body
    app_body = full_body.replace('h-screen', 'h-full')

    # 7. Construct XML (Using replace instead of f-string to avoid curly brace issues)
    xml_template = """<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE html>
<html b:version='2' class='v2' expr:dir='data:blog.languageDirection' xmlns='http://www.w3.org/1999/xhtml' xmlns:b='http://www.google.com/2005/gml/b' xmlns:data='http://www.google.com/2005/gml/data' xmlns:expr='http://www.google.com/2005/gml/expr'>
<head>
    <meta content='width=device-width, initial-scale=1' name='viewport'/>
    <title><data:blog.pageTitle/></title>
    <!-- HEAD ASSETS -->
    __HEAD_ASSETS__

    <b:skin><![CDATA[
/* EXTRACTED CSS */
__FULL_CSS__

/* Custom Overrides */
body { margin: 0; padding: 0; background-color: #111827; }
.navbar { display: none !important; } /* Hide Default Blogger Navbar */
/* Scrollbar for Guide */
#view-guide::-webkit-scrollbar { width: 8px; }
#view-guide::-webkit-scrollbar-track { background: #1f2937; }
#view-guide::-webkit-scrollbar-thumb { background: #4b5563; border-radius: 4px; }
    ]]></b:skin>
</head>
<body>
    <b:section id='main' showaddelement='yes'>
        <b:widget id='HTML1' locked='false' title='' type='HTML'>
            <b:widget-settings>
                <b:widget-setting name='content'></b:widget-setting>
            </b:widget-settings>
            <b:includable id='main'>
                <!-- Empty -->
            </b:includable>
        </b:widget>
    </b:section>

    <!-- APP ROOT -->
    <div id="app-root" class="font-sans antialiased text-gray-900">

        <!-- NAVIGATION -->
        <nav class="bg-gray-900 border-b border-gray-800 h-16 flex items-center justify-between px-4 md:px-8 fixed top-0 w-full z-[100]">
            <div class="font-bold text-xl tracking-wide flex items-center gap-2 text-white cursor-pointer" onclick="router('home')">
                <i class="fa-solid fa-calendar-alt text-orange-500"></i> <span class="hidden md:inline">Vaidik Calendar</span>
            </div>
            <div class="flex gap-4 md:gap-8 text-sm font-semibold text-gray-300">
                <a href="#home" class="hover:text-orange-400 transition py-2" onclick="router('home')">Home</a>
                <a href="#app" class="hover:text-orange-400 transition py-2" onclick="router('app')">Generator</a>
                <a href="#guide" class="hover:text-orange-400 transition py-2" onclick="router('guide')">Guide</a>
            </div>
        </nav>

        <!-- VIEW: HOME -->
        <div id="view-home" class="view-section pt-16 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6 text-center">
            <div class="max-w-4xl mx-auto animate-fade-in-up">
                <div class="mb-6 inline-block p-3 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-widest">
                    New V6.0 Engine
                </div>
                <h1 class="text-4xl md:text-7xl font-extrabold mb-6 leading-tight">
                    <span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">Vaidik Calendar</span><br>
                    Auto Generator
                </h1>
                <p class="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Generate professional, high-precision Hindu calendars with accurate Tithi, Nakshatra, and festival data.
                    Customize with your own events, photos, and language (Odia/English).
                </p>

                <div class="flex flex-col md:flex-row gap-4 justify-center">
                    <button onclick="router('app')" class="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-orange-900/50 transform transition hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3">
                        <i class="fa-solid fa-rocket"></i> Start Creating
                    </button>
                    <button onclick="router('guide')" class="bg-gray-800 hover:bg-gray-700 text-white font-bold py-4 px-10 rounded-full text-lg border border-gray-700 transition flex items-center justify-center gap-3">
                        <i class="fa-solid fa-book-open"></i> Read Guide
                    </button>
                </div>

                <!-- Feature Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 text-left">
                    <div class="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                        <div class="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-lg flex items-center justify-center mb-4 text-xl"><i class="fa-solid fa-cloud"></i></div>
                        <h3 class="font-bold text-lg mb-2">Live Cloud Sync</h3>
                        <p class="text-sm text-gray-400">Sync data directly from Google Docs or GitHub. Collaborate in real-time.</p>
                    </div>
                    <div class="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                        <div class="w-10 h-10 bg-green-500/20 text-green-400 rounded-lg flex items-center justify-center mb-4 text-xl"><i class="fa-solid fa-calculator"></i></div>
                        <h3 class="font-bold text-lg mb-2">High Precision</h3>
                        <p class="text-sm text-gray-400">Uses Meeus algorithms for accurate Tithi, Sunrise, and Sunset timings.</p>
                    </div>
                    <div class="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50">
                        <div class="w-10 h-10 bg-purple-500/20 text-purple-400 rounded-lg flex items-center justify-center mb-4 text-xl"><i class="fa-solid fa-language"></i></div>
                        <h3 class="font-bold text-lg mb-2">Multi-Language</h3>
                        <p class="text-sm text-gray-400">Built-in support for English and Odia, with expandable language packs.</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- VIEW: APP (GENERATOR) -->
        <div id="view-app" class="view-section pt-16 hidden h-screen overflow-hidden relative bg-white">
            <div class="h-full w-full">
                __APP_BODY__
            </div>
        </div>

        <!-- VIEW: GUIDE -->
        <div id="view-guide" class="view-section pt-16 hidden h-screen bg-gray-900 text-white overflow-y-auto">
             <div class="max-w-4xl mx-auto p-6 md:p-12">
                <div class="flex items-center justify-between mb-8 border-b border-gray-800 pb-6">
                    <h2 class="text-3xl font-bold text-orange-400">Formatting Guide</h2>
                    <button onclick="router('app')" class="text-sm bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">Back to App</button>
                </div>
                <div class="prose prose-invert max-w-none">
                    <p class="text-xl text-gray-400 mb-8">
                        Learn how to format your data file to generate the calendar.
                        The engine uses a custom markup language using blocks like <code>::: calendar</code>.
                    </p>
                    <!-- INJECT EXTRACTED GUIDE HERE -->
                    <div class="bg-black/30 rounded-xl p-6 border border-gray-800 text-sm">
                        __GUIDE_HTML_CLEAN__
                    </div>
                </div>
             </div>
        </div>

    </div>

    <!-- MAIN LOGIC -->
    <script type='text/javascript'>
    //<![CDATA[
        // ROUTER LOGIC
        function router(viewId) {
            // Hide all views
            document.querySelectorAll('.view-section').forEach(el => {
                el.classList.add('hidden');
                // Also toggle overflow on body/html if needed? No, separate containers handle scrolling.
            });

            // Show target
            const target = document.getElementById('view-' + viewId);
            if(target) {
                target.classList.remove('hidden');
                // Scroll to top
                if(viewId !== 'app') window.scrollTo(0,0);
            }

            // Update URL hash
            if(history.pushState) {
                history.pushState(null, null, '#' + viewId);
            } else {
                window.location.hash = '#' + viewId;
            }
        }

        // Initial Load
        window.addEventListener('load', () => {
            const hash = window.location.hash.replace('#', '');
            if(hash && document.getElementById('view-' + hash)) {
                router(hash);
            } else {
                router('home');
            }
        });

        window.addEventListener('popstate', () => {
             const hash = window.location.hash.replace('#', '');
             if(hash) router(hash); else router('home');
        });

        // --- ORIGINAL JS ---
        __MAIN_JS__
    //]]>
    </script>
</body>
</html>
"""

    # Perform Replacements
    xml_template = xml_template.replace('__HEAD_ASSETS__', head_assets)
    xml_template = xml_template.replace('__FULL_CSS__', full_css)
    xml_template = xml_template.replace('__APP_BODY__', app_body)
    xml_template = xml_template.replace('__GUIDE_HTML_CLEAN__', guide_html_clean)
    xml_template = xml_template.replace('__MAIN_JS__', main_js)

    with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
        f.write(xml_template)

    print(f"Generated {OUTPUT_FILE}")

if __name__ == "__main__":
    generate_template()
