with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

search = """                <div class="mt-2 border-t border-gray-800 pt-3">
                    <button onclick="toggleSyntaxGuide()" class="w-full flex items-center justify-between px-4 py-2 bg-indigo-900/40 text-indigo-300 rounded-lg hover:bg-indigo-900/60 hover:text-white transition active:scale-95 transform duration-150 border border-indigo-900/50 group">
"""

replace = """                <div class="mt-2 border-t border-gray-800 pt-3 space-y-2">
                    <button onclick="openCustomCardModal()" class="w-full flex items-center justify-between px-4 py-2 bg-emerald-900/40 text-emerald-300 rounded-lg hover:bg-emerald-900/60 hover:text-white transition active:scale-95 transform duration-150 border border-emerald-900/50 group">
                        <span class="font-bold flex items-center gap-2"><i class="fa-solid fa-plus text-emerald-400"></i> Add Custom Card</span>
                    </button>
                    <button onclick="toggleSyntaxGuide()" class="w-full flex items-center justify-between px-4 py-2 bg-indigo-900/40 text-indigo-300 rounded-lg hover:bg-indigo-900/60 hover:text-white transition active:scale-95 transform duration-150 border border-indigo-900/50 group">
"""

if search in content:
    content = content.replace(search, replace)
    with open('ai tex to calnder.html', 'w') as f:
        f.write(content)
    print("Patch successful!")
else:
    print("Search string not found!")
