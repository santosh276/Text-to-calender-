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
