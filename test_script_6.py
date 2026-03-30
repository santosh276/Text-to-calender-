with open("ai tex to calnder.html", "r") as f:
    lines = f.readlines()

# Look around line containing 'function showDharmaView'
for i, line in enumerate(lines):
    if 'function showDharmaView' in line:
        for j in range(i-5, i+15):
            print(f"{j+1}: {lines[j]}", end="")
