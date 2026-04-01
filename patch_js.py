with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# 4. Add CSS mobile overrides and desktop overrides
css_overrides = '''<style id="mobile-overrides">
        @media (max-width: 767px) {
            .mobile-hide { display: none !important; }
            .safe-area-pb { padding-bottom: 80px !important; }
            /* Make preview-container take full height on festival view */
            body.view-festivals #preview-container { height: 100% !important; max-height: none !important; }
        }
    </style>
</head>'''
if "id=\"mobile-overrides\"" not in content:
    content = content.replace("</head>", css_overrides)

# 5. Add JS to render App Festival View and update toggleView
if "function renderAppFestivalView" not in content:
    js_code = '''
        var heroCountdownInterval = null;

        function renderAppFestivalView() {
            const heroContainer = document.getElementById('hero-festival-banner');
            const gridContainer = document.getElementById('upcoming-festivals-grid');
            if (!heroContainer || !gridContainer) return;

            if (heroCountdownInterval) clearInterval(heroCountdownInterval);

            let upcomingFestivals = [];
            const today = new Date();

            if (appState.monthsData) {
                appState.monthsData.forEach(m => {
                    const mEvents = m.events.filter(e => e.symbol === '!' || e.symbol === '^' || e.symbol === '*');
                    mEvents.forEach(e => {
                        const eDate = new Date(m.year, m.month, e.date);
                        if (eDate >= new Date(today.getFullYear(), today.getMonth(), today.getDate())) {
                            const dateKey = `${m.year}-${m.month}-${e.date}`;
                            const recKey = `rec-${m.month}-${e.date}`;
                            let details = appState.details[dateKey] || appState.recurringDetails[recKey];

                            let imgUrl = '';
                            if (details && Array.isArray(details)) {
                                const dWithBanner = details.find(d => d.bannerUrl);
                                if (dWithBanner) imgUrl = resolveImageUrls(dWithBanner.bannerUrl);
                            } else if (details && details.bannerUrl) {
                                imgUrl = resolveImageUrls(details.bannerUrl);
                            }

                            upcomingFestivals.push({
                                event: e,
                                monthData: m,
                                dateObj: eDate,
                                imgUrl: imgUrl
                            });
                        }
                    });
                });
            }

            upcomingFestivals.sort((a, b) => a.dateObj - b.dateObj);

            if (upcomingFestivals.length === 0) {
                heroContainer.innerHTML = '<div class="p-6 text-center text-gray-500">No upcoming festivals found.</div>';
                gridContainer.innerHTML = '';
                return;
            }

            const heroEvent = upcomingFestivals[0];
            const hasHeroImg = heroEvent.imgUrl !== '';

            let heroBg = hasHeroImg
                ? `background-image: url('${heroEvent.imgUrl}'); background-size: cover; background-position: center;`
                : `background: linear-gradient(135deg, #1e3a8a, #581c87);`;

            heroContainer.onclick = () => openDayModal(heroEvent.event.date, heroEvent.monthData);

            heroContainer.innerHTML = `
                <div class="absolute inset-0" style="${heroBg}"></div>
                <div class="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent"></div>
                <div class="absolute top-4 right-4 opacity-10 pointer-events-none">
                    <svg width="120" height="120" viewBox="465.9997 -33.2869 1628.0002 1666.5739" fill="white">
                        <g transform="translate(-210.63 -364.11)">
                            <path d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/>
                            <path d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135 c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915 L1383.3402,445.9915z"/>
                            <path d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037 l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869 c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077 c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576 c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626 c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602 c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248 c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093 c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/>
                        </g>
                    </svg>
                </div>
                <div class="absolute bottom-0 left-0 p-5 w-full flex flex-col gap-1 z-10">
                    <div class="flex items-center gap-2 text-white/80 text-xs font-bold tracking-wider uppercase">
                        <div class="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>
                        Next Festival
                    </div>
                    <h1 class="text-3xl font-extrabold text-white leading-tight drop-shadow-md">${heroEvent.event.engName}</h1>
                    <p class="text-white/90 text-sm font-medium mb-3 drop-shadow-sm">${months[heroEvent.monthData.month]} ${heroEvent.event.date}, ${heroEvent.monthData.year}</p>

                    <div class="flex gap-3 mt-1">
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-2 min-w-[60px] text-center border border-white/30 shadow-lg">
                            <div id="hero-cd-days" class="text-xl font-bold text-white leading-none">0</div>
                            <div class="text-[10px] text-white/80 uppercase tracking-widest mt-1">Days</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-2 min-w-[60px] text-center border border-white/30 shadow-lg">
                            <div id="hero-cd-hours" class="text-xl font-bold text-white leading-none">0</div>
                            <div class="text-[10px] text-white/80 uppercase tracking-widest mt-1">Hrs</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-2 min-w-[60px] text-center border border-white/30 shadow-lg">
                            <div id="hero-cd-mins" class="text-xl font-bold text-white leading-none">0</div>
                            <div class="text-[10px] text-white/80 uppercase tracking-widest mt-1">Mins</div>
                        </div>
                    </div>
                </div>
            `;

            // Countdown Logic
            const updateCountdown = () => {
                const now = new Date();
                const diff = heroEvent.dateObj - now;

                const elD = document.getElementById('hero-cd-days');
                const elH = document.getElementById('hero-cd-hours');
                const elM = document.getElementById('hero-cd-mins');

                if (diff <= 0) {
                    if(elD) elD.innerText = "0";
                    if(elH) elH.innerText = "0";
                    if(elM) elM.innerText = "0";
                    clearInterval(heroCountdownInterval);
                    return;
                }

                const d = Math.floor(diff / (1000 * 60 * 60 * 24));
                const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
                const m = Math.floor((diff / 1000 / 60) % 60);

                if(elD) elD.innerText = d;
                if(elH) elH.innerText = h;
                if(elM) elM.innerText = m;
            };

            updateCountdown();
            heroCountdownInterval = setInterval(updateCountdown, 60000);

            gridContainer.innerHTML = '';

            upcomingFestivals.slice(1).forEach(fe => {
                const card = document.createElement('div');
                card.className = "bg-white rounded-2xl shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md hover:border-orange-200 transition-all flex flex-col justify-between h-32 relative overflow-hidden group";
                card.onclick = () => openDayModal(fe.event.date, fe.monthData);

                let bgHtml = '';
                if (fe.imgUrl) {
                    bgHtml = `
                        <div class="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity bg-cover bg-center" style="background-image: url('${fe.imgUrl}')"></div>
                        <div class="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent"></div>
                    `;
                } else {
                    bgHtml = `
                        <div class="absolute -right-4 -bottom-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                            <svg width="80" height="80" viewBox="465.9997 -33.2869 1628.0002 1666.5739" fill="black">
                                <g transform="translate(-210.63 -364.11)">
                                    <path d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/>
                                    <path d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135 c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915 L1383.3402,445.9915z"/>
                                    <path d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037 l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869 c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077 c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576 c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626 c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602 c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248 c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093 c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/>
                                </g>
                            </svg>
                        </div>
                    `;
                }

                card.innerHTML = `
                    ${bgHtml}
                    <div class="relative z-10 flex-1 flex flex-col justify-end">
                        <h3 class="font-bold text-gray-900 leading-tight mb-1 text-sm line-clamp-2">${fe.event.engName}</h3>
                        <p class="text-xs text-gray-500 font-medium">${months[fe.monthData.month]} ${fe.event.date}, ${fe.monthData.year}</p>
                    </div>
                `;
                gridContainer.appendChild(card);
            });
        }
'''
    content = content.replace("function toggleView(viewName) {", js_code + "\n        function toggleView(viewName) {")

content = content.replace(
'''        function toggleView(viewName) {
            appState.view = viewName;
            render();
        }''',
'''        function toggleView(viewName) {
            appState.view = viewName;

            // Handle bottom nav button states
            document.querySelectorAll('#mobile-bottom-nav button').forEach(btn => {
                btn.classList.replace('text-orange-600', 'text-gray-400');
            });
            const mobileMonth = document.querySelector('.nav-btn-month');
            const mobileFest = document.querySelector('.nav-btn-festivals');
            if (viewName === 'month' || viewName === 'year') {
                if(mobileMonth) mobileMonth.classList.replace('text-gray-400', 'text-orange-600');
            } else if (viewName === 'festivals') {
                if(mobileFest) mobileFest.classList.replace('text-gray-400', 'text-orange-600');
            }

            // Handle desktop top nav states
            document.querySelectorAll('#desktop-top-nav button').forEach(btn => {
                btn.classList.replace('text-white', 'text-white/80');
            });
            const desktopMonth = document.querySelector('.nav-btn-desktop-month');
            const desktopFest = document.querySelector('.nav-btn-desktop-festivals');
            if (viewName === 'month' || viewName === 'year') {
                if(desktopMonth) desktopMonth.classList.replace('text-white/80', 'text-white');
            } else if (viewName === 'festivals') {
                if(desktopFest) desktopFest.classList.replace('text-white/80', 'text-white');
            }

            // Mobile specific logic for festival view
            if (window.innerWidth < 768) {
                if (viewName === 'festivals') {
                    document.body.classList.add('view-festivals');
                } else {
                    document.body.classList.remove('view-festivals');
                }
            }

            render();
        }'''
)

# Update Render func
content = content.replace(
'''            if (appState.view === 'year') {
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
            }''',
'''            const festivalContainer = document.getElementById('app-festival-view');
            const codeEditorContainer = document.querySelector('.w-full.md\\\\:w-\\\\[35\\\\%\\\\]'); // The left editor part

            if (appState.view === 'year') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.remove('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Month View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
                if(codeEditorContainer) codeEditorContainer.classList.remove('mobile-hide');
                document.getElementById('preview-container').classList.add('safe-area-pb');
                renderYearView();
            } else if (appState.view === 'festivals') {
                if(monthContainer) monthContainer.classList.add('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.remove('hidden');

                // Hide code editor on mobile so festivals take full height
                if(codeEditorContainer) codeEditorContainer.classList.add('mobile-hide');
                document.getElementById('preview-container').classList.add('safe-area-pb');
                renderAppFestivalView();
            } else {
                if(monthContainer) monthContainer.classList.remove('hidden');
                if(yearContainer) yearContainer.classList.add('hidden');
                if(festivalContainer) festivalContainer.classList.add('hidden');
                if(viewBtnText) viewBtnText.innerText = "Year View";
                if(viewBtnIcon) viewBtnIcon.innerHTML = CALENDAR_ICON_SVG;
                if(codeEditorContainer) codeEditorContainer.classList.remove('mobile-hide');
                document.getElementById('preview-container').classList.add('safe-area-pb');
            }'''
)

# Update Initial View Logic
content = content.replace(
'''        // Mobile UI behavior
        if (window.innerWidth < 768) {
            document.querySelector('#editor').style.display = 'none'; // Ensure editor is visually hidden via CSS initially if needed.
        }''',
'''        // Mobile UI behavior
        if (window.innerWidth < 768) {
            document.querySelector('#editor').style.display = 'none'; // Ensure editor is visually hidden via CSS initially if needed.
            appState.view = 'festivals'; // Default to festivals on mobile
            toggleView('festivals');
        }'''
)


with open("ai tex to calnder.html", "w") as f:
    f.write(content)
