with open("ai tex to calnder.html", "r") as f:
    content = f.read()

search = """                if(elD) elD.innerText = d;
                if(elH) elH.innerText = h;
                if(elM) elM.innerText = m;"""

replace = """                if(elD) elD.innerText = String(d).padStart(2, '0');
                if(elH) elH.innerText = String(h).padStart(2, '0');
                if(elM) elM.innerText = String(m).padStart(2, '0');"""

content = content.replace(search, replace)

with open("ai tex to calnder.html", "w") as f:
    f.write(content)
