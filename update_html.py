with open("ai tex to calnder.html", "r") as f:
    content = f.read()

import re

search = """            heroContainer.innerHTML = `
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
                            <div id="hero-cd-days" class="text-xl font-bold text-white leading-none">--</div>
                            <div class="text-[9px] text-white/70 font-semibold uppercase mt-1">Days</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-2 min-w-[60px] text-center border border-white/30 shadow-lg">
                            <div id="hero-cd-hours" class="text-xl font-bold text-white leading-none">--</div>
                            <div class="text-[9px] text-white/70 font-semibold uppercase mt-1">Hours</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl p-2 min-w-[60px] text-center border border-white/30 shadow-lg">
                            <div id="hero-cd-mins" class="text-xl font-bold text-white leading-none">--</div>
                            <div class="text-[9px] text-white/70 font-semibold uppercase mt-1">Mins</div>
                        </div>
                    </div>
                </div>
            `;"""

replace = """            heroContainer.innerHTML = `
                <div class="absolute inset-0" style="${heroBg}"></div>
                <div class="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/60 to-transparent"></div>
                <div class="absolute right-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none pr-8">
                    <svg width="240" height="240" viewBox="465.9997 -33.2869 1628.0002 1666.5739" fill="white">
                        <g transform="translate(-210.63 -364.11)">
                            <path d="M1674.7654,364.11l-142.1121,149.3132l149.3608,137.2957l144.4966-146.9288L1674.7654,364.11z"/>
                            <path d="M1383.3402,445.9915c0,0,158.9464,500.9695,618.9987,84.3135 c2.4321,2.3845,125.2305,163.7629,127.6626,163.7629c-178.2604,199.9108-722.5786,308.3072-746.6614-248.0764L1383.3402,445.9915 L1383.3402,445.9915z"/>
                            <path d="M959.3881,1021.6413L848.6072,821.7305c566.8275-380.5555,873.5131,168.5795,464.869,416.7037 l132.4791,52.9821c158.1831-6.4856,135.4357-194.5697,303.4906-346.8397c63.4258-76.3018,512.224-176.6388,522.6676,464.869 c-26.2285,582.1245-711.3716,541.9341-597.3484,0c40.1299,209.1467,195.2008,217.5673,316.8134,161.9077 c184.0975-86.0382,180.8688-229.8975,181.6078-288.2218c1.814-143.1672-67.2197-350.2632-245.5282-222.9576 c-91.4915,65.3215-95.5204,136.4851-113.2128,171.0116c-17.6449,34.5266-73.4406,169.1992-313.1237,127.6626 c223.6121,462.3416-146.6904,585.0922-183.0292,592.5315c-93.8989,47.2594-665.6382-3.8627-604.5967-739.4602 c48.9763,385.3719,242.7353,591.2438,551.6147,513.0345c233.8176-59.1814,232.8162-480.1293-127.6625-342.0232l-81.8815-255.3248 c-3.4813-10.8254,115.9788,30.3777,238.4432-2.3844c99.4309-26.6105,181.5985-220.894-79.4971-221.6093 c-114.405-0.2861-170.2009,78.6862-255.3251,118.0293L959.3881,1021.6413z"/>
                        </g>
                    </svg>
                </div>
                <div class="absolute inset-0 p-6 flex flex-col justify-center w-full z-10">
                    <div class="flex items-center gap-2 text-white/70 text-xs font-bold tracking-widest uppercase mb-1">
                        <div class="w-2 h-2 rounded-full bg-gray-400"></div>
                        NEXT FESTIVAL
                    </div>
                    <h1 class="text-3xl md:text-4xl font-extrabold text-white leading-tight drop-shadow-md mb-1">${heroEvent.event.engName}</h1>
                    <p class="text-white/80 text-base font-medium mb-6 drop-shadow-sm">${months[heroEvent.monthData.month]} ${heroEvent.event.date}, ${heroEvent.monthData.year}</p>

                    <div class="flex gap-3">
                        <div class="bg-white/20 backdrop-blur-md rounded-xl w-[72px] h-[72px] flex flex-col items-center justify-center shadow-lg">
                            <div id="hero-cd-days" class="text-xl font-bold text-white leading-none">--</div>
                            <div class="text-[9px] text-white/70 font-semibold uppercase mt-1">Days</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl w-[72px] h-[72px] flex flex-col items-center justify-center shadow-lg">
                            <div id="hero-cd-hours" class="text-xl font-bold text-white leading-none">--</div>
                            <div class="text-[9px] text-white/70 font-semibold uppercase mt-1">Hours</div>
                        </div>
                        <div class="bg-white/20 backdrop-blur-md rounded-xl w-[72px] h-[72px] flex flex-col items-center justify-center shadow-lg">
                            <div id="hero-cd-mins" class="text-xl font-bold text-white leading-none">--</div>
                            <div class="text-[9px] text-white/70 font-semibold uppercase mt-1">Mins</div>
                        </div>
                    </div>
                </div>
            `;"""

content = content.replace(search, replace)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
