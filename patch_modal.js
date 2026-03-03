const fs = require('fs');
let content = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The original closeDayModal
const search = `        function closeDayModal() {
            const modal = document.getElementById('day-modal');
            modal.classList.add('modal-hidden');
            unlockScroll();
            // Match the 0.25s CSS animation duration
            setTimeout(() => { modal.style.display = 'none'; }, 250);
        }`;

// The replacement
const replace = `        function closeDayModal() {
            const modal = document.getElementById('day-modal');
            modal.classList.add('modal-hidden');

            // Match the 0.15s CSS animation duration defined in .modal-hidden
            setTimeout(() => {
                modal.style.display = 'none';
                // Unlock scroll AFTER animation finishes to prevent background repaint jank
                unlockScroll();

                // Clear the heavyweight HTML to free memory immediately upon close
                const modalContent = modal.querySelector('.modal-content');
                if (modalContent) modalContent.innerHTML = '';
            }, 150);
        }`;

content = content.replace(search, replace);
fs.writeFileSync('ai tex to calnder.html', content);
