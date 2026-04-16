with open('ai tex to calnder.html', 'r') as f:
    content = f.read()

search = """                    <!-- NEW: Quick Start Tutorial -->
                    <div class="guide-section">
                        <div class="guide-title text-green-400"><i class="fa-solid fa-play"></i> Quick Start Tutorial</div>"""

replace = """                    <!-- NEW: Custom Card Syntax -->
                    <div class="guide-section">
                        <div class="guide-title text-indigo-400"><i class="fa-solid fa-layer-group"></i> Custom Card Syntax</div>
                        <div class="code-block whitespace-pre-wrap font-mono text-sm">::: More tab
Hyperlink: [Your Link]
Title: [Your Title]
Description: [Your Description]
Image Link: [Your Image URL]
:::</div>
                    </div>

                    <!-- NEW: Quick Start Tutorial -->
                    <div class="guide-section">
                        <div class="guide-title text-green-400"><i class="fa-solid fa-play"></i> Quick Start Tutorial</div>"""

if search in content:
    content = content.replace(search, replace)
    with open('ai tex to calnder.html', 'w') as f:
        f.write(content)
    print("Patch successful!")
else:
    print("Search string not found!")
