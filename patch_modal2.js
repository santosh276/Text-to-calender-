const fs = require('fs');
let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

const search = `        function closeDayModal() {
            const modal = document.getElementById('day-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            // Match the 0.25s CSS animation duration
            setTimeout(() => { modal.style.display = 'none'; }, 250);
        }`;

if (content.includes(search)) {
    console.log("Original found");
} else {
    console.log("Original NOT found. Already patched or different.");
}
