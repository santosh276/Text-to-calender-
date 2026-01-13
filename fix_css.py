
css_to_add = ".w-1{width:.25rem}.h-1{height:.25rem}.bg-red-500{--tw-bg-opacity:1;background-color:rgb(239 68 68/var(--tw-bg-opacity,1))}.bg-green-500{--tw-bg-opacity:1;background-color:rgb(34 197 94/var(--tw-bg-opacity,1))}.bg-blue-500{--tw-bg-opacity:1;background-color:rgb(59 130 246/var(--tw-bg-opacity,1))}.bg-gray-400{--tw-bg-opacity:1;background-color:rgb(156 163 175/var(--tw-bg-opacity,1))}"

with open("ai tex to calnder.html", "r") as f:
    content = f.read()

# Replace the first occurrence of </style> with new_css + </style>
# The first </style> is for the tailwind block.
new_content = content.replace("</style>", css_to_add + "</style>", 1)

with open("ai tex to calnder.html", "w") as f:
    f.write(new_content)
