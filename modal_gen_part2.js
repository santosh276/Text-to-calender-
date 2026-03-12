                    <!-- Persistent Header -->
                    <div class="shrink-0 z-10 relative bg-white text-center pt-16 pb-4 border-b border-gray-200 shadow-sm">
                        <button onclick="closeDayModal()" class="absolute top-4 right-4 z-[100] bg-gray-100 hover:bg-gray-200 text-gray-600 w-10 h-10 rounded-full flex items-center justify-center transition shadow-lg border border-gray-200"><i class="fa-solid fa-times"></i></button>

                        <div class="w-16 h-16 mx-auto mb-2 moon-glow transform scale-90 origin-bottom">${mainIcon}</div>
                        <h2 class="text-xl font-extrabold text-deepred mb-3 tracking-tight leading-none">${daysOfWeek[dateObj.getDay()]}, ${months[monthData.month]} ${day}, ${monthData.year}</h2>
                        ${pakshaBadgeHtml}
                    </div>

                    <!-- Scrollable Body -->
                    <div class="flex-grow overflow-y-auto scrollbar-aurora scroll-smooth-fast pb-20 px-4 pt-4 space-y-4 max-w-lg mx-auto w-full transform-gpu will-change-transform overscroll-none touch-pan-y max-h-[85vh]" style="-webkit-overflow-scrolling: touch; contain: content;">

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
