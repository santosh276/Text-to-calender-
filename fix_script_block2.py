import re

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Let's add the missing script
helper_script = """
<script>
let isDharmaInitialized = false;

function showCalendarView() {
    document.getElementById('calendar-app-view').classList.remove('hidden');
    document.getElementById('dharma-app-view').classList.add('hidden');
    document.getElementById('btn-calendar-view').classList.remove('text-white', 'hover:bg-white/20');
    document.getElementById('btn-calendar-view').classList.add('bg-white', 'text-deep-red');
    document.getElementById('btn-dharma-view').classList.remove('bg-white', 'text-deep-red');
    document.getElementById('btn-dharma-view').classList.add('text-white', 'hover:bg-white/20');
}

function showDharmaView() {
    document.getElementById('calendar-app-view').classList.add('hidden');
    document.getElementById('dharma-app-view').classList.remove('hidden');

    document.getElementById('btn-dharma-view').classList.remove('text-white', 'hover:bg-white/20');
    document.getElementById('btn-dharma-view').classList.add('bg-white', 'text-deep-red');
    document.getElementById('btn-calendar-view').classList.remove('bg-white', 'text-deep-red');
    document.getElementById('btn-calendar-view').classList.add('text-white', 'hover:bg-white/20');

    if (!isDharmaInitialized) {
        if(typeof initDharmaPlayer === 'function') initDharmaPlayer();
        isDharmaInitialized = true;
    }
}
</script>
"""

# Checking if script is there
if "let isDharmaInitialized" not in content:
    body_end_idx = content.rfind('</body>')
    content = content[:body_end_idx] + helper_script + "\n" + content[body_end_idx:]
    with open("ai tex to calnder.html", "w") as f:
        f.write(content)
    print("Added missing script block.")
else:
    print("Already added.")
