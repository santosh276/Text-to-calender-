import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# 1. Add app-festival-view inside layout-container
if "app-festival-view" not in content:
    content = content.replace(
        '<div id="month-view-container"',
        '''<div id="app-festival-view" class="hidden w-full max-w-2xl mx-auto h-full overflow-y-auto px-2 md:px-4">
                <!-- Hero Festival Banner -->
                <div id="hero-festival-banner" class="relative rounded-2xl overflow-hidden shadow-lg h-64 mb-6 cursor-pointer group">
                    <!-- populated by JS -->
                </div>

                <!-- Header -->
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-xl font-extrabold text-gray-900">Upcoming Festivals</h2>
                    <button onclick="toggleView('month')" class="text-orange-600 font-bold text-sm flex items-center gap-1 hover:text-orange-700 transition-colors">
                        <i class="fa-regular fa-calendar"></i> View calendar
                    </button>
                </div>

                <!-- Grid -->
                <div id="upcoming-festivals-grid" class="grid grid-cols-2 gap-4">
                    <!-- populated by JS -->
                </div>
            </div>

            <div id="month-view-container"'''
    )

# 2. Add Mobile Bottom Navigation Bar at end of body
if "mobile-bottom-nav" not in content:
    content = content.replace(
        '</body>',
        '''
    <!-- Mobile Bottom Navigation Bar -->
    <div id="mobile-bottom-nav" class="md:hidden fixed bottom-0 left-0 w-full bg-[#fdfbf7]/95 backdrop-blur-md border-t border-gray-200 flex justify-around items-center py-2 px-4 z-[100] shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-5">
        <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors w-16 nav-btn-month" onclick="toggleView('month')">
            <i class="fa-solid fa-om text-xl"></i>
            <span class="text-[10px] font-bold">Calendar</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-orange-600 transition-colors w-16 nav-btn-festivals" onclick="toggleView('festivals')">
            <i class="fa-solid fa-wand-magic-sparkles text-xl"></i>
            <span class="text-[10px] font-bold">Festivals</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors w-16">
            <i class="fa-solid fa-headphones text-xl"></i>
            <span class="text-[10px] font-bold">Listen</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors w-16">
            <i class="fa-regular fa-comment-dots text-xl"></i>
            <span class="text-[10px] font-bold">Chat</span>
        </button>
        <button class="flex flex-col items-center gap-1 text-gray-400 hover:text-orange-500 transition-colors w-16">
            <i class="fa-regular fa-user text-xl"></i>
            <span class="text-[10px] font-bold">Profile</span>
        </button>
    </div>
</body>'''
    )

# 3. Add Top Desktop navigation items in main header
if "nav-btn-desktop-festivals" not in content:
    desktop_nav = '''
                    <!-- Desktop Nav Insert -->
                    <div class="hidden md:flex items-center gap-4 mr-4 border-r border-white/20 pr-4" id="desktop-top-nav">
                        <button class="flex items-center gap-2 text-white/80 hover:text-white transition-colors nav-btn-desktop-month font-bold text-sm" onclick="toggleView('month')">
                            <i class="fa-solid fa-om"></i> Calendar
                        </button>
                        <button class="flex items-center gap-2 text-white/80 hover:text-white transition-colors nav-btn-desktop-festivals font-bold text-sm" onclick="toggleView('festivals')">
                            <i class="fa-solid fa-wand-magic-sparkles"></i> Festivals
                        </button>
                        <button class="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm">
                            <i class="fa-solid fa-headphones"></i> Listen
                        </button>
                        <button class="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm">
                            <i class="fa-regular fa-comment-dots"></i> Chat
                        </button>
                        <button class="flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold text-sm">
                            <i class="fa-regular fa-user"></i> Profile
                        </button>
                    </div>
    '''
    content = content.replace(
        '<button onclick="openSettingsModal()" class="w-10 h-10',
        desktop_nav + '\n                    <button onclick="openSettingsModal()" class="w-10 h-10'
    )

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
