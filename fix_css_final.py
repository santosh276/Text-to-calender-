with open('ai tex to calnder.html', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace previous buggy injection
import re
content = re.sub(r'<style id="sadhana-custom-css">.*?</style>', '', content, flags=re.DOTALL)

custom_css = """
<style id="sadhana-custom-css">
    /* Missing Custom Classes for Sadhana Tool Dashboard */
    .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
    .from-orange-400 { --tw-gradient-from: #fb923c; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(251, 146, 60, 0)); }
    .to-red-500 { --tw-gradient-to: #ef4444; }
    .from-green-500 { --tw-gradient-from: #22c55e; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(34, 197, 94, 0)); }
    .to-emerald-600 { --tw-gradient-to: #059669; }
    .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }

    .shadow-orange-200 { --tw-shadow-color: #fed7aa; --tw-shadow: var(--tw-shadow-colored); }
    .shadow-orange-100\\/50 { --tw-shadow-color: rgba(255, 237, 213, 0.5); --tw-shadow: var(--tw-shadow-colored); }
    .shadow-red-100\\/50 { --tw-shadow-color: rgba(254, 226, 226, 0.5); --tw-shadow: var(--tw-shadow-colored); }
    .shadow-indigo-100\\/50 { --tw-shadow-color: rgba(224, 231, 255, 0.5); --tw-shadow: var(--tw-shadow-colored); }
    .shadow-blue-100\\/50 { --tw-shadow-color: rgba(219, 234, 254, 0.5); --tw-shadow: var(--tw-shadow-colored); }
    .shadow-green-100\\/50 { --tw-shadow-color: rgba(220, 252, 231, 0.5); --tw-shadow: var(--tw-shadow-colored); }

    .border-orange-100 { border-color: #ffedd5; }
    .border-red-100 { border-color: #fee2e2; }
    .border-indigo-100 { border-color: #e0e7ff; }
    .border-blue-100 { border-color: #dbeafe; }
    .border-green-100 { border-color: #dcfce7; }
    .border-red-50\\/50 { border-color: rgba(254, 242, 242, 0.5); }
    .border-indigo-50\\/50 { border-color: rgba(238, 242, 255, 0.5); }

    .text-orange-600 { color: #ea580c; }
    .text-indigo-400 { color: #818cf8; }
    .text-amber-500 { color: #f59e0b; }

    .bg-amber-50 { background-color: #fffbeb; }
    .bg-indigo-50 { background-color: #eef2ff; }
    .bg-blue-50 { background-color: #eff6ff; }

    .w-24 { width: 6rem; }
    .h-24 { height: 6rem; }
    .w-36 { width: 9rem; }
    .h-36 { height: 9rem; }
    .w-48 { width: 12rem; }
    .h-48 { height: 12rem; }
    .h-1\\.5 { height: 0.375rem; }

    .min-h-\\[4rem\\] { min-height: 4rem; }

    .stroke-current { stroke: currentColor; }
    .stroke-8 { stroke-width: 8; }

    .from-red-50 { --tw-gradient-from: #fef2f2; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to, rgba(254, 242, 242, 0)); }
    .to-white { --tw-gradient-to: #ffffff; }

    .ring-offset-2 { --tw-ring-offset-width: 2px; }
    .ring-green-500 { --tw-ring-color: #22c55e; }
</style>
"""

content = content.replace('</head>', f'{custom_css}\n</head>')

with open('ai tex to calnder.html', 'w', encoding='utf-8') as f:
    f.write(content)
