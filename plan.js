const fs = require('fs');

let html = fs.readFileSync('ai tex to calnder.html', 'utf8');

// The issue states:
// Fixed the "Today" button text vertical centering by explicitly setting line-height: normal; and using flex centering.
// Fixed the close button by reducing gaps and margin adjustments to ensure it doesn't get pushed out of the container boundaries.

// Replace 1: btn-today. It needs "inline-flex items-center justify-center leading-normal" (Wait, if the code swaps "flex" with "hidden" dynamically, we need to be careful with "inline-flex" vs "flex".
// Let's change the JS to use "inline-flex" instead of "flex", or just use "flex justify-center".
// Existing JS: btnToday.classList.add('flex') ... so it's a "flex" element. We need to add "justify-center" and style="line-height: normal;".

let updatedHtml = html.replace(
    /<button onclick="jumpToToday\(\)" id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition items-center gap-2 border border-orange-100">/,
    '<button onclick="jumpToToday()" id="btn-today" class="hidden mt-3 bg-orange-50 text-orange-600 px-5 py-2 rounded-full text-xs font-bold hover:bg-orange-100 transition justify-center items-center gap-2 border border-orange-100" style="line-height: normal;">'
);

// We need to fix the JS toggling to ensure it still works correctly.
// JS: btnToday.classList.add('flex') vs remove('flex').
// It's perfectly fine to leave 'flex' in the JS toggle as long as we make sure 'justify-center' is already there. Wait, wait.
// But if 'flex' is removed, it becomes inline or whatever, but it's hidden anyway.
// But wait, the existing code says `btnToday.classList.add('flex'); btnToday.classList.remove('hidden');`.
// However, the button in HTML doesn't have 'flex' class by default. So it relies on the JS. But in the screenshot it's clearly missing 'flex' initially, but the JS adds 'flex'.

// Actually, wait. The user mentioned "flex centering" and "line-height: normal;".

// For the Close Button (I assume in the toast prompt, based on the second part of the user's message:
// "Fixed the close button by reducing gaps and margin adjustments to ensure it doesn't get pushed out of the container boundaries."

// Wait, the toast has:
// <div class="relative bg-white rounded-2xl border p-3 sm:p-4 flex items-center gap-2 sm:gap-3 w-full mx-auto box-border"

// Let's reduce gaps in the toast:
// Old: gap-2 sm:gap-3
// New: gap-1.5 sm:gap-2
// And the Set Now button padding: px-4 -> px-3
// Close button margin adjustments? Maybe adding negative margin to the close button, e.g. -mr-1 or -mr-2 so it fits.

// Let's see what the exact HTML of the toast is.
