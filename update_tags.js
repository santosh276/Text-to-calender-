const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const replacement = `
            if (allTags.size > 0) {
                // Wrapper for the red texture background
                const textureWrapper = document.createElement('div');
                textureWrapper.className = "relative w-full rounded-2xl overflow-hidden bg-[#9A1B1B] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] group mb-4 p-4";

                const textureLayer = document.createElement('div');
                textureLayer.className = "absolute inset-0 opacity-10 mix-blend-overlay transition-transform duration-1000 group-hover:scale-105 pointer-events-none";
                textureLayer.style.backgroundImage = "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M20 0L40 20L20 40L0 20L20 0Z\\' fill=\\'none\\' stroke=\\'%23ffffff\\' stroke-width=\\'1\\'/%3E%3C/svg%3E')";
                textureLayer.style.backgroundSize = "40px 40px";
                textureWrapper.appendChild(textureLayer);

                const depthGradient = document.createElement('div');
                depthGradient.className = "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none";
                textureWrapper.appendChild(depthGradient);

                const tagContainer = document.createElement('div');
                tagContainer.id = "festival-tag-filters";
                tagContainer.className = "relative z-10 flex flex-wrap gap-2 justify-center";

                const sortedTags = Array.from(allTags).sort();
                sortedTags.forEach(tag => {
                    const displayTag = tag.startsWith('#') ? tag.toLowerCase() : '#' + tag.toLowerCase();
                    const isSelected = (currentTagFilter === displayTag);
                    const tagBtn = document.createElement('button');
                    // Removed extra scale-105 to not clash with outer hover (or keep if desired for individual tags)
                    tagBtn.className = \`inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-bold tracking-wide uppercase shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 \${isSelected ? 'ring-2 ring-offset-2 ring-white scale-105' : 'opacity-90 hover:opacity-100'}\`;
                    tagBtn.style.cssText = getTagStyle(displayTag);
                    tagBtn.innerText = displayTag;
                    tagBtn.onclick = () => toggleTagFilter(displayTag);
                    tagContainer.appendChild(tagBtn);
                });

                // Add a small title
                const tagsTitle = document.createElement('h3');
                tagsTitle.className = "relative z-10 text-white/90 text-xs font-semibold uppercase tracking-wider mb-3 text-center";
                tagsTitle.innerText = "Filter by Tags";
                textureWrapper.appendChild(tagsTitle);

                textureWrapper.appendChild(tagContainer);
                section.appendChild(textureWrapper);
            }
`;

html = html.replace(/if \(allTags\.size > 0\) \{[\s\S]*?section\.appendChild\(tagContainer\);\n            \}/, replacement.trim());

fs.writeFileSync('ai tex to calnder.html', html);
