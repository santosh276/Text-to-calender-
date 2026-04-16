with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

js_code = """
        // --- CUSTOM CARD LOGIC ---
        function openCustomCardModal() {
            const modal = document.getElementById('custom-card-modal');
            modal.style.display = 'flex';
            // slight delay to allow display to process before removing hidden class for animation
            setTimeout(() => {
                modal.classList.remove('modal-hidden');
            }, 10);
        }

        function closeCustomCardModal() {
            const modal = document.getElementById('custom-card-modal');
            modal.classList.add('modal-hidden');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300); // Wait for transition
        }

        function submitCustomCard() {
            const title = document.getElementById('cc-title').value.trim();
            const desc = document.getElementById('cc-desc').value.trim();
            const image = document.getElementById('cc-image').value.trim();
            const link = document.getElementById('cc-link').value.trim();

            if (!title || !link) {
                alert('Title and Hyperlink are required.');
                return;
            }

            const newCard = { title, desc, image, link };

            // Save to localStorage
            let cards = [];
            try {
                const stored = localStorage.getItem('custom_tools_cards');
                if (stored) cards = JSON.parse(stored);
            } catch(e) {}

            cards.push(newCard);
            localStorage.setItem('custom_tools_cards', JSON.stringify(cards));

            // Render and close
            renderCustomCards();
            closeCustomCardModal();

            // Clear inputs
            document.getElementById('cc-title').value = '';
            document.getElementById('cc-desc').value = '';
            document.getElementById('cc-image').value = '';
            document.getElementById('cc-link').value = '';
        }

        function renderCustomCards() {
            const gridContainer = document.querySelector('#more-view-container .grid');
            if (!gridContainer) return;

            // First remove any existing dynamically added custom cards
            const existingCustom = gridContainer.querySelectorAll('.custom-card-generated');
            existingCustom.forEach(el => el.remove());

            let cards = [];
            try {
                const stored = localStorage.getItem('custom_tools_cards');
                if (stored) cards = JSON.parse(stored);
            } catch(e) {}

            cards.forEach(card => {
                const cardHTML = `
                <a href="${card.link}" target="_blank" class="custom-card-generated block bg-[#0f766e] rounded-xl p-4 md:p-6 flex flex-col justify-between overflow-hidden relative group h-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
                    <div class="relative z-10 flex-1 flex flex-col h-full w-full">
                        <div class="w-full h-32 md:h-40 mb-3 md:mb-4 rounded-lg overflow-hidden shadow-sm relative shrink-0 border border-white/10 flex items-center justify-center bg-black/20">
                            ${card.image ? `<img src="${card.image}" alt="${card.title}" class="w-full h-full object-cover" />` : `<i class="fa-solid fa-link text-4xl text-white/50"></i>`}
                        </div>
                        <h3 class="font-headline text-lg md:text-2xl font-extrabold text-white mb-2 tracking-tight leading-tight">${card.title}</h3>
                        ${card.desc ? `<p class="text-white/80 text-xs md:text-sm leading-snug line-clamp-2">${card.desc}</p>` : ''}
                        <div class="relative z-10 mt-4 md:mt-auto w-full">
                            <button class="w-full bg-white/10 text-white border border-white/20 font-bold text-xs md:text-sm py-2.5 rounded-lg text-center shadow-sm hover:bg-white/20 transition-colors backdrop-blur-sm">Open Link</button>
                        </div>
                    </div>
                </a>`;

                gridContainer.insertAdjacentHTML('beforeend', cardHTML);
            });
        }

        // --- CUSTOM CARD LOGIC END ---
"""

# Insert JS before "function openClearModal()" or around there
search = "        function openClearModal() {"
if search in content:
    content = content.replace(search, js_code + "\n" + search)
    with open('ai tex to calnder.html', 'w') as f:
        f.write(content)
    print("JS patch successful!")
else:
    print("Search string for openClearModal not found!")
