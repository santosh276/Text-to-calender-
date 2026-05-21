const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

const regexToggleView = /function toggleView\(viewName\) \{([\s\S]*?)\}/g;
let match;
let lastIndex = -1;
let matchContent = '';

// find the last occurrence of toggleView, since it's the one that controls the app logic
while ((match = regexToggleView.exec(content)) !== null) {
    lastIndex = match.index;
    matchContent = match[0];
}

if (lastIndex !== -1) {
    // We will extract the inner part and do regex replacements
    let newMatchContent = matchContent;

    // 1. Add timings Container
    newMatchContent = newMatchContent.replace(
        /const moreContainer = document.getElementById\('more-view-container'\);/,
        `const moreContainer = document.getElementById('more-view-container');\n            const timingsContainer = document.getElementById('timings-view-container');`
    );

    // 2. Add hidden toggles
    newMatchContent = newMatchContent.replace(
        /if\(moreContainer\) moreContainer\.classList\.add\('hidden'\);/g,
        `if(moreContainer) moreContainer.classList.add('hidden');\n                if(timingsContainer) timingsContainer.classList.add('hidden');`
    );

    // Add timings logic block
    newMatchContent = newMatchContent.replace(
        /\} else if \(safeView === 'more'\) \{/,
        `} else if (safeView === 'timings') {\n                if(monthContainer) monthContainer.classList.add('hidden');\n                if(yearContainer) yearContainer.classList.add('hidden');\n                if(festivalContainer) festivalContainer.classList.add('hidden');\n                if(moreContainer) moreContainer.classList.add('hidden');\n                if(timingsContainer) timingsContainer.classList.remove('hidden');\n            } else if (safeView === 'more') {`
    );

    // 3. Update icon highlighting for mobile
    newMatchContent = newMatchContent.replace(
        /\} else if \(btn\.classList\.contains\('menu-icon-btn'\)\)/,
        `} else if (btn.querySelector('.fa-clock')) {\n                    if (safeView === 'timings') {\n                        btn.classList.add('text-orange-600');\n                    } else {\n                        btn.classList.add('text-gray-400');\n                    }\n                } else if (btn.classList.contains('menu-icon-btn'))`
    );

    // 4. Update icon highlighting for desktop
    newMatchContent = newMatchContent.replace(
        /\} else if \(btn\.classList\.contains\('menu-icon-btn'\)\) \{\n\s*if \(viewName === 'more'\) \{/,
        `} else if (btn.querySelector('.fa-clock')) {\n                    if (viewName === 'timings') {\n                        btn.classList.add('text-white');\n                    } else {\n                        btn.classList.add('text-white/80');\n                    }\n                } else if (btn.classList.contains('menu-icon-btn')) {\n                    if (viewName === 'more') {`
    );


    content = content.substring(0, lastIndex) + newMatchContent + content.substring(lastIndex + matchContent.length);
    fs.writeFileSync('ai tex to calnder.html', content);
    console.log('Patched correctly');
}
