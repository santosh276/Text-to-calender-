- Flying kites
:::
                        </div>
                        <div class="mt-2 text-xs space-y-1 text-gray-400">
                            <p><strong>Syntax Features:</strong></p>
                            <ul class="list-disc pl-4 space-y-1">
                                <li><code>>> DD-MM-YYYY</code> : Target a specific date.</li>
                                <li><code>![Banner](url)</code> : Add a top banner image.</li>
                                <li><code># Header</code> : Section titles.</li>
                                <li><code>**Bold**</code>, <code>*Italic*</code> : Text styling.</li>
                            </ul>
                        </div>
                    </div>

                    <div class="guide-section">
                        <div class="guide-title"><i class="fa-solid fa-cloud-sun"></i> 5. Monthly Panchang</div>
                        <div class="code-block">
::: panchang
@ Tithi : <span class="hl-string">Shukla Paksha</span>
@ Nakshatra : <span class="hl-string">Rohini</span>
@ Yoga : <span class="hl-string">Indra</span>
@ Karana : <span class="hl-string">Bava</span>
@ Sunrise : <span class="hl-string">06:20 AM</span>
:::
                        </div>
                        <p class="code-annotation">Data appears in the "Month's Panchang" card. <br>Note: Tithi/Nakshatra are also auto-calculated if omitted!</p>
                    </div>

                    <div class="guide-section">
                        <div class="guide-title"><i class="fa-solid fa-sun"></i> 6. Seasons (Ritu)</div>
                        <div class="code-block">
::: seasons
@ Spring : <span class="hl-string">Flowers blooming everywhere.</span>
@ Summer : <span class="hl-string">Scorching sun, mango season.</span>
:::
                        </div>
                        <p class="code-annotation">Customize text for: Spring (Vasant), Summer (Grishma), Monsoon (Varsha), Autumn (Sharad), Pre-Winter (Hemant), Winter (Shishir).</p>
                    </div>


                </div>
            </div>

            <textarea id="editor" class="flex-grow w-full h-full bg-gray-900 text-gray-100 p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed z-0" spellcheck="false">
::: config
@ Title : Vaidik Calendar
:::

::: calendar
++ January 2026 ++
01 * New Year's Day [ନୂତନ ବର୍ଷ]
14 ! Makar Sankranti [ମକର ସଂକ୍ରାନ୍ତି]
23 ! Saraswati Puja / Netaji Jayanti [ସରସ୍ୱତୀ ପୂଜା / ନେତାଜୀ ଜୟନ୍ତୀ]
26 * Republic Day [ଗଣତନ୍ତ୍ର ଦିବସ]
31 ! Monthly Closing [ମାସାନ୍ତ]
:::


::: panchang
@ Tithi : Shukla Paksha
@ Nakshatra : Rohini
3 Yoga: Indral
@ Karana : Bava
@ Sunrise : 06:20 AM
@ Sunset : 05:30 PM
@ Month : Pausha / Magha
:::

-----------------------------------

::: calendar
++ November 2026 ++
02 > Daily Meeting [ଦୈନିକ ବୈଠକ]
20 ^ Special Community Setup
21 ! Nuakhai [ନୂଆଖାଇ]
25 * Office Closed
:::

::: details
>> 21-11-2026
@ Tag : Major Agricultural Festival

Nuakhai is the most important social festival of Western Odisha and Sambalpur region.

# Significance
The word "Nua" means new and "Khai" means food.

# Rituals
- People offer new rice to the presiding deity
- Family members gather for a feast
- Traditional songs and dances are performed
:::

::: panchang
@ Tithi : Krishna Paksha
@ Nakshatra : Uttara Phalguni
@ Yoga : Brahma
@ Karana : Kaulava
@ Sunrise : 06:00 AM
@ Sunset : 05:15 PM
@ Month : Kartika / Margashirsha
:::

            </textarea>
        </div>

        <!-- RIGHT PANEL: Preview -->
        <div id="preview-container" class="w-full md:w-[65%] h-[38%] md:h-full overflow-y-auto p-2 md:p-8 relative z-0 transition-all duration-300 pb-24">
            <!-- YEAR VIEW CONTAINER -->
            <div id="year-view-container" class="hidden w-full max-w-7xl mx-auto">
                <div class="bg-white rounded-3xl shadow-xl shadow-orange-100/50 border border-orange-100 p-3 md:p-6 mb-8 flex items-center justify-between relative overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent pointer-events-none"></div>
                    <button onclick="toggleView('month')" class="flex items-center gap-2 text-gray-600 hover:text-deepred transition font-bold z-10 bg-white/50 px-3 py-1.5 rounded-xl border border-transparent hover:border-orange-200 hover:text-orange-700 hover:bg-orange-50">
                        <i class="fa-solid fa-arrow-left"></i> Back
                    </button>

                    <div class="flex items-center gap-3 md:gap-4 z-10">
                        <button onclick="changeYear(-1)" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gray-200 hover:bg-orange-50 hover:border-orange-200 flex items-center justify-center text-gray-600 hover:text-orange-600 transition shadow-sm active:scale-95">
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <div class="flex flex-col items-center justify-center min-w-[140px]" id="year-view-header">
                            <h2 class="text-xl md:text-3xl font-extrabold text-gray-900 text-center leading-tight" id="year-view-title">2026 Year View</h2>
                        </div>
                        <button onclick="changeYear(1)" class="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white border border-gray-200 hover:bg-orange-50 hover:border-orange-200 flex items-center justify-center text-gray-600 hover:text-orange-600 transition shadow-sm active:scale-95">
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                    <div class="w-16 hidden md:block"></div> <!-- Spacer -->
                </div>
                <div id="year-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-6"></div>
            </div>

            <div id="month-view-container" class="app-container max-w-6xl mx-auto flex flex-col lg:flex-row gap-6">
                <!-- Calendar Grid Section -->
                <div class="flex-grow lg:w-3/4 space-y-2 w-full mobile-contents">

                    <!-- Wrapper for Header & Grid to reduce gap on mobile -->
                    <div class="flex flex-col gap-2 order-1 w-full">
                        <!-- Calendar Header -->
                        <div class="bg-white rounded-3xl shadow-xl shadow-red-100/50 p-4 md:p-6 relative overflow-hidden z-10 border border-gray-200">
                            <!-- Gradient Glow -->
                            <div class="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none z-0"></div>

                             <!-- UPDATED HEADER LAYOUT TO CENTER TITLE -->
                            <div class="flex items-center justify-between w-full gap-4 relative z-10">
                                <button onclick="changeMonth(-1)" class="nav-btn flex-shrink-0" title="Previous Month" aria-label="Previous Month">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>

                                <div class="text-center flex-grow px-2 flex flex-col items-center justify-center">
                                    <!-- Adaptive Month/Year Container -->
                                    <div class="flex flex-wrap justify-center items-baseline gap-x-2.5">
                                        <span id="cal-month" class="text-2xl md:text-3xl font-bold text-gray-900 uppercase tracking-tight drop-shadow-md"></span>
                                        <span id="cal-year" class="text-2xl md:text-3xl font-light text-gray-600"></span>
                                    </div>

                                    <p id="cal-indian-month" class="text-base text-orange-600 font-bold mt-1 font-oriya leading-tight hidden"></p>

                                    <button onclick="jumpToToday()" id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition items-center gap-2 border border-orange-100">
                                        <i class="fa-solid fa-calendar-day"></i> Today
                                    </button>
                                </div>

                                <button onclick="changeMonth(1)" class="nav-btn flex-shrink-0" title="Next Month" aria-label="Next Month">
                                    <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>

                        <!-- MONTH BANNER CAROUSEL -->
                        <div id="month-banner-container" class="hidden relative group overflow-hidden rounded-xl shadow-lg aspect-[3/1] md:aspect-[5/1] bg-gray-100 border-4 border-white">
                            <!-- Slides Wrapper -->
                            <div id="banner-slides" class="flex transition-transform duration-500 ease-out h-full"></div>

                            <!-- Navigation Arrows -->
                            <button id="banner-prev" class="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition z-20 backdrop-blur-sm">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                            </button>
                            <button id="banner-next" class="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white w-8 h-8 md:w-10 md:h-10 rounded-full items-center justify-center opacity-0 group-hover:opacity-100 transition z-20 backdrop-blur-sm">
                                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                            </button>

                            <!-- Close Button -->
                            <button onclick="dismissBanner(event)" class="absolute right-2 top-2 bg-black/30 hover:bg-black/50 text-white w-6 h-6 rounded-full flex items-center justify-center transition z-30 backdrop-blur-sm"><i class="fa-solid fa-times text-xs"></i></button>

                            <!-- Dots -->
                            <div id="banner-dots" class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 p-1 rounded-full bg-black/10 backdrop-blur-[2px]"></div>
                        </div>

                        <div id="calendar-swipe-area" class="bg-white rounded-xl shadow-lg p-2 md:p-3">
                            <div id="grid-header" class="grid grid-cols-7 mb-2 text-center border-b-2 border-gray-100 pb-2"></div>
                            <div id="calendar-grid" class="grid grid-cols-7 gap-1 sm:gap-2 auto-rows-fr"></div>

                            <!-- Year View Link -->
                            <div class="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center cursor-pointer group hover:bg-gray-50 rounded-lg px-2 transition-colors" onclick="toggleSmartView()">
                                <h3 class="text-lg font-extrabold text-gray-800">Year View</h3>
                                <span class="text-orange-500 font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Go <i class="fa-solid fa-arrow-right"></i>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div id="sec-panchang" class="glass rounded-xl shadow-md border-l-4 border-deepred p-4 transition-all duration-300 order-3">
                        <h3 class="font-bold text-deepred mb-3 border-b pb-1"><i class="fa-solid fa-sun text-saffron mr-2"></i>Month's Panchang</h3>
                        <div id="panchang-pills" class="flex flex-wrap gap-2 mb-3"></div>
                        <ul id="panchang-list" class="text-sm space-y-2"></ul><div id="location-btn-container" class="mt-3 pt-2 border-t border-red-100 flex justify-center"></div>
                    </div>
                </div>

                <!-- Sidebar Section -->
                <div class="lg:w-1/4 space-y-6 mobile-contents">
                    <div id="sec-festivals" class="glass rounded-xl shadow-md border-l-4 border-saffron p-4 transition-all duration-300 relative overflow-hidden order-2">
                        <h3 class="font-bold text-saffron mb-3 border-b pb-1"><i class="fa-solid fa-bell text-deepred mr-2"></i>Festivals</h3>
                        <div id="festival-filters" class="flex flex-wrap gap-2 mb-4"></div>
                        <ul id="festival-list" class="space-y-2 text-sm"></ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- CLEAR CONFIRMATION MODAL -->
    <div id="clear-confirmation-modal" class="fixed inset-0 z-[90] flex items-center justify-center p-4 modal-hidden" style="display: none;">
        <div class="modal-backdrop absolute inset-0 bg-black/70 backdrop-blur-sm" onclick="closeClearModal()"></div>
        <div class="modal-content bg-white rounded-xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden text-center p-6">
            <div class="mb-4 text-red-100 bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto shadow-lg">
                <i class="fa-solid fa-triangle-exclamation text-3xl"></i>
            </div>
            <h3 class="font-bold text-gray-800 text-xl mb-2">Clear All Content?</h3>
            <p class="text-gray-500 text-sm mb-6">This will permanently remove all text and calendar data. This action cannot be undone.</p>
            <div class="flex gap-3 justify-center">
                <button onclick="closeClearModal()" class="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition active:scale-95 transform">Cancel</button>
                <button onclick="performClear()" class="px-5 py-2.5 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700 shadow-md transition transform active:scale-95">Yes, Clear It</button>
            </div>
        </div>
    </div>

    <!-- SETTINGS MODAL (Redesigned as Menu Overlay) -->
    <div id="settings-modal" class="fixed inset-0 z-[80] flex items-center justify-center modal-hidden menu-overlay" style="display: none;">
        <div class="modal-backdrop absolute inset-0 bg-black/20 backdrop-blur-sm" onclick="closeSettingsModal()"></div>
        <div class="modal-content w-full h-full md:w-[90%] md:h-[90%] bg-aurora rounded-none md:rounded-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col glass">

            <!-- Glassmorphism Header -->
            <div class="glass-header p-6 border-b border-gray-200/50 flex justify-between items-center bg-white/90 sticky top-0 z-20">
                <h3 class="font-bold text-2xl text-gray-800 flex items-center gap-3">
                    <i class="fa-solid fa-bars text-orange-500"></i> Menu
                </h3>
                <button onclick="closeSettingsModal()" class="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-600 transition shadow-sm">
                    <i class="fa-solid fa-times text-lg"></i>
                </button>
            </div>

            <div class="overflow-y-auto p-6 md:p-10 custom-scroll flex-grow">

                <!-- SECTION 1: Quick Settings (Preserved) -->
                <div class="mb-8">
                    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Quick Settings</h4>
                    <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-end">

                        <!-- Language -->
                        <div class="w-full">
                            <label class="block text-xs font-bold text-gray-500 mb-2 uppercase">Language</label>
                            <div class="relative">
                                <select id="language-select" onchange="changeLanguage(this.value)" class="w-full appearance-none p-3 pl-4 pr-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-bold focus:ring-2 focus:ring-orange-200 focus:border-orange-400 outline-none transition cursor-pointer">
                                    <option value="en">English</option>
                                    <option value="hi">Hindi (हिन्दी)</option>
                                    <option value="or">Odia (ଓଡ଼ିଆ)</option>
                                    <option value="bn">Bengali (বাংলা)</option>
                                    <option value="mr">Marathi (मराठी)</option>
                                    <option value="gu">Gujarati (ગુજરાતી)</option>
                                    <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                                    <option value="ta">Tamil (தமிழ்)</option>
                                    <option value="te">Telugu (తెలుగు)</option>
                                    <option value="kn">Kannada (ಕನ್ನಡ)</option>
                                    <option value="ml">Malayalam (മലയാളം)</option>
                                    <option value="as">Assamese (অসমীয়া)</option>
                                </select>
                                <div class="absolute inset-y-0 right-0 flex items-center pr-8 pointer-events-none text-gray-500">
                                    <i class="fa-solid fa-chevron-down text-xs"></i>
                                </div>
                            </div>
                        </div>

                        <!-- Toggles -->
                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <span class="text-sm font-bold text-gray-700">Festivals</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggle-festivals" class="sr-only peer" checked onchange="toggleSection('festivals', this.checked)">
                                <div class="w-11 h-6 bg-gray-100 border border-gray-300 peer-checked:border-orange-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <span class="text-sm font-bold text-gray-700">Panchang</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggle-panchang" class="sr-only peer" checked onchange="toggleSection('panchang', this.checked)">
                                <div class="w-11 h-6 bg-gray-100 border border-gray-300 peer-checked:border-orange-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>

                        <div class="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                            <span class="text-sm font-bold text-gray-700">Daily Banner</span>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="banner-toggle" class="sr-only peer" onchange="toggleBannerVisibility(this)">
                                <div class="w-11 h-6 bg-gray-100 border border-gray-300 peer-checked:border-orange-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>

                    </div>
                </div>

                <!-- SECTION 2: Menu Grid (The "Typing Tutor" Design) -->
                <div class="mb-8">
                    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Explore</h4>
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                        <!-- Horoscope -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-star-and-crescent menu-icon"></i>
                            <div class="menu-title">Horoscope</div>
                            <div class="menu-sub-items">Daily, Weekly & Monthly Predictions</div>
                        </div>

                        <!-- Puja Vidhi -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-bell menu-icon"></i>
                            <div class="menu-title">Puja Vidhi</div>
                            <div class="menu-sub-items">Step-by-step Rituals & Mantras</div>
                        </div>

                        <!-- Kundli -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-scroll menu-icon"></i>
                            <div class="menu-title">Kundli</div>
                            <div class="menu-sub-items">Birth Chart & Analysis</div>
                        </div>

                        <!-- Matching -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-heart menu-icon"></i>
                            <div class="menu-title">Matching</div>
                            <div class="menu-sub-items">
                                <div><i class="fa-solid fa-caret-right text-orange-400 mr-1"></i> Marriage Match</div>
                                <div><i class="fa-solid fa-caret-right text-orange-400 mr-1"></i> Zodiac Match</div>
                            </div>
                        </div>

                        <!-- Daily Panchang -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-regular fa-calendar-check menu-icon"></i>
                            <div class="menu-title">Daily Panchang</div>
                            <div class="menu-sub-items">Tithi, Nakshatra, Yoga & Karana</div>
                        </div>

                        <!-- Smart Tool -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-calculator menu-icon"></i>
                            <div class="menu-title">Smart Tool</div>
                            <div class="menu-sub-items">Date Converter & Utilities</div>
                        </div>

                        <!-- Bhagavat Gita -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-book-open menu-icon"></i>
                            <div class="menu-title">Bhagavat Gita</div>
                            <div class="menu-sub-items">Slokas & Meanings</div>
                        </div>

                        <!-- Holiday -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-umbrella-beach menu-icon"></i>
                            <div class="menu-title">Holiday</div>
                            <div class="menu-sub-items">
                                <div><i class="fa-solid fa-caret-right text-orange-400 mr-1"></i> Government Holiday</div>
                                <div><i class="fa-solid fa-caret-right text-orange-400 mr-1"></i> State Holiday</div>
                            </div>
                        </div>

                        <!-- Muhurat -->
                        <div class="menu-card group">
                            <div class="accent-line"></div>
                            <i class="fa-solid fa-clock menu-icon"></i>
                            <div class="menu-title">Muhurat</div>
                            <div class="menu-sub-items">
                                <div><i class="fa-solid fa-caret-right text-orange-400 mr-1"></i> Griha Muhurat</div>
                                <div><i class="fa-solid fa-caret-right text-orange-400 mr-1"></i> Vivah Muhurat</div>
                            </div>
                        </div>

                    </div>
                </div>

                <!-- SECTION 3: Developer Settings (Sync) - Hidden in App Mode -->
                <div id="container-sync-settings" class="mt-8 border-t border-gray-200 pt-8">
                    <h4 class="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4"><i class="fa-solid fa-code"></i> Developer Settings</h4>

                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200 space-y-4">
                        <div id="container-sync-docs" class="flex items-center justify-between">
                            <label class="text-sm font-bold text-gray-700">Live Sync Docs</label>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggle-sync-docs" class="sr-only peer" onchange="toggleLiveSyncDocs(this.checked)">
                                <div class="w-11 h-6 bg-gray-100 border border-gray-300 peer-checked:border-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>

                        <div class="flex items-center justify-between">
                            <label class="text-sm font-bold text-gray-700">Live Sync GitHub</label>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" id="toggle-sync-github" class="sr-only peer" onchange="toggleLiveSyncGitHub(this.checked)">
                                <div class="w-11 h-6 bg-gray-100 border border-gray-300 peer-checked:border-orange-500 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                            </label>
                        </div>
                    </div>
                </div>

                <!-- Language Links (Developer) -->
                <div id="container-lang-links" class="mt-4">
                    <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                        <label class="block text-xs font-bold text-gray-500 mb-2 uppercase">Configure Language Source</label>
                        <div class="flex flex-col md:flex-row gap-3">
                            <select id="sync-lang-select" onchange="updateSyncLinkInput()" class="md:w-1/3 p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-orange-500 bg-white">
                                <option value="en">English</option>
                                <option value="hi">Hindi (हिन्दी)</option>
                                <option value="or">Odia (ଓଡ଼ିଆ)</option>
                                <option value="bn">Bengali (বাংলা)</option>
                                <option value="mr">Marathi (मराठी)</option>
                                <option value="gu">Gujarati (ગુજરાતી)</option>
                                <option value="pa">Punjabi (ਪੰਜਾਬੀ)</option>
                                <option value="ta">Tamil (தமிழ்)</option>
                                <option value="te">Telugu (తెలుగు)</option>
                                <option value="kn">Kannada (ಕನ್ನಡ)</option>
                                <option value="ml">Malayalam (മലയാളം)</option>
                                <option value="as">Assamese (অসমীয়া)</option>
                            </select>
                            <input type="text" id="sync-link-input" placeholder="Paste GitHub Raw Link..." class="flex-1 p-3 border border-gray-300 rounded-xl text-sm outline-none focus:border-orange-500">
                            <button onclick="saveSyncLink()" class="bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-bold hover:bg-gray-700 transition active:scale-95 shadow-lg">Save</button>
                        </div>
                        <p class="text-[10px] text-gray-400 mt-2 italic">Stored securely.</p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- INSERT LINK MODAL -->
    <div id="link-modal" class="fixed inset-0 z-[70] flex items-center justify-center p-4 modal-hidden" style="display: none;">
        <div class="modal-backdrop absolute inset-0 bg-black/80 backdrop-blur-sm" onclick="closeLinkModal()"></div>
        <div class="modal-content bg-white rounded-2xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden flex flex-col">
            <div class="bg-gray-100 p-4 border-b border-gray-200 flex justify-between items-center shrink-0">
                <h3 class="font-bold text-gray-700"><i class="fa-solid fa-link mr-2 text-blue-500"></i>Insert Image Link</h3>
                <button onclick="closeLinkModal()" class="text-gray-400 hover:text-gray-600"><i class="fa-solid fa-times"></i></button>
            </div>
            <div class="p-6 flex flex-col gap-4 overflow-y-auto">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Image URL</label>
                    <input type="text" id="link-url-input" class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm" placeholder="https://example.com/image.jpg">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-2">Placement</label>
                    <div class="space-y-3">
                        <div class="radio-option selected" onclick="updateLinkType('logo')">
                            <div class="radio-circle"><div class="radio-dot"></div></div>
                            <div class="flex-1">
                                <span class="block font-bold text-gray-700 text-sm">App Logo</span>
                            </div>
                        </div>
                        <div class="radio-option" onclick="updateLinkType('gridbg')">
                            <div class="radio-circle"><div class="radio-dot"></div></div>
                            <div class="flex-1">
                                <span class="block font-bold text-gray-700 text-sm">Grid Background</span>
                            </div>
                        </div>
                        <div class="radio-option" onclick="updateLinkType('banner')">
                            <div class="radio-circle"><div class="radio-dot"></div></div>
                            <div class="flex-1">
                                <span class="block font-bold text-gray-700 text-sm">Day Banner</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="link-date-container" class="hidden">
                    <label class="block text-sm font-bold text-gray-700 mb-2">Select Date</label>
                    <select id="link-date-select" class="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"></select>
                </div>
                <div class="mt-4">
                    <button onclick="performLinkInsert()" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition transform active:scale-95 flex items-center justify-center gap-2">
                        <i class="fa-solid fa-plus"></i> Insert Link
                    </button>
                </div>
            </div>
        </div>
    </div>

    <!-- DAY DETAIL MODAL -->
    <div id="day-modal" class="fixed inset-0 z-[60] flex items-center justify-center p-4 modal-hidden" style="display: none;">
        <div class="modal-backdrop absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeDayModal()"></div>
        <div class="modal-content bg-aurora rounded-3xl shadow-2xl w-full max-w-[500px] relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div id="modal-header-background" class="premium-header-bg p-6 relative shrink-0">
                <button onclick="closeDayModal()" class="absolute top-4 right-4 bg-white/20 backdrop-blur-md border border-white/20 hover:bg-white/30 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-md z-20 transition active:scale-95"><i class="fa-solid fa-times text-sm"></i></button>
                <div class="flex gap-5 items-center relative z-10">
                    <div class="bg-white/20 backdrop-blur-md border border-white/20 rounded-xl w-20 h-20 flex flex-col items-center justify-center shrink-0 shadow-lg text-white">
                        <span id="modal-month-short" class="text-[11px] font-bold uppercase tracking-widest opacity-80">NOV</span>
                        <span id="modal-date-num" class="text-4xl font-bold leading-none mt-0.5">21</span>
                    </div>
                    <div class="text-white">
                        <h2 id="modal-full-date" class="text-white/80 text-[10px] uppercase tracking-widest font-semibold mb-1">Friday, November 21, 2025</h2>
                        <h1 id="modal-main-title" class="text-2xl font-bold leading-tight font-oriya drop-shadow-md">Nuakhai</h1>
                        <div id="modal-tag-pill" class="mt-2 inline-block"></div>
                    </div>
                </div>
            </div>
            <div id="modal-rich-body" class="rich-content overflow-y-auto p-6 flex-grow"></div>
            <div class="p-4 border-t border-gray-100 flex justify-end items-center bg-gray-50 shrink-0">
                <button onclick="handleLearnMore()" class="bg-[#5D4037] hover:bg-[#4E342E] text-white px-5 py-2 rounded-full text-sm font-bold transition shadow-md active:scale-95">Learn More</button>
            </div>
        </div>
    </div>

    <!-- Hidden Banner Upload Input -->
    <input type="file" id="bannerInput" accept="image/*" style="display: none;" onchange="handleBannerUpload(event)">

    <script>
        // --- GLOBAL ERROR HANDLER ---
        // Catches unexpected crashes (e.g. Render errors, Logic bugs) and removes the loader
        window.onerror = function(message, source, lineno, colno, error) {
            console.error("Global Error Caught:", message, error);

            const loader = document.getElementById('app-loader');
            if (loader) {
                // If the loader is still visible, it means the app crashed during initialization.
                // Replace the loader with a Critical Error UI.
                loader.className = "fixed inset-0 z-[200] flex items-center justify-center bg-white p-6";
                loader.innerHTML = `
                    <div class="max-w-md w-full text-center">
                        <div class="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h2 class="text-xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                        <p class="text-sm text-gray-600 mb-6">The application encountered a critical error during loading.</p>
                        <div class="bg-gray-100 p-3 rounded text-left text-xs font-mono text-gray-700 overflow-x-auto mb-6 border border-gray-200">
                            ${message}
                        </div>
                        <button onclick="localStorage.clear(); window.location.reload()" class="bg-red-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-red-700 transition w-full shadow-md">
                            Reset App Data & Retry
                        </button>
                    </div>
                `;
            }
        };

        const DATA_VERSION = 2;

        const OM_ICON_SVG = `<svg viewBox="0 0 512 512" width="24" height="24" fill="#d4af37" xmlns="http://www.w3.org/2000/svg"><path d="M379.3 4.7c-6.2-6.2-16.4-6.2-22.6 0l-16 16c-6.2 6.2-6.2 16.4 0 22.6l16 16c6.2 6.2 16.4 6.2 22.6 0l16-16c6.2-6.2 6.2-16.4 0-22.6l-16-16zM281 66.7c-2.2-1.5-4.9-2.5-7.7-2.7c-.6 0-1.3-.1-1.9 0c-3.9 .2-7.4 1.7-10.1 4.2c-.9 .8-1.6 1.7-2.3 2.6c-1.7 2.4-2.7 5.3-2.9 8.5c0 .7 0 1.4 0 2.1c.2 2.2 .9 4.3 1.9 6.2l.3 .6c.3 .6 .8 1.4 1.4 2.4c1.2 2 2.9 4.8 5.1 8.2c4.4 6.7 11.1 15.5 20 24.4C302.4 141.1 330.3 160 368 160c31.2 0 56.6-10.4 73.9-20.2c8.7-5 15.6-9.9 20.4-13.8c2.4-1.9 4.3-3.6 5.7-4.9c.7-.6 1.3-1.2 1.7-1.6l.6-.5 .1-.1 .1-.1s0 0 0 0s0 0 0 0c5.9-5.8 9.5-13.9 9.5-22.8c0-17.7-14.3-32-32-32c-8.7 0-16.7 3.5-22.4 9.2c-.1 .1-.2 .2-.5 .4c-.5 .5-1.5 1.3-2.8 2.4c-2.7 2.2-6.8 5.2-12.1 8.2C399.4 90.4 384.8 96 368 96c-20.8 0-42.4-7-59.5-14.6c-8.4-3.7-15.4-7.5-20.3-10.3c-2.4-1.4-4.3-2.5-5.6-3.3c-.6-.4-1.1-.7-1.4-.9l-.3-.2zM115.2 169.6c8-6 17.9-9.6 28.8-9.6c26.5 0 48 21.5 48 48s-21.5 48-48 48l-34.2 0c-7.6 0-13.8 6.2-13.8 13.8c0 1.5 .2 2.9 .7 4.4l8 24c4.4 13.1 16.6 21.9 30.4 21.9l8.9 0 16 0c35.3 0 64 28.7 64 64s-28.7 64-64 64c-50.8 0-82.7-21.5-102.2-42.8c-9.9-10.8-16.6-21.6-20.9-29.7c-2.1-4-3.6-7.3-4.5-9.6c-.5-1.1-.8-2-1-2.5l-.2-.5c-.3-.9-.7-1.8-1.1-2.6c-1.2-2.2-2.8-4-4.7-5.4c-1.9-1.4-4.1-2.3-6.5-2.8c-1.4-.3-2.9-.3-4.4-.2c-2.5 .2-4.8 1-6.8 2.3c-1.1 .7-2.2 1.5-3.1 2.5c-2.4 2.5-4.1 5.8-4.5 9.5c-.1 .6-.1 1.1-.1 1.7c0 0 0 0 0 0c0 .8 .1 1.7 .2 2.5l0 .1c0 .3 .1 .8 .2 1.3c.2 1.1 .4 2.7 .8 4.6c.8 3.9 2 9.4 3.9 15.9c3.8 13 10.3 30.4 21.3 48C48.7 476.2 89.4 512 160 512c70.7 0 128-57.3 128-128c0-23.3-6.2-45.2-17.1-64l22.6 0c25.5 0 49.9-10.1 67.9-28.1l26.5-26.5c6-6 14.1-9.4 22.6-9.4l-48.3 0c6.9-14.5 10.8-30.8 10.8-48c0-61.9-50.1-112-112-112c-25.2 0-48.5 8.3-67.2 22.4c-14.1 10.6-17 30.7-6.4 44.8s30.7 17 44.8 6.4z"/></svg>`;

        const TEMPLE_ICON_SVG = `<svg viewBox="0 0 512 512" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M120 0c13.3 0 24 10.7 24 24l0 8 40 0 0-8c0-13.3 10.7-24 24-24s24 10.7 24 24l0 8 48 0 0-8c0-13.3 10.7-24 24-24s24 10.7 24 24l0 8 40 0 0-8c0-13.3 10.7-24 24-24s24 10.7 24 24l0 8 0 32 0 64c17.7 0 32 14.3 32 32l0 64c17.7 0 32 14.3 32 32l0 96c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32l-64 0 0-160-32 0 0-128-32 0 0-96-32 0 0 96 32 0 0 128 32 0 0 160-80 0 0-48c0-26.5-21.5-48-48-48s-48 21.5-48 48l0 48-80 0 0-160 32 0 0-128 32 0 0-96-32 0 0 96-32 0 0 128-32 0 0 160-64 0c-17.7 0-32-14.3-32-32l0-96c0-17.7 14.3-32 32-32l0-96c0-17.7 14.3-32 32-32l0-64 0-17.7 14.3-32 32-32l0-64 0-32 0-8c0-13.3 10.7-24 24-24zM256 272c-17.7 0-32 14.3-32 32l0 48 64 0 0-48c0-17.7-14.3-32-32-32zm-32-80l0 32 64 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32z"/></svg>`;
        const HOLIDAY_ICON_SVG = `<svg viewBox="0 0 576 512" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M346.3 271.8l-60.1-21.9L214 448 32 448c-17.7 0-32 14.3-32 32s14.3 32 32 32l512 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-261.9 0 64.1-176.2zm121.1-.2l-3.3 9.1 67.7 24.6c18.1 6.6 38-4.2 39.6-23.4c6.5-78.5-23.9-155.5-80.8-208.5c2 8 3.2 16.3 3.4 24.8l.2 6c1.8 57-7.3 113.8-26.8 167.4zM462 99.1c-1.1-34.4-22.5-64.8-54.4-77.4c-.9-.4-1.9-.7-2.8-1.1c-33-11.7-69.8-2.4-93.1 23.8l-4 4.5C272.4 88.3 245 134.2 226.8 184l-3.3 9.1L434 269.7l3.3-9.1c18.1-49.8 26.6-102.5 24.9-155.5l-.2-6zM107.2 112.9c-11.1 15.7-2.8 36.8 15.3 43.4l71 25.8 3.3-9.1c19.5-53.6 49.1-103 87.1-145.5l4-4.5c6.2-6.9 13.1-13 20.5-18.2c-79.6 2.5-154.7 42.2-201.2 108z"/></svg>`;
        const CALENDAR_ICON_SVG = `<svg viewBox="0 0 448 512" width="24" height="24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M128 0c17.7 0 32 14.3 32 32l0 32 128 0 0-32c0-17.7 14.3-32 32-32s32 14.3 32 32l0 32 48 0c26.5 0 48 21.5 48 48l0 48L0 160l0-48C0 85.5 21.5 64 48 64l48 0 0-32c0-17.7 14.3-32 32-32zM0 192l448 0 0 272c0 26.5-21.5 48-48 48L48 512c-26.5 0-48-21.5-48-48L0 192zm64 80l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm128 0l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zM64 400l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0zm112 16l0 32c0 8.8 7.2 16 16 16l32 0c8.8 0 16-7.2 16-16l0-32c0-8.8-7.2-16-16-16l-32 0c-8.8 0-16 7.2-16 16z"/></svg>`;
        const SEARCH_ICON_SVG = `<svg viewBox="0 0 512 512" width="16" height="16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"/></svg>`;

        const WIFI_ICON_SVG = `<svg viewBox="-3 -3 30 30" width="48" height="48" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" style="transform: translateY(3px)"><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></svg>`;
        const RETRY_ICON_SVG = `<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path></svg>`;

        const TITHI_ICONS = {
            purnima: `<svg viewBox="0 0 24 24" class="w-full h-full text-amber-500 drop-shadow-sm" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>`,
            amavasya: `<svg viewBox="0 0 24 24" class="w-full h-full text-black drop-shadow-sm" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>`,
            ekadashi: `<svg viewBox="0 0 512 512" class="w-full h-full text-indigo-500 drop-shadow-sm" fill="currentColor"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>`,
            shukla_ekadashi: `<svg viewBox="0 0 512 512" class="w-full h-full text-amber-500 drop-shadow-sm" fill="currentColor"><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg>`
        };

        /**
         * DYNAMIC MOON PHASE GENERATOR
         * This function creates an SVG image of the moon for any given point in its cycle.
         * * @param {number} phase - A decimal number from 0 to 1 representing the moon's cycle.
         * 0 = New Moon (Dark)
         * 0.5 = Full Moon (Bright)
         * 1.0 = New Moon (Dark)
         * @returns {string} - The raw SVG code as a text string.
         */
        function getMoonPhaseIcon(phase) {
            // Keep the number strictly between 0 and 1
            phase = Math.max(0, Math.min(1, phase));

            // The size of our moon ball
            const r = 50;

            // Which side does the shadow cover? (0 for left, 1 for right)
            let outerSweep = phase < 0.5 ? 0 : 1;

            // How wide is the curved shadow edge?
            let rx = Math.abs(Math.cos(phase * 2 * Math.PI)) * r;

            // Which way does the shadow edge bow out?
            let innerSweep = (phase >= 0.25 && phase < 0.5) || (phase >= 0.75) ? 1 : 0;

            // Handle exact Full and New moons to prevent tiny visual glitches
            if (Math.abs(phase - 0.5) < 0.01) {
        return `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#F59E0B" /></svg>`;
            }
            if (phase < 0.01 || phase > 0.99) {
                return `<svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="50" fill="#0F172A" /></svg>`;
            }

            // The shape of the dark shadow
            const path = `M 50 0 A 50 50 0 0 ${outerSweep} 50 100 A ${rx} 50 0 0 ${innerSweep} 50 0 Z`;

            // Put the bright yellow ball and the dark shadow together
            return `
        <svg viewBox="0 0 100 100" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="50" fill="#F59E0B" />
            <path d="${path}" fill="#0F172A" />
        </svg>`.trim();
        }

        /**
         * READY-TO-USE STATIC ICONS
         * If you do not want to calculate the moon phases dynamically,
         * you can just use these pre-made SVG strings for the 8 major stages.
         */
        const STATIC_MOON_PHASES = {
            newMoon: getMoonPhaseIcon(0.0),        // Completely dark
            waxingCrescent: getMoonPhaseIcon(0.15), // A thin bright sliver on the right
            firstQuarter: getMoonPhaseIcon(0.25),   // Exactly half bright on the right
            waxingGibbous: getMoonPhaseIcon(0.35),  // Mostly bright, dark sliver on the left
            fullMoon: getMoonPhaseIcon(0.5),        // Completely bright
            waningGibbous: getMoonPhaseIcon(0.65),  // Mostly bright, dark sliver on the right
            lastQuarter: getMoonPhaseIcon(0.75),    // Exactly half bright on the left
            waningCrescent: getMoonPhaseIcon(0.85)  // A thin bright sliver on the left
        };

        // Season UI Component Data

        // Full SunCalc Implementation (Upgraded)
        const SunCalc = (function () { 'use strict';

// shortcuts for easier to read formulas

var PI   = Math.PI,
    sin  = Math.sin,
    cos  = Math.cos,
    tan  = Math.tan,
    asin = Math.asin,
    atan = Math.atan2,
    acos = Math.acos,
    rad  = PI / 180;

// sun calculations are based on http://aa.quae.nl/en/reken/zonpositie.html formulas


// date/time constants and conversions

var dayMs = 1000 * 60 * 60 * 24,
    J1970 = 2440588,
    J2000 = 2451545;

function toJulian(date) { return date.valueOf() / dayMs - 0.5 + J1970; }
function fromJulian(j)  { return new Date((j + 0.5 - J1970) * dayMs); }
function toDays(date)   { return toJulian(date) - J2000; }


// general calculations for position

var e = rad * 23.4397; // obliquity of the Earth

function rightAscension(l, b) { return atan(sin(l) * cos(e) - tan(b) * sin(e), cos(l)); }
function declination(l, b)    { return asin(sin(b) * cos(e) + cos(b) * sin(e) * sin(l)); }

function azimuth(H, phi, dec)  { return atan(sin(H), cos(H) * sin(phi) - tan(dec) * cos(phi)); }
function altitude(H, phi, dec) { return asin(sin(phi) * sin(dec) + cos(phi) * cos(dec) * cos(H)); }

function siderealTime(d, lw) { return rad * (280.16 + 360.9856235 * d) - lw; }

function astroRefraction(h) {
    if (h < 0) // the following formula works for positive altitudes only.
        h = 0; // if h = -0.08901179 a div/0 would occur.

    // formula 16.4 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
    // 1.02 / tan(h + 10.26 / (h + 5.10)) h in degrees, result in arc minutes -> converted to rad:
    return 0.0002967 / Math.tan(h + 0.00312536 / (h + 0.08901179));
}

// general sun calculations

function solarMeanAnomaly(d) { return rad * (357.5291 + 0.98560028 * d); }

function eclipticLongitude(M) {

    var C = rad * (1.9148 * sin(M) + 0.02 * sin(2 * M) + 0.0003 * sin(3 * M)), // equation of center
        P = rad * 102.9372; // perihelion of the Earth

    return M + C + P + PI;
}

function sunCoords(d) {

    var M = solarMeanAnomaly(d),
        L = eclipticLongitude(M);

    return {
        dec: declination(L, 0),
        ra: rightAscension(L, 0)
    };
}


var SunCalc = {};


// calculates sun position for a given date and latitude/longitude

SunCalc.getPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c  = sunCoords(d),
        H  = siderealTime(d, lw) - c.ra;

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: altitude(H, phi, c.dec)
    };
};


// sun times configuration (angle, morning name, evening name)

var times = SunCalc.times = [
    [-0.833, 'sunrise',       'sunset'      ],
    [  -0.3, 'sunriseEnd',    'sunsetStart' ],
    [    -6, 'dawn',          'dusk'        ],
    [   -12, 'nauticalDawn',  'nauticalDusk'],
    [   -18, 'nightEnd',      'night'       ],
    [     6, 'goldenHourEnd', 'goldenHour'  ]
];

// adds a custom time to the times config

SunCalc.addTime = function (angle, riseName, setName) {
    times.push([angle, riseName, setName]);
};


// calculations for sun times

var J0 = 0.0009;

function julianCycle(d, lw) { return Math.round(d - J0 - lw / (2 * PI)); }

function approxTransit(Ht, lw, n) { return J0 + (Ht + lw) / (2 * PI) + n; }
function solarTransitJ(ds, M, L)  { return J2000 + ds + 0.0053 * sin(M) - 0.0069 * sin(2 * L); }

function hourAngle(h, phi, d) { return acos((sin(h) - sin(phi) * sin(d)) / (cos(phi) * cos(d))); }
function observerAngle(height) { return -2.076 * Math.sqrt(height) / 60; }

// returns set time for the given sun altitude
function getSetJ(h, lw, phi, dec, n, M, L) {

    var w = hourAngle(h, phi, dec),
        a = approxTransit(w, lw, n);
    return solarTransitJ(a, M, L);
}


// calculates sun times for a given date, latitude/longitude, and, optionally,
// the observer height (in meters) relative to the horizon

SunCalc.getTimes = function (date, lat, lng, height) {

    height = height || 0;

    var lw = rad * -lng,
        phi = rad * lat,

        dh = observerAngle(height),

        d = toDays(date),
        n = julianCycle(d, lw),
        ds = approxTransit(0, lw, n),

        M = solarMeanAnomaly(ds),
        L = eclipticLongitude(M),
        dec = declination(L, 0),

        Jnoon = solarTransitJ(ds, M, L),

        i, len, time, h0, Jset, Jrise;


    var result = {
        solarNoon: fromJulian(Jnoon),
        nadir: fromJulian(Jnoon - 0.5)
    };

    for (i = 0, len = times.length; i < len; i += 1) {
        time = times[i];
        h0 = (time[0] + dh) * rad;

        Jset = getSetJ(h0, lw, phi, dec, n, M, L);
        Jrise = Jnoon - (Jset - Jnoon);

        result[time[1]] = fromJulian(Jrise);
        result[time[2]] = fromJulian(Jset);
    }

    return result;
};


// moon calculations, based on http://aa.quae.nl/en/reken/hemelpositie.html formulas

function moonCoords(d) { // geocentric ecliptic coordinates of the moon
    // High Precision Lunar Position (Meeus/VedicAstro Implementation)
    var T = d / 36525;
    var L0 = 218.316447 + 481267.881234 * T;
    var D = 297.850192 + 445267.111403 * T;
    var M = 357.529109 + 35999.050291 * T;
    var Mprime = 134.963396 + 477198.867505 * T;
    var F = 93.272095 + 483202.017523 * T;

    var D2R = Math.PI / 180;

    // Longitude Terms (Sine series)
    var sumL = 6.288774 * Math.sin(Mprime * D2R);
    sumL += 1.274027 * Math.sin((2 * D - Mprime) * D2R);
    sumL += 0.658309 * Math.sin(2 * D * D2R);
    sumL += 0.213618 * Math.sin(2 * Mprime * D2R);
    sumL -= 0.185116 * Math.sin(M * D2R);
    sumL -= 0.114332 * Math.sin(2 * F * D2R);
    sumL += 0.058793 * Math.sin((2 * D - 2 * Mprime) * D2R);
    sumL += 0.057066 * Math.sin((2 * D - M - Mprime) * D2R);
    sumL += 0.053322 * Math.sin((2 * D + Mprime) * D2R);
    sumL += 0.045758 * Math.sin((2 * D - M) * D2R);
    sumL -= 0.040923 * Math.sin((M - Mprime) * D2R);
    sumL -= 0.034720 * Math.sin(D * D2R);
    sumL -= 0.030383 * Math.sin((M + Mprime) * D2R);
    sumL += 0.015327 * Math.sin((2 * D - 2 * F) * D2R);
    sumL -= 0.012528 * Math.sin((2 * D - 2 * M) * D2R);

    var l = (L0 + sumL) * D2R; // Longitude in radians

    // Latitude Terms (Sine series)
    var sumB = 5.128122 * Math.sin(F * D2R)
             + 0.280602 * Math.sin((Mprime + F) * D2R)
             + 0.277693 * Math.sin((Mprime - F) * D2R)
             + 0.173237 * Math.sin((2 * D - F) * D2R)
             + 0.055413 * Math.sin((2 * D + F - Mprime) * D2R)
             + 0.046271 * Math.sin((2 * D - F - Mprime) * D2R)
             + 0.032573 * Math.sin((2 * D + F) * D2R)
             + 0.017198 * Math.sin((2 * Mprime + F) * D2R);

    var b = sumB * D2R; // Latitude in radians

    // Distance (km)
    var dt = 385000.56 - 20905.355 * Math.cos(Mprime * D2R)
             - 3699.111 * Math.cos((2 * D - Mprime) * D2R)
             - 2955.968 * Math.cos(2 * D * D2R)
             - 569.925 * Math.cos(2 * Mprime * D2R);

    return {
        ra: rightAscension(l, b),
        dec: declination(l, b),
        dist: dt
    };
}

SunCalc.getMoonPosition = function (date, lat, lng) {

    var lw  = rad * -lng,
        phi = rad * lat,
        d   = toDays(date),

        c = moonCoords(d),
        H = siderealTime(d, lw) - c.ra,
        h = altitude(H, phi, c.dec),
        // formula 14.1 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.
        pa = atan(sin(H), tan(phi) * cos(c.dec) - sin(c.dec) * cos(H));

    h = h + astroRefraction(h); // altitude correction for refraction

    return {
        azimuth: azimuth(H, phi, c.dec),
        altitude: h,
        distance: c.dist,
        parallacticAngle: pa
    };
};


// calculations for illumination parameters of the moon,
// based on http://idlastro.gsfc.nasa.gov/ftp/pro/astro/mphase.pro formulas and
// Chapter 48 of "Astronomical Algorithms" 2nd edition by Jean Meeus (Willmann-Bell, Richmond) 1998.

SunCalc.getMoonIllumination = function (date) {

    var d = toDays(date || new Date()),
        s = sunCoords(d),
        m = moonCoords(d),

        sdist = 149598000, // distance from Earth to Sun in km

        phi = acos(sin(s.dec) * sin(m.dec) + cos(s.dec) * cos(m.dec) * cos(s.ra - m.ra)),
        inc = atan(sdist * sin(phi), m.dist - sdist * cos(phi)),
        angle = atan(cos(s.dec) * sin(s.ra - m.ra), sin(s.dec) * cos(m.dec) -
                cos(s.dec) * sin(m.dec) * cos(s.ra - m.ra));

    return {
        fraction: (1 + cos(inc)) / 2,
        phase: 0.5 + 0.5 * inc * (angle < 0 ? -1 : 1) / Math.PI,
        angle: angle
    };
};


function hoursLater(date, h) {
    return new Date(date.valueOf() + h * dayMs / 24);
}

// calculations for moon rise/set times are based on http://www.stargazing.net/kepler/moonrise.html article

SunCalc.getMoonTimes = function (date, lat, lng, inUTC) {
    var t = new Date(date);
    if (inUTC) t.setUTCHours(0, 0, 0, 0);
    else t.setHours(0, 0, 0, 0);

    var hc = 0.133 * rad,
        h0 = SunCalc.getMoonPosition(t, lat, lng).altitude - hc,
        h1, h2, rise, set, a, b, xe, ye, d, roots, x1, x2, dx;

    // go in 2-hour chunks, each time seeing if a 3-point quadratic curve crosses zero (which means rise or set)
    for (var i = 1; i <= 24; i += 2) {
        h1 = SunCalc.getMoonPosition(hoursLater(t, i), lat, lng).altitude - hc;
        h2 = SunCalc.getMoonPosition(hoursLater(t, i + 1), lat, lng).altitude - hc;

        a = (h0 + h2) / 2 - h1;
        b = (h2 - h0) / 2;
        xe = -b / (2 * a);
        ye = (a * xe + b) * xe + h1;
        d = b * b - 4 * a * h1;
        roots = 0;

        if (d >= 0) {
            dx = Math.sqrt(d) / (Math.abs(a) * 2);
            x1 = xe - dx;
            x2 = xe + dx;
            if (Math.abs(x1) <= 1) roots++;
            if (Math.abs(x2) <= 1) roots++;
            if (x1 < -1) x1 = x2;
        }

        if (roots === 1) {
            if (h0 < 0) rise = i + x1;
            else set = i + x1;

        } else if (roots === 2) {
            rise = i + (ye < 0 ? x2 : x1);
            set = i + (ye < 0 ? x1 : x2);
        }

        if (rise && set) break;

        h0 = h2;
    }

    var result = {};

    if (rise) result.rise = hoursLater(t, rise);
    if (set) result.set = hoursLater(t, set);

    if (!rise && !set) result[ye > 0 ? 'alwaysUp' : 'alwaysDown'] = true;

    return result;
};

return SunCalc;

})();

        /* --- VEDIC ASTRONOMY ALGORITHMS --- */
        /* --- VEDIC ASTRONOMY ENGINE (V5.0 - Professional Grade) --- */
        const VedicAstro = (function() {
            const NAKSHATRAS = ["Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra", "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha", "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"];
            const YOGAS = ["Vishkumbha", "Priti", "Ayushman", "Saubhagya", "Shobhana", "Atiganda", "Sukarma", "Dhriti", "Shula", "Ganda", "Vriddhi", "Dhruva", "Vyaghata", "Harshana", "Vajra", "Siddhi", "Vyatipata", "Variyan", "Parigha", "Shiva", "Siddha", "Sadhya", "Shubha", "Shukla", "Brahma", "Indra", "Vaidhriti"];
            const KARANAS = ["Bava", "Balava", "Kaulava", "Taitila", "Gara", "Vanija", "Vishti", "Shakuni", "Chatushpada", "Naga", "Kimstughna"];

            const D2R = Math.PI / 180;
            const norm = (d) => ((d % 360) + 360) % 360;

            // High Precision Solar Longitude (Meeus Algorithms)
            function getSunLong(jd) {
                const T = (jd - 2451545.0) / 36525;
                const L0 = norm(280.46646 + 36000.76983 * T + 0.0003032 * T * T);
                const M = norm(357.52911 + 35999.05029 * T - 0.0001537 * T * T);
                const C = (1.914602 - 0.004817 * T) * Math.sin(M * D2R)
                        + (0.019993 - 0.000101 * T) * Math.sin(2 * M * D2R)
                        + 0.000289 * Math.sin(3 * M * D2R);
                return norm(L0 + C);
            }

            // Professional Lunar Longitude (15 Periodic Terms)
            function getMoonLong(jd) {
                const T = (jd - 2451545.0) / 36525;
                const Lprime = norm(218.316447 + 481267.881234 * T); // Mean Long
                const D = norm(297.850192 + 445267.111403 * T);    // Elongation
                const M = norm(357.529109 + 35999.050291 * T);     // Sun Mean Anomaly
                const Mprime = norm(134.963396 + 477198.867505 * T); // Moon Mean Anomaly
                const F = norm(93.272095 + 483202.017523 * T);     // Dist from Node

                let sumLong = 6.288774 * Math.sin(Mprime * D2R);
                sumLong += 1.274027 * Math.sin((2 * D - Mprime) * D2R);
                sumLong += 0.658309 * Math.sin(2 * D * D2R);
                sumLong += 0.213618 * Math.sin(2 * Mprime * D2R);
                sumLong -= 0.185116 * Math.sin(M * D2R);
                sumLong -= 0.114332 * Math.sin(2 * F * D2R);
                sumLong += 0.058793 * Math.sin((2 * D - 2 * Mprime) * D2R);
                sumLong += 0.057066 * Math.sin((2 * D - M - Mprime) * D2R);
                sumLong += 0.053322 * Math.sin((2 * D + Mprime) * D2R);
                sumLong += 0.045758 * Math.sin((2 * D - M) * D2R);
                sumLong -= 0.040923 * Math.sin((M - Mprime) * D2R);
                sumLong -= 0.034720 * Math.sin(D * D2R);
                sumLong -= 0.030383 * Math.sin((M + Mprime) * D2R);
                sumLong += 0.015327 * Math.sin((2 * D - 2 * F) * D2R);
                // 15th Term (Drift Correction for High Precision)
                sumLong -= 0.012528 * Math.sin((2 * D - 2 * M) * D2R);

                return norm(Lprime + sumLong);
            }

            function getAyanamsa(jd) {
                const T = (jd - 2451545.0) / 36525;
                // True Lahiri Ayanamsa formula
                return 23.85616 + 1.396042 * T + 0.000307 * T * T;
            }

            function calculate(dateObj, hour = 6) {
                // 1. Standardize Time Zone to IST (UTC+5:30)
                // This prevents drift caused by local browser timezones.
                // Default: 6:00 AM IST corresponds to 00:30 UTC.

                const d = new Date(dateObj);
                const year = d.getFullYear();
                const month = d.getMonth();
                const day = d.getDate();

                const h = (hour === undefined || hour === null) ? 6 : hour;

                // Calculate UTC Offset from IST (IST is +5.5h ahead of UTC)
                // UTC Time = IST Time - 5.5h
                const utcOffsetMs = (h - 5.5) * 3600000;

                // Construct UTC Date explicitly
                // Date.UTC returns ms from epoch for 00:00:00 UTC on that YMD
                const utcDate = new Date(Date.UTC(year, month, day) + utcOffsetMs);

                const jd = (utcDate.getTime() / 86400000) + 2440587.5;
                const aya = getAyanamsa(jd);

                const sunSid = norm(getSunLong(jd) - aya);
                const moonSid = norm(getMoonLong(jd) - aya);

                // Tithi = (Moon - Sun) / 12. Use minimal epsilon for float safety.
                const diff = norm(moonSid - sunSid + 0.000001);
                const tithiIndex = Math.floor(diff / 12);

                // Nakshatra: Moon / 13.3333
                const nakIndex = Math.floor(moonSid / (13 + 1/3));

                // Yoga: (Sun + Moon) / 13.3333
                const yogaIndex = Math.floor(norm(sunSid + moonSid) / (13 + 1/3));

                // Karana logic
                const kIndexTotal = Math.floor(diff / 6);
                let karanaIndex = 0;
                if (kIndexTotal === 0) karanaIndex = 10; // Kimstughna
                else if (kIndexTotal >= 57) karanaIndex = 7 + (kIndexTotal - 57); // Fixed
                else karanaIndex = (kIndexTotal - 1) % 7; // Movable

                return {
                    tithiIndex: tithiIndex % 30,
                    nakshatra: NAKSHATRAS[nakIndex % 27],
                    yoga: YOGAS[yogaIndex % 27],
                    karana: KARANAS[karanaIndex],
                    jd: jd,
                    sunLon: sunSid,
                    moonLon: moonSid
                };
            }

            function getTithiTimes(jd, tithiIndex) {
                // Helper: Get Angle (0-360)
                const getAngle = (j) => {
                    // Use Ayanamsa corrected longitudes if possible, but difference is same
                    // (Moon - Aya) - (Sun - Aya) = Moon - Sun.
                    // So raw longitudes are fine for difference.
                    let diff = norm(getMoonLong(j) - getSunLong(j));
                    return diff;
                };

                // Helper: Binary Search
                // Finds time when angle == target.
                // Constraint: Tithi increases angle.
                const solve = (low, high, target) => {
                    for (let i = 0; i < 20; i++) {
                        let mid = (low + high) / 2;
                        let val = getAngle(mid);
                        let delta = val - target;
                        if (delta > 180) delta -= 360;
                        if (delta < -180) delta += 360;

                        // If delta > 0, current angle > target. We need earlier time.
                        if (delta > 0) high = mid; else low = mid;
                    }
                    return high;
                };

                // Normalize index to 0-29
                let idx = tithiIndex % 30;

                let startTarget = idx * 12;
                let endTarget = ((idx + 1) % 30) * 12;

                // Search Range: +/- 1.2 days from current JD
                // This covers Tithi length variations (19h to 26h)
                const startJD = solve(jd - 1.2, jd + 0.1, startTarget);
                const endJD = solve(jd - 0.1, jd + 1.2, endTarget);

                return { start: startJD, end: endJD };
            }

            return {
                calculate: calculate,
                getTithiTimes: getTithiTimes,
                getTithiAtSunrise: function(dateObj) {
                    // Strict Sunrise Rule: Always check 6 AM
                    return calculate(dateObj, 6);
                }
            };
        })();

        const SeasonIcons = {
            // Sun behind small cloud
            hemant: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="sunGradH" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style="stop-color:#FFD54F;stop-opacity:1" />
                            <stop offset="100%" style="stop-color:#FFB300;stop-opacity:1" />
                        </linearGradient>
                    </defs>
                    <!-- Sun (Spinning slowly) -->
                    <g style="transform-origin: 32px 32px; animation: spin 12s linear infinite;">
                        <circle cx="32" cy="32" r="14" fill="url(#sunGradH)" />
                        <path d="M32 6V10 M32 54V58 M58 32H54 M10 32H6 M53 11L50 14 M14 50L11 53 M53 53L50 50 M14 14L11 11" stroke="#FFB300" stroke-width="3" stroke-linecap="round"/>
                    </g>
                    <!-- Cloud (Floating) -->
                    <g style="animation: float 4s ease-in-out infinite;">
                        <path transform="translate(-6, 6)" d="M44 44H20C15.58 44 12 40.42 12 36C12 31.58 15.58 28 20 28C20.6 28 21.18 28.08 21.74 28.22C22.82 24.32 26.4 21.5 30.6 21.5C35.75 21.5 40 25.4 40.5 30.3C44.92 30.3 48.5 33.88 48.5 38.3C48.5 41.5 46.5 44 44 44Z" fill="#E3F2FD" stroke="#90CAF9" stroke-width="1.5"/>
                    </g>
                </svg>`,

            // Detailed Snowflake
            shishir: `
                <svg width="100" height="115" style="transform: translateY(12px);" viewBox="0 0 140 160" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <!-- Snowflake Arm Definition -->
                        <g id="snowflake-arm">
                            <!-- Main Stem -->
                            <line x1="0" y1="0" x2="0" y2="-38" />
                            <!-- Inner Branch -->
                            <path d="M-9 -14 L0 -6 L9 -14" />
                            <!-- Outer Branch -->
                            <path d="M-9 -28 L0 -20 L9 -28" />
                        </g>
                        <!-- Sparkle Definition -->
                        <path id="sparkle" d="M0 -7 C1 -2 2 -1 7 0 C 2 1 1 2 0 7 C -1 2 -2 1 -7 0 C -2 -1 -1 -2 0 -7 Z" />
                    </defs>
                    <!-- Group for Main Content to Center it -->
                    <g transform="translate(70, 65)">
                        <!-- Snowflake -->
                        <g stroke="#1F3B6F" stroke-width="6.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
                            <use href="#snowflake-arm" />
                            <use href="#snowflake-arm" transform="rotate(60)" />
                            <use href="#snowflake-arm" transform="rotate(120)" />
                            <use href="#snowflake-arm" transform="rotate(180)" />
                            <use href="#snowflake-arm" transform="rotate(240)" />
                            <use href="#snowflake-arm" transform="rotate(300)" />
                        </g>
                        <!-- Sparkles -->
                        <g fill="#2D9CDB">
                            <!-- Top Left -->
                            <use href="#sparkle" transform="translate(-40, -45) scale(1.2)" />
                            <!-- Middle Right -->
                            <use href="#sparkle" transform="translate(48, -5) scale(1.1)" />
                            <!-- Bottom Left -->
                            <use href="#sparkle" transform="translate(-38, 35) scale(1.1)" />
                        </g>
                    </g>
                </svg>`,

            // Flower with leaves
            vasant: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <!-- Stem -->
                    <path d="M32 60V40" stroke="#4CAF50" stroke-width="4" stroke-linecap="round"/>
                    <path d="M32 50Q42 45 42 35" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>
                    <path d="M32 50Q22 45 22 35" stroke="#4CAF50" stroke-width="3" stroke-linecap="round"/>
                    <!-- Petals -->
                    <circle cx="32" cy="18" r="6" fill="#FF8A80"/>
                    <circle cx="32" cy="38" r="6" fill="#FF8A80"/>
                    <circle cx="42" cy="28" r="6" fill="#FF8A80"/>
                    <circle cx="22" cy="28" r="6" fill="#FF8A80"/>
                    <circle cx="39" cy="21" r="6" fill="#FF8A80"/>
                    <circle cx="25" cy="21" r="6" fill="#FF8A80"/>
                    <circle cx="39" cy="35" r="6" fill="#FF8A80"/>
                    <circle cx="25" cy="35" r="6" fill="#FF8A80"/>
                    <!-- Center -->
                    <circle cx="32" cy="28" r="8" fill="#FFD54F" stroke="#FFA000" stroke-width="1"/>
                </svg>`,

            // Bright Sun
            grishma: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="32" cy="32" r="14" fill="#FF9800"/>
                    <circle cx="32" cy="32" r="14" fill="url(#sunGradient)"/>
                    <path d="M32 8L32 4M32 60L32 56M56 32L60 32M4 32L8 32M49 15L52 12M12 52L15 49M49 49L52 52M12 12L15 15" stroke="#FF9800" stroke-width="5" stroke-linecap="round"/>
                    <defs>
                        <radialGradient id="sunGradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(32 32) rotate(90) scale(14)">
                            <stop stop-color="#FFEB3B"/>
                            <stop offset="1" stop-color="#FF9800"/>
                        </radialGradient>
                    </defs>
                </svg>`,

            // Cloud with Rain Drops
            varsha: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M24 48V56" stroke="#42A5F5" stroke-width="3" stroke-linecap="round" style="animation: rain 0.8s infinite linear;"/>
                     <path d="M32 48V56" stroke="#42A5F5" stroke-width="3" stroke-linecap="round" style="animation: rain 0.8s infinite linear 0.2s;"/>
                     <path d="M40 48V56" stroke="#42A5F5" stroke-width="3" stroke-linecap="round" style="animation: rain 0.8s infinite linear 0.4s;"/>
                     <path d="M48 42H20C15 42 12 38 12 34C12 29 16 26 20 26C21 26 22 26 23 26C24 22 28 19 32 19C37 19 41 23 42 27C46 27 50 30 50 35C50 39 48 42 42 42" fill="#7E57C2"/>
                </svg>`,

            // Autumn Leaf
            sharad: `
                <svg width="56" height="56" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M32 58C32 58 32 40 32 30" stroke="#795548" stroke-width="2" stroke-linecap="round"/>
                    <path d="M32 54C22 52 14 42 14 30C14 18 24 10 32 6C40 10 50 18 50 30C50 42 42 52 32 54Z" fill="#FF7043"/>
                    <path d="M32 6V54" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 36L44 26" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 36L20 26" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 22L40 16" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 22L24 16" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 46L42 40" stroke="#D84315" stroke-width="1.5"/>
                    <path d="M32 46L22 40" stroke="#D84315" stroke-width="1.5"/>
                </svg>`
        };

        const seasonUIConfig = [
            { name: "Vasant (Spring)", color: "#388E3C", icon: SeasonIcons.vasant },   // 0
            { name: "Grishma (Summer)", color: "#E65100", icon: SeasonIcons.grishma },  // 1
            { name: "Varsha (Monsoon)", color: "#4527A0", icon: SeasonIcons.varsha },   // 2
            { name: "Sharad (Autumn)", color: "#BF360C", icon: SeasonIcons.sharad },    // 3
            { name: "Hemant (Pre-Winter)", color: "#D60000", icon: SeasonIcons.hemant },// 4
            { name: "Shishir (Winter)", color: "#1976D2", icon: SeasonIcons.shishir }   // 5
        ];



        function saveConfigToStorage() {
            try {
                localStorage.setItem('panchangConfig', JSON.stringify(appState.config));
            } catch (e) {
                console.error("Failed to save config to localStorage", e);
            }
        }

        function toggleSection(section, isVisible) {
            if (!appState.config.sections) appState.config.sections = { festivals: true, panchang: true };
            appState.config.sections[section] = isVisible;
            saveConfigToStorage();
            render();
        }

        function getUserLocation() {
            const btn = document.getElementById('btn-location');
            const originalContent = btn ? btn.innerHTML : '';

            if (!navigator.geolocation) {
                fallbackToSavedLocation(btn, originalContent);
                return;
            }

            if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Locating...';

            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                let locName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;

                // Optimistic update
                appState.config.location = { lat: lat, lng: lng, name: locName };
                saveConfigToStorage();
                render();

                // Try reverse geocoding
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data && data.address) {
                            // Construct a friendly name
                            const city = data.address.city || data.address.town || data.address.village || data.address.county;
                            const state = data.address.state || data.address.country;
                            if (city) locName = `${city}, ${state}`;
                            else if (state) locName = state;
                        } else if (data && data.display_name) {
                             locName = data.display_name.split(',')[0];
                        }
                        appState.config.location.name = locName;
                        saveConfigToStorage();
                        render();
                    }
                } catch (e) {
                    console.log("Reverse geocoding failed, using coordinates", e);
                }

                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                showToast("Location updated: " + locName);
            }, (error) => {
                console.error(error);
                fallbackToSavedLocation(btn, originalContent);
            });
        }

        function fallbackToSavedLocation(btn, originalContent) {
            try {
                const savedConfig = localStorage.getItem('panchangConfig');
                if (savedConfig) {
                    const parsed = JSON.parse(savedConfig);
                    if (parsed.location) {
                        appState.config.location = parsed.location;
                        render();
                        showToast(`Using saved location: ${parsed.location.name || 'Coordinates'}`);
                        if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                        return;
                    }
                }
            } catch(e) { console.error("Backup location load failed", e); }

            showToast("Location unavailable. Please enable GPS.");
            if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
        }

        function getSeasonIndex(month) {
             return Math.floor((month + 10) % 12 / 2);
        }

        function cycleSeasonCard() {
            if (!appState.monthsData || appState.monthsData.length === 0) return;

            const currentMonthData = appState.monthsData[appState.activeMonthIndex];
            const currentSeason = getSeasonIndex(currentMonthData.month);

            for (let i = 1; i <= 6; i++) {
                const targetSeason = (currentSeason + i) % 6;

                // Find a month with this season, preferring the "next" one in the list
                let foundIndex = -1;
                for (let j = 1; j <= appState.monthsData.length; j++) {
                    const checkIndex = (appState.activeMonthIndex + j) % appState.monthsData.length;
                    const mData = appState.monthsData[checkIndex];
                    if (getSeasonIndex(mData.month) === targetSeason) {
                        foundIndex = checkIndex;
                        break;
                    }
                }

                if (foundIndex !== -1) {
                    appState.activeMonthIndex = foundIndex;
                    render();
                    return;
                }
            }
        }

        function updateSeasonCardUI(index) {
            const config = seasonUIConfig[index];
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const name = langObj.indianSeasons[index];

            const titleEl = document.getElementById('seasonTitle');
            const iconEl = document.getElementById('seasonIcon');

            if(titleEl) {
                titleEl.textContent = name;
                titleEl.style.color = config.color;
                // Animation Reset
                titleEl.classList.remove('fade-enter-active');
                void titleEl.offsetWidth;
                titleEl.classList.add('fade-enter-active');
            }
            if(iconEl) {
                iconEl.innerHTML = config.icon;
                iconEl.style.transform = "scale(0.8) rotate(-10deg)";
                iconEl.style.opacity = "0";
                setTimeout(() => {
                    iconEl.style.transform = "scale(1) rotate(0deg)";
                    iconEl.style.opacity = "1";
                }, 50);
            }
        }

        const editor = document.getElementById('editor');

        const DEFAULT_SYNC_LINKS = {
            en: "", hi: "", or: "", bn: "", mr: "", gu: "",
            pa: "", ta: "", te: "", kn: "", ml: "", as: ""
        };

        const LinkSecurity = {
            encrypt: (s) => {
                if (!s) return "";
                try { return btoa(s).split('').reverse().join(''); } catch(e) { return s; }
            },
            decrypt: (s) => {
                if (!s) return "";
                try { return atob(s.split('').reverse().join('')); } catch(e) { return s; }
            }
        };

        let appState = {
            activeMonthIndex: 0,
            monthsData: [],
            recurringEvents: [],
            recurringDetails: {},
            viewDate: { month: new Date().getMonth(), year: new Date().getFullYear() },
            todayIndex: -1,
            details: {},
            manualTithis: {}, // New storage for dedicated Tithi overrides
            customSeasonDescriptions: {},
            images: {},
            view: 'month',
            config: {
                title: 'Vaidik Calendar',
                logoUrl: null,
                language: 'en',
                location: null,
                sections: { festivals: true, panchang: true },
                syncLinks: { ...DEFAULT_SYNC_LINKS }
            }
        };

        let bannerInterval;
        let liveClockInterval = null;
        let bannerCurrentIndex = 0;
        let currentBannerDataHash = "";
        let isBannerDismissed = false;

        const langData = {
    en: {
        days: ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
        nums: ["0","1","2","3","4","5","6","7","8","9"],
        filters: ["Festivals", "Auspicious", "Holidays", "Other festivals"],
        indianMonths: ["Pausha / Magha", "Magha / Phalguna", "Phalguna / Chaitra", "Chaitra / Vaishakha", "Vaishakha / Jyeshtha", "Jyeshtha / Ashadha", "Ashadha / Shravana", "Shravana / Bhadra", "Bhadra / Ashvina", "Ashvina / Kartika", "Kartika / Margashirsha", "Margashirsha / Pausha"],
        indianSeasons: ["Vasant (Spring)", "Grishma (Summer)", "Varsha (Monsoon)", "Sharad (Autumn)", "Hemant (Pre-Winter)", "Shishir (Winter)"],
        seasonDescriptions: [],
        paksha: ["Shukla Paksha", "Krishna Paksha"],
        tithis: ["Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima", "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shashthi", "Saptami", "Ashtami", "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"]
    },
    hi: {
        days: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
        nums: ["०","१","२","३","४","५","६","७","८","९"],
        filters: ["त्यौहार", "शुभ दिन", "छुट्टियाँ", "अन्य त्यौहार"],
        indianMonths: ["पौष / माघ", "माघ / फाल्गुन", "फाल्गुन / चैत्र", "चैत्र / वैशाख", "वैशाख / ज्येष्ठ", "ज्येष्ठ / आषाढ़", "आषाढ़ / श्रावण", "श्रावण / भाद्रपद", "भाद्रपद / आश्विन", "आश्विन / कार्तिक", "कार्तिक / मार्गशीर्ष", "मार्गशीर्ष / पौष"],
        indianSeasons: ["वसंत", "ग्रीष्म", "वर्षा", "शरद", "हेमंत", "शिशिर"],
        seasonDescriptions: [],
        paksha: ["शुक्ल पक्ष", "कृष्ण पक्ष"],
        tithis: ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पूर्णिमा", "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"]
    },
    or: {
        days: ["ରବି", "ସୋମ", "ମଙ୍ଗଳ", "ବୁଧ", "ଗୁରୁ", "ଶୁକ୍ର", "ଶନି"],
        nums: ["୦","୧","୨","୩","୪","୫","୬","୭","୮","୯"],
        filters: ["ପର୍ବପର୍ବାଣି", "ଶୁଭ ଦିନ", "ଛୁଟି ଦିନ", "ଅନ୍ୟାନ୍ୟ ପର୍ବ"],
        indianMonths: ["ପୌଷ / ମାଘ", "ମାଘ / ଫାଲଗୁନ", "ଫାଲଗୁନ / ଚୈତ୍ର", "ଚୈତ୍ର / ବୈଶାଖ", "ବୈଶାଖ / ଜ୍ୟୈଷ୍ଠ", "ଜ୍ୟୈଷ୍ଠ / ଆଷାଢ଼", "ଆଷାଢ଼ / ଶ୍ରାବଣ", "ଶ୍ରାବଣ / ଭାଦ୍ରବ", "ଭାଦ୍ରବ / ଆଶ୍ୱିନ", "ଆଶ୍ୱିନ / କାର୍ତ୍ତିକ", "କାର୍ତ୍ତିକ / ମାର୍ଗଶୀର", "ମାର୍ଗଶୀର / ପୌଷ"],
        indianSeasons: ["ବସନ୍ତ", "ଗ୍ରୀଷ୍ମ", "ବର୍ଷା", "ଶରତ", "ହେମନ୍ତ", "ଶିଶିର"],
        seasonDescriptions: [],
        paksha: ["ଶୁକ୍ଳ ପକ୍ଷ", "କୃଷ୍ଣ ପକ୍ଷ"],
        tithis: ["ପ୍ରତିପଦା", "ଦ୍ଵିତୀୟା", "ତୃତୀୟା", "ଚତୁର୍ଥୀ", "ପଞ୍ଚମୀ", "ଷଷ୍ଠୀ", "ସପ୍ତମୀ", "ଅଷ୍ଟମୀ", "ନବମୀ", "ଦଶମୀ", "ଏକାଦଶୀ", "ଦ୍ଵାଦଶୀ", "ତ୍ରୟୋଦଶୀ", "ଚତୁର୍ଦଶୀ", "ପୂର୍ଣ୍ଣିମା", "ପ୍ରତିପଦା", "ଦ୍ଵିତୀୟା", "ତୃତୀୟା", "ଚତୁର୍ଥୀ", "ପଞ୍ଚମୀ", "ଷଷ୍ଠୀ", "ସପ୍ତମୀ", "ଅଷ୍ଟମୀ", "ନବମୀ", "ଦଶମୀ", "ଏକାଦଶୀ", "ଦ୍ଵାଦଶୀ", "ତ୍ରୟୋଦଶୀ", "ଚତୁର୍ଦଶୀ", "ଅମାବାସ୍ୟା"]
    },
    bn: {
        days: ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"],
        nums: ["০","১","২","৩","৪","৫","৬","৭","৮","৯"],
        filters: ["উৎসব", "শুভ দিন", "ছুটি", "অন্যান্য উৎসব"],
        indianMonths: ["পৌষ / মাঘ", "মাঘ / ফাল্গুন", "ফাল্গুন / চৈত্র", "চৈত্র / বৈশাখ", "বৈশাখ / জ্যৈষ্ঠ", "জ্যৈষ্ঠ / আষাঢ়", "আষাঢ় / শ্রাবণ", "শ্রাবণ / ভাদ্র", "ভাদ্র / আশ্বিন", "আশ্বিন / কার্তিক", "কার্তিক / অগ্রহায়ণ", "অগ্রহায়ণ / পৌষ"],
        indianSeasons: ["বসন্ত", "গ্রীষ্ম", "বর্ষা", "শরৎ", "হেমন্ত", "শিশির"],
        seasonDescriptions: [],
        paksha: ["শুক্ল পক্ষ", "कृष्ण পক্ষ"],
        tithis: ["প্রতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুর্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নবমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্রয়োদশী", "চতুর্দশী", "পূর্ণিমা", "প্রতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুর্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নবমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্রয়োদশী", "চতুর্দশী", "অমাবস্যা"]
    },
    mr: {
        days: ["रवि", "सोम", "मंगळ", "बुध", "गुरु", "शुक्र", "शनि"],
        nums: ["०","१","२","३","४","५","६","७","८","९"],
        filters: ["सण", "शुभ दिवस", "सुट्ट्या", "इतर सण"],
        indianMonths: ["पौष / माघ", "माघ / फाल्गुन", "फाल्गुन / चैत्र", "चैत्र / वैशाख", "वैशाख / ज्येष्ठ", "ज्येष्ठ / आषाढ", "आषाढ / श्रावण", "श्रावण / भाद्रपद", "भाद्रपद / आश्विन", "आश्विन / कार्तिक", "कार्तिक / मार्गशीर्ष", "मार्गशीर्ष / पौष"],
        indianSeasons: ["वसंत", "ग्रीष्म", "वर्षा", "शरद", "हेमंत", "शिशिर"],
        seasonDescriptions: [],
        paksha: ["शुक्ल पक्ष", "कृष्ण पक्ष"],
        tithis: ["प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "पौर्णिमा", "प्रतिपदा", "द्वितीया", "तृतीया", "चतुर्थी", "पंचमी", "षष्ठी", "सप्तमी", "अष्टमी", "नवमी", "दशमी", "एकादशी", "द्वादशी", "त्रयोदशी", "चतुर्दशी", "अमावस्या"]
    },
    gu: {
        days: ["રવિ", "સોમ", "મંગળ", "બુધ", "ગુરુ", "શુક્ર", "શનિ"],
        nums: ["૦","૧","૨","૩","૪","૫","૬","૭","૮","૯"],
        filters: ["તહેવારો", "શુભ દિવસ", "રજાઓ", "અન્ય તહેવારો"],
        indianMonths: ["પોષ / મહા", "મહા / ફાગણ", "ફાગણ / ચૈત્ર", "ચૈત્ર / વૈશાખ", "વૈશાખ / જેઠ", "જેઠ / અષાઢ", "અષાઢ / શ્રાવણ", "શ્રાવણ / ભાદરવો", "ભાદરવો / આસો", "આસો / કારતક", "કારતક / માગશર", "માગશર / પોષ"],
        indianSeasons: ["વસંત", "ગ્રીષ્મ", "વર્ષા", "શરદ", "હેમંત", "શિશિર"],
        seasonDescriptions: [],
        paksha: ["શુક્લ પક્ષ", "કૃષ્ણ પક્ષ"],
        tithis: ["પડવો", "બીજ", "ત્રીજ", "ચોથ", "પાંચમ", "છઠ", "સાતમ", "આઠમ", "નોમ", "દશમ", "અગિયારસ", "બારસ", "તેરસ", "ચૌદશ", "પૂનમ", "પડવો", "બીજ", "ત્રીજ", "ચોથ", "પાંચમ", "છઠ", "સાતમ", "આઠમ", "નોમ", "દશમ", "અગિયારસ", "બારસ", "તેરસ", "ચૌદશ", "અમાસ"]
    },
    pa: {
        days: ["ਐਤ", "ਸੋਮ", "ਮੰਗਲ", "ਬੁੱਧ", "ਵੀਰ", "ਸ਼ੁੱਕਰ", "ਸ਼ਨੀ"],
        nums: ["੦","੧","੨","੩","੪","੫","੬","੭","੮","੯"],
        filters: ["ਤਿਉਹਾਰ", "ਸ਼ੁਭ ਦਿਨ", "ਛੁੱਟੀਆਂ", "ਹੋਰ ਤਿਉਹਾਰ"],
        indianMonths: ["ਪੋਹ / ਮਾਘ", "ਮਾਘ / ਫੱਗਣ", "ਫੱਗਣ / ਚੇਤ", "ਚੇਤ / ਵੈਸਾਖ", "ਵੈਸਾਖ / ਜੇਠ", "ਜੇਠ / ਹਾੜ", "ਹਾੜ / ਸਾਵਣ", "ਸਾਵਣ / ਭਾਦੋਂ", "ਭਾਦੋਂ / ਅੱਸੂ", "ਅੱਸੂ / ਕੱਤਕ", "ਕੱਤਕ / ਮੱਘਰ", "ਮੱਘਰ / ਪੋਹ"],
        indianSeasons: ["ਬਸੰਤ", "ਗ੍ਰੀਸ਼ਮ", "ਵਰਖਾ", "ਸ਼ਰਦ", "ਹੇਮੰਤ", "ਸ਼ਿਸ਼ਿਰ"],
        seasonDescriptions: [],
        paksha: ["ਸ਼ੁਕਲ ਪੱਖ", "ਕ੍ਰਿਸ਼ਨ ਪੱਖ"],
        tithis: ["ਏਕਮ", "ਦੂਜ", "ਤੀਜ", "ਚੌਥ", "ਪੰਚਮੀ", "ਛਠ", "ਸੱਤਮੀ", "ਅਸ਼ਟਮੀ", "ਨੌਮੀ", "ਦਸਮੀ", "ਏਕਾਦਸ਼ੀ", "ਦੁਆਦਸ਼ੀ", "ਤ੍ਰਯੋਦਸ਼ੀ", "ਚਤੁਰਦਸ਼ੀ", "ਪੂਰਨਮਾਸ਼ੀ", "ਏਕਮ", "ਦੂਜ", "ਤੀਜ", "ਚੌਥ", "ਪੰਚਮੀ", "ਛਠ", "ਸੱਤਮੀ", "ਅਸ਼ਟਮੀ", "ਨੌਮੀ", "ਦਸਮੀ", "ਏਕਾਦਸ਼ੀ", "ਦੁਆਦਸ਼ੀ", "ਤ੍ਰਯੋਦਸ਼ੀ", "ਚਤੁਰਦਸ਼ੀ", "ਮੱਸਿਆ"]
    },
    ta: {
        days: ["ஞாயிறு", "திங்கள்", "செவ்வாய்", "புதன்", "வியாழன்", "வெள்ளி", "சனி"],
        nums: ["௦","௧","௨","௩","௪","௫","௬","௭","௮","௯"],
        filters: ["பண்டிகைகள்", "சுப நாட்கள்", "விடுமுறை", "மற்ற பண்டிகைகள்"],
        indianMonths: ["மார்கழி / தை", "தை / மாசி", "மாசி / பங்குனி", "பங்குனி / சித்திரை", "சித்திரை / வைகாசி", "வைகாசி / ஆனி", "ஆனி / ஆடி", "ஆடி / ஆவணி", "ஆவணி / புரட்டாசி", "புரட்டாசி / ஐப்பசி", "ஐப்பசி / கார்த்திகை", "கார்த்திகை / மார்கழி"],
        indianSeasons: ["இளவேனில்", "முதுவேனில்", "கார்", "குளிர்", "முன்பனி", "பின்பனி"],
        seasonDescriptions: [],
        paksha: ["வளர்பிறை", "தேய்பிறை"],
        tithis: ["பிரதமை", "துவிதியை", "திருதியை", "சதுர்த்தி", "பஞ்சமி", "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி", "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "பௌர்ணமி", "பிரதமை", "துவிதியை", "திருதியை", "சதுர்த்தி", "பஞ்சமி", "சஷ்டி", "சப்தமி", "அஷ்டமி", "நவமி", "தசமி", "ஏகாதசி", "துவாதசி", "திரயோதசி", "சதுர்த்தசி", "அமாவாசை"]
    },
    te: {
        days: ["ఆది", "సోమ", "మంగళ", "బుధ", "గురు", "శుక్ర", "శని"],
        nums: ["౦","౧","౨","౩","౪","౫","౬","౭","౮","౯"],
        filters: ["పండుగలు", "శుభ దినాలు", "సెలవులు", "ఇతర పండుగలు"],
        indianMonths: ["పుష్యం / మాఘం", "మాఘం / ఫాల్గుణం", "ఫాల్గుణం / చైత్రం", "చైత్రం / వైశాఖం", "వైశాఖం / జ్యేష్ఠం", "జ్యేష్ఠం / ఆషాఢం", "ఆషాఢం / శ్రావణం", "శ్రావణం / భాద్రపదం", "భాద్రపదం / ఆశ్వయుజం", "ఆశ్వయుజం / కార్తీకం", "కార్తీకం / మార్గశిరం", "మార్గశిరం / పుష్యం"],
        indianSeasons: ["వసంత", "గ్రీష్మ", "వర్ష", "శరత్", "హేమంత", "శిశిర"],
        seasonDescriptions: [],
        paksha: ["శుక్ల పక్షం", "కృష్ణ పక్షం"],
        tithis: ["పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "పౌర్ణమి", "పాడ్యమి", "విదియ", "తదియ", "చవితి", "పంచమి", "షష్ఠి", "సప్తమి", "అష్టమి", "నవమి", "దశమి", "ఏకాదశి", "ద్వాదశి", "త్రయోదశి", "చతుర్దశి", "అమావాస్య"]
    },
    kn: {
        days: ["ಭಾನು", "ಸೋಮ", "ಮಂಗಳ", "ಬುಧ", "ಗುರು", "ಶುಕ್ರ", "ಶನಿ"],
        nums: ["೦","೧","೨","೩","೪","೫","೬","೭","೮","೯"],
        filters: ["ಹಬ್ಬಗಳು", "ಶುಭ ದಿನಗಳು", "ರಜಾದಿನಗಳು", "ಇತರ ಹಬ್ಬಗಳು"],
        indianMonths: ["ಪುಷ್ಯ / ಮಾಘ", "ಮಾಘ / ಫಾಲ್ಗುಣ", "ಫಾಲ್ಗುಣ / ಚೈತ್ರ", "ಚೈತ್ರ / ವೈಶಾಖ", "ವೈಶಾಖ / ಜ್ಯೇಷ್ಠ", "ಜ್ಯೇಷ್ಠ / ಆಷಾಢ", "ಆಷಾಢ / ಶ್ರಾವಣ", "ಶ್ರಾವಣ / ಭಾದ್ರಪದ", "ಭಾದ್ರಪದ / ಆಶ್ವಯುಜ", "ಆಶ್ವಯುಜ / ಕಾರ್ತಿಕ", "ಕಾರ್ತಿಕ / ಮಾರ್ಗಶಿರ", "ಮಾರ್ಗಶಿರ / ಪುಷ್ಯ"],
        indianSeasons: ["ವಸಂತ", "ಗ್ರೀಷ್ಮ", "ವರ್ಷ", "ಶರತ್", "ಹೇಮಂತ", "ಶಿಶಿರ"],
        seasonDescriptions: [],
        paksha: ["ಶುಕ್ಲ ಪಕ್ಷ", "ಕೃಷ್ಣ ಪಕ್ಷ"],
        tithis: ["ಪಾಡ್ಯಮಿ", "ಬಿದಿಗೆ", "ತದಿಗೆ", "ಚೌತಿ", "ಪಂಚಮಿ", "ಷಷ್ಠಿ", "ಸಪ್ತಮಿ", "ಅಷ್ಟಮಿ", "ನವಮಿ", "ದಶಮಿ", "ಏಕಾದಶಿ", "ದ್ವಾದಶಿ", "ತ್ರಯೋದಶಿ", "ಚತುರ್ದಶಿ", "ಹುಣ್ಣಿಮೆ", "ಪಾಡ್ಯಮಿ", "ಬಿದಿಗೆ", "ತದಿಗೆ", "ಚೌತಿ", "ಪಂಚಮಿ", "ಷಷ್ಠಿ", "ಸಪ್ತಮಿ", "ಅಷ್ಟಮಿ", "ನವಮಿ", "ದಶಮಿ", "ಏಕಾದಶಿ", "ದ್ವಾದಶಿ", "ತ್ರಯೋದಶಿ", "ಚತುರ್ದಶಿ", "ಅಮಾವಾಸ್ಯೆ"]
    },
    ml: {
        days: ["ഞായർ", "തിങ്കൾ", "ചൊവ്വ", "ബുധൻ", "വ്യാഴം", "വെള്ളി", "ശനി"],
        nums: ["൦","൧","൨","൩","൪","൫","൬","൭","൮","൯"],
        filters: ["ഉത്സവങ്ങൾ", "ശുഭദിനങ്ങൾ", "അവധി", "മറ്റ് ഉത്സവങ്ങൾ"],
        indianMonths: ["ധനു / മകരം", "മകരം / കുംഭം", "കുംഭം / മീനം", "മീനം / മേടം", "മേടം / ഇടവം", "ഇടവം / മിഥുനം", "മിഥുനം / കർക്കടകം", "കർക്കടകം / ചിങ്ങം", "ചിങ്ങം / കന്നി", "കന്നി / തുലാം", "തുലാം / വൃശ്ചികം", "വൃശ്ചികം / ധനു"],
        indianSeasons: ["വസന്തം", "ഗ്രീഷ്മം", "വർഷം", "ശരത്", "ഹേമന്തം", "ശിശിരം"],
        seasonDescriptions: [],
        paksha: ["ശുക്ല പക്ഷം", "കൃഷ്ണ പക്ഷം"],
        tithis: ["പ്രഥമ", "ദ്വിതീയ", "തൃതീയ", "ചതുർത്ഥി", "പഞ്ചമി", "ഷഷ്ഠി", "സപ്തമി", "അഷ്ടമി", "നവമി", "ദശമി", "ഏകാദശി", "ദ്വാദശി", "ത്രയോദശി", "ചതുർദ്ദശി", "പൗർണ്ണമി", "പ്രഥമ", "ദ്വിതീയ", "തൃതീയ", "ചതുർത്ഥി", "പഞ്ചമി", "ഷഷ്ഠി", "സപ്തമി", "അഷ്ടമി", "നവമി", "ദശമി", "ഏകാദശി", "ദ്വാദശി", "ത്രയോദശി", "ചതുർദ്ദശി", "അമാവാസി"]
    },
    as: {
        days: ["ৰবি", "সোম", "মঙল", "বুধ", "বৃহ", "শুক্ৰ", "শনি"],
        nums: ["০","১","২","৩","৪","৫","৬","৭","৮","৯"],
        filters: ["উৎসৱ", "শুভ দিন", "বন্ধ", "অন্যান্য উৎসৱ"],
        indianMonths: ["পুহ / মাঘ", "মাঘ / ফাগুন", "ফাগুন / চ'ত", "চ'ত / বহাগ", "বহাগ / জেঠ", "জেঠ / আহাৰ", "আহাৰ / শাওন", "শাওন / ভাদ", "ভাদ / আহিন", "আহিন / কাতি", "কাতি / আঘোণ", "আঘোণ / পুহ"],
        indianSeasons: ["বসন্ত", "গ্ৰীষ্ম", "বৰ্ষা", "শৰৎ", "হেমন্ত", "শীত"],
        seasonDescriptions: [],
        paksha: ["শুক্ল পক্ষ", "কৃষ্ণ পক্ষ"],
        tithis: ["প্ৰতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুৰ্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নৱমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্ৰয়োদশী", "চতুৰ্দশী", "পূৰ্ণিমা", "প্ৰতিপদ", "দ্বিতীয়া", "তৃতীয়া", "চতুৰ্থী", "পঞ্চমী", "ষষ্ঠী", "সপ্তমী", "অষ্টমী", "নৱমী", "দশমী", "একাদশী", "দ্বাদশী", "ত্ৰয়োদশী", "চতুৰ্দশী", "অমাৱস্যা"]
    }
};

        function calculateTithi(dateObj) {
            const day = String(dateObj.getDate()).padStart(2, '0');
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const year = dateObj.getFullYear();

            const fullDateKey = `${day}-${month}-${year}`; // e.g., 14-01-2026
            const recDateKey = `${day}-${month}`;        // e.g., 14-01

            // 1. Check for Manual Overrides first
            let manualIndex = null;
            if (appState.manualTithis && appState.manualTithis[fullDateKey] !== undefined) {
                manualIndex = appState.manualTithis[fullDateKey];
            } else if (appState.manualTithis && appState.manualTithis[recDateKey] !== undefined) {
                manualIndex = appState.manualTithis[recDateKey];
            }

            let astro;
            if (manualIndex !== null) {
                // Hybrid: Use manual Tithi but keep math-based Nakshatra/Yoga
                const mathData = VedicAstro.calculate(dateObj);
                astro = { ...mathData, tithiIndex: manualIndex };
            } else {
                // Default: Pure mathematical calculation
                astro = VedicAstro.getTithiAtSunrise(dateObj);
            }

            // 2. Localization & Rendering
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const safeIndex = astro.tithiIndex;

            return {
                tithi: langObj.tithis ? langObj.tithis[safeIndex] : `Tithi ${safeIndex + 1}`,
                paksha: langObj.paksha ? (safeIndex < 15 ? langObj.paksha[0] : langObj.paksha[1]) : (safeIndex < 15 ? "Shukla" : "Krishna"),
                index: safeIndex,
                nakshatra: astro.nakshatra,
                yoga: astro.yoga,
                karana: astro.karana,
                jd: astro.jd,
                sunLon: astro.sunLon,
                moonLon: astro.moonLon
            };
        }

        function toNativeNum(num, langCode) {
            if (langCode === 'en' || !langData[langCode]) return num;
            return num.toString().split('').map(d => langData[langCode].nums[parseInt(d)]).join('');
        }

        // --- SCROLL HELPERS ---
        function lockScroll() {
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';

            // Special handling for Downloaded App Mode (where body has overflow-y-auto)
            if (document.body.classList.contains('overflow-y-auto')) {
                document.body.classList.remove('overflow-y-auto');
                document.body.dataset.restoreOverflowY = 'true';
            }
        }

        function unlockScroll() {
            // Restore background scrolling
            document.body.style.overflow = '';

            if (document.body.dataset.restoreOverflowY === 'true') {
                document.body.classList.add('overflow-y-auto');
                // Remove data attribute to clean up
                delete document.body.dataset.restoreOverflowY;
            }
        }

        function openSettingsModal() {
            lockScroll();

            document.getElementById('language-select').value = appState.config.language || 'en';

            // --- EDITOR LOGIC START ---
            // Environment Check: Hide Sync Settings in App Mode (User View)
            const isEditor = !!document.getElementById('editor');

            const syncSettingsContainer = document.getElementById('container-sync-settings');
            const langLinksContainer = document.getElementById('container-lang-links');

            if (!isEditor) {
                 // App Mode: Hide everything
                 if(syncSettingsContainer) syncSettingsContainer.style.display = 'none';
                 if(langLinksContainer) langLinksContainer.style.display = 'none';
            } else {
                 // Editor Mode: Show everything (and handle Docs Sync logic)
                 if(syncSettingsContainer) syncSettingsContainer.style.display = 'block';
                 if(langLinksContainer) langLinksContainer.style.display = 'block';

                 const docsContainer = document.getElementById('container-sync-docs');
                 if (docsContainer) {
                     docsContainer.style.display = 'flex'; // Docs sync is editor-only feature
                 }
            }
            // --- EDITOR LOGIC END ---

            // Update toggle state
            const toggle = document.getElementById('banner-toggle');
            if(toggle) toggle.checked = !isBannerDismissed;

            // Sync Link Init
            if (typeof updateSyncLinkInput === 'function') updateSyncLinkInput();

            const secs = appState.config.sections || { festivals: true, panchang: true };
            if(document.getElementById('toggle-festivals')) document.getElementById('toggle-festivals').checked = secs.festivals;
            if(document.getElementById('toggle-panchang')) document.getElementById('toggle-panchang').checked = secs.panchang;

            // Update Sync Toggles
            const liveUrl = appState.config.liveUrl || "";
            const isDocs = liveUrl.includes('docs.google.com') || (appState.config.syncDocsUrl && liveUrl === appState.config.syncDocsUrl);
            const isGitHub = liveUrl.includes('github') || (appState.config.syncGitHubUrl && liveUrl === appState.config.syncGitHubUrl);

            const docsToggle = document.getElementById('toggle-sync-docs');
            const githubToggle = document.getElementById('toggle-sync-github');

            if(docsToggle) docsToggle.checked = isDocs;
            if(githubToggle) githubToggle.checked = isGitHub;

            const modal = document.getElementById('settings-modal');
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.remove('modal-hidden');
                modal.classList.add('is-open');
            }, 10);
        }
        function closeSettingsModal() {
            const modal = document.getElementById('settings-modal');
            modal.classList.remove('is-open');
            modal.classList.add('modal-hidden');

            unlockScroll();

            // Timeout matches the 0.3s CSS transition + slight buffer
            setTimeout(() => modal.style.display = 'none', 300);
        }
        function changeLanguage(langCode) {
            appState.config.language = langCode;

            // 1. Clear Data State
            appState.monthsData = [];
            appState.recurringEvents = [];
            appState.details = {};
            appState.recurringDetails = {};
            appState.manualTithis = {};
            appState.customSeasonDescriptions = {};
            appState.images = {};

            // 2. Clear Storage & Cache
            localStorage.removeItem('panchang_autosave_text');
            localStorage.removeItem('panchang_cached_state');
            localStorage.removeItem('panchang_last_sync_ts');

            // 3. Clear Editor
            const editor = document.getElementById('editor');
            if (editor) editor.value = '';

            // 4. Check for Sync Link
            let link = null;
            if (appState.config.syncLinks && appState.config.syncLinks[langCode]) {
                link = appState.config.syncLinks[langCode];
                if (appState.config.linksEncrypted) {
                    try {
                        link = LinkSecurity.decrypt(link);
                    } catch (e) {
                        console.error("Decryption failed", e);
                        link = null;
                    }
                }
            }

            // 5. Update Config & Trigger Sync
            if (link) {
                appState.config.liveUrl = link;
                appState.config.syncGitHubUrl = link;
                saveConfigToStorage(); // Persist new language & url

                showToast(`Fetching ${langCode.toUpperCase()} dataset...`);
                fetchGitHubData(link, true);
            } else {
                delete appState.config.liveUrl;
                delete appState.config.syncGitHubUrl;
                saveConfigToStorage(); // Persist removal

                showToast(`${langCode.toUpperCase()} selected. No data available.`);
                render(); // Render blank state
            }
        }

        // --- EDITOR LOGIC START ---
        function updateSyncLinkInput() {
            const langEl = document.getElementById('sync-lang-select');
            if (!langEl) return; // Exit if elements don't exist (e.g., in downloaded app)

            const lang = langEl.value;
            const input = document.getElementById('sync-link-input');
            if (appState.config.syncLinks && appState.config.syncLinks[lang]) {
                input.value = appState.config.syncLinks[lang];
            } else {
                input.value = '';
            }
        }
        // --- EDITOR LOGIC END ---

        // --- EDITOR LOGIC START ---
        function saveSyncLink() {
            const langEl = document.getElementById('sync-lang-select');
            if (!langEl) return;

            const lang = langEl.value;
            const url = document.getElementById('sync-link-input').value.trim();

            if (!appState.config.syncLinks) appState.config.syncLinks = { ...DEFAULT_SYNC_LINKS };

            if (url) {
                appState.config.syncLinks[lang] = url;
                showToast(`Link saved for ${lang.toUpperCase()}`);
            } else {
                if (appState.config.syncLinks[lang]) {
                    delete appState.config.syncLinks[lang];
                    showToast(`Link removed for ${lang.toUpperCase()}`);
                }
            }

            // Auto-Fetch if affecting Active Language
            if (lang === appState.config.language) {
                if (url) {
                    appState.config.liveUrl = url;
                    appState.config.syncGitHubUrl = url;
                    showToast(`Fetching ${lang.toUpperCase()} dataset...`);
                    fetchGitHubData(url, true);
                } else {
                    delete appState.config.liveUrl;
                    delete appState.config.syncGitHubUrl;
                    showToast("Active link removed.");
                }
            }

            saveConfigToStorage();
        }
        // --- EDITOR LOGIC END ---

        function toggleBannerVisibility(checkbox) {
            isBannerDismissed = !checkbox.checked;
            if (isBannerDismissed) {
                stopBannerAutoPlay();
            }
            render();
        }

        // --- EDITOR LOGIC START ---
        function toggleLiveSyncDocs(checked) {
            const toggleGitHub = document.getElementById('toggle-sync-github');
            if (checked) {
                if (toggleGitHub) toggleGitHub.checked = false;

                if (appState.config.syncDocsUrl) {
                    appState.config.liveUrl = appState.config.syncDocsUrl;
                    saveConfigToStorage();
                    fetchLiveDoc(appState.config.liveUrl);
                } else {
                    configureLiveSync(); // Will save to syncDocsUrl and liveUrl
                }
            } else {
                // If turning off Docs, and it was the active one, clear liveUrl
                const currentUrl = appState.config.liveUrl || "";
                if (currentUrl === appState.config.syncDocsUrl || currentUrl.includes('docs.google.com')) {
                    delete appState.config.liveUrl;
                    saveConfigToStorage();
                    showToast("Live Sync disabled.");
                }
            }
        }

        function toggleLiveSyncGitHub(checked) {
            const toggleDocs = document.getElementById('toggle-sync-docs');
            if (checked) {
                if (toggleDocs) toggleDocs.checked = false;

                if (appState.config.syncGitHubUrl) {
                    appState.config.liveUrl = appState.config.syncGitHubUrl;
                    saveConfigToStorage();
                    fetchGitHubData(appState.config.liveUrl);
                } else {
                    configureGitHubSync(); // Will save to syncGitHubUrl and liveUrl
                }
            } else {
                // If turning off GitHub, and it was the active one, clear liveUrl
                const currentUrl = appState.config.liveUrl || "";
                if (currentUrl === appState.config.syncGitHubUrl || currentUrl.includes('github')) {
                    delete appState.config.liveUrl;
                    saveConfigToStorage();
                    showToast("Live Sync disabled.");
                }
            }
        }
        // --- EDITOR LOGIC END ---

        let tempLinkState = { selectedType: 'logo' };
        let currentIsolationFilter = null; // null = Show All
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const shortMonths = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
        const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

        // --- EDITOR LOGIC START ---
        function toggleSyntaxGuide() {
            const guide = document.getElementById('syntax-guide');
            guide.classList.toggle('open');
        }

        function openClearModal() {
            lockScroll();
            const modal = document.getElementById('clear-confirmation-modal');
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.remove('modal-hidden'), 10);
        }
        function closeClearModal() {
            const modal = document.getElementById('clear-confirmation-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            setTimeout(() => modal.style.display = 'none', 300);
        }
        function performClear() {
            const ed = document.getElementById('editor');
            if(ed) {
                ed.value = "";
                appState.activeMonthIndex = 0;
                parseInput("");
                closeClearModal();
            }
        }

        function insertImageToEditor(url, type, extraParam) {
            let newText = editor.value;
            if (type === 'logo') {
                const configBlockRegex = /::: config([\s\S]*?):::/;
                const logoLine = `@ Logo : ![App Logo](${url})`;
                if (configBlockRegex.test(newText)) {
                    newText = newText.replace(configBlockRegex, (match, content) => {
                        if (content.match(/@\s*Logo\s*:/)) { return match.replace(/@\s*Logo\s*:.*(\r?\n|$)/, `${logoLine}\n`); }
                        else { return `::: config\n${logoLine}${content}:::`; }
                    });
                } else { newText = `::: config\n${logoLine}\n:::\n\n` + newText; }
                appState.config.logoUrl = url;
            } else if (type === 'banner' || type === 'gridbg') {
                const date = extraParam;
                if (!date) { alert("Please select a date."); return; }
                const dateHeaderRegex = new RegExp(`(>>\\s+${date})`);
                const tagLine = type === 'banner' ? `![Banner](${url})` : `![GridBg](${url})`;
                if(newText.match(dateHeaderRegex)) { newText = newText.replace(dateHeaderRegex, `$1\n${tagLine}`); }
                else { newText += `\n\n::: details\n>> ${date}\n${tagLine}\n@ Tag : New Event\n:::`; }
            }
            editor.value = newText;
            parseInput(newText);
            render();
        }

        function openLinkModal() {
            lockScroll();
            const modal = document.getElementById('link-modal');
            let year = new Date().getFullYear();
            let month = new Date().getMonth();
            if (appState.monthsData && appState.monthsData.length > 0) {
                const currentData = appState.monthsData[appState.activeMonthIndex];
                if (currentData) { year = currentData.year; month = currentData.month; }
            }
            const daysInMonth = new Date(year, month + 1, 0).getDate();
            const dropdown = document.getElementById('link-date-select');
            dropdown.innerHTML = '<option value="" disabled selected>Select Date</option>';
            for (let d = 1; d <= daysInMonth; d++) {
                const dateStr = `${String(d).padStart(2, '0')}-${String(month + 1).padStart(2, '0')}-${year}`;
                const dateObj = new Date(year, month, d);
                const dayName = daysOfWeek[dateObj.getDay()];
                const option = document.createElement('option');
                option.value = dateStr;
                option.text = `${dateStr} (${dayName})`;
                dropdown.appendChild(option);
            }
            updateLinkType('logo');
            document.getElementById('link-url-input').value = '';
            modal.style.display = 'flex';
            setTimeout(() => modal.classList.remove('modal-hidden'), 10);
        }

        function closeLinkModal() {
            const modal = document.getElementById('link-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            setTimeout(() => modal.style.display = 'none', 300);
        }

        function updateLinkType(type) {
            tempLinkState.selectedType = type;
            document.querySelectorAll('#link-modal .radio-option').forEach(el => el.classList.remove('selected'));
            const selectedEl = document.querySelector(`#link-modal .radio-option[onclick="updateLinkType('${type}')"]`);
            if(selectedEl) selectedEl.classList.add('selected');

            const dateContainer = document.getElementById('link-date-container');
            dateContainer.classList.add('hidden');

            if(type === 'banner' || type === 'gridbg') {
                dateContainer.classList.remove('hidden');
            }
        }

        function convertGoogleDriveLink(url) {
            // 1. Check for /file/d/ID pattern (supports trailing slash, question mark, or end of line)
            const fileIdRegex = /\/file\/d\/([a-zA-Z0-9_-]+)/;
            let match = url.match(fileIdRegex);

            // 2. Check for id=ID pattern (e.g. open?id=, uc?id=)
            if (!match) {
                const idParamRegex = /[?&]id=([a-zA-Z0-9_-]+)/;
                match = url.match(idParamRegex);
            }

            if (match && match[1]) {
                // Use the thumbnail endpoint with a large size (w4096) to ensure high resolution
                // This approach bypasses the 'Virus Scan' warning page that breaks 'uc?export=view' for large files
                return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w4096`;
            }
            return url;
        }

        function performLinkInsert() {
            let url = document.getElementById('link-url-input').value.trim();
            if (!url) { alert("Please enter a URL."); return; }

            // Convert Google Drive Links to Direct View Links
            url = convertGoogleDriveLink(url);

            const type = tempLinkState.selectedType;
            let extraParam = null;
            if (type === 'banner' || type === 'gridbg') {
                extraParam = document.getElementById('link-date-select').value;
                if (!extraParam) { alert("Please select a date."); return; }
            }
            insertImageToEditor(url, type, extraParam);
            closeLinkModal();
        }

        function downloadTxtFile() {
            const text = editor.value;
            const blob = new Blob([text], { type: "text/plain" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "Panchang_Input.txt";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        // --- EDITOR LOGIC START ---
        // --- NEW FUNCTION: Fetch Text from Google Drive ---
        async function fetchDriveData() {
            // 1. Ask user for the link
            const url = prompt("Paste your Google Drive Sharing Link (.txt files only):");
            if (!url) return;

            // 2. Extract the File ID using Regex
            // Matches /d/FILE_ID or id=FILE_ID patterns
            let match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);

            if (match && match[1]) {
                const fileId = match[1];
                const btn = event.target.closest('button'); // Get button to show loading state
                const originalText = btn ? btn.innerHTML : '';

                if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Loading...';

                // 3. Construct Proxy URL (Bypasses CORS security block)
                // We use 'allorigins' proxy to fetch the Google Drive download link
                const driveDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(driveDownloadUrl)}`;

                try {
                    const response = await fetch(proxyUrl);
                    if (!response.ok) throw new Error("Failed to connect to file.");

                    const text = await response.text();

                    // 4. Update the Editor and App
                    const editor = document.getElementById('editor');
                    if (editor) {
                        editor.value = text;
                        parseInput(text); // Call your existing parser
                        render();         // Refresh the view
                        showToast("Data imported from Google Drive successfully!");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error: Could not fetch file. Make sure the Drive link is 'Anyone with the link can view' and the file is text.");
                } finally {
                    if(btn) btn.innerHTML = originalText;
                }
            } else {
                alert("Invalid Google Drive Link. Please use a standard sharing link.");
            }
        }
        // --- LIVE GOOGLE DOC SYNC FEATURE ---

        // 1. Configure the Link (User clicks button)
        function configureLiveSync() {
            const currentUrl = appState.config.liveUrl || "";
            let url = prompt("Paste your Published Google Doc Link:\n(The App will auto-fetch this every time it opens)", currentUrl);

            if (url) {
                url = url.trim();

                // GitHub Logic (Redirect to dedicated function if user pastes GitHub here)
                if (url.includes('github.com') || url.includes('raw.githubusercontent.com')) {
                    if (url.includes('github.com') && url.includes('/blob/')) {
                         url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                    }
                }
                // Google Doc Logic: Validation
                else if (url.includes('docs.google.com') && !url.includes('/pub')) {
                    alert("Warning: Google Doc link does not look like a 'Published to Web' link (should end in /pub).");
                }

                // Save to App State (So it persists in Downloaded File)
                appState.config.liveUrl = url;
                if (!url.includes('github')) {
                    appState.config.syncDocsUrl = url;
                }

                saveConfigToStorage();

                // Fetch immediately to test
                if (url.includes('github.com') || url.includes('raw.githubusercontent.com')) {
                    fetchGitHubData(url);
                } else {
                    fetchLiveDoc(url);
                }

                // Update Settings UI if open
                const docsToggle = document.getElementById('toggle-sync-docs');
                const githubToggle = document.getElementById('toggle-sync-github');
                if (docsToggle && !url.includes('github')) {
                    docsToggle.checked = true;
                    if(githubToggle) githubToggle.checked = false;
                }

            } else if (url === "") {
                // User cleared the input
                delete appState.config.liveUrl;
                saveConfigToStorage();
                showToast("Live Sync removed.");

                const docsToggle = document.getElementById('toggle-sync-docs');
                if (docsToggle) docsToggle.checked = false;
            }
        }

        // --- NEW: Configure GitHub Sync ---
        function configureGitHubSync() {
            const currentUrl = (appState.config.liveUrl && (appState.config.liveUrl.includes('github') || appState.config.liveUrl.includes('raw.githubusercontent'))) ? appState.config.liveUrl : "";
            let url = prompt("Paste your GitHub File Link (e.g., github.com/.../data.txt):", currentUrl);

            if (url) {
                url = url.trim();

                // Smart Conversion: GitHub Blob -> Raw
                if (url.includes('github.com') && url.includes('/blob/')) {
                    url = url.replace('github.com', 'raw.githubusercontent.com').replace('/blob/', '/');
                }

                // Save to App State
                appState.config.liveUrl = url;
                appState.config.syncGitHubUrl = url;

                saveConfigToStorage();

                // Trigger Fetch
                fetchGitHubData(url);

                // Update Settings UI if open
                const docsToggle = document.getElementById('toggle-sync-docs');
                const githubToggle = document.getElementById('toggle-sync-github');
                if (githubToggle) {
                    githubToggle.checked = true;
                    if(docsToggle) docsToggle.checked = false;
                }

            } else if (url === "") {
                delete appState.config.liveUrl;
                saveConfigToStorage();
                // showToast("GitHub Sync removed.");

                const githubToggle = document.getElementById('toggle-sync-github');
                if (githubToggle) githubToggle.checked = false;
            }
        }
        // --- EDITOR LOGIC END ---

        // --- NEW: Fetch GitHub Data (Direct) ---
        async function fetchGitHubData(url, force = false) {
            if (!url) return;

            // Auto-detect Editor Mode to enforce Force Update
            if (document.getElementById('editor')) {
                force = true;
            }

            // --- EDITOR LOGIC START ---
            // UI Feedback (Target specific button if possible, else fallback)
            const syncBtn = document.querySelector('button[onclick="configureGitHubSync()"]');
            const originalText = syncBtn ? syncBtn.innerHTML : '';
            if(syncBtn) syncBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Syncing...';
            // --- EDITOR LOGIC END ---

            // TIMER LOGIC (Only if NOT forced)
            if (!force) {
                const lastSync = localStorage.getItem('panchang_last_sync_ts');
                const interval = appState.config.syncInterval || (24 * 60 * 60 * 1000); // Default 24h
                const now = Date.now();

                if (lastSync && (now - parseInt(lastSync) < interval)) {
                    console.log(`Sync Timer Valid. Elapsed: ${now - parseInt(lastSync)}ms < Interval: ${interval}ms`);
                    // --- EDITOR LOGIC START ---
                    if(syncBtn) syncBtn.innerHTML = originalText;
                    // --- EDITOR LOGIC END ---
                    return; // Stop.
                }

                // Strict Data Cleanup BEFORE Fetch (Requested Improvement)
                console.log("Auto-sync timer triggered. Cleaning up old data...");
                showToast("Auto-syncing latest data...");

                localStorage.removeItem('panchang_cached_state');
                localStorage.removeItem('panchang_autosave_text');

                appState.monthsData = [];
                appState.recurringEvents = [];
                appState.details = {};
                appState.recurringDetails = {};
                appState.manualTithis = {};
                appState.customSeasonDescriptions = {};
            }

            try {
                // Add timestamp to bypass caching
                const fetchUrl = url.includes('?') ? `${url}&t=${Date.now()}` : `${url}?t=${Date.now()}`;

                // Add Timeout (15 seconds)
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);

                const response = await fetch(fetchUrl, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error(`GitHub Fetch Failed: ${response.status}`);

                const cleanText = await response.text();

                // VALIDATION
                if (!cleanText || cleanText.length < 10) throw new Error("Document seems empty or invalid");

                // SMART DIFF (Only if NOT forced)
                if (!force) {
                    const cachedString = localStorage.getItem('panchang_autosave_text');
                    if (cachedString && cleanText === cachedString) {
                         console.log("Smart Diff: Data is identical. Update timestamp only.");
                         localStorage.setItem('panchang_last_sync_ts', Date.now());
                         // --- EDITOR LOGIC START ---
                         if(syncBtn) showToast("Sync: No changes found.");
                         // --- EDITOR LOGIC END ---
                         return;
                    }
                }

                // Update & Save Logic (Shared)
                await updateAppWithFetchedData(cleanText);

                // Update Timestamp
                localStorage.setItem('panchang_last_sync_ts', Date.now());

            } catch (e) {
                console.error("GitHub Sync Error:", e);
                // --- EDITOR LOGIC START ---
                showToast("Sync Error: " + e.message);
                // --- EDITOR LOGIC END ---
            } finally {
                // --- EDITOR LOGIC START ---
                if(syncBtn) syncBtn.innerHTML = originalText;
                // --- EDITOR LOGIC END ---
            }
        }

        // 2. The Fetching Logic (Google Docs - Legacy/Proxy)
        async function fetchLiveDoc(url, force = false) {
            if (!url) return;

            // STRICT ENV CHECK: Proxy is ONLY allowed in Editor Mode
            const isEditor = !!document.getElementById('editor');
            if (!isEditor) {
                console.warn("Security Restriction: Proxy fetch (Live Sync Docs) is disabled in Downloaded App Mode.");
                return;
            }

            // Check if it's actually a GitHub URL that got routed here
            if (url.includes('github.com') || url.includes('raw.githubusercontent.com')) {
                return fetchGitHubData(url, force);
            }

            // Auto-detect Editor Mode to enforce Force Update
            if (isEditor) {
                force = true;
            }

            // --- EDITOR LOGIC START ---
            // UI Feedback
            const syncBtn = document.querySelector('button[onclick="configureLiveSync()"]');
            const originalText = syncBtn ? syncBtn.innerHTML : '';
            if(syncBtn) syncBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Syncing...';
            // --- EDITOR LOGIC END ---

            // TIMER LOGIC (Only if NOT forced)
            if (!force) {
                const lastSync = localStorage.getItem('panchang_last_sync_ts');
                const interval = appState.config.syncInterval || (24 * 60 * 60 * 1000); // Default 24h
                const now = Date.now();

                if (lastSync && (now - parseInt(lastSync) < interval)) {
                    console.log(`Sync Timer Valid (Docs). Elapsed: ${now - parseInt(lastSync)}ms < Interval: ${interval}ms`);
                    // --- EDITOR LOGIC START ---
                    if(syncBtn) syncBtn.innerHTML = originalText;
                    // --- EDITOR LOGIC END ---
                    return; // Stop.
                }

                // Strict Data Cleanup BEFORE Fetch (Requested Improvement)
                console.log("Auto-sync timer triggered. Cleaning up old data...");
                showToast("Auto-syncing latest data...");

                localStorage.removeItem('panchang_cached_state');
                localStorage.removeItem('panchang_autosave_text');

                appState.monthsData = [];
                appState.recurringEvents = [];
                appState.details = {};
                appState.recurringDetails = {};
                appState.manualTithis = {};
                appState.customSeasonDescriptions = {};
            }

            try {
                // Add timestamp to bypass browser caching
                const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}&t=${Date.now()}`;

                // Add Timeout (15 seconds)
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000);

                const response = await fetch(proxyUrl, { signal: controller.signal });
                clearTimeout(timeoutId);

                if (!response.ok) throw new Error("Proxy Connection failed");

                const html = await response.text();

                // Parse HTML to get raw text syntax
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // CLEANUP
                const unwanted = doc.querySelectorAll('style, script, link, meta, title, noscript, svg');
                unwanted.forEach(el => el.remove());
                const header = doc.querySelector('#header'); if (header) header.remove();
                const footer = doc.querySelector('#footer'); if (footer) footer.remove();

                // Custom text extractor
                function getText(node) {
                    if (node.nodeType === Node.TEXT_NODE) return node.nodeValue;
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        let text = '';
                        for (let child of node.childNodes) text += getText(child);
                        const tag = node.tagName.toLowerCase();
                        if (['p', 'div', 'br', 'li', 'tr', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) text += '\n';
                        return text;
                    }
                    return '';
                }

                const contentNode = doc.querySelector('#contents') || doc.body;
                let cleanText = getText(contentNode);
                cleanText = cleanText.replace(/\n\s*\n/g, '\n\n').trim();

                // VALIDATION
                if (!cleanText || cleanText.length < 10) throw new Error("Document seems empty or invalid");

                // SMART DIFF (Only if NOT forced)
                if (!force) {
                    const cachedString = localStorage.getItem('panchang_autosave_text');
                    if (cachedString && cleanText === cachedString) {
                         console.log("Smart Diff (Docs): Data is identical. Update timestamp only.");
                         localStorage.setItem('panchang_last_sync_ts', Date.now());
                         // --- EDITOR LOGIC START ---
                         if(syncBtn) showToast("Sync: No changes found.");
                         // --- EDITOR LOGIC END ---
                         return;
                    }
                }

                // Update & Save
                await updateAppWithFetchedData(cleanText);

                // Update Timestamp
                localStorage.setItem('panchang_last_sync_ts', Date.now());

            } catch (e) {
                console.error("Live Sync Error:", e);
                // --- EDITOR LOGIC START ---
                showToast("Sync Error: " + e.message);
                // --- EDITOR LOGIC END ---
            } finally {
                // --- EDITOR LOGIC START ---
                if(syncBtn) syncBtn.innerHTML = originalText;
                // --- EDITOR LOGIC END ---
            }
        }

        // Shared Logic for updating app state from fetched text
        function updateAppWithFetchedData(cleanText) {
            return new Promise((resolve, reject) => {
                // 1. Save to Local Storage (Auto-Save)
                localStorage.setItem('panchang_autosave_text', cleanText);

                // 2. Non-Blocking Render
                requestAnimationFrame(() => {
                    try {
                        // --- EDITOR LOGIC START ---
                        const editor = document.getElementById('editor');
                        if (editor) {
                            if (editor.value !== cleanText) {
                                editor.value = cleanText;
                            }
                        }
                        // --- EDITOR LOGIC END ---

                        // Heavy lifting
                        parseInput(cleanText);
                        render();
                        saveStateToCache(); // Update JSON Cache

                        // Reset Retry Counter on Success
                        sessionStorage.removeItem('panchang_retry_count');

                        // Optional: Update title if changed in config
                        if (appState.config && appState.config.title) {
                             const titleEl = document.getElementById('app-title');
                             if(titleEl) titleEl.innerText = appState.config.title;
                        }

                        // --- EDITOR LOGIC START ---
                        if (document.getElementById('editor')) showToast("Calendar updated from Cloud!");
                        else
                        // --- EDITOR LOGIC END ---
                        console.log("App updated seamlessly from background cloud fetch.");

                        resolve();
                    } catch (e) {
                        console.error("Critical Parse/Render Error:", e);
                        reject(e);
                    }
                });
            });
        }

        function syncAndResetApp() {
            // 1. Deep Cleanup (Data only - preserve User Config)
            localStorage.removeItem('panchang_cached_state');
            localStorage.removeItem('panchang_autosave_text');
            localStorage.removeItem('panchang_last_sync_ts');
            sessionStorage.removeItem('panchang_retry_count');

            // 2. Identify Language & Link
            const currentLang = appState.config.language || 'en';
            let link = null;

            if (appState.config.syncLinks && appState.config.syncLinks[currentLang]) {
                link = appState.config.syncLinks[currentLang];
                // Decrypt if needed
                if (appState.config.linksEncrypted) {
                    try {
                        link = LinkSecurity.decrypt(link);
                    } catch (e) {
                        console.error("Link decryption failed during syncAndReset", e);
                        link = null;
                    }
                }
            }

            // 3. Action
            if (link) {
                // Update Live URL to match current language source
                appState.config.liveUrl = link;
                appState.config.syncGitHubUrl = link;
                saveConfigToStorage();

                showToast(`Resetting and syncing ${currentLang.toUpperCase()} data...`);

                // Force Fetch (bypass cache/timer)
                fetchGitHubData(link, true);
            } else {
                // Fallback to standard retry (reloads page) if no source is configured
                showToast("No sync source. Performing full reset...");
                retryAppInitialization();
            }
        }

        function retryAppInitialization() {
            const retryCount = parseInt(sessionStorage.getItem('panchang_retry_count') || '0');

            // Always clear data cache
            localStorage.removeItem('panchang_cached_state');
            localStorage.removeItem('panchang_autosave_text');
            localStorage.removeItem('panchang_last_sync_ts');

            if (retryCount > 0) {
                // 2nd Attempt: Nuclear Option (Reset Config too)
                localStorage.removeItem('panchangConfig');
                sessionStorage.removeItem('panchang_retry_count');
            } else {
                // 1st Attempt: Mark for next time
                sessionStorage.setItem('panchang_retry_count', '1');
            }

            window.location.reload();
        }

        function showRetryUI(loader) {
            if (!loader) return;
            loader.className = "fixed inset-0 z-[200] flex items-center justify-center bg-gray-50/90 backdrop-blur-sm transition-opacity duration-500 p-4";

            loader.innerHTML = `
                <div class="bg-white rounded-3xl shadow-2xl p-6 md:p-8 w-full max-w-sm md:max-w-md text-center border border-gray-100 transform scale-100 transition-all relative" style="position: relative;">
                    <button onclick="document.getElementById('app-loader').remove()" class="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-100" style="position: absolute; top: 12px; right: 12px; z-index: 50;">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                    <div class="w-20 h-20 md:w-24 md:h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-5 md:mb-6 shadow-sm mt-2">
                        <span class="text-red-500 scale-90 md:scale-100 transform transition-transform">${WIFI_ICON_SVG}</span>
                    </div>

                    <h2 class="text-xl md:text-2xl font-extrabold text-gray-900 mb-2 md:mb-3 tracking-tight">Connection Failed</h2>
                    <p class="text-gray-500 mb-6 md:mb-8 text-sm leading-relaxed px-2">
                        We couldn't fetch the latest calendar data. Please check your internet connection and try again.
                    </p>

                    <div class="mt-2 md:mt-4">
                        <button onclick="retryAppInitialization()" class="w-full bg-orange-500 hover:opacity-90 text-white font-bold py-3 px-4 md:px-6 rounded-xl shadow-lg shadow-orange-200 transition-all transform active:scale-95 flex items-center justify-center gap-2 group text-sm md:text-base">
                            <span class="group-hover:rotate-180 transition-transform duration-500 inline-block">${RETRY_ICON_SVG}</span> Retry / Reset App Data
                        </button>
                    </div>
                </div>
            `;
        }

        // New Helper: Verify if Data is actually meaningful (Not just skeleton)
        function hasValidData(state) {
            if (!state || !state.monthsData || state.monthsData.length === 0) return false;
            // If more than 1 month, it is likely valid data
            if (state.monthsData.length > 1) return true;

            // If single month (could be default), check for content
            const m = state.monthsData[0];
            const hasEvents = m.events && m.events.length > 0;
            const hasPanchang = m.panchang && Object.keys(m.panchang).length > 0;

            return hasEvents || hasPanchang;
        }

        function initApp() {
            // 1. Attempt Cache Load
            let dataFound = false;

            // Priority 1: JSON Cache
            // Updated Check: Must have VALID data, not just skeleton
            if (loadStateFromCache() && hasValidData(appState)) {
                console.log("Loaded valid data from JSON Cache");
                dataFound = true;
            }
            // Priority 2: Text Cache
            else {
                const cachedText = localStorage.getItem('panchang_autosave_text');
                if (cachedText) {
                    console.log("Loaded from Text Cache");
                    parseInput(cachedText); // This populates appState

                    // Double check if the parsed text actually produced valid data
                    if (hasValidData(appState)) {
                        dataFound = true;
                    } else {
                        console.log("Text Cache present but data deemed invalid/empty.");
                    }
                }
            }

            // --- EDITOR LOGIC START ---
            if (document.getElementById('editor')) {
                // Editor Mode
                const editor = document.getElementById('editor');
                if (dataFound) {
                    const cachedText = localStorage.getItem('panchang_autosave_text');
                    if (cachedText && editor.value !== cachedText) editor.value = cachedText;
                } else {
                    // Initial parse of default content
                    parseInput(editor.value);
                    dataFound = true; // Editor always has default data
                }

                // Auto-Save Listener
                let timeout;
                editor.addEventListener('input', (e) => {
                    const val = e.target.value;
                    parseInput(val);
                    clearTimeout(timeout);
                    timeout = setTimeout(() => localStorage.setItem('panchang_autosave_text', val), 500);
                });
            }
            // --- EDITOR LOGIC END ---

            // App Mode Logic
            if (window.exportedData) {
                // App Mode
                const editorPanel = document.getElementById('editor-panel');
                if (editorPanel) editorPanel.style.display = 'none';
                const previewPanel = document.getElementById('preview-container');
                if (previewPanel) {
                    previewPanel.classList.remove('md:w-[65%]');
                    previewPanel.classList.add('w-full');
                }

                if (!dataFound) {
                    // Use skeleton but mark as not found so we force sync
                    appState = window.exportedData;

                    // Safety Patch: Ensure recurringDetails exists (Fix for older exports)
                    if (!appState.recurringDetails) appState.recurringDetails = {};
                    if (!appState.details) appState.details = {};
                }
            }

            // Render whatever we have (Data or Skeleton)
            render();

            const loader = document.getElementById('app-loader');

            // 2. Conditional Fetching Logic
            if (appState.config && appState.config.liveUrl) {
                const url = appState.config.liveUrl;
                const isGitHub = url.includes('github') || url.includes('raw.githubusercontent');

                let allowProxy = false;
                // --- EDITOR LOGIC START ---
                // In Editor Mode, we allow Proxy Sync (Google Docs)
                if (document.getElementById('editor')) allowProxy = true;
                // --- EDITOR LOGIC END ---

                // ENFORCE RESTRICTION: In App Mode, ONLY GitHub Direct Sync is allowed.
                if (!allowProxy && !isGitHub) {
                    console.warn("App Mode Restriction: Live Sync Docs (Proxy) is disabled. Ignoring URL.");
                    if (loader) setTimeout(() => loader.remove(), 500);
                    return;
                }

                if (dataFound) {
                    // Scenario A: Data Exists (Show it instantly, remove loader, update in background)
                    if (loader) setTimeout(() => loader.remove(), 500);

                    // Background Sync (respecting timer)
                    setTimeout(() => {
                        console.log("Scenario A: Background Sync...");
                        let shouldForce = false;
                        // --- EDITOR LOGIC START ---
                        if (document.getElementById('editor')) shouldForce = true;
                        // --- EDITOR LOGIC END ---

                        if (isGitHub) fetchGitHubData(url, shouldForce);
                        else fetchLiveDoc(url, shouldForce);
                    }, 2000);
                } else {
                    // Scenario B: No Data (Blank) -> FORCE Sync Immediately & Keep Loader
                    console.log("Scenario B: Cold Start - Force Syncing...");

                    // Force Sync (ignore timer)
                    const promise = isGitHub ? fetchGitHubData(url, true) : fetchLiveDoc(url, true);

                    if (promise && typeof promise.then === 'function') {
                        promise.then(() => {
                            // Check if we actually got data (monthsData should not be empty)
                            if (hasValidData(appState)) {
                                if (loader) loader.remove();
                            } else {
                                // Still no data? Show Retry
                                showRetryUI(loader);
                            }
                        }).catch(() => {
                            showRetryUI(loader);
                        });
                    } else {
                        // If logic fails to produce a promise, remove loader as safety
                        if (loader) loader.remove();
                    }
                }
            } else {
                // No Sync Configured
                if (loader) setTimeout(() => loader.remove(), 500);
            }
        }

        // Start Up
        initApp();
        initCalendarSwipe();

        // --- EDITOR LOGIC START ---
        function handleFileUpload(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = function(e) {
                editor.value = e.target.result;
                parseInput(editor.value);
            };
            reader.readAsText(file);
            event.target.value = '';
        }
        // --- EDITOR LOGIC END ---


        // Load config from localStorage if available
        try {
            const savedConfig = localStorage.getItem('panchangConfig');

            if (savedConfig) {
                // Case A: Returning User (Load Config)
                const parsed = JSON.parse(savedConfig);
                // Merge saved config into defaults
                if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en', location: null, syncLinks: { ...DEFAULT_SYNC_LINKS } };
                appState.config = { ...appState.config, ...parsed };
                if (!appState.config.syncLinks) appState.config.syncLinks = { ...DEFAULT_SYNC_LINKS };

                // If location exists, trigger a silent update to refresh it
                if (appState.config.location) {
                    // Slight delay to allow render to happen first
                    setTimeout(() => getUserLocation(), 2000);
                }
            } else {
                // Case B: First Time User (Set Default EN & Fetch)
                console.log("First time user detected. Setting default to English.");

                if (!appState.config) appState.config = { title: 'Panchang App', logoUrl: null, language: 'en', location: null, syncLinks: { ...DEFAULT_SYNC_LINKS } };

                // 1. Force English
                appState.config.language = 'en';

                // 2. Initial Save
                saveConfigToStorage();

                // 3. Update UI (Language Dropdown)
                const langSelect = document.getElementById('language-select');
                if (langSelect) langSelect.value = 'en';

                // 4. Auto-Fetch English Data
                if (appState.config.syncLinks && appState.config.syncLinks['en']) {
                    let link = appState.config.syncLinks['en'];

                    // Decrypt if needed
                    if (appState.config.linksEncrypted) {
                        try {
                            link = LinkSecurity.decrypt(link);
                        } catch (e) {
                            console.error("Link decryption failed during init", e);
                            link = null;
                        }
                    }

                    if (link) {
                        console.log("Auto-fetching default English dataset...");
                        appState.config.liveUrl = link;
                        appState.config.syncGitHubUrl = link;
                        saveConfigToStorage(); // Save liveUrl

                        // Show Loader Message
                        const loaderTitle = document.querySelector('#app-loader h2');
                        if (loaderTitle) loaderTitle.innerText = "Loading English Calendar...";

                        fetchGitHubData(link, true);
                    }
                }
            }
        } catch (e) {
            console.error("Failed to load config from localStorage", e);
        }

        // Initialization logic moved to initAutoSync()

        function parseInput(text) {
            const lines = text.split('\n');
            let currentBlock = null;
            let parsedMonths = [];
            let parsedRecurring = [];
            let currentMonthObj = null;
            let parsedDetails = {};
            let parsedRecurringDetails = {};
            let parsedManualTithis = {};
            let currentDetailKey = null;
            let parsedSeasonDescs = {};
            let currentSeasonIdx = -1;

            // Preserve existing config (Language, Location, LiveUrl) while parsing
            let tempConfig = appState.config ? JSON.parse(JSON.stringify(appState.config)) : { title: 'Panchang App', logoUrl: null, language: 'en', location: null, syncLinks: { ...DEFAULT_SYNC_LINKS } };
            if (!tempConfig.syncLinks) tempConfig.syncLinks = { ...DEFAULT_SYNC_LINKS };

            // Reset viewDate only if we don't have one, or maybe we want to keep current view?
            // For now, let's keep current view logic separate, but init default month just in case.
            const createMonth = (mIndex, year) => ({ month: mIndex, year: year, events: [], panchang: {} });

            // We don't push a default month immediately. We wait to see if 'calendar' block exists.
            // If parsedMonths ends up empty, we handle that later.

            lines.forEach(line => {
                line = line.trim();
                if (!line) return;
                if (line.startsWith('---')) return;
                if (line.startsWith(':::')) {
                    // Handle both "::: block" and "::: block :::" styles
                    const blockName = line.replace(/:::/g, '').trim().toLowerCase();
                    if (blockName === '') { currentBlock = null; currentDetailKey = null; currentHoroSign = null; }
                    else currentBlock = blockName;
                    return;
                }
                if (currentBlock === 'config') {
                    const titleMatch = line.match(/^@\s*Title\s*:\s*(.+)/i);
                    const logoMatch = line.match(/^@\s*Logo\s*:\s*!\[(.*?)\]\((.*?)\)/i);
                    const langMatch = line.match(/^@\s*Language\s*:\s*(.+)/i);
                    const syncMatch = line.match(/^@\s*Live Sync GitHub trigger in every\s*:\s*(\d+)\s*(minute|hour|day)s?/i);

                    if (titleMatch) tempConfig.title = titleMatch[1].trim();
                    if (logoMatch) tempConfig.logoUrl = logoMatch[2].trim();
                    if (langMatch) tempConfig.language = langMatch[1].trim();
                    if (syncMatch) {
                         const val = parseInt(syncMatch[1]);
                         const unit = syncMatch[2].toLowerCase();
                         let multiplier = 1000 * 60 * 60 * 24; // Default day
                         if (unit.startsWith('minute')) multiplier = 1000 * 60;
                         if (unit.startsWith('hour')) multiplier = 1000 * 60 * 60;
                         tempConfig.syncInterval = val * multiplier;
                    }
                }
                else if (currentBlock === 'calendar') {
                    const headerMatch = line.match(/\+\+\s+(\w+)\s+(\d{4})\s+\+\+/);
                    if (headerMatch) {
                        const mIndex = months.findIndex(m => m.toLowerCase() === headerMatch[1].toLowerCase());
                        if (mIndex !== -1) {
                            const newMonth = createMonth(mIndex, parseInt(headerMatch[2]));
                            parsedMonths.push(newMonth);
                            currentMonthObj = newMonth;
                        }
                    } else {
                        const eventMatch = line.match(/^(\d+)\s+([!^*>])\s+(.+)/);
                        if (eventMatch && currentMonthObj) {
                            const date = parseInt(eventMatch[1]);
                            const symbol = eventMatch[2];
                            let rawText = eventMatch[3];
                            let engPart = rawText;
                            let locPart = "";
                            const nameMatch = rawText.match(/(.*?)\[(.*?)\]/);
                            if (nameMatch) { engPart = nameMatch[1]; locPart = nameMatch[2]; }

                            currentMonthObj.events.push({ date, symbol, engName: engPart.trim(), locName: locPart ? locPart.trim() : "" });
                        }
                    }
                }
                else if (currentBlock === 'recurring') {
                    // Format: DD-MM Symbol Name
                    const recMatch = line.match(/^(\d{1,2})-(\d{1,2})\s+([!^*>])\s+(.+)/);
                    if (recMatch) {
                        const day = parseInt(recMatch[1]);
                        const month = parseInt(recMatch[2]) - 1; // 0-indexed
                        const symbol = recMatch[3];
                        let rawText = recMatch[4];
                        let engPart = rawText;
                        let locPart = "";
                        const nameMatch = rawText.match(/(.*?)\[(.*?)\]/);
                        if (nameMatch) { engPart = nameMatch[1]; locPart = nameMatch[2]; }

                        parsedRecurring.push({ day, month, symbol, engName: engPart.trim(), locName: locPart ? locPart.trim() : "" });
                    }
                }
                else if (currentBlock === 'tithi') {
                    // Matches format "DD-MM-YYYY : TithiName" or "DD-MM : TithiName"
                    const tithiEntry = line.match(/^(\d{1,2}-\d{1,2}(?:-\d{4})?)\s*:\s*(.+)/);
                    if (tithiEntry) {
                        const dateKey = tithiEntry[1];
                        const tValue = tithiEntry[2].trim().toLowerCase();
                        let index = null;

                        // Map common terms to their internal indices
                        if (tValue.includes('purnima')) index = 14;
                        else if (tValue.includes('amavasya')) index = 29;
                        else if (tValue.includes('ekadashi')) index = 10;
                        else index = parseInt(tValue);

                        if (!isNaN(index) && index !== null) {
                            // Save the override using the date string as the key
                            parsedManualTithis[dateKey] = index;
                        }
                    }
                }
                else if (currentBlock === 'details') {
                    const dateHeader = line.match(/^>>\s+(\d{1,2}-\d{1,2}-\d{4})/);
                    const recurringHeader = line.match(/^>>\s+(\d{1,2}-\d{1,2})\s*$/); // Strict end anchor

                    if (dateHeader) {
                        const parts = dateHeader[1].split('-');
                        // Key: YYYY-MonthIndex-Day
                        currentDetailKey = `${parts[2]}-${parseInt(parts[1]) - 1}-${parseInt(parts[0])}`;
                        if (!parsedDetails[currentDetailKey]) parsedDetails[currentDetailKey] = [];
                        parsedDetails[currentDetailKey].push({ tags: [], bodyLines: [], bannerUrl: null, gridBgUrl: null });
                    }
                    else if (recurringHeader) {
                        const parts = recurringHeader[1].split('-');
                        // Key: MonthIndex-Day (e.g. 0-14 for Jan 14)
                        currentDetailKey = `rec-${parseInt(parts[1]) - 1}-${parseInt(parts[0])}`;
                        if (!parsedRecurringDetails[currentDetailKey]) parsedRecurringDetails[currentDetailKey] = [];
                        parsedRecurringDetails[currentDetailKey].push({ tags: [], bodyLines: [], bannerUrl: null, gridBgUrl: null });
                    }
                    else if (currentDetailKey) {
                        // Check where to push
                        let currentDetail;
                        if (currentDetailKey.startsWith('rec-')) {
                            const list = parsedRecurringDetails[currentDetailKey];
                            currentDetail = list[list.length - 1];
                        } else {
                            const list = parsedDetails[currentDetailKey];
                            currentDetail = list[list.length - 1];
                        }

                        const tagMatch = line.match(/^@\s*Tag\s*:\s*(.+)/i);
                        const bannerMatch = line.match(/^!\[Banner\]\((.*?)\)/i);
                        const gridBgMatch = line.match(/^!\[GridBg\]\((.*?)\)/i);
                        const tithiMatch = line.match(/^@\s*Tithi\s*:\s*(.+)/i);

                        if (tagMatch) currentDetail.tags.push(tagMatch[1]);
                        else if (bannerMatch) currentDetail.bannerUrl = bannerMatch[1];
                        else if (gridBgMatch) currentDetail.gridBgUrl = gridBgMatch[1];
                        else if (tithiMatch) {
                            let tVal = tithiMatch[1].trim().toLowerCase();
                            // Map names to indices
                            if (tVal.includes('purnima')) currentDetail.manualTithiIndex = 14;
                            else if (tVal.includes('amavasya')) currentDetail.manualTithiIndex = 29;
                            else if (tVal.includes('ekadashi')) currentDetail.manualTithiIndex = 10;
                            else {
                                const parsedInt = parseInt(tVal);
                                if (!isNaN(parsedInt)) currentDetail.manualTithiIndex = parsedInt;
                            }
                        }
                        else currentDetail.bodyLines.push(line);
                    }
                }
                else if (currentBlock === 'seasons') {
                    const match = line.match(/^@\s*(.+?)\s*:\s*(.*)/);
                    if (match) {
                        const key = match[1].trim().toLowerCase();
                        let val = match[2].trim();

                        let idx = -1;
                        if (key.includes('spring') || key.includes('vasant')) idx = 0;
                        else if (key.includes('summer') || key.includes('grishma')) idx = 1;
                        else if (key.includes('monsoon') || key.includes('varsha')) idx = 2;
                        else if (key.includes('autumn') || key.includes('sharad')) idx = 3;
                        else if (key.includes('pre-winter') || key.includes('hemant')) idx = 4;
                        else if (key.includes('winter') || key.includes('shishir')) idx = 5;

                        if (idx !== -1) {
                            currentSeasonIdx = idx;
                            parsedSeasonDescs[idx] = [];
                            if (val) parsedSeasonDescs[idx].push(val);
                        } else {
                            currentSeasonIdx = -1;
                        }
                    } else if (currentSeasonIdx !== -1 && line.trim() !== '') {
                        parsedSeasonDescs[currentSeasonIdx].push(line.trim());
                    }
                }
                else if (currentBlock === 'panchang') {
                    const panMatch = line.match(/^@\s+(.+?)\s*:\s*(.+)/);
                    if (panMatch && currentMonthObj) currentMonthObj.panchang[panMatch[1]] = panMatch[2];
                }
            });

            // If parsedMonths is empty (no explicit calendar block), verify if we need a default one?
            // Actually, if infinite nav is enabled, we don't *need* any explicit months.

            appState.monthsData = parsedMonths;
            appState.recurringEvents = parsedRecurring;
            appState.recurringDetails = parsedRecurringDetails;
            appState.manualTithis = parsedManualTithis;
            appState.details = parsedDetails;
            appState.customSeasonDescriptions = parsedSeasonDescs;
            appState.config = tempConfig;

            // Update UI for language
            const langSelect = document.getElementById('language-select');
            if (langSelect && appState.config.language) {
                langSelect.value = appState.config.language;
            }

            findTodayIndex();

            // Set viewDate if not already meaningful (e.g. initial load)
            // If we have explicit months, jump to first one. Else use Today.
            if (appState.monthsData.length > 0) {
                // If we haven't set viewDate logic before, or if we want to reset on parse?
                // Standard behavior: Reset to first available month in data, OR today if present.
                if (appState.todayIndex !== -1) {
                    const d = appState.monthsData[appState.todayIndex];
                    appState.viewDate = { month: d.month, year: d.year };
                    appState.activeMonthIndex = appState.todayIndex;
                } else {
                    const d = appState.monthsData[0];
                    appState.viewDate = { month: d.month, year: d.year };
                    appState.activeMonthIndex = 0;
                }
            } else {
                // No data? Use today.
                const today = new Date();
                appState.viewDate = { month: today.getMonth(), year: today.getFullYear() };
                appState.activeMonthIndex = -1;
            }

            render();
        }

        function findTodayIndex() {
            const today = new Date();
            appState.todayIndex = appState.monthsData.findIndex(d => d.month === today.getMonth() && d.year === today.getFullYear());
        }

        function getEffectiveMonthData(month, year) {
            // 1. Try to find explicit data
            const explicit = appState.monthsData.find(m => m.month === month && m.year === year);

            // 2. Base Object (Clone or Create)
            let result = explicit ? JSON.parse(JSON.stringify(explicit)) : {
                month: month,
                year: year,
                events: [],
                panchang: {}
            };

            // 3. Merge Recurring Events
            if (appState.recurringEvents && appState.recurringEvents.length > 0) {
                const recurring = appState.recurringEvents.filter(e => e.month === month);

                recurring.forEach(rec => {
                    // Check validity (e.g. Feb 29 in non-leap year)
                    const daysInMonth = new Date(year, month + 1, 0).getDate();
                    if (rec.day > daysInMonth) return;

                    // Append to events
                    // Optional: Avoid duplicates if exact same name exists on same day
                    const exists = result.events.some(e => e.date === rec.day && e.engName === rec.engName);
                    if (!exists) {
                        result.events.push({
                            date: rec.day,
                            symbol: rec.symbol,
                            engName: rec.engName,
                            locName: rec.locName
                        });
                    }
                });
            }

            // Sort events by date
            result.events.sort((a,b) => a.date - b.date);

            return result;
        }

        function changeMonth(direction) {
            let { month, year } = appState.viewDate;
            month += direction;

            // Handle Year Rollover
            if (month > 11) {
                month = 0;
                year++;
            } else if (month < 0) {
                month = 11;
                year--;
            }

            appState.viewDate = { month, year };

            // Update activeMonthIndex just in case legacy logic relies on it (e.g. findTodayIndex results)
            appState.activeMonthIndex = appState.monthsData.findIndex(m => m.month === month && m.year === year);

            render();
        }

        function changeYear(offset) {
            let { month, year } = appState.viewDate;
            year += offset;
            appState.viewDate = { month, year };

            // Sync activeMonthIndex if possible
            appState.activeMonthIndex = appState.monthsData.findIndex(m => m.month === month && m.year === year);

            render();
        }

        function jumpToToday() {
            const today = new Date();
            appState.viewDate = { month: today.getMonth(), year: today.getFullYear() };
            appState.activeMonthIndex = appState.monthsData.findIndex(m => m.month === today.getMonth() && m.year === today.getFullYear());
            render();
        }
        function resolveImageUrls(text) {
            return text.replace(/local-image:\/\/[^\)]+/g, (match) => appState.images[match] || match);
        }

        function render() {
            // Use viewDate to generate data on the fly (Infinite Navigation)
            // Fallback to activeMonthIndex if viewDate is missing (Legacy safety)
            let month, year;
            if (appState.viewDate) {
                month = appState.viewDate.month;
                year = appState.viewDate.year;
            } else if (appState.activeMonthIndex !== -1 && appState.monthsData[appState.activeMonthIndex]) {
                month = appState.monthsData[appState.activeMonthIndex].month;
                year = appState.monthsData[appState.activeMonthIndex].year;
            } else {
                // Total fallback
                const now = new Date();
                month = now.getMonth();
                year = now.getFullYear();
            }

            const currentData = getEffectiveMonthData(month, year);
            // if (!currentData) return; // Should never happen with getEffectiveMonthData

            // Ensure title is clean without extra badges
            if (appState.config.title) {
                document.getElementById('app-title').innerText = appState.config.title;
            }

            // Toggle Views
            const monthContainer = document.getElementById('month-view-container');
            const yearContainer = document.getElementById('year-view-container');
            const viewBtnText = document.getElementById('view-btn-text');
            const viewBtnIcon = document.getElementById('view-btn-icon');

            if (appState.view === 'year') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.remove('hidden');
                if(viewBtnText) viewBtnText.innerText = "Month View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
                renderYearView();
            } else {
                if(monthContainer) monthContainer.classList.remove('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Year View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
            }

            const logoContainer = document.getElementById('logo-container');
            if (appState.config.logoUrl) {
                const src = resolveImageUrls(appState.config.logoUrl);
                logoContainer.innerHTML = `<img id="app-logo-img" src="${src}" alt="Logo" class="w-12 h-12 rounded-full object-cover border border-white/10 shadow-lg">`;
            } else {
                logoContainer.innerHTML = `
    <!-- COMPONENT START -->
    <div class="coin-wrapper ripple-effect">
        <div class="coin">
            <span class="om-symbol">ॐ</span>
        </div>
    </div>
    <!-- COMPONENT END -->`;
            }

            // Updated for new Header
            document.getElementById('cal-month').innerText = months[currentData.month];
            document.getElementById('cal-year').innerText = currentData.year;

            const indianMonthEl = document.getElementById('cal-indian-month');
            const currentLang = appState.config.language || 'en';
            const currentLangData = langData[currentLang];

            if (currentLangData && currentLangData.indianMonths) {
                indianMonthEl.classList.remove('hidden');
                indianMonthEl.innerText = currentLangData.indianMonths[currentData.month];
            } else {
                indianMonthEl.classList.add('hidden');
            }

            const btnToday = document.getElementById('btn-today');
            const realToday = new Date();
            const isViewingToday = (month === realToday.getMonth() && year === realToday.getFullYear());

            if (!isViewingToday) {
                btnToday.classList.remove('hidden'); btnToday.classList.add('flex');
            } else {
                btnToday.classList.add('hidden'); btnToday.classList.remove('flex');
            }

            renderCalendarGrid(currentData);
            renderPanchang(currentData);
            renderFestivals(currentData);
            renderMonthBanner(currentData);

            // --- NEW LOGIC: Hide/Show Sections based on Config ---
            const secs = appState.config.sections || { festivals: true, panchang: true };

            const secFest = document.getElementById('sec-festivals');
            const secPan = document.getElementById('sec-panchang');

            if (secFest) secFest.style.display = secs.festivals ? 'block' : 'none';
            if (secPan) secPan.style.display = secs.panchang ? 'block' : 'none';

            // Step 1: Cache the state
            saveStateToCache();
        }

        function dismissBanner(e) {
            if (e) e.stopPropagation();
            isBannerDismissed = true;
            stopBannerAutoPlay();
            const container = document.getElementById('month-banner-container');
            if (container) container.classList.add('hidden');
        }

        function renderMonthBanner(data) {
            const container = document.getElementById('month-banner-container');

            if (isBannerDismissed) {
                if (container) container.classList.add('hidden');
                return;
            }

            const slidesContainer = document.getElementById('banner-slides');
            const dotsContainer = document.getElementById('banner-dots');

            // Collect banners for the current month
            const daysInMonth = new Date(data.year, data.month + 1, 0).getDate();
            const banners = [];

            for (let d = 1; d <= daysInMonth; d++) {
                const dateKey = `${data.year}-${data.month}-${d}`;
                const recKey = `rec-${data.month}-${d}`;

                let details = appState.details[dateKey]; // specific
                if (!details) details = appState.recurringDetails[recKey]; // fallback

                if (details && Array.isArray(details)) {
                     details.forEach(detail => {
                         if (detail.bannerUrl) {
                             // Find event name if possible for caption
                             const dayEvents = data.events.filter(e => e.date === d);
                             let caption = '';
                             if (dayEvents.length > 0) {
                                 caption = dayEvents[0].engName;
                             }

                             banners.push({
                                 url: resolveImageUrls(detail.bannerUrl),
                                 date: d,
                                 caption: caption
                             });
                         }
                     });
                } else if (details && details.bannerUrl) {
                    // Fallback for old object structure if applicable
                     const dayEvents = data.events.filter(e => e.date === d);
                     let caption = '';
                     if (dayEvents.length > 0) caption = dayEvents[0].engName;
                     banners.push({ url: resolveImageUrls(details.bannerUrl), date: d, caption: caption });
                }
            }

            // Optimization: If banners list is same, don't rebuild DOM
            const newHash = JSON.stringify(banners);
            if (newHash === currentBannerDataHash) {
                if (banners.length === 0) {
                     container.classList.add('hidden');
                } else {
                     container.classList.remove('hidden');
                }
                return;
            }
            currentBannerDataHash = newHash;

            // Clear previous
            slidesContainer.innerHTML = '';
            dotsContainer.innerHTML = '';
            clearInterval(bannerInterval);
            bannerCurrentIndex = 0;

            if (banners.length === 0) {
                container.classList.add('hidden');
                return;
            }

            container.classList.remove('hidden');
            slidesContainer.style.transform = `translateX(0)`;

            // Render slides
            banners.forEach((banner, index) => {
                const slide = document.createElement('div');
                slide.className = 'w-full flex-shrink-0 h-full relative cursor-pointer';
                slide.onclick = () => openDayModal(banner.date, data); // Click banner to open day

                slide.innerHTML = `
                    <img src="${banner.url}" class="w-full h-full object-cover">
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 md:p-6 text-white pt-10">
                        <div class="font-bold text-lg md:text-2xl drop-shadow-sm">${banner.caption}</div>
                        <div class="text-xs md:text-sm opacity-90 font-semibold uppercase tracking-wide bg-black/30 inline-block px-2 py-0.5 rounded mt-1 backdrop-blur-sm border border-white/20">${months[data.month]} ${banner.date}</div>
                    </div>
                `;
                slidesContainer.appendChild(slide);

                // Dot
                const dot = document.createElement('button');
                dot.className = `w-2 h-2 rounded-full transition-all duration-300 ${index === 0 ? 'bg-white w-6' : 'bg-white/50 hover:bg-white/80'}`;
                dot.onclick = (e) => { e.stopPropagation(); goToBannerSlide(index, banners.length); };
                dotsContainer.appendChild(dot);
            });

            // Initialize Swipe & Auto-play
            startBannerAutoPlay(banners.length);

            // Swipe support (Touch)
            let touchStartX = 0;
            let touchEndX = 0;

            container.ontouchstart = (e) => {
                touchStartX = e.changedTouches[0].screenX;
                stopBannerAutoPlay();
            };

            container.ontouchend = (e) => {
                touchEndX = e.changedTouches[0].screenX;
                handleBannerSwipe(banners.length, touchStartX, touchEndX);
                startBannerAutoPlay(banners.length);
            };

            // Arrow Listeners
            const prevBtn = document.getElementById('banner-prev');
            const nextBtn = document.getElementById('banner-next');

            // Cloning to remove old event listeners if any (though we rebuild the DOM logic, buttons are static)
            // Actually buttons are static in HTML, so we should assign onclick carefully.
            // Since this function runs often, we are reassigning onclick.

            prevBtn.onclick = (e) => {
                e.stopPropagation();
                stopBannerAutoPlay();
                prevBannerSlide(banners.length);
                startBannerAutoPlay(banners.length);
            };
            nextBtn.onclick = (e) => {
                e.stopPropagation();
                stopBannerAutoPlay();
                nextBannerSlide(banners.length);
                startBannerAutoPlay(banners.length);
            };
        }

        function updateBannerSlidePosition() {
            const slidesContainer = document.getElementById('banner-slides');
            slidesContainer.style.transform = `translateX(-${bannerCurrentIndex * 100}%)`;

            // Update dots
            const dots = document.getElementById('banner-dots').children;
            Array.from(dots).forEach((dot, idx) => {
                if (idx === bannerCurrentIndex) {
                    dot.className = 'w-2 h-2 rounded-full bg-white w-6 transition-all duration-300';
                } else {
                    dot.className = 'w-2 h-2 rounded-full bg-white/50 transition-all duration-300 hover:bg-white/80';
                }
            });
        }

        function goToBannerSlide(index, total) {
            bannerCurrentIndex = index;
            updateBannerSlidePosition();
            stopBannerAutoPlay();
            startBannerAutoPlay(total);
        }

        function nextBannerSlide(total) {
            bannerCurrentIndex = (bannerCurrentIndex + 1) % total;
            updateBannerSlidePosition();
        }

        function prevBannerSlide(total) {
            bannerCurrentIndex = (bannerCurrentIndex - 1 + total) % total;
            updateBannerSlidePosition();
        }

        function startBannerAutoPlay(total) {
            clearInterval(bannerInterval);
            if(total > 1) {
                bannerInterval = setInterval(() => {
                    nextBannerSlide(total);
                }, 4000);
            }
        }

        function stopBannerAutoPlay() {
            clearInterval(bannerInterval);
        }

        function handleBannerSwipe(total, startX, endX) {
            if (endX < startX - 50) nextBannerSlide(total);
            if (endX > startX + 50) prevBannerSlide(total);
        }

        // --- CALENDAR SWIPE LOGIC ---
        let calTouchStartX = 0;
        let calTouchStartY = 0;

        function initCalendarSwipe() {
            const el = document.getElementById('calendar-swipe-area');
            if(!el) return;

            el.addEventListener('touchstart', (e) => {
                calTouchStartX = e.changedTouches[0].screenX;
                calTouchStartY = e.changedTouches[0].screenY;
            }, {passive: true});

            el.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].screenX;
                const endY = e.changedTouches[0].screenY;
                handleCalendarSwipe(calTouchStartX, calTouchStartY, endX, endY);
            }, {passive: true});
        }

        function handleCalendarSwipe(startX, startY, endX, endY) {
            const diffX = endX - startX;
            const diffY = endY - startY;

            // Thresholds
            const minSwipeDistance = 50;
            const maxVerticalVariance = 50; // Strict vertical limit to prevent scroll interference

            if (Math.abs(diffX) > minSwipeDistance && Math.abs(diffY) < maxVerticalVariance) {
                if (diffX < 0) {
                    // Swipe Left -> Next Month
                    changeMonth(1);
                } else {
                    // Swipe Right -> Prev Month
                    changeMonth(-1);
                }
            }
        }

        function toggleSeasonDescription(btn, event) {
            event.stopPropagation();
            const card = btn.closest('.season-ui-card');
            if (!card) return;

            const desc = card.querySelector('.season-desc-container');
            const icon = btn.querySelector('.season-toggle-icon') || btn.querySelector('i');

            if (desc) {
                desc.classList.toggle('hidden');
                if (icon) {
                    if (desc.classList.contains('hidden')) {
                         icon.classList.remove('fa-chevron-up');
                         icon.classList.add('fa-chevron-down');
                    } else {
                         icon.classList.remove('fa-chevron-down');
                         icon.classList.add('fa-chevron-up');
                    }
                }
            }
        }

        function toggleSmartView() {
            if (appState.view === 'year') {
                toggleView('month');
            } else {
                toggleView('year');
            }
        }

        function toggleView(viewName) {
            appState.view = viewName;
            render();
        }

        function isLeapYear(year) {
            return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        }

        function renderYearView() {
            const grid = document.getElementById('year-grid');
            if (!grid) return;
            grid.innerHTML = '';

            const todayDate = new Date();
            const currentRealMonth = todayDate.getMonth();
            const currentRealYear = todayDate.getFullYear();
            const currentRealDay = todayDate.getDate();

            let year = currentRealYear;
            // Use year from current viewDate if available
            if (appState.viewDate) {
                year = appState.viewDate.year;
            } else if (appState.monthsData && appState.monthsData.length > 0 && appState.activeMonthIndex !== -1) {
                year = appState.monthsData[appState.activeMonthIndex].year;
            }

            document.getElementById('year-view-title').innerText = `${year} Year View`;

            // LEAP YEAR BADGE LOGIC
            const headerContainer = document.getElementById('year-view-header');
            let existingBadge = document.getElementById('leap-year-badge');

            if (isLeapYear(year)) {
                if (!existingBadge && headerContainer) {
                    const badge = document.createElement('span');
                    badge.id = 'leap-year-badge';
                    badge.innerText = 'LEAP YEAR';
                    badge.className = 'mt-1 px-3 py-0.5 rounded-full border border-purple-200 bg-purple-50 text-purple-600 text-[10px] font-bold tracking-widest uppercase shadow-sm transition-all duration-300';
                    headerContainer.appendChild(badge);
                }
            } else {
                if (existingBadge) {
                    existingBadge.remove();
                }
            }

            // Generate 12 months
            for (let m = 0; m < 12; m++) {
                // Use getEffectiveMonthData to include recurring events
                const monthData = getEffectiveMonthData(m, year);
                const isCurrentMonth = (m === currentRealMonth && year === currentRealYear);

                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl border border-gray-100 hover:border-orange-300 shadow-sm p-4 hover:shadow-lg transition-all relative overflow-hidden group cursor-pointer hover:-translate-y-1";
                card.onclick = () => {
                    // Navigate to this month
                    // Update viewDate
                    appState.viewDate = { month: m, year: year };
                    // Try to sync activeMonthIndex if exists
                    appState.activeMonthIndex = appState.monthsData.findIndex(d => d.month === m && d.year === year);
                    toggleView('month');
                };

                // Badge for Event Count
                let eventCount = 0;
                if (monthData) {
                    eventCount = monthData.events.filter(e => ['!','*','^'].includes(e.symbol)).length;
                }

                // Header Section
                const headerDiv = document.createElement('div');
                headerDiv.className = "flex items-center justify-between gap-2 mb-3 px-1";

                const title = document.createElement('h3');
                title.className = "font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors";
                title.innerText = months[m];

                headerDiv.appendChild(title);

                if (eventCount > 0) {
                    const badge = document.createElement('span');
                    badge.className = "bg-orange-100 text-orange-700 text-[9px] font-bold px-2 py-0.5 rounded-full";
                    badge.innerText = `${eventCount} Events`;
                    headerDiv.appendChild(badge);
                }

                card.appendChild(headerDiv);

                const daysContainer = document.createElement('div');
                daysContainer.className = "grid grid-cols-7 gap-0.5 text-center mb-2";
                daysContainer.innerHTML = `
                    <div class="text-[9px] text-red-500 font-bold mb-1">S</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">M</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">T</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">W</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">T</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">F</div>
                    <div class="text-[9px] text-gray-400 font-bold mb-1">S</div>
                `;

                const firstDay = new Date(year, m, 1).getDay();
                const daysInMonth = new Date(year, m + 1, 0).getDate();

                // Empty slots
                for (let i = 0; i < firstDay; i++) {
                    daysContainer.innerHTML += `<div></div>`;
                }

                // Days
                for (let d = 1; d <= daysInMonth; d++) {
                    let containerClass = "w-6 h-6 flex flex-col items-center justify-center text-[9px] mx-auto rounded-full transition-all duration-200";
                    let textClass = "text-gray-600 font-medium";
                    let bgClass = "hover:bg-gray-50";
                    let dotHtml = "";

                    const isSunday = new Date(year, m, d).getDay() === 0;
                    const isToday = (isCurrentMonth && d === currentRealDay);

                    if (isSunday) textClass = "text-red-500 font-medium";

                    if (monthData) {
                        const ev = monthData.events.find(e => e.date === d);
                        if (ev) {
                            textClass = "text-gray-900 font-bold"; // Bold for event days
                            let dotColor = "bg-gray-400";
                            if (ev.symbol === '!') dotColor = "bg-red-500";
                            else if (ev.symbol === '^') dotColor = "bg-green-500";
                            else if (ev.symbol === '*') dotColor = "bg-blue-500";

                            dotHtml = `<div class="w-1 h-1 rounded-full ${dotColor} mt-0.5"></div>`;
                        }
                    }

                    if (isToday) {
                        bgClass = "bg-orange-500 shadow-md transform scale-110";
                        textClass = "text-white font-bold";
                        dotHtml = ""; // Hide dot on Today
                    }

                    daysContainer.innerHTML += `<div class="${containerClass} ${bgClass} ${textClass}">${d}${dotHtml}</div>`;
                }

                card.appendChild(daysContainer);

                // Smart Reveal Footer
                if (isCurrentMonth && monthData) {
                    let footerHtml = '';
                    const todayEvent = monthData.events.find(e => e.date === currentRealDay && ['!','*','^'].includes(e.symbol));

                    if (todayEvent) {
                         const locText = todayEvent.locName ? ` <span class="font-oriya opacity-80 font-normal">(${todayEvent.locName})</span>` : '';
                         footerHtml = `<div class="mt-2 text-[9px] text-center truncate border-t border-gray-50 pt-1">
                                         <span class="text-orange-600 font-bold animate-pulse">Today:</span> <span class="text-gray-700 font-semibold">${todayEvent.engName}${locText}</span>
                                       </div>`;
                    } else {
                         const nextEvent = monthData.events
                             .filter(e => e.date > currentRealDay && ['!','*','^'].includes(e.symbol))
                             .sort((a,b) => a.date - b.date)[0];

                         if (nextEvent) {
                              const locText = nextEvent.locName ? ` <span class="font-oriya opacity-80 font-normal">(${nextEvent.locName})</span>` : '';
                              footerHtml = `<div class="mt-2 text-[9px] text-center truncate border-t border-gray-50 pt-1">
                                              <span class="text-gray-400 font-bold">Next:</span> <span class="text-gray-600">${nextEvent.engName}${locText}</span>
                                            </div>`;
                         }
                    }

                    if (footerHtml) {
                        card.innerHTML += footerHtml;
                    }
                }

                grid.appendChild(card);
            }
        }

function renderCalendarGrid(data) {
    const grid = document.getElementById('calendar-grid');
    const headerRow = document.getElementById('grid-header');
    const currentLang = appState.config.language || 'en';
    const localizedDays = langData[currentLang] ? langData[currentLang].days : langData.en.days;
    const englishDays = langData.en.days;

    // --- 1. RENDER HEADER (Responsive Text Sizing) ---
    headerRow.innerHTML = '';
    localizedDays.forEach((day, index) => {
        const isSunday = index === 0;
        const engDay = englishDays[index].substring(0, 3).toUpperCase();

        // Conditional Font Size for Tamil (Prevent Overlap)
        const localTextSize = (currentLang === 'ta') ? 'text-[9px] md:text-[11px]' : 'text-xs md:text-sm';

        const div = document.createElement('div');
        div.className = `w-full min-w-[3rem] md:min-w-[4rem] py-3 flex flex-col items-center justify-center text-center`;
        div.innerHTML = `
            <span class="text-sm md:text-base font-bold text-gray-700 uppercase tracking-wider ${isSunday ? 'text-red-500' : ''}">${engDay}</span>
            ${currentLang !== 'en' ? `<span class="${localTextSize} font-bold text-red-600 font-oriya mt-0.5">${day}</span>` : ''}
        `;
        headerRow.appendChild(div);
    });

    // --- 2. RENDER GRID CELLS ---
    grid.innerHTML = '';
    const firstDay = new Date(data.year, data.month, 1).getDay();
    const daysInMonth = new Date(data.year, data.month + 1, 0).getDate();
    const today = new Date();

    // Empty slots
    for (let i = 0; i < firstDay; i++) {
        const cell = document.createElement('div');
        cell.className = 'bg-transparent'; // Invisible placeholder
        grid.appendChild(cell);
    }

    // Days
    let lastTithiIndex = -1;
    for (let d = 1; d <= daysInMonth; d++) {
        const isSunday = new Date(data.year, data.month, d).getDay() === 0;
        const isToday = (d === today.getDate() && data.month === today.getMonth() && data.year === today.getFullYear());
        const dateKey = `${data.year}-${data.month}-${d}`;
        const dateObj = new Date(data.year, data.month, d);

        // Calculations
        const astro = calculateTithi(dateObj);

        // --- DUPLICATE & KSHAYA FIXES ---
        let effectiveTithiIndex = astro.index;

        // 1. Amavasya Duplicate Fix (Hide 2nd Amavasya)
        if (astro.index === 29 && lastTithiIndex === 29) {
            effectiveTithiIndex = -1;
        }

        // 2. Kshaya Ekadashi Fix (If skipped, force visual on Dwadashi)
        // Checks: Jump from 9->11 (Shukla) or 24->26 (Krishna)
        if ((astro.index === 11 && lastTithiIndex === 9) || (astro.index === 26 && lastTithiIndex === 24)) {
            effectiveTithiIndex = astro.index - 1; // Force 10 or 25 (Ekadashi)
        }

        // 3. Double Ekadashi Fix (Hide First Day)
        // Check if current is Ekadashi (10 or 25)
        if (effectiveTithiIndex === 10 || effectiveTithiIndex === 25) {
            // Look ahead to next day
            if (d < daysInMonth) {
                const nextDateObj = new Date(data.year, data.month, d + 1);
                const nextAstro = calculateTithi(nextDateObj);
                if (nextAstro.index === effectiveTithiIndex) {
                    effectiveTithiIndex = -1; // Hide icon on first day
                }
            }
        }

        // 4. Double Purnima Fix (Hide Second Day)
        if (astro.index === 14 && lastTithiIndex === 14) {
            effectiveTithiIndex = -1;
        }

        // 5. Kshaya Purnima Fix (Skipped 14, Force on 13)
        // Check if current is Chaturdashi (13)
        if (effectiveTithiIndex === 13) {
            // Look ahead to next day to see if it jumps to Pratipada (15)
            if (d < daysInMonth) {
                const nextDateObj = new Date(data.year, data.month, d + 1);
                const nextAstro = calculateTithi(nextDateObj);
                if (nextAstro.index === 15) {
                    effectiveTithiIndex = 14; // Force Purnima
                }
            }
        }

        // Update tracker
        lastTithiIndex = astro.index;
        // -------------------------------

        const dayEvents = data.events.filter(e => e.date === d);

        // ==========================================
        // CONFIG 1: MOBILE STYLES (ORIGINAL)
        // ==========================================

        // 1. Mobile Background Logic (Exact Original Priority)
        let mobileBgClass = 'bg-white';
        if (isSunday) mobileBgClass = 'bg-red-50'; // Base Sunday color

        if (dayEvents.length > 0) {
            // Override Sunday if event exists
            if (dayEvents.some(e => e.symbol === '!')) mobileBgClass = 'bg-red-100';      // Festival
            else if (dayEvents.some(e => e.symbol === '^')) mobileBgClass = 'bg-green-100'; // Auspicious
            else if (dayEvents.some(e => e.symbol === '*')) mobileBgClass = 'bg-blue-100';  // Holiday
            else if (dayEvents.some(e => e.symbol === '>')) mobileBgClass = 'bg-gray-100';  // Other
        }

        // Today overrides everything on Mobile
        if (isToday) {
            mobileBgClass = 'bg-deep-red';
        }

        // 2. Mobile Tithi Icons (Exact Original SVGs)
        let originalIconHtml = '';
        if (effectiveTithiIndex === 14) originalIconHtml = TITHI_ICONS.purnima;
        else if (effectiveTithiIndex === 29) originalIconHtml = TITHI_ICONS.amavasya;
        else if (effectiveTithiIndex === 10) originalIconHtml = TITHI_ICONS.shukla_ekadashi;
        else if (effectiveTithiIndex === 25) originalIconHtml = TITHI_ICONS.ekadashi;

        // Wrap for mobile positioning
        if (originalIconHtml) {
             // Inject the class directly into the SVG string if needed, or wrap it
             // TITHI_ICONS strings usually contain absolute positioning styles inline.
             // We ensure they appear only on mobile by wrapping in a div.
             originalIconHtml = `<div class="mobile-tithi-icon md:hidden">${originalIconHtml}</div>`;
        }

        // ==========================================
        // CONFIG 2: DESKTOP STYLES (REFERENCE)
        // ==========================================

        // Helper: Get Color for Tithi
        const getTithiDotColor = (idx, pakshaName) => {
            if (idx === 10 || idx === 25) return "bg-purple-500";
            if (idx === 14) return "bg-orange-500";
            if (idx === 29) return "bg-rose-500";
            if (idx < 15) return "bg-green-400"; // Shukla Paksha
            return "bg-blue-400"; // Krishna Paksha
        };

        // --- NEW: Paksha Badge Logic ---
        const isShukla = astro.index < 15;
        const pakshaColor = isShukla
            ? "bg-amber-50 text-amber-700 border border-amber-200"
            : "bg-indigo-50 text-indigo-700 border border-indigo-200";

        const pakshaIcon = isShukla
            ? '<i class="fa-solid fa-sun text-[9px] text-amber-500"></i>'
            : '<i class="fa-solid fa-moon text-[9px] text-indigo-500"></i>';

        const pakshaLabel = astro.paksha.split(' ')[0]; // First word (Shukla/Krishna)

        const pakshaBadgeHtml = `
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide ${pakshaColor}">
                ${pakshaIcon} ${pakshaLabel}
            </span>
        `;

        // Desktop Pills
        let desktopPills = '';
        dayEvents.slice(0, 2).forEach(ev => {
            let pillColor = "bg-gray-100 text-gray-600";
            if(ev.symbol === '!') pillColor = "bg-red-50 text-red-800";
            else if(ev.symbol === '*') pillColor = "bg-blue-50 text-blue-700";
            else if(ev.symbol === '^') pillColor = "bg-orange-100 text-orange-800";
            desktopPills += `<span class="event-pill ${pillColor}">${ev.engName}</span>`;
        });

        // ==========================================
        // CONSTRUCT HTML
        // ==========================================
        const cell = document.createElement('div');

        // CONTAINER CLASSES MERGE:
        // Mobile: Uses 'mobileBgClass', 'min-h-[4rem]', 'p-1' (Compact)
        // Desktop: Uses 'md:bg-white', 'md:min-h-[140px]', 'md:p-3' (Spacious)
        let containerClasses = `grid-cell relative border rounded-lg md:rounded-xl p-1 md:p-3 cursor-pointer transition-all hover:shadow-md ${mobileBgClass} md:bg-white`;

        // BORDER COLOR MERGE:
        // Mobile: Orange Border (Original)
        // Desktop: Green Border (Reference)
        if (isToday) containerClasses += " border-orange-400 md:border-green-500 shadow-md today-glow";
        else containerClasses += " border-gray-200";

        // Height classes match Original (mobile) vs Reference (desktop)
        containerClasses += " min-h-[4rem] md:min-h-[140px] h-auto flex flex-col overflow-hidden group";

        cell.className = containerClasses;
        cell.onclick = () => openDayModal(d, data);

        // --- 1. MOBILE INNER HTML (Matches Original EXACTLY) ---
        // text-lg, centered, absolute icon
        const mobileView = `
            <div class="md:hidden w-full h-full flex flex-col items-center justify-center cell-content-relative">
                <span class="text-lg font-bold leading-none ${isToday ? 'text-white' : (isSunday ? 'text-deepred' : 'text-gray-700')}">
                    ${toNativeNum(d, currentLang)}
                </span>
                ${originalIconHtml}
            </div>
        `;

        // --- 2. DESKTOP INNER HTML ---
        // Render Single Tithi (Primary)
        const dotColor = getTithiDotColor(astro.index, astro.paksha);
        const tithiRows = `
            <div class="flex items-center gap-2 pl-0.5 mt-1">
                 <div class="w-1.5 h-1.5 rounded-full ${dotColor} flex-shrink-0 shadow-sm"></div>
                 <div class="text-sm font-extrabold text-gray-900 truncate leading-tight tracking-tight">
                    ${astro.tithi}
                 </div>
            </div>
        `;

        const desktopView = `
            <div class="hidden md:flex flex-col h-full justify-between w-full">
                ${isToday ? '<div class="today-badge">TODAY</div>' : ''}

                <div class="flex justify-between items-start">
                    <span class="text-2xl font-bold text-gray-800 ${isSunday ? 'text-red-600' : ''}">
                        ${toNativeNum(d, currentLang)}
                    </span>
                     <span class="w-4 h-4 opacity-80 block mt-2 drop-shadow-sm">
                        ${getMoonPhaseIcon((astro.index + 1) / 30)}
                    </span>
                </div>

                <div class="mt-2 flex flex-col gap-1">
                    <div class="flex items-center mb-0.5">
                        ${pakshaBadgeHtml}
                    </div>

                    ${tithiRows}

                    <div class="text-[11px] text-green-600 font-bold pl-3 truncate leading-tight">
                        ${astro.nakshatra}
                    </div>

                    <div class="flex flex-wrap gap-1 mt-1.5">
                        ${desktopPills}
                    </div>
                </div>
            </div>
        `;

        cell.innerHTML = mobileView + desktopView;
        grid.appendChild(cell);
    }
}

        // --- NEW HELPER: Calculate Rahu Kalam, Yamaganda, Abhijit ---
        function getSpecialTimes(date, sunrise, sunset) {
            if (!sunrise || !sunset) return null;

            const dayOfWeek = date.getDay(); // 0 = Sunday
            const duration = (sunset - sunrise); // Duration in ms
            const part = duration / 8; // Dividing day into 8 parts (Traditional method)

            // Standard Vedic Slots (0-indexed parts of the day)
            // Sun=7, Mon=1, Tue=6, Wed=4, Thu=5, Fri=3, Sat=2
            const rahuSlots = [7, 1, 6, 4, 5, 3, 2];
            // Sun=4, Mon=3, Tue=2, Wed=1, Thu=0, Fri=6, Sat=5
            const yamaSlots = [4, 3, 2, 1, 0, 6, 5];

            const formatTime = (ms) => {
                const d = new Date(ms);
                return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            };

            // Calculate Rahu Kalam
            const rahuStart = new Date(sunrise.getTime() + (rahuSlots[dayOfWeek] * part));
            const rahuEnd = new Date(rahuStart.getTime() + part);

            // Calculate Yamaganda
            const yamaStart = new Date(sunrise.getTime() + (yamaSlots[dayOfWeek] * part));
            const yamaEnd = new Date(yamaStart.getTime() + part);

            // Calculate Abhijit Muhurat (Midday - 24 mins to Midday + 24 mins approx)
            // More precise: 8th Muhurat of the 15 Muhurats in the day.
            const dayMid = new Date(sunrise.getTime() + (duration / 2));
            const abhijitStart = new Date(dayMid.getTime() - (24 * 60 * 1000));
            const abhijitEnd = new Date(dayMid.getTime() + (24 * 60 * 1000));

            // Skip Abhijit on Wednesday (generally considered bad)
            const hasAbhijit = dayOfWeek !== 3;

            return {
                rahu: `${formatTime(rahuStart)} - ${formatTime(rahuEnd)}`,
                yama: `${formatTime(yamaStart)} - ${formatTime(yamaEnd)}`,
                abhijit: hasAbhijit ? `${formatTime(abhijitStart)} - ${formatTime(abhijitEnd)}` : "None (Wed)"
            };
        }

        // --- UPDATED MAIN RENDER FUNCTION ---
        function renderPanchang(data) {
            const section = document.getElementById('sec-panchang');
            const pillsContainer = document.getElementById('panchang-pills');
            const list = document.getElementById('panchang-list');

            // Clear containers
            pillsContainer.innerHTML = '';
            list.innerHTML = '';

            // 1. Season (Ritu) Logic (Kept mostly same, but cleaner injection)
            const seasonIndex = getSeasonIndex(data.month);
            const seasonConfig = seasonUIConfig[seasonIndex];
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const seasonName = langObj.indianSeasons[seasonIndex];

            // Retrieve detailed description
            const rawSeasonDesc = (appState.customSeasonDescriptions && appState.customSeasonDescriptions[seasonIndex])
                               ? appState.customSeasonDescriptions[seasonIndex]
                               : (langObj.seasonDescriptions ? langObj.seasonDescriptions[seasonIndex] : "");
            const seasonDescHtml = formatSeasonDescription(rawSeasonDesc);

            // Inject Season Card at the top of the list container
            const seasonCard = document.createElement('div');
            seasonCard.className = "season-ui-card group mb-4 flex-col items-start gap-4"; // Changed layout to column for better fit
            seasonCard.onclick = cycleSeasonCard;

            // Re-structured inner HTML to include description always visible
            seasonCard.innerHTML = `
                <div class="flex items-center gap-4 w-full">
                    <div class="season-ui-icon-container" style="transform: scale(1); opacity: 1;">${seasonConfig.icon}</div>
                    <div class="season-ui-content flex-1">
                        <span class="season-ui-label">Current Ritu</span>
                        <span class="season-ui-title text-xl" style="color: ${seasonConfig.color};">${seasonName}</span>
                    </div>
                </div>
                <div class="w-full border-t border-gray-200 pt-2 mt-1">
                    <div class="text-xs text-gray-600 leading-relaxed font-sans">
                        ${seasonDescHtml}
                    </div>
                </div>
            `;
            list.appendChild(seasonCard);

            // 2. Astronomical Calculations (Sun/Moon/Times)
            const today = new Date();
            // Use Today if active month matches current, else 1st of active month
            const calcDate = (data.month === today.getMonth() && data.year === today.getFullYear())
                           ? new Date()
                           : new Date(data.year, data.month, 1);

            const autoData = calculateTithi(calcDate);

            // SunCalc Times
            let sunTimes = { sunrise: null, sunset: null };
            let moonTimes = { rise: null, set: null }; // Placeholder
            let muhurats = null;

            if (appState.config.location && SunCalc) {
                sunTimes = SunCalc.getTimes(calcDate, appState.config.location.lat, appState.config.location.lng);
                // Calculate Moon Times (SunCalc supports this)
                // Note: SunCalc library included in your file might be minimal.
                // If getMoonTimes exists use it, otherwise skip.
                if (SunCalc.getMoonTimes) {
                    moonTimes = SunCalc.getMoonTimes(calcDate, appState.config.location.lat, appState.config.location.lng);
                }

                // Calculate Muhurats
                muhurats = getSpecialTimes(calcDate, sunTimes.sunrise, sunTimes.sunset);
            }

            // 3. Render Astro Timeline (Sun/Moon Visual Strip)
            if (sunTimes.sunrise && sunTimes.sunset) {
                const fmt = (d) => d ? d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--';

                const timelineDiv = document.createElement('div');
                timelineDiv.className = "astro-timeline-modern";
                timelineDiv.innerHTML = `
                    <div class="astro-time-item">
                        <i class="fa-solid fa-sun text-2xl text-orange-400 icon-glow-orange"></i>
                        <span class="astro-label">Sunrise</span>
                        <span class="astro-time">${fmt(sunTimes.sunrise)}</span>
                    </div>
                    <div class="astro-divider"></div>
                    <div class="astro-time-item">
                        <i class="fa-solid fa-cloud-sun text-2xl text-purple-400 icon-glow-purple"></i>
                        <span class="astro-label">Sunset</span>
                        <span class="astro-time">${fmt(sunTimes.sunset)}</span>
                    </div>
                    <div class="astro-divider"></div>
                    <div class="astro-time-item">
                        <i class="fa-solid fa-cloud-moon text-2xl text-blue-400 icon-glow-blue"></i>
                        <span class="astro-label">Moonrise</span>
                        <span class="astro-time">${fmt(moonTimes ? moonTimes.rise : null)}</span>
                    </div>
                    <div class="astro-divider"></div>
                    <div class="astro-time-item">
                        <i class="fa-solid fa-moon text-2xl text-gray-300 icon-glow-gray"></i>
                        <span class="astro-label">Moonset</span>
                        <span class="astro-time">${fmt(moonTimes ? moonTimes.set : null)}</span>
                    </div>
                `;
                list.appendChild(timelineDiv);
            }

            // 4. Merge Data (Manual > Auto)
            let displayData = { ...data.panchang };
            if (!displayData['Tithi']) displayData['Tithi'] = `${autoData.tithi} (${autoData.paksha})`;
            if (!displayData['Nakshatra']) displayData['Nakshatra'] = autoData.nakshatra;
            if (!displayData['Yoga']) displayData['Yoga'] = autoData.yoga;
            if (!displayData['Karana']) displayData['Karana'] = autoData.karana;

            // Remove Sunrise/Sunset from grid (since we showed them in visual strip)
            delete displayData['Sunrise'];
            delete displayData['Sunset'];
            delete displayData['Month']; // Usually shown in header

            // 5. Render Data Grid (Tithi, Nakshatra, Yoga, Karana)
            const gridDiv = document.createElement('div');
            gridDiv.className = "panchang-grid";

            const keys = ['Tithi', 'Nakshatra', 'Yoga', 'Karana'];
            const icons = {
                'tithi': 'fa-cloud-moon',
                'nakshatra': 'fa-star',
                'yoga': 'fa-dharmachakra',
                'karana': 'fa-hourglass-half'
            };
            const colors = {
                'tithi': 'text-purple-600',
                'nakshatra': 'text-amber-500',
                'yoga': 'text-blue-500',
                'karana': 'text-teal-500'
            };

            keys.forEach(key => {
                let val = displayData[key] || displayData[key.toLowerCase()] || '-';
                let icon = icons[key.toLowerCase()] || 'fa-circle';
                let color = colors[key.toLowerCase()] || 'text-gray-500';

                // Helper to bold the Paksha part in Tithi
                if(key === 'Tithi' && val.includes('(')) {
                    val = val.replace(/\((.*?)\)/, '<span class="text-[9px] block text-gray-400 font-normal uppercase tracking-wide">$1</span>');
                }

                gridDiv.innerHTML += `
                    <div class="panchang-item">
                        <div class="panchang-label ${color}">
                            <i class="fa-solid ${icon}"></i> ${key}
                        </div>
                        <div class="panchang-value truncate" title="${val.replace(/<[^>]*>/g, '')}">
                            ${val}
                        </div>
                    </div>
                `;
            });

            // Add manual entries that are NOT in the standard keys
            Object.keys(displayData).forEach(k => {
                if (!keys.includes(k) && !keys.includes(k.charAt(0).toUpperCase() + k.slice(1))) {
                     gridDiv.innerHTML += `
                        <div class="panchang-item">
                            <div class="panchang-label text-gray-500"><i class="fa-solid fa-info-circle"></i> ${k}</div>
                            <div class="panchang-value truncate">${displayData[k]}</div>
                        </div>
                    `;
                }
            });

            list.appendChild(gridDiv);

            // 6. Render Muhurat Strip (Rahu, Yama, Abhijit)
            if (muhurats) {
                const muhuratDiv = document.createElement('div');
                muhuratDiv.innerHTML = `<h4 class="text-xs font-bold text-gray-500 mb-2 mt-4 uppercase tracking-wider pl-1">Auspicious Timings</h4>`;

                const strip = document.createElement('div');
                strip.className = "muhurat-strip custom-scroll";

                strip.innerHTML = `
                    <div class="muhurat-pill muhurat-good" title="Best time for new beginnings">
                        <span class="text-[9px] font-bold uppercase opacity-80 mb-1">Abhijit</span>
                        <span class="text-xs font-extrabold whitespace-nowrap">${muhurats.abhijit}</span>
                    </div>
                    <div class="muhurat-pill muhurat-bad" title="Avoid auspicious work">
                        <span class="text-[9px] font-bold uppercase opacity-80 mb-1">Rahu Kalam</span>
                        <span class="text-xs font-extrabold whitespace-nowrap">${muhurats.rahu}</span>
                    </div>
                    <div class="muhurat-pill muhurat-bad" title="Inauspicious time">
                        <span class="text-[9px] font-bold uppercase opacity-80 mb-1">Yamaganda</span>
                        <span class="text-xs font-extrabold whitespace-nowrap">${muhurats.yama}</span>
                    </div>
                `;

                muhuratDiv.appendChild(strip);
                list.appendChild(muhuratDiv);
            }

            // 7. Location Button Logic (Moved to bottom of list)
            const locContainer = document.createElement('div');
            locContainer.id = 'location-btn-container';
            locContainer.className = "mt-4 pt-3 border-t border-gray-100 flex justify-center";

            if (appState.config.location) {
                 const locName = appState.config.location.name || `${appState.config.location.lat.toFixed(2)}, ${appState.config.location.lng.toFixed(2)}`;
                 locContainer.innerHTML = `
                    <div class="text-center w-full">
                        <div class="bg-green-50 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold inline-flex items-center gap-2 mb-2 border border-green-100">
                            <i class="fa-solid fa-location-dot"></i> ${locName}
                        </div>
                        <button id="btn-location" onclick="getUserLocation()" class="block w-full text-[10px] text-gray-400 hover:text-orange-500 uppercase font-bold tracking-widest transition">
                            Update Location
                        </button>
                    </div>`;
            } else {
                 locContainer.innerHTML = `
                    <button id="btn-location" onclick="getUserLocation()" class="w-full bg-orange-50 hover:bg-orange-100 text-orange-700 text-xs font-bold py-2.5 px-4 rounded-xl shadow-sm border border-orange-200 transition flex items-center justify-center gap-2">
                        <i class="fa-solid fa-location-crosshairs"></i> Set Location for Timings
                    </button>`;
            }
            list.appendChild(locContainer);
        }

        function stopLiveClock() {
            if (liveClockInterval) {
                clearInterval(liveClockInterval);
                liveClockInterval = null;
            }
        }

        function startLiveClock() {
            stopLiveClock();

            const updateTime = () => {
                const now = new Date();
                const timeString = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });
                const el = document.getElementById('live-clock-time');
                if (el) {
                    el.innerText = timeString;
                }
            };

            updateTime();
            liveClockInterval = setInterval(updateTime, 1000);
        }

        function adjustUpNextIcon(card) {
            const wrapper = card.querySelector('.up-next-om-wrapper');
            const icon = card.querySelector('.up-next-om-icon');
            if (!wrapper || !icon) return;

            const w = card.offsetWidth;

            // Algorithm: Scale icon based on container width
            // Target: Icon should be roughly 50% of container width, but min 140px.
            // Old was fixed 8rem (~128px)
            let size = Math.max(140, w * 0.5);

            // Position: "slightly below side" implies pushing it down and right.
            const bottomOffset = -size * 0.20;
            const rightOffset = -size * 0.10;

            icon.style.fontSize = `${size}px`;
            wrapper.style.bottom = `${bottomOffset}px`;
            wrapper.style.right = `${rightOffset}px`;
        }

        function renderFestivals(data) {
            stopLiveClock();
            const section = document.getElementById('sec-festivals');
            section.innerHTML = '';

            // 0. Decoration (Quarter-Circle)
            const deco = document.createElement('div');
            deco.className = "absolute top-0 right-0 -mr-4 -mt-4 pointer-events-none";
            // Inline styles to match requested Tailwind classes (rounded-bl-full, from-red-500/10, etc.)
            Object.assign(deco.style, {
                width: '6rem', // w-24
                height: '6rem', // h-24
                background: 'linear-gradient(to bottom right, rgba(239, 68, 68, 0.1), transparent)', // bg-gradient-to-br from-red-500/10
                borderBottomLeftRadius: '100%' // rounded-bl-full
            });
            section.appendChild(deco);

            // 1. Header
            const header = document.createElement('h3');
            header.className = "font-bold text-gray-900 mb-4 text-base flex items-center gap-2";
            header.innerHTML = `<i class="fa-solid fa-bell text-red-600 text-lg"></i> Festivals`;
            section.appendChild(header);

            // 2. Up Next Card logic
            const listEvents = data.events
                .filter(e => (e.symbol === '!' || e.symbol === '^' || e.symbol === '*' || e.symbol === '>'))
                .sort((a, b) => a.date - b.date);

            const upNextEvents = listEvents.filter(e => e.symbol !== '>');

            let upNextEvent = null;
            const realToday = new Date();
            const isCurrentMonth = (data.month === realToday.getMonth() && data.year === realToday.getFullYear());

            if (isCurrentMonth) {
                upNextEvent = upNextEvents.find(e => e.date >= realToday.getDate());
            } else if (new Date(data.year, data.month, 1) > realToday) {
                upNextEvent = upNextEvents[0];
            }

            if (upNextEvent) {
                const eventDate = new Date(data.year, data.month, upNextEvent.date);

                // Diff days
                const t1 = new Date(realToday.getFullYear(), realToday.getMonth(), realToday.getDate());
                const t2 = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
                const diffTime = t2 - t1;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                let badgeText = "";
                if (diffDays === 0) badgeText = "Today";
                else if (diffDays === 1) badgeText = "Tomorrow";
                else if (diffDays < 7) badgeText = `In ${diffDays} days`;
                else badgeText = `${upNextEvent.date} ${shortMonths[data.month]}`;

                // --- CARD 1: Event Details ---
                const eventCard = document.createElement('div');
                eventCard.className = "mb-3 relative overflow-hidden rounded-xl shadow-lg cursor-pointer transition-transform hover:scale-[1.02] active:scale-95";
                eventCard.onclick = () => openDayModal(upNextEvent.date, data);
                eventCard.style.background = "linear-gradient(135deg, #f15a24 0%, #ed1c24 50%, #800000 100%)";
                eventCard.style.boxShadow = "0 10px 15px -3px rgba(249, 115, 22, 0.4), 0 4px 6px -4px rgba(249, 115, 22, 0.4)";

                eventCard.innerHTML = `
                    <div class="p-4 relative z-10 text-white flex flex-col gap-3">
                        <div class="flex justify-between items-start">
                             <div class="text-[10px] font-bold opacity-90 tracking-widest uppercase flex items-center gap-2">
                                <i class="fa-regular fa-calendar"></i> UP NEXT
                             </div>
                             <div class="bg-white/20 backdrop-blur-[10px] px-3 py-1 rounded-full text-[10px] font-bold border border-white/50 shadow-lg">
                                ${badgeText}
                             </div>
                        </div>

                        <div>
                            <h3 class="font-extrabold text-lg leading-tight mb-1 drop-shadow-sm whitespace-normal">${upNextEvent.engName}</h3>
                            <p class="text-sm font-medium opacity-90 font-oriya leading-relaxed">${upNextEvent.locName || ''}</p>
                        </div>
                    </div>
                    <div class="absolute top-0 right-0 -mr-4 -mt-4 w-32 h-32 rounded-full bg-white/10 blur-2xl pointer-events-none"></div>
                    <div class="absolute bottom-0 left-0 -ml-4 -mb-4 w-20 h-20 rounded-full bg-black/5 blur-xl pointer-events-none"></div>
                    <div class="absolute bottom-0 right-0 opacity-12 pointer-events-none up-next-om-wrapper">
                        <span class="text-[8rem] leading-none font-serif select-none text-white up-next-om-icon" style="font-family: Georgia, serif;">ॐ</span>
                    </div>
                `;
                section.appendChild(eventCard);

                // Automatic fitting algorithm
                adjustUpNextIcon(eventCard);
                const ro = new ResizeObserver(() => adjustUpNextIcon(eventCard));
                ro.observe(eventCard);

            }

            // --- CARD 2: Clock (Always Visible) ---
            const clockCard = document.createElement('div');
            clockCard.className = "mb-4 relative overflow-hidden rounded-xl shadow-lg";
            clockCard.style.background = "linear-gradient(135deg, #f15a24 0%, #ed1c24 50%, #800000 100%)"; // Same gradient aesthetic
            clockCard.style.boxShadow = "0 10px 15px -3px rgba(249, 115, 22, 0.4), 0 4px 6px -4px rgba(249, 115, 22, 0.4)";

            clockCard.innerHTML = `
                <div class="p-3 relative z-10 text-white text-center flex flex-col items-center justify-center h-full">
                     <div id="live-clock-time" class="text-xl md:text-2xl font-mono font-bold tracking-tight drop-shadow-md whitespace-nowrap">--:--:-- --</div>
                     <div class="text-[9px] uppercase tracking-[0.2em] opacity-80 font-semibold mt-1">Current Time</div>
                </div>
                <div class="absolute inset-0 bg-white/5 pointer-events-none"></div>
            `;
            section.appendChild(clockCard);

            startLiveClock();

            // 3. Search Bar
            const searchWrapper = document.createElement('div');
            searchWrapper.className = "relative mb-3 group";
            searchWrapper.innerHTML = `
                <div class="absolute inset-y-0 left-0 pl-4 z-10 flex items-center pointer-events-none">
                    ${SEARCH_ICON_SVG.replace('<svg', '<svg class="text-gray-400 group-focus-within:text-orange-500 transition-colors"')}
                </div>
                <input type="text" id="festival-search"
                    class="block w-full pl-10 pr-10 py-2.5 text-sm text-gray-700 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-orange-200 focus:border-orange-400 placeholder-gray-400 outline-none transition-all duration-300 shadow-sm hover:shadow-md"
                    placeholder="Search..."
                    autocomplete="off">
                <button id="search-clear" class="absolute inset-y-0 right-2 pr-3 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer hidden">
                    <i class="fa-solid fa-circle-xmark"></i>
                </button>
            `;
            section.appendChild(searchWrapper);

            // --- SMART-LINE FILTER BUTTONS ---
            const filterContainer = document.createElement('div');
            filterContainer.id = "festival-filters";
            filterContainer.className = "flex flex-wrap gap-2 mb-4 justify-center";

            const currentLang = appState.config.language || 'en';
            const localizedFilters = langData[currentLang] ? langData[currentLang].filters : langData.en.filters;

            const filters = [
                { id: '!', label: localizedFilters[0], icon: TEMPLE_ICON_SVG.replace('width="24" height="24"', 'width="14" height="14"').replace('fill="currentColor"', 'fill="currentColor"'), color: 'red' },
                { id: '^', label: localizedFilters[1], icon: '<span class="font-serif text-sm leading-none" style="font-family: Georgia, serif; transform: translateY(-1px);">ॐ</span>', color: 'green' },
                { id: '*', label: localizedFilters[2], icon: HOLIDAY_ICON_SVG.replace('width="24" height="24"', 'width="14" height="14"').replace('fill="currentColor"', 'fill="currentColor"'), color: 'blue' },
                { id: '>', label: localizedFilters[3] || "Other Events", icon: CALENDAR_ICON_SVG.replace('width="24" height="24"', 'width="14" height="14"').replace('fill="currentColor"', 'fill="currentColor"'), color: 'gray' }
            ];

            filters.forEach(f => {
                const isSelected = (currentIsolationFilter === f.id);
                const btn = document.createElement('button');

                // RESPONSIVE LOGIC: flex-1 on mobile, sm:flex-none on desktop
                let className = `
                    filter-btn relative px-4 py-2 rounded-full
                    text-xs font-bold whitespace-nowrap outline-none
                    flex items-center justify-center gap-2
                    flex-1 sm:flex-none min-w-[fit-content]
                    transition-all duration-200
                `;

                let colorClass = "";
                // SOLID GLOW LOGIC (Both Active & Inactive are solid)
                if (f.color === 'red') {
                    colorClass = "bg-red-600 text-white shadow-lg shadow-red-200 hover:bg-red-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-red-600";
                } else if (f.color === 'green') {
                    colorClass = "bg-green-600 text-white shadow-lg shadow-green-200 hover:bg-green-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-green-600";
                } else if (f.color === 'blue') {
                    colorClass = "bg-blue-600 text-white shadow-lg shadow-blue-200 hover:bg-blue-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-blue-600";
                } else if (f.color === 'gray') {
                    colorClass = "bg-gray-600 text-white shadow-lg shadow-gray-200 hover:bg-gray-700";
                    if (isSelected) colorClass += " ring-2 ring-offset-2 ring-gray-600";
                }

                btn.className = `${className} ${colorClass}`;
                btn.innerHTML = `${f.icon} <span>${f.label}</span>`;
                btn.onclick = () => toggleFilter(f.id);
                filterContainer.appendChild(btn);
            });
            section.appendChild(filterContainer);

            // 5. Festival List Container
            const list = document.createElement('ul');
            list.id = 'festival-list';
            list.className = "space-y-2 text-sm max-h-[350px] overflow-y-auto pr-1 custom-scroll";
            section.appendChild(list);

            const input = searchWrapper.querySelector('input');
            const clearBtn = searchWrapper.querySelector('#search-clear');

            input.oninput = (e) => {
                const query = e.target.value.toLowerCase();
                if (query.length > 0) {
                    clearBtn.classList.remove('hidden');
                    // Global Search: Aggregate all events
                    let allEvents = [];
                    if (appState.monthsData) {
                        appState.monthsData.forEach(m => {
                            // Filter allowed symbols first (using same logic as listEvents)
                            const mEvents = m.events.filter(ev => ['!','^','*','>'].includes(ev.symbol));
                            mEvents.forEach(ev => {
                                // Attach context for global rendering
                                allEvents.push({ ...ev, monthIndex: m.month, year: m.year, _monthData: m });
                            });
                        });
                        // Sort by Date (Year, Month, Day)
                        allEvents.sort((a,b) => {
                            if (a.year !== b.year) return a.year - b.year;
                            if (a.monthIndex !== b.monthIndex) return a.monthIndex - b.monthIndex;
                            return a.date - b.date;
                        });
                    }
                    renderFestivalListItems(list, allEvents, null, query);
                }
                else {
                    clearBtn.classList.add('hidden');
                    renderFestivalListItems(list, listEvents, data, "");
                }
            };

            clearBtn.onclick = () => {
                input.value = '';
                clearBtn.classList.add('hidden');
                input.focus();
                renderFestivalListItems(list, listEvents, data, "");
            };

            renderFestivalListItems(list, listEvents, data, "");
        }

        function renderFestivalListItems(container, events, monthData, query) {
            container.innerHTML = '';
            const filtered = events.filter(e => {
                const matchesQuery = (e.engName.toLowerCase().includes(query) || (e.locName && e.locName.toLowerCase().includes(query)));
                // ISOLATION LOGIC: Show if filter is null OR matches specific symbol
                const matchesFilter = (currentIsolationFilter === null) || (e.symbol === currentIsolationFilter);
                return matchesQuery && matchesFilter;
            });

            if (filtered.length === 0) {
                const msg = query ? "No events found" : "No events selected";
                container.innerHTML = `<li class="text-center text-gray-400 text-xs py-4 italic">${msg}</li>`;
                return;
            }

            // Group events by date (YYYY-MM-DD) to prevent double badges
            const groups = [];
            const seenKeys = new Set();

            filtered.forEach(ev => {
                 const mData = monthData || ev._monthData;
                 const mIndex = (monthData) ? monthData.month : ev.monthIndex;
                 const year = (monthData) ? monthData.year : ev.year;
                 const key = `${year}-${mIndex}-${ev.date}`;

                 if (!seenKeys.has(key)) {
                     seenKeys.add(key);
                     groups.push({
                        date: ev.date,
                        monthIndex: mIndex,
                        year: year,
                        mData: mData,
                        events: [ev]
                     });
                 } else {
                     const g = groups.find(g => g.year === year && g.monthIndex === mIndex && g.date === ev.date);
                     if (g) g.events.push(ev);
                 }
            });

            groups.forEach(group => {
                const li = document.createElement('li');
                li.className = "flex gap-3 items-center p-2 rounded-lg hover:bg-gray-50 border border-transparent transition-all cursor-pointer group";

                li.onclick = () => openDayModal(group.date, group.mData);

                // Determine Badge Color (Priority: ! > ^ > * > >)
                const symbols = group.events.map(e => e.symbol);
                let symbol = '>';
                if (symbols.includes('!')) symbol = '!';
                else if (symbols.includes('^')) symbol = '^';
                else if (symbols.includes('*')) symbol = '*';

                let badgeClass = "bg-gray-600";
                if (symbol === '!') badgeClass = "bg-red-600";
                else if (symbol === '^') badgeClass = "bg-green-600";
                else if (symbol === '*') badgeClass = "bg-blue-600";

                const monthName = shortMonths[group.monthIndex];

                // Render Multiple Events Stacked
                const eventsHtml = group.events.map((ev, idx) => {
                    const mt = idx > 0 ? 'mt-1 pt-1 border-t border-gray-100' : '';
                    return `
                    <div class="${mt}">
                        <div class="font-bold text-gray-900 text-sm whitespace-normal leading-tight group-hover:text-orange-700 transition-colors">${ev.engName}</div>
                        <div class="text-[11px] text-gray-500 font-oriya whitespace-normal leading-snug">${ev.locName || ''}</div>
                    </div>
                    `;
                }).join('');

                li.innerHTML = `
                    <div class="${badgeClass} w-10 h-10 rounded-lg flex flex-col items-center justify-center text-white shadow-md shrink-0 transition-transform group-hover:scale-105">
                        <span class="text-[9px] font-bold uppercase leading-none tracking-wide opacity-90">${monthName}</span>
                        <span class="text-lg font-bold leading-none mt-0.5 shadow-sm">${group.date}</span>
                    </div>
                    <div class="flex-grow min-w-0 flex flex-col justify-center">
                        ${eventsHtml}
                    </div>
                `;
                container.appendChild(li);
            });
        }

        function toggleFilter(symbol) {
            if (currentIsolationFilter === symbol) {
                currentIsolationFilter = null;
            } else {
                currentIsolationFilter = symbol;
            }
            render();
        }


        function formatSeasonDescription(desc) {
            if (!desc) return '';
            const lines = Array.isArray(desc) ? desc : [desc];
            let html = '';
            let inList = false;

            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed.startsWith('-') || trimmed.startsWith('•')) {
                    if (!inList) {
                        html += '<ul class="list-disc pl-5 mb-2 text-gray-600">';
                        inList = true;
                    }
                    html += `<li>${trimmed.substring(1).trim()}</li>`;
                } else {
                    if (inList) {
                        html += '</ul>';
                        inList = false;
                    }
                    if (trimmed) html += `<p class="mb-2 last:mb-0">${trimmed}</p>`;
                }
            });

            if (inList) html += '</ul>';
            return html;
        }

        function renderRichBody(container, lines) {
            container.innerHTML = '';
            lines.forEach(line => {
                const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (imgMatch) {
                    const alt = imgMatch[1];
                    const src = resolveImageUrls(imgMatch[2]);
                    const figure = document.createElement('figure');
                    figure.innerHTML = `<img src="${src}" alt="${alt}"><figcaption>${alt}</figcaption>`;
                    container.appendChild(figure);
                } else if (line.startsWith('#')) {
                    const titleText = line.replace('#', '').trim();
                    const h3 = document.createElement('h3');
                    let iconHtml = '<i class="fa-solid fa-scroll"></i>';
                    if (titleText.toLowerCase().includes('ritual')) iconHtml = '<i class="fa-solid fa-fire-burner"></i>';
                    if (titleText.toLowerCase().includes('significance')) iconHtml = '<i class="fa-solid fa-book-open-reader"></i>';
                    h3.innerHTML = `${iconHtml} ${titleText}`;
                    container.appendChild(h3);
                } else if (line.startsWith('-')) {
                    let ul = container.lastElementChild;
                    if (!ul || ul.tagName !== 'UL') {
                        ul = document.createElement('ul');
                        container.appendChild(ul);
                    }
                    const li = document.createElement('li');
                    li.innerText = line.replace('-', '').trim();
                    ul.appendChild(li);
                } else if (line.trim() !== "") {
                    const p = document.createElement('p');
                    p.innerText = line;
                    container.appendChild(p);
                }
            });
        }

        let currentModalDetails = [];
        let currentModalIndex = 0;
        let currentModalDayEvents = [];
        let currentModalTithiBlock = "";

        // --- EDITOR LOGIC START ---
        let currentUploadDateKey = null;

        function triggerBannerUpload(dateKey) {
            currentUploadDateKey = dateKey;
            document.getElementById('bannerInput').click();
        }

        function handleBannerUpload(event) {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function(e) {
                const base64 = e.target.result;
                if (currentUploadDateKey) {
                    if (!appState.details[currentUploadDateKey]) {
                        appState.details[currentUploadDateKey] = [{ tags: [], bodyLines: [], bannerUrl: null }];
                    }

                    let detailList = appState.details[currentUploadDateKey];
                    if (!Array.isArray(detailList)) {
                        // Legacy support (though parseInput makes arrays)
                        detailList = [detailList];
                        appState.details[currentUploadDateKey] = detailList;
                    }

                    if (detailList.length === 0) {
                        detailList.push({ tags: [], bodyLines: [], bannerUrl: null });
                    }

                    // Update the FIRST detail's banner for now (simplification)
                    detailList[0].bannerUrl = base64;

                    saveStateToCache();

                    // Update global currentModalDetails if we are currently viewing this date
                    if (currentModalDetails.length > 0) {
                        currentModalDetails[0].bannerUrl = base64;
                    } else {
                        currentModalDetails = detailList;
                    }

                    // Refresh Modal
                    const [y, m, d] = currentUploadDateKey.split('-').map(Number);
                    const monthData = getEffectiveMonthData(m, y);
                    openDayModal(d, monthData);

                    render();
                }
            };
            reader.readAsDataURL(file);
            event.target.value = '';
        }

        function removeBanner(dateKey) {
            if (confirm("Remove this banner image?")) {
                 if (appState.details[dateKey]) {
                    const details = appState.details[dateKey];
                    if (Array.isArray(details) && details.length > 0) {
                        details[0].bannerUrl = null;
                    } else if (details.bannerUrl) {
                        details.bannerUrl = null;
                    }

                    saveStateToCache();

                    // Update current view if open
                    if (currentModalDetails.length > 0) {
                        currentModalDetails[0].bannerUrl = null;
                    }

                    // Refresh Modal
                    const [y, m, d] = dateKey.split('-').map(Number);
                    const monthData = getEffectiveMonthData(m, y);
                    openDayModal(d, monthData);

                    render();
                 }
            }
        }
        // --- EDITOR LOGIC END ---

        function formatBodyLines(lines) {
            let html = '';
            let inList = false;
            lines.forEach(line => {
                const trimmed = line.trim();
                if (trimmed.startsWith('-')) {
                    if (!inList) {
                        html += '<ul class="list-disc pl-6 mb-2">';
                        inList = true;
                    }
                    html += `<li class="mb-1 text-gray-600">${trimmed.replace('-','').trim()}</li>`;
                } else {
                    if (inList) {
                        html += '</ul>';
                        inList = false;
                    }
                    if (trimmed.startsWith('#')) {
                        html += `<h4 class="text-deepred font-bold mt-3 mb-1 text-base">${trimmed.replace(/#/g,'').trim()}</h4>`;
                    } else if (trimmed !== "") {
                        html += `<p class="mb-2 text-gray-700">${trimmed}</p>`;
                    }
                }
            });
            if (inList) html += '</ul>';
            return html;
        }

        function openDayModal(day, monthData) {
            lockScroll();
            const modal = document.getElementById('day-modal');
            const dateObj = new Date(monthData.year, monthData.month, day);
            const dateKey = `${monthData.year}-${monthData.month}-${day}`;

            // --- 1. PREPARE DATA ---
            const tithiInfo = calculateTithi(dateObj);

            // Calculate Sun/Moon Times
            let sunTimes = { sunrise: null, sunset: null };
            let moonTimes = { rise: null, set: null };
            if (appState.config.location && SunCalc) {
                sunTimes = SunCalc.getTimes(dateObj, appState.config.location.lat, appState.config.location.lng);
                if (SunCalc.getMoonTimes) {
                    moonTimes = SunCalc.getMoonTimes(dateObj, appState.config.location.lat, appState.config.location.lng);
                }
            }
            const fmtAstroTime = (d) => d ? d.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit'}) : '--:--';

            // Astro Data
            const jd = tithiInfo.jd || 0;
            const sunLon = tithiInfo.sunLon || 0;
            const moonLon = tithiInfo.moonLon || 0;
            const elongation = (moonLon - sunLon + 360) % 360;
            const tithiProgress = ((elongation % 12) / 12 * 100).toFixed(1);

            // Tithi Timings
            let tithiTimes = { start: 0, end: 0 };
            try {
                if (VedicAstro.getTithiTimes) {
                    tithiTimes = VedicAstro.getTithiTimes(jd, tithiInfo.index);
                }
            } catch(e) { console.error("Tithi timing calc failed", e); }

            const fmtTime = (j) => {
                if(!j) return "--";
                const d = new Date((j - 2440587.5) * 86400000);
                // Check if date is different from current view date
                const isSameDay = d.getDate() === day && d.getMonth() === monthData.month && d.getFullYear() === monthData.year;
                const timeStr = d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                if (isSameDay) return timeStr;
                return `${d.toLocaleDateString([], {month:'short', day:'numeric'})}, ${timeStr}`;
            };

            // Panchang Extra Data
            const currentLang = appState.config.language || 'en';
            const langObj = langData[currentLang] || langData['en'];
            const seasonIndex = getSeasonIndex(monthData.month);
            const seasonName = langObj.indianSeasons[seasonIndex];
            const hinduMonthName = langObj.indianMonths[monthData.month];

            // Upcoming Special Tithis (Scan next 30 days)
            const upcoming = [];
            let scanDate = new Date(dateObj);
            scanDate.setDate(scanDate.getDate() + 1);
            for(let i=0; i<30; i++) {
                if (upcoming.length >= 3) break;
                const astro = calculateTithi(scanDate);
                if ([14, 29, 10, 25].includes(astro.index)) {
                    upcoming.push({
                        date: new Date(scanDate),
                        tithi: astro.tithi,
                        index: astro.index,
                        paksha: astro.paksha
                    });
                }
                scanDate.setDate(scanDate.getDate() + 1);
            }

            // Build Upcoming HTML
            let upcomingHtml = '';
            upcoming.forEach(item => {
                let bgColor = 'bg-amber-100 text-amber-800 border border-amber-200';
                let iconHtml = TITHI_ICONS.ekadashi;
                let title = 'Ekadashi';

                if (item.index === 14) { bgColor = 'bg-orange-200 text-orange-900 border border-orange-300'; iconHtml = TITHI_ICONS.purnima; title = 'Purnima'; }
                else if (item.index === 29) { bgColor = 'bg-gray-200 text-gray-800 border border-gray-300'; iconHtml = TITHI_ICONS.amavasya; title = 'Amavasya'; }

                const dateStr = item.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

                upcomingHtml += `
                    <div class="${bgColor} rounded-xl p-3 flex flex-col items-center text-center shadow-sm transform hover:scale-105 transition">
                        <div class="w-6 h-6 mb-1 drop-shadow-sm">${iconHtml}</div>
                        <div class="font-bold text-xs mb-0.5">${title}</div>
                        <div class="text-[9px] opacity-80 uppercase font-bold leading-tight">${dateStr}</div>
                    </div>
                `;
            });

            // Main Icon
            let mainIcon = getMoonPhaseIcon((tithiInfo.index + 1) / 30);
            if (tithiInfo.index === 14) mainIcon = TITHI_ICONS.purnima;
            if (tithiInfo.index === 29) mainIcon = TITHI_ICONS.amavasya;

            // Details/Events
            let detailsRaw = appState.details[dateKey];
            if (!detailsRaw) {
                const recKey = `rec-${monthData.month}-${day}`;
                detailsRaw = appState.recurringDetails[recKey];
            }
            let details = (detailsRaw && Array.isArray(detailsRaw)) ? detailsRaw : (detailsRaw ? [detailsRaw] : []);

            // Events for this day
            const dayEvents = monthData.events.filter(e => e.date === day);

            // Banner
            let bannerUrl = '';
            if (details.length > 0 && details[0].bannerUrl) bannerUrl = resolveImageUrls(details[0].bannerUrl);

            // Paksha Badge Logic
            const paksha = tithiInfo.paksha;
            const isShukla = paksha.toLowerCase().includes('shukla');
            let pakshaBadgeHtml = '';

            if (isShukla) {
                pakshaBadgeHtml = `
                <div class="paksha-badge-shukla">
                    <i class="fa-solid fa-sun icon"></i>
                    <span class="text">${paksha}</span>
                </div>
                `;
            } else {
                pakshaBadgeHtml = `
                <div class="paksha-badge-krishna">
                    <i class="fa-solid fa-moon icon"></i>
                    <span class="text">${paksha}</span>
                </div>
                `;
            }

            // --- 2. BUILD HTML STRUCTURE (Light Page Layout) ---
            const contentHtml = `
                <div class="flex flex-col h-full relative overflow-hidden">

                    <!-- Persistent Header -->
                    <div class="shrink-0 z-10 relative backdrop-blur-md bg-white/30 text-center pt-10 pb-4 border-b border-white/20 shadow-sm">
                        <button onclick="closeDayModal()" class="absolute top-4 right-4 z-[100] bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition shadow-lg border border-gray-200"><i class="fa-solid fa-times"></i></button>

                        <div class="w-16 h-16 mx-auto mb-2 moon-glow transform scale-90 origin-bottom">${mainIcon}</div>
                        <h2 class="text-xl font-extrabold text-deepred mb-3 tracking-tight leading-none">${daysOfWeek[dateObj.getDay()]}, ${months[monthData.month]} ${day}, ${monthData.year}</h2>
                        ${pakshaBadgeHtml}
                    </div>

                    <!-- Scrollable Body -->
                    <div class="flex-grow overflow-y-auto scrollbar-aurora pb-20 px-4 pt-4 space-y-4 max-w-lg mx-auto w-full">

                        <!-- 1. Current Tithi -->
                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-3 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-solid fa-moon"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Current Tithi</span>
                            </div>
                            <h3 class="text-3xl font-extrabold text-deepred mb-1 leading-none">${tithiInfo.tithi}</h3>
                            <p class="text-xs text-gray-500 font-bold mb-4 uppercase tracking-wide">Tithi Index ${tithiInfo.index + 1}</p>

                            <div class="mt-5 p-4 bg-gray-50 rounded-2xl border border-gray-200 shadow-inner relative overflow-hidden">
                                <div class="absolute inset-0 bg-amber-500/5 pointer-events-none"></div>
                                <div class="flex justify-between items-center mb-2 relative z-10">
                                    <span class="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Tithi Progress</span>
                                    <div class="flex items-baseline gap-1">
                                        <span class="text-2xl font-extrabold text-amber-500 drop-shadow-sm font-sans">${tithiProgress}</span>
                                        <span class="text-xs text-amber-600 font-bold">%</span>
                                    </div>
                                </div>
                                <div class="h-3 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner ring-1 ring-gray-200 relative">
                                    <!-- Track Pattern -->
                                    <div class="absolute inset-0 opacity-20" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(0,0,0,0.05) 5px, rgba(0,0,0,0.05) 10px);"></div>

                                    <!-- Bar -->
                                    <div class="h-full rounded-full relative transition-all duration-1000 ease-out group" style="width: ${tithiProgress}%; background: linear-gradient(90deg, #f59e0b, #ef4444);">
                                        <!-- Gloss -->
                                        <div class="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
                                    </div>
                                </div>
                                <div class="flex justify-between items-center mt-3 px-0.5">
                                    <div class="flex flex-col items-start">
                                        <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Start</span>
                                        <div class="flex items-center gap-1">
                                            <i class="fa-regular fa-clock text-gray-400 text-[10px]"></i>
                                            <span class="text-[10px] text-gray-600 font-bold font-mono leading-none">${fmtTime(tithiTimes.start)}</span>
                                        </div>
                                    </div>
                                    <div class="h-6 w-px bg-gray-200 mx-4"></div>
                                    <div class="flex flex-col items-end">
                                        <span class="text-[9px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">End</span>
                                        <div class="flex items-center gap-1">
                                            <i class="fa-regular fa-clock text-amber-500 text-[10px]"></i>
                                            <span class="text-[10px] text-amber-500 font-bold font-mono leading-none">${fmtTime(tithiTimes.end)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- 2. Panchang Details -->
                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-solid fa-calendar-week"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Panchang Details</span>
                            </div>
                            <div class="grid grid-cols-2 gap-2 text-xs mb-2">
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Nakshatra</div>
                                    <div class="font-mono text-gray-900 font-bold">${tithiInfo.nakshatra}</div>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Yoga</div>
                                    <div class="font-mono text-gray-900 font-bold">${tithiInfo.yoga}</div>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Karana</div>
                                    <div class="font-mono text-gray-900 font-bold">${tithiInfo.karana}</div>
                                </div>
                                <div class="bg-gray-50 rounded-lg p-3 border border-gray-100">
                                    <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Hindu Month</div>
                                    <div class="font-mono text-gray-900 font-bold">${hinduMonthName}</div>
                                </div>
                            </div>
                            <div class="bg-gray-50 rounded-lg p-3 border border-gray-100 text-xs">
                                <div class="text-gray-500 mb-1 font-bold text-[10px] uppercase">Ritu (Season)</div>
                                <div class="font-mono text-gray-900 font-bold">${seasonName}</div>
                            </div>
                        </div>

                        <!-- 2a. Astro Details -->
                        ${sunTimes.sunrise ? `
                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-solid fa-cloud-sun"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Astro Details</span>
                            </div>
                            <div class="grid grid-cols-2 gap-3 text-center">
                                 <div class="bg-orange-50 rounded-xl p-2 border border-orange-100 flex flex-col items-center">
                                     <i class="fa-solid fa-sun text-orange-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase">Sunrise</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(sunTimes.sunrise)}</span>
                                 </div>
                                 <div class="bg-purple-50 rounded-xl p-2 border border-purple-100 flex flex-col items-center">
                                     <i class="fa-solid fa-cloud-sun text-purple-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase">Sunset</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(sunTimes.sunset)}</span>
                                 </div>
                                 <div class="bg-blue-50 rounded-xl p-2 border border-blue-100 flex flex-col items-center">
                                     <i class="fa-solid fa-cloud-moon text-blue-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase">Moonrise</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(moonTimes ? moonTimes.rise : null)}</span>
                                 </div>
                                 <div class="bg-gray-50 rounded-xl p-2 border border-gray-200 flex flex-col items-center">
                                     <i class="fa-solid fa-moon text-gray-400 mb-1"></i>
                                     <span class="text-[10px] text-gray-500 font-bold uppercase">Moonset</span>
                                     <span class="text-sm font-bold text-gray-800 font-mono">${fmtAstroTime(moonTimes ? moonTimes.set : null)}</span>
                                 </div>
                            </div>
                        </div>` : ''}


                        <!-- 3. Upcoming Special Tithis -->
                        ${upcoming.length > 0 ? `
                        <div class="modal-card">
                            <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
                                <div class="w-7 h-7 rounded-full bg-amber-50 flex items-center justify-center text-amber-500 text-xs"><i class="fa-regular fa-calendar-check"></i></div>
                                <span class="font-bold text-gray-600 text-xs uppercase tracking-wider">Upcoming Special Tithis</span>
                            </div>
                            <div class="grid grid-cols-3 gap-3">
                                ${upcomingHtml}
                            </div>
                        </div>` : ''}

                        <!-- 4. Banner Display (Only if URL exists) -->
                        ${bannerUrl ? `
                        <div id="modal-banner-container" class="modal-card p-0 overflow-hidden relative group min-h-[200px] transition-all duration-500 ease-out flex items-center justify-center border border-gray-200 bg-gray-50">
                            <!-- View Mode -->
                            <img src="${bannerUrl}" onload="adjustBannerHeight(this)" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105">
                            <div class="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-300"></div>
                        </div>` : ''}

                        <!-- 5. Rich Details (Notes/Events) -->
                        <div id="new-modal-rich-body" class="space-y-3 pb-8 pt-2">
                            ${dayEvents.map(ev => `
                                <div class="bg-gray-50 border-l-4 ${ev.symbol==='!'?'border-red-500':(ev.symbol==='*'?'border-blue-500':'border-gray-500')} rounded-r-xl p-4 shadow-sm">
                                    <h4 class="font-bold text-gray-900 text-lg leading-tight mb-1">${ev.engName}</h4>
                                    ${ev.locName ? `<p class="text-sm text-gray-600 font-oriya">${ev.locName}</p>` : ''}
                                </div>
                            `).join('')}

                            ${details.length > 0 ? `<div class="modal-card p-4 text-gray-700 text-sm leading-relaxed rich-content">${details.map(d => formatBodyLines(d.bodyLines)).join('<hr class="border-gray-200 my-4">')}</div>` : ''}
                        </div>

                    </div>
                </div>
            `;

            const modalContent = modal.querySelector('.modal-content');
            modalContent.innerHTML = contentHtml;

            // Remove legacy listeners (simplified view now)

            modal.style.display = 'flex';
            setTimeout(() => { modal.classList.remove('modal-hidden'); }, 10);
        }

        // Placeholder for legacy call (if any)
        function updateModalContent() {}

        function nextModalSlide(e) {
            if(e) e.stopPropagation();
            if (currentModalDetails.length <= 1) return;
            currentModalIndex = (currentModalIndex + 1) % currentModalDetails.length;
            updateModalContent();
        }

        function prevModalSlide(e) {
            if(e) e.stopPropagation();
            if (currentModalDetails.length <= 1) return;
            currentModalIndex = (currentModalIndex - 1 + currentModalDetails.length) % currentModalDetails.length;
            updateModalContent();
        }

        function closeDayModal() {
            const modal = document.getElementById('day-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            setTimeout(() => { modal.style.display = 'none'; }, 300);
        }


        function saveStateToCache() {
            try {
                // Include version in the saved state
                const stateToSave = { ...appState, version: DATA_VERSION };
                const jsonString = JSON.stringify(stateToSave);
                localStorage.setItem('panchang_cached_state', jsonString);
            } catch (e) {
                console.error("Failed to cache state", e);
            }
        }

        function loadStateFromCache() {
            try {
                const cached = localStorage.getItem('panchang_cached_state');
                if (cached) {
                    const parsed = JSON.parse(cached);

                    // 1. Version Check
                    if (parsed.version !== DATA_VERSION) {
                        console.warn("⚠️ Cache Version Mismatch! Invalidating...");
                        localStorage.removeItem('panchang_cached_state');
                        return false;
                    }

                    // 2. Sanity Check
                    if (parsed && parsed.monthsData && Array.isArray(parsed.monthsData)) {
                        appState = parsed;
                        return true;
                    }
                }
            } catch (e) {
                console.error("Failed to load state from cache", e);
                // In case of parsing error, clear cache too
                localStorage.removeItem('panchang_cached_state');
            }
            return false;
        }

        // --- EDITOR LOGIC START ---
        function downloadCalendar() {
            // 1. Clone the current document structure
            const clone = document.documentElement.cloneNode(true);

            // --- OPTIMIZATION: PURGE HEAVY CONTAINERS ---
            const idsToEmpty = ['calendar-grid', 'year-grid', 'festival-list', 'panchang-list', 'panchang-pills', 'banner-slides', 'banner-dots'];
            idsToEmpty.forEach(id => {
                const el = clone.querySelector(`#${id}`);
                if(el) el.innerHTML = '';
            });

            // 2. Remove Editor Components (The "White-Label" Scrub)
            const removeSelectors = [
                '#editor-panel',             // The entire editor
                '#clear-confirmation-modal', // Editor modal
                '#link-modal',               // Editor modal
                '#bannerInput',              // Upload input
                '#fileInput',                // Upload input
                '#container-sync-settings',  // Developer settings
                '#container-lang-links',     // Developer settings
                '#app-loader'                // Existing loader
            ];
            removeSelectors.forEach(sel => {
                const el = clone.querySelector(sel);
                if(el) el.remove();
            });

            // Adjust layout for App Mode
            const mainWrapper = clone.querySelector('.flex.flex-col.md\\:flex-row');
            if(mainWrapper) mainWrapper.classList.remove('h-full', 'overflow-hidden');

            const body = clone.querySelector('body');
            if(body) {
                body.classList.remove('h-screen', 'overflow-hidden');
                body.classList.add('min-h-screen', 'overflow-y-auto', 'bg-[#fdfbf7]');
            }

            const previewPanel = clone.querySelector('#preview-container');
            if(previewPanel) {
                previewPanel.className = 'w-full h-auto pb-4 p-2 md:p-8 relative z-0';
                previewPanel.style.overflow = 'visible';
            }

            // 3. Scrub Script (Remove Editor Logic)
            const scripts = clone.querySelectorAll('script');
            scripts.forEach(script => {
                let code = script.innerHTML;
                // Only modify if markers are present
                if (code.includes('EDITOR LOGIC START')) {
                    // Remove marked blocks
                    code = code.replace(/\/\/ --- EDITOR LOGIC START ---[\s\S]*?\/\/ --- EDITOR LOGIC END ---/g, '');
                    // Remove empty lines
                    code = code.replace(/^\s*[\r\n]/gm, '');
                    script.innerHTML = code;
                }
            });

            // Scrub Styles
            const styles = clone.querySelectorAll('style');
            styles.forEach(style => {
                let css = style.innerHTML;
                if (css.includes('EDITOR STYLES START')) {
                    css = css.replace(/\/\* --- EDITOR STYLES START --- \*\/[\s\S]*?\/\* --- EDITOR STYLES END --- \*\//g, '');
                    style.innerHTML = css;
                }
            });

            // 4. Inject Loading Screen
            const loaderHtml = `
            <div id="app-loader" class="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white/50 backdrop-blur-sm pointer-events-none transition-opacity duration-500">
                <div class="mb-6 animate-pulse">
                    <svg viewBox="0 0 512 512" width="60" height="60" fill="#ea580c" xmlns="http://www.w3.org/2000/svg">
                        <path d="M379.3 4.7c-6.2-6.2-16.4-6.2-22.6 0l-16 16c-6.2 6.2-6.2 16.4 0 22.6l16 16c6.2 6.2 16.4 6.2 22.6 0l16-16c6.2-6.2 6.2-16.4 0-22.6l-16-16zM281 66.7c-2.2-1.5-4.9-2.5-7.7-2.7c-.6 0-1.3-.1-1.9 0c-3.9 .2-7.4 1.7-10.1 4.2c-.9 .8-1.6 1.7-2.3 2.6c-1.7 2.4-2.7 5.3-2.9 8.5c0 .7 0 1.4 0 2.1c.2 2.2 .9 4.3 1.9 6.2l.3 .6c.3 .6 .8 1.4 1.4 2.4c1.2 2 2.9 4.8 5.1 8.2c4.4 6.7 11.1 15.5 20 24.4C302.4 141.1 330.3 160 368 160c31.2 0 56.6-10.4 73.9-20.2c8.7-5 15.6-9.9 20.4-13.8c2.4-1.9 4.3-3.6 5.7-4.9c.7-.6 1.3-1.2 1.7-1.6l.6-.5 .1-.1 .1-.1s0 0 0 0s0 0 0 0c5.9-5.8 9.5-13.9 9.5-22.8c0-17.7-14.3-32-32-32c-8.7 0-16.7 3.5-22.4 9.2c-.1 .1-.2 .2-.5 .4c-.5 .5-1.5 1.3-2.8 2.4c-2.7 2.2-6.8 5.2-12.1 8.2C399.4 90.4 384.8 96 368 96c-20.8 0-42.4-7-59.5-14.6c-8.4-3.7-15.4-7.5-20.3-10.3c-2.4-1.4-4.3-2.5-5.6-3.3c-.6-.4-1.1-.7-1.4-.9l-.3-.2zM115.2 169.6c8-6 17.9-9.6 28.8-9.6c26.5 0 48 21.5 48 48s-21.5 48-48 48l-34.2 0c-7.6 0-13.8 6.2-13.8 13.8c0 1.5 .2 2.9 .7 4.4l8 24c4.4 13.1 16.6 21.9 30.4 21.9l8.9 0 16 0c35.3 0 64 28.7 64 64s-28.7 64-64 64c-50.8 0-82.7-21.5-102.2-42.8c-9.9-10.8-16.6-21.6-20.9-29.7c-2.1-4-3.6-7.3-4.5-9.6c-.5-1.1-.8-2-1-2.5l-.2-.5c-.3-.9-.7-1.8-1.1-2.6c-1.2-2.2-2.8-4-4.7-5.4c-1.9-1.4-4.1-2.3-6.5-2.8c-1.4-.3-2.9-.3-4.4-.2c-2.5 .2-4.8 1-6.8 2.3c-1.1 .7-2.2 1.5-3.1 2.5c-2.4 2.5-4.1 5.8-4.5 9.5c-.1 .6-.1 1.1-.1 1.7c0 0 0 0 0 0c0 .8 .1 1.7 .2 2.5l0 .1c0 .3 .1 .8 .2 1.3c.2 1.1 .4 2.7 .8 4.6c.8 3.9 2 9.4 3.9 15.9c3.8 13 10.3 30.4 21.3 48C48.7 476.2 89.4 512 160 512c70.7 0 128-57.3 128-128c0-23.3-6.2-45.2-17.1-64l22.6 0c25.5 0 49.9-10.1 67.9-28.1l26.5-26.5c6-6 14.1-9.4 22.6-9.4l5.5 0c17.7 0 32 14.3 32 32l0 96c0 17.7-14.3 32-32 32c-25.7 0-41.4-12.5-51.2-25.6c-5-6.7-8.4-13.4-10.5-18.6c-1.1-2.5-1.8-4.6-2.2-6c-.2-.7-.4-1.2-.5-1.5l-.1-.2c-.3-1.3-.8-2.6-1.5-3.8c-1.1-2-2.6-3.8-4.4-5.1c-2.7-2-6-3.2-9.6-3.2l-.2 0c-8 .1-14.6 6.1-15.6 13.9c0 0 0 0 0 0c0 .3-.1 .6-.2 1.1c-.1 .9-.3 2.1-.4 3.6c-.3 3-.6 7.3-.6 12.4c0 10.1 1.1 23.9 5.8 38.1c4.8 14.3 13.4 29.3 28.6 40.7C368.7 473.3 389.3 480 416 480c53 0 96-43 96-96l0-96c0-53-43-96-96-96l-5.5 0c-25.5 0-49.9 10.1-67.9 28.1l-26.5 26.5c-6 6-14.1 9.4-22.6 9.4l-48.3 0c6.9-14.5 10.8-30.8 10.8-48c0-61.9-50.1-112-112-112c-25.2 0-48.5 8.3-67.2 22.4c-14.1 10.6-17 30.7-6.4 44.8s30.7 17 44.8 6.4z"/>
                    </svg>
                </div>
                <h2 class="text-2xl font-bold text-gray-800">Initializing...</h2>
            </div>`;
            if(body) {
                const loaderDiv = document.createElement('div');
                loaderDiv.innerHTML = loaderHtml;
                body.prepend(loaderDiv.firstElementChild);
            }

            // 5. Encrypt Config & Create State
            const exportConfig = JSON.parse(JSON.stringify(appState.config));
            if (exportConfig.syncLinks) {
                Object.keys(exportConfig.syncLinks).forEach(k => {
                    if(exportConfig.syncLinks[k]) {
                        exportConfig.syncLinks[k] = LinkSecurity.encrypt(exportConfig.syncLinks[k]);
                    }
                });
                exportConfig.linksEncrypted = true;
            }

            const stateToSave = {
                activeMonthIndex: appState.activeMonthIndex || 0,
                monthsData: appState.monthsData || [],
                todayIndex: appState.todayIndex || -1,
                details: appState.details || {},
                recurringDetails: appState.recurringDetails || {},
                manualTithis: appState.manualTithis || {},
                customSeasonDescriptions: appState.customSeasonDescriptions || {},
                images: appState.images || {},
                config: exportConfig
            };

            const title = clone.querySelector('title');
            if(title) title.innerText = appState.config.title || "My Panchang App";

            // 6. Inject Data Script
            const dataScript = document.createElement('script');
            dataScript.textContent = `window.exportedData = ${JSON.stringify(stateToSave)};`;
            if(body) body.prepend(dataScript);

            // 7. Download
            let htmlContent = "<!DOCTYPE html>" + clone.outerHTML;
            // Scrub HTML Comments
            htmlContent = htmlContent.replace(/<!--[\s\S]*?-->/g, "");

            const blob = new Blob([htmlContent], { type: "text/html" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `Panchang_Lite.html`;
            document.body.appendChild(a);

            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }
        // --- EDITOR LOGIC END ---

        function showToast(message, type = 'default') {
            // Remove existing toasts to prevent stacking
            const existing = document.querySelectorAll('.custom-toast');
            existing.forEach(t => t.remove());

            const toast = document.createElement('div');
            // Aurora Style: Animated Gradient, Light Border, Shadow
            toast.className = 'custom-toast fixed bottom-10 left-1/2 transform -translate-x-1/2 z-[300] flex items-center gap-3 px-6 py-3.5 rounded-2xl shadow-2xl shadow-orange-100/50 transition-all duration-500 ease-out translate-y-10 opacity-0 border border-white/60 bg-aurora cursor-pointer';

            // Auto-detect type
            const msgLower = message.toLowerCase();
            if (type === 'default') {
                if (msgLower.includes('error') || msgLower.includes('failed')) type = 'error';
                else if (msgLower.includes('success') || msgLower.includes('saved') || msgLower.includes('imported')) type = 'success';
            }

            // Icons & Colors
            let iconHtml = '<i class="fa-solid fa-circle-info"></i>';
            let iconColor = 'text-orange-600'; // Deeper orange for contrast on gradient
            let textColor = 'text-gray-900'; // Darker text

            if (type === 'success') {
                iconHtml = '<i class="fa-solid fa-circle-check"></i>';
                iconColor = 'text-green-600';
                toast.classList.add('border-green-200/50');
            } else if (type === 'error') {
                iconHtml = '<i class="fa-solid fa-circle-exclamation"></i>';
                iconColor = 'text-red-600';
                toast.classList.add('border-red-200/50');
            } else {
                // Info / Default
                iconHtml = '<i class="fa-solid fa-circle-info"></i>';
                iconColor = 'text-orange-600';
                toast.classList.add('border-orange-200/50');
            }

            toast.innerHTML = `
                <div class="text-lg ${iconColor} drop-shadow-sm">${iconHtml}</div>
                <div class="font-bold text-sm ${textColor} tracking-wide leading-snug">${message}</div>
            `;

            // Click to dismiss
            toast.onclick = () => {
                toast.classList.add('opacity-0', 'translate-y-10', 'scale-95');
                setTimeout(() => toast.remove(), 300);
            };

            document.body.appendChild(toast);

            // Animate In
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    toast.classList.remove('opacity-0', 'translate-y-10');
                });
            });

            // Animate Out
            setTimeout(() => {
                toast.classList.add('opacity-0', 'translate-y-10', 'scale-95');
                setTimeout(() => toast.remove(), 500);
            }, 3000);
        }

        function handleLearnMore() {
            const titleEl = document.getElementById('modal-main-title');
            if (titleEl) {
                const title = titleEl.innerText.trim();
                const query = encodeURIComponent(`${title} festival significance`);
                window.open(`https://www.google.com/search?q=${query}`, '_blank');
            }
        }

        function adjustBannerHeight(img) {
            const container = document.getElementById('modal-banner-container');
            if (!container || !img) return;

            // Algorithm: Fit height based on aspect ratio, constrained to [200px, 300px]
            // We use a timeout to ensure container has width (modal rendering)
            setTimeout(() => {
                const aspect = img.naturalHeight / img.naturalWidth;
                const currentWidth = container.offsetWidth || container.getBoundingClientRect().width || 460;

                let targetHeight = currentWidth * aspect;

                // Constraints
                const minHeight = 200;
                const maxHeight = 300;

                // Clamp
                let finalHeight = Math.max(minHeight, Math.min(targetHeight, maxHeight));

                // Apply
                container.style.minHeight = `${finalHeight}px`;
                container.style.height = `${finalHeight}px`;
            }, 50);
        }

    </script>
</body>
