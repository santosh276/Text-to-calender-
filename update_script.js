const fs = require('fs');
let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

const replacement = `
                let badgeClass = "badge-glass-gray";
                let liClass = "flex gap-3 items-center p-2 rounded-lg transition-all cursor-pointer group ";
                let badgeStyle = "";
                let shadowClass = "shadow-md";

                if (symbol === '!') {
                    badgeClass = "badge-glass-red";
                    liClass += isToday ? "bg-red-50 border border-red-100 hover:bg-red-100" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #dc2626;"'; // Exact hex for red
                        shadowClass = "shadow-glow-red";
                    }
                } else if (symbol === '^') {
                    badgeClass = "badge-glass-green";
                    liClass += isToday ? "bg-green-50 border border-green-100 hover:bg-green-100" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #16a34a;"'; // Exact hex for green
                        shadowClass = "shadow-glow-green";
                    }
                } else if (symbol === '*') {
                    badgeClass = "badge-glass-blue";
                    liClass += isToday ? "bg-blue-50 border border-blue-100 hover:bg-blue-100" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #2563eb;"'; // Exact hex for blue
                        shadowClass = "shadow-glow-blue";
                    }
                } else {
                    liClass += isToday ? "bg-gray-100 border border-gray-200 hover:bg-gray-200" : "hover:bg-gray-50 border border-transparent";
                    if (isToday) {
                        badgeStyle = 'style="background-color: #4b5563;"'; // Exact hex for gray
                    }
                }

                li.className = liClass;

                const monthName = shortMonths[group.monthIndex];

                // Render Multiple Events Stacked
                const eventsHtml = group.events.map((ev, idx) => {
                    const mt = idx > 0 ? 'mt-1 pt-1 border-t border-gray-100' : '';
                    const titleClass = isToday ? 'font-extrabold text-gray-900 text-base' : 'font-bold text-gray-900 text-sm';
                    return \`
                    <div class="\${mt}">
                        <div class="\${titleClass} whitespace-normal leading-tight group-hover:text-orange-700 transition-colors">\${ev.engName}</div>
                        <div class="text-[11px] text-gray-500 font-oriya whitespace-normal leading-snug">\${ev.locName || ''}</div>
                    </div>
                    \`;
                }).join('');

                li.innerHTML = \`
                    <div class="\${badgeClass} w-10 h-10 rounded-lg flex flex-col items-center justify-center text-white \${shadowClass} shrink-0 transition-transform group-hover:scale-105" \${badgeStyle}>
                        <span class="text-[9px] font-bold uppercase leading-none tracking-wide opacity-90">\${monthName}</span>
                        <span class="text-lg font-bold leading-none mt-0.5 shadow-sm">\${group.date}</span>
                    </div>
                    <div class="flex-grow min-w-0 flex flex-col justify-center">
                        \${eventsHtml}
                    </div>
                \`;
`;

// replace block in code
const searchBlock = `
                let badgeClass = "badge-glass-gray";
                let liClass = "flex gap-3 items-center p-2 rounded-lg transition-all cursor-pointer group ";

                if (symbol === '!') {
                    badgeClass = "badge-glass-red";
                    liClass += isToday ? "bg-red-50 border border-red-100 hover:bg-red-100" : "hover:bg-gray-50 border border-transparent";
                } else if (symbol === '^') {
                    badgeClass = "badge-glass-green";
                    liClass += isToday ? "bg-green-50 border border-green-100 hover:bg-green-100" : "hover:bg-gray-50 border border-transparent";
                } else if (symbol === '*') {
                    badgeClass = "badge-glass-blue";
                    liClass += isToday ? "bg-blue-50 border border-blue-100 hover:bg-blue-100" : "hover:bg-gray-50 border border-transparent";
                } else {
                    liClass += isToday ? "bg-gray-100 border border-gray-200 hover:bg-gray-200" : "hover:bg-gray-50 border border-transparent";
                }

                li.className = liClass;

                const monthName = shortMonths[group.monthIndex];

                // Render Multiple Events Stacked
                const eventsHtml = group.events.map((ev, idx) => {
                    const mt = idx > 0 ? 'mt-1 pt-1 border-t border-gray-100' : '';
                    return \`
                    <div class="\${mt}">
                        <div class="font-bold text-gray-900 text-sm whitespace-normal leading-tight group-hover:text-orange-700 transition-colors">\${ev.engName}</div>
                        <div class="text-[11px] text-gray-500 font-oriya whitespace-normal leading-snug">\${ev.locName || ''}</div>
                    </div>
                    \`;
                }).join('');

                li.innerHTML = \`
                    <div class="\${badgeClass} w-10 h-10 rounded-lg flex flex-col items-center justify-center text-white shadow-md shrink-0 transition-transform group-hover:scale-105">
                        <span class="text-[9px] font-bold uppercase leading-none tracking-wide opacity-90">\${monthName}</span>
                        <span class="text-lg font-bold leading-none mt-0.5 shadow-sm">\${group.date}</span>
                    </div>
                    <div class="flex-grow min-w-0 flex flex-col justify-center">
                        \${eventsHtml}
                    </div>
                \`;
`;

if (content.includes(searchBlock.trim())) {
    content = content.replace(searchBlock.trim(), replacement.trim());
    fs.writeFileSync('ai tex to calnder.html', content);
    console.log("Replaced successfully!");
} else {
    console.log("Could not find the block to replace.");
}
