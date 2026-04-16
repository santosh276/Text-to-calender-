import re

with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

modal_html = """
    <!-- Custom Card Modal -->
    <div id="custom-card-modal" class="fixed inset-0 z-[80] flex items-center justify-center p-4 modal-hidden" style="display: none;">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" onclick="closeCustomCardModal()"></div>
        <div class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] modal-content animate-slide-up">
            <div class="bg-gradient-to-r from-emerald-600 to-teal-700 p-4 shrink-0 flex justify-between items-center text-white">
                <h3 class="font-headline font-bold text-lg"><i class="fa-solid fa-plus mr-2"></i>Add Custom Card</h3>
                <button onclick="closeCustomCardModal()" class="w-8 h-8 flex items-center justify-center rounded-full bg-black/20 hover:bg-black/40 transition">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>

            <div class="p-5 overflow-y-auto space-y-4">
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Title</label>
                    <input type="text" id="cc-title" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="e.g. My Custom Tool">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Description</label>
                    <textarea id="cc-desc" rows="2" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="A short description..."></textarea>
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Image Link</label>
                    <input type="text" id="cc-image" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="https://example.com/image.jpg">
                </div>
                <div>
                    <label class="block text-sm font-bold text-gray-700 mb-1">Hyperlink</label>
                    <input type="text" id="cc-link" class="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500" placeholder="https://example.com">
                </div>
            </div>

            <div class="p-4 bg-gray-50 border-t border-gray-100 shrink-0 flex justify-end gap-3">
                <button onclick="closeCustomCardModal()" class="px-4 py-2 text-gray-600 font-medium hover:bg-gray-200 rounded-lg transition">Cancel</button>
                <button onclick="submitCustomCard()" class="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-md transition transform active:scale-95">Add Card</button>
            </div>
        </div>
    </div>
"""

# Insert right before link-modal
search = '    <div id="link-modal"'
if search in content:
    content = content.replace(search, modal_html + "\n" + search)
    with open('ai tex to calnder.html', 'w') as f:
        f.write(content)
    print("Modal patch successful!")
else:
    print("Search string for link-modal not found!")
