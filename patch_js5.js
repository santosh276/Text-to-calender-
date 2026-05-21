const fs = require('fs');

let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

// Notice that in `toggleView` in the loop over `allNavBtns`, I replaced `btn.classList.contains('menu-icon-btn')` with `btn.querySelector('.fa-clock')`, but looking at the grep, it still has `btn.classList.contains('menu-icon-btn')`.
// Let's replace the whole loop bodies.

const targetMobileNav = /\/\/ Handle mobile bottom nav button states[\s\S]*?\/\/ Handle desktop top nav button states/;
const replacementMobileNav = `// Handle mobile bottom nav button states
            const allNavBtns = document.querySelectorAll('#mobile-bottom-nav button');
            allNavBtns.forEach(btn => {
                btn.classList.remove('text-orange-600', 'text-gray-400');
                if (btn.querySelector('.fa-calendar')) {
                    if (safeView === 'month' || safeView === 'year') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.querySelector('.festivals-icon')) {
                    if (safeView === 'festivals') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.querySelector('.fa-clock')) {
                    if (safeView === 'timings') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else if (btn.classList.contains('menu-icon-btn')) {
                    if (safeView === 'more') {
                        btn.classList.add('text-orange-600');
                    } else {
                        btn.classList.add('text-gray-400');
                    }
                } else {
                    btn.classList.add('text-gray-400');
                }
            });

            // Handle desktop top nav button states`;

content = content.replace(targetMobileNav, replacementMobileNav);

const targetDesktopNav = /\/\/ Handle desktop top nav button states[\s\S]*?render\(\);/;
const replacementDesktopNav = `// Handle desktop top nav button states
            const allDesktopNavBtns = document.querySelectorAll('#desktop-top-nav button');
            allDesktopNavBtns.forEach(btn => {
                btn.classList.remove('text-white', 'text-white/80');
                if (btn.querySelector('.fa-calendar')) {
                    if (viewName === 'month' || viewName === 'year') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.festivals-icon')) {
                    if (viewName === 'festivals') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.querySelector('.fa-clock')) {
                    if (viewName === 'timings') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else if (btn.classList.contains('menu-icon-btn')) {
                    if (viewName === 'more') {
                        btn.classList.add('text-white');
                    } else {
                        btn.classList.add('text-white/80');
                    }
                } else {
                    btn.classList.add('text-white/80');
                }
            });

            render();`;

content = content.replace(targetDesktopNav, replacementDesktopNav);

fs.writeFileSync('ai tex to calnder.html', content);
console.log('toggleView icons patched');
