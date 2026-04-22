1.  **Analyze the Requirement:**
    *   Target: All "Main Section Titles" in the `more-view` EXCEPT the static Hero section (`#grid-cards-header-container` / `#grid-cards-title`).
    *   Effect: A dynamic, multi-colored, pixel-perfect glowing underline.
    *   Dynamic Color: Extract the `Card Color` from the *very first card* of each section group.
    *   HTML Structure: Use the exact provided HTML template structure with inline `style="background-image: linear-gradient(to right, transparent, ${firstCardColor}, transparent);"` for the two underline layers (one solid, one blurred).
    *   Applicability: `appState.customCards` (grouped grid sections), `appState.scrollCards`, and `appState.bubbleCards`.

2.  **Locate the Changes:**
    *   **Custom Cards (Grouped Grid Sections):** Look at `render()` around line 6284, where `sectionHeaderHTML` is created for grouped custom cards.
    *   **Scroll Cards:** Look at `render()` around line 6320, where `scroll-cards-title` is updated, but its HTML is static. We need to modify the container for the scroll title. Wait, the HTML structure in the reference contains:
        `<div class="px-4 mb-4 tools-section-container"> <div class="inline-flex flex-col w-full"> <h2 ...> ${mainTitle} </h2> <div ...> ... </div> </div> </div>`
        The current static HTML for `#bubble-section` and `#scroll-cards-section` has a different structure:
        `<div class="max-w-screen-2xl mx-auto px-4 ... flex items-center gap-2 relative z-10"> <div class="w-2 h-2 ..."></div> <h2 ...>...</h2> </div>`
        The request says "for *all* Main Section Titles rendered from the data file (except the static Hero section)."
        We need to replace the static HTML headers for bubble and scroll sections with the dynamic one generated in JavaScript, OR update the static ones dynamically. However, since the structure provided is slightly different from the current static ones (it removes the red dot `div`), we should apply the requested template.
        Wait, for bubble and scroll sections, there's static HTML:
        ```html
        <div class="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-10 mb-0 flex items-center gap-2 relative z-10">
            <div class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-deep-red shadow-[0_0_8px_rgba(217,45,32,0.5)] shrink-0"></div>
            <h2 id="bubble-cards-title" ...>Quick Links</h2>
        </div>
        ```
        And for grouped grid sections, it's currently generated:
        ```javascript
        const sectionHeaderHTML = `
            <div class="max-w-screen-2xl mx-auto dynamic-grid-section tools-section-container mt-8 first-of-type:mt-4 md:mt-10 mb-4">
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 px-4 mb-4">${title}</h2>
                <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 dynamic-grid-container"></section>
            </div>
        `;
        ```
        If we look at the request template:
        ```html
        <div class="px-4 mb-4 tools-section-container">
            <div class="inline-flex flex-col w-full">
                <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 text-center w-full">
                    ${mainTitle}
                </h2>

                <div class="relative flex justify-center mt-3 h-[2px] w-[60%] self-center mx-auto">
                    <div class="absolute inset-0 z-10 opacity-90 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstCardColor}, transparent);"></div>
                    <div class="absolute inset-0 blur-[6px] z-0 opacity-80 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstCardColor}, transparent);"></div>
                </div>
            </div>
        </div>
        ```
        We need to update the static containers to use this new template.
        For Bubble Cards:
        `bubbleContainer.previousElementSibling` is the header. We can replace its `innerHTML`.
        For Scroll Cards:
        `scrollContainer.previousElementSibling` (or similar) is the header. We can replace its `innerHTML`.

        Let's check the HTML again for bubble and scroll sections.
        ```html
        <div id="bubble-section" class="mb-10 -mx-2 md:-mx-8" style="display: none;">
            <div id="bubble-cards-header-wrapper"> <!-- Let's add an ID or target the first child -->
            ...
        ```
        Actually, we can just replace the title updating logic in JavaScript.
        Instead of just `scrollTitle.innerText = scrollMainTitle;`, we can reconstruct the entire title container.
        Let's modify `ai tex to calnder.html` to give those title containers an ID, or simply replace the `div` that contains `scroll-cards-title`.

        Wait, the user said "We need to implement a dynamic, multi-colored, pixel-perfect glowing underline for all 'Main Section Titles' in the `more-view` (excluding the static Hero section). ... Use the exact HTML/Tailwind reference structure provided below to generate the dynamic titles in the JavaScript rendering engine".

        So in JS:
        1. **Grouped Grids:** Update `sectionHeaderHTML` generation.
        ```javascript
        const firstColor = cards[0]?.color || '#ef4444'; // fallback
        const sectionHeaderHTML = `
            <div class="max-w-screen-2xl mx-auto dynamic-grid-section tools-section-container mt-8 first-of-type:mt-4 md:mt-10 mb-4">
                <div class="px-4 mb-4 tools-section-container">
                    <div class="inline-flex flex-col w-full">
                        <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 text-center w-full">
                            ${title}
                        </h2>
                        <div class="relative flex justify-center mt-3 h-[2px] w-[60%] self-center mx-auto">
                            <div class="absolute inset-0 z-10 opacity-90 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstColor}, transparent);"></div>
                            <div class="absolute inset-0 blur-[6px] z-0 opacity-80 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstColor}, transparent);"></div>
                        </div>
                    </div>
                </div>
                <section class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 dynamic-grid-container"></section>
            </div>
        `;
        ```
        2. **Scroll Cards:**
        Currently:
        ```javascript
        if (appState.scrollCards && appState.scrollCards.length > 0) {
            const scrollMainTitle = appState.scrollCards.find(c => c.mainTitle)?.mainTitle;
            if (scrollMainTitle) {
                const scrollTitle = document.getElementById('scroll-cards-title');
                if (scrollTitle) scrollTitle.innerText = scrollMainTitle;
            }
        }
        ```
        We should replace the entire header div. Let's look at the HTML for `#scroll-cards-section`:
        ```html
        <div class="mb-10 -mx-2 md:-mx-8" id="scroll-cards-section" style="display: none;">
            <div id="scroll-cards-header-wrapper" class="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-10 mb-0 flex items-center gap-2 relative z-10">
                <div class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-deep-red shadow-[0_0_8px_rgba(217,45,32,0.5)] shrink-0"></div>
                <h2 id="scroll-cards-title" class="font-headline text-lg md:text-xl font-black tracking-tight text-gray-800 text-left">Spiritual Tools</h2>
            </div>
            <div class="flex overflow-x-auto ...">
        ```
        In JS, we can replace the contents of this wrapper, or just replace the `scroll-cards-header-wrapper` altogether.
        Actually, the memory says:
        "In `ai tex to calnder.html`, the unified layout architecture for 'Main Section Titles' in the More view requires dynamic wrappers (e.g., `.dynamic-grid-section`) to use `.tools-section-container mt-10 md:mt-12 mb-6` for consistent vertical spacing. Their titles feature a 2-layer glowing underline structure using an `inline-flex flex-col` wrapper and a `w-[110%]` relative flex line container. CRITICAL: The static Hero Section (`#grid-cards-header-container` with 'Discover Popular Tools') must remain protected and strictly exclude these universal margin and underline classes."
        "In `ai tex to calnder.html`, the 2-layer `w-[110%]` fading underline effect for dynamic 'Main Section Titles' (custom grids, scroll cards, and bubble cards) extracts its color dynamically from the `color` property of the very first card in that respective section (e.g., `appState.scrollCards[0].color`), falling back to `#ef4444`. It applies this color to both the blur layer (glow) and solid layer using an inline style: `background: linear-gradient(to right, transparent, ${firstColor}, transparent)`."

        Ah! The memory says `w-[110%]`, but the user request *now* says:
        `div class="relative flex justify-center mt-3 h-[2px] w-[60%] self-center mx-auto"`
        Wait, I MUST follow the user's explicit template:
        `<div class="relative flex justify-center mt-3 h-[2px] w-[60%] self-center mx-auto">`
        Yes, user request supersedes memory.

        Let's check the HTML for Scroll Cards and Bubble Cards headers in the current file:
        ```html
        <div class="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-10 mb-0 flex items-center gap-2 relative z-10">
            <div class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-deep-red shadow-[0_0_8px_rgba(217,45,32,0.5)] shrink-0"></div>
            <h2 id="bubble-cards-title" class="font-headline text-lg md:text-xl font-black tracking-tight text-gray-800 text-left">Quick Links</h2>
        </div>
        ```
        We should replace this with the requested template.
        For Scroll Cards:
        ```html
        <div class="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-10 mb-0 flex items-center gap-2 relative z-10">
            <div class="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-deep-red shadow-[0_0_8px_rgba(217,45,32,0.5)] shrink-0"></div>
            <h2 id="scroll-cards-title" class="font-headline text-lg md:text-xl font-black tracking-tight text-gray-800 text-left">Spiritual Tools</h2>
        </div>
        ```
        If we give these wrapper divs an ID, it's easier to replace their `innerHTML`.
        Let's modify the HTML file to add `id="bubble-header-wrapper"` and `id="scroll-header-wrapper"`.

        In JS, when rendering `appState.scrollCards`:
        ```javascript
        if (appState.scrollCards && appState.scrollCards.length > 0) {
            const scrollMainTitle = appState.scrollCards.find(c => c.mainTitle)?.mainTitle || "Spiritual Tools";
            const firstColor = appState.scrollCards[0].color || '#ef4444';
            const scrollHeaderWrapper = document.getElementById('scroll-header-wrapper');
            if (scrollHeaderWrapper) {
                scrollHeaderWrapper.innerHTML = `
                    <div class="px-4 mb-4 tools-section-container w-full">
                        <div class="inline-flex flex-col w-full">
                            <h2 class="text-xl font-bold text-gray-800 dark:text-gray-100 text-center w-full">
                                ${scrollMainTitle}
                            </h2>
                            <div class="relative flex justify-center mt-3 h-[2px] w-[60%] self-center mx-auto">
                                <div class="absolute inset-0 z-10 opacity-90 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstColor}, transparent);"></div>
                                <div class="absolute inset-0 blur-[6px] z-0 opacity-80 rounded-full" style="background-image: linear-gradient(to right, transparent, ${firstColor}, transparent);"></div>
                            </div>
                        </div>
                    </div>
                `;
            }
        }
        ```
        Same for Bubble Cards.

3.  **Create the Playwright test:**
    Verify that dynamic titles in the `more` view have the glowing underline with the dynamic color.
    We need to:
    - Open `ai tex to calnder.html`.
    - Go to the `more` view (e.g., `page.evaluate("toggleView('more')")`).
    - Verify that a dynamically generated title contains the `relative flex justify-center mt-3 h-[2px] w-[60%] self-center mx-auto` structure.
    - Check the `style` attribute of the child divs to ensure `background-image: linear-gradient...` matches the color from the first card.
