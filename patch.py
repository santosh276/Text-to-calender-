import re

with open("ai tex to calnder.html", "r", encoding="utf-8") as f:
    content = f.read()

search = """// Add Social Links Divider & Icons
                    if (hasSocials) {
                        let socialHtml = appState.socialLinks.map(s => `
                            <a href="${s.link}" target="_blank" title="${s.title}" class="w-4 h-4 md:w-5 md:h-5 hover:scale-110 transition-transform cursor-pointer">
                                <img src="${s.image}" class="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity" alt="${s.title}"/>
                            </a>
                        `).join('');

                        footerHtml += `
                            <div class="w-full mt-8 pt-4 border-t border-white/20 flex flex-wrap items-center justify-start gap-6 md:gap-8">
                                ${socialHtml}
                            </div>
                        `;
                    }"""

replace = """// Add Social Links Divider & Icons
                    if (hasSocials) {
                        let socialHtml = appState.socialLinks.map(s => `
                            <a href="${s.link}" target="_blank" title="${s.title}" class="w-4 h-4 md:w-5 md:h-5 hover:scale-110 transition-transform cursor-pointer">
                                <img src="${s.image}" class="w-full h-full object-contain opacity-70 hover:opacity-100 transition-opacity" alt="${s.title}"/>
                            </a>
                        `).join('');

                        footerHtml += `
                            <div class="w-full mt-8 pt-4 border-t border-white/20 flex flex-wrap items-center justify-end gap-6 md:gap-8">
                                ${socialHtml}
                            </div>
                        `;
                    }"""

new_content = content.replace(search, replace)
if content == new_content:
    print("Failed to replace!")
else:
    with open("ai tex to calnder.html", "w", encoding="utf-8") as f:
        f.write(new_content)
    print("Replaced successfully!")
