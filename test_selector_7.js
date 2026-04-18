const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const html = fs.readFileSync('/app/ai tex to calnder.html', 'utf8');
const dom = new JSDOM(html);
const document = dom.window.document;

function renderBubbleCard(cardData) {
    const container = document.getElementById('bubble-container');
    if (!container) return;

    const bgColor = cardData.color || '#0d9488';

    const cardHTML = `
    <a href="${cardData.link}" target="_blank" class="snap-start shrink-0 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 hover:-translate-y-1 group">
        <div class="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-md border-2 border-white/50 overflow-hidden mb-2 group-hover:shadow-lg transition-all" style="background-color: ${bgColor};">
            ${cardData.image ? `<img src="${cardData.image}" class="w-full h-full object-cover rounded-full" />` : `<i class="fa-solid fa-link text-2xl text-white"></i>`}
        </div>
        <span class="text-center text-xs md:text-sm font-bold text-gray-800 tracking-tight max-w-[80px] md:max-w-[100px] leading-tight group-hover:text-orange-600 transition-colors">${cardData.title}</span>
    </a>
    `;

    const spacer = container.querySelector('.shrink-0.w-1.md\\:w-4');
    if (spacer) {
        spacer.insertAdjacentHTML('beforebegin', cardHTML);
    } else {
        container.insertAdjacentHTML('beforeend', cardHTML);
    }
}

renderBubbleCard({ title: 'My Quick Link', link: 'https://example.com', image: '', color: '#ff0000', mainTitle: 'Quick Links' });

const moreContainer = document.getElementById('more-view-container');
const cardElements = moreContainer.querySelectorAll('.snap-start, .grid > div, .grid > a');
let results = [];
let query = 'quick';

cardElements.forEach(el => {
    let titleEl = el.querySelector('h3, span.font-bold, .font-headline, .font-bold.text-\\[15px\\]');
    let altTitleEl = el.querySelector('span.text-center.text-xs.md\\:text-sm.font-bold.text-gray-800');
    let descEl = el.querySelector('p, span.text-\\[11px\\]');

    let title = '';
    if (titleEl) {
        title = titleEl.textContent.trim();
    } else if (altTitleEl) {
        title = altTitleEl.textContent.trim();
    } else if (el.closest('#bubble-container')) {
        let span = el.querySelector('span');
        if (span) title = span.textContent.trim();
    }

    if (title) {
        let desc = descEl ? descEl.textContent.trim() : '';
        let href = el.getAttribute('href');

        if (!href && el.tagName.toLowerCase() !== 'a') {
            const aTag = el.querySelector('a');
            if (aTag) href = aTag.getAttribute('href');
        }

        if (!href) href = '#'; // Fallback if no href found

        let mainTitle = '';
        if (el.closest('#bubble-container')) {
            const h2 = document.getElementById('bubble-cards-title');
            if (h2) mainTitle = h2.textContent.trim();
        } else if (el.closest('.flex.overflow-x-auto')) {
            const h2 = document.getElementById('scroll-cards-title');
            if (h2) mainTitle = h2.textContent.trim();
        } else if (el.closest('section.grid')) {
            const h2 = document.getElementById('grid-cards-title');
            if (h2) mainTitle = h2.textContent.trim();
        }

        if (title.toLowerCase().includes(query) || (desc && desc.toLowerCase().includes(query)) || (mainTitle && mainTitle.toLowerCase().includes(query))) {
            results.push({ title, desc, href, mainTitle });
        }
    }
});

console.log(results);
