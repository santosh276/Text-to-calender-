with open("ai tex to calnder.html", "r") as f:
    content = f.read()

content = content.replace(
'''            // Mobile specific logic for festival view
            if (window.innerWidth < 768) {
                if (viewName === 'festivals') {
                    document.body.classList.add('view-festivals');
                } else {
                    document.body.classList.remove('view-festivals');
                }
            }''',
'''            // Mobile specific logic for festival view
            if (window.innerWidth < 768) {
                const editorPanel = document.getElementById('editor-panel');
                if (viewName === 'festivals') {
                    document.body.classList.add('view-festivals');
                    if(editorPanel) editorPanel.style.display = 'none';
                } else {
                    document.body.classList.remove('view-festivals');
                    if(editorPanel) editorPanel.style.display = 'flex';
                }
            }'''
)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
