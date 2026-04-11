const fs = require('fs');
let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

const customCSS = `
/* Missing Utilities for More Tab */
#more-view-container .text-deep-red { color: #D92D20 !important; }
#more-view-container .bg-deep-red { background-color: #D92D20 !important; }
#more-view-container .text-saffron { color: #FF9933 !important; }
#more-view-container .bg-saffron { background-color: #FF9933 !important; }
#more-view-container .text-gold { color: #FFD700 !important; }
#more-view-container .bg-gold { background-color: #FFD700 !important; }
#more-view-container .text-cream { color: #fdfbf7 !important; }
#more-view-container .bg-cream { background-color: #fdfbf7 !important; }
#more-view-container .border-orange-50 { border-color: #fff7ed !important; }

#more-view-container .from-deep-red { --tw-gradient-from: #D92D20 var(--tw-gradient-from-position); --tw-gradient-to: rgb(217 45 32 / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
#more-view-container .to-saffron { --tw-gradient-to: #FF9933 var(--tw-gradient-to-position) !important; }
#more-view-container .from-saffron { --tw-gradient-from: #FF9933 var(--tw-gradient-from-position); --tw-gradient-to: rgb(255 153 51 / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to) !important; }
#more-view-container .to-deep-red { --tw-gradient-to: #D92D20 var(--tw-gradient-to-position) !important; }
#more-view-container .shadow-orange-900\\/5 { --tw-shadow-color: rgb(124 45 18 / 0.05) !important; --tw-shadow: var(--tw-shadow-colored) !important; }
#more-view-container .border-white\\/10 { border-color: rgb(255 255 255 / 0.1) !important; }
#more-view-container .bg-white\\/10 { background-color: rgb(255 255 255 / 0.1) !important; }

#more-view-container.bg-mesh {
    background: radial-gradient(at 0% 0%, rgba(255, 153, 51, 0.15) 0px, transparent 50%),
                radial-gradient(at 100% 0%, rgba(217, 45, 32, 0.1) 0px, transparent 50%);
    background-color: #fdfbf7;
}

/* SCROLLING ANIMATION */
@keyframes seamless-scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
}
#more-view-container .animate-seamless-scroll {
    display: flex;
    width: max-content;
    animation: seamless-scroll 25s linear infinite;
}
#more-view-container .animate-seamless-scroll:hover {
    animation-play-state: paused;
}

/* Hide scrollbar for the swipeable carousel */
#more-view-container .no-scrollbar::-webkit-scrollbar {
    display: none;
}
#more-view-container .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

#more-view-container .font-headline { font-family: "Roboto", sans-serif; }
#more-view-container .font-body { font-family: "Inter", sans-serif; }
`;

html = html.replace('</style>\n<style>', '</style>\n<style>\n' + customCSS);
fs.writeFileSync('ai tex to calnder.html', html);
