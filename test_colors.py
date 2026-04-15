import re

with open("ai tex to calnder.html", "r") as f:
    html = f.read()

# Let's inspect the cards.
# Wait, the prompt asked to locate "Festivals & Vrats", "Muhurat & Auspicious", "Horoscope", and "Odia Panjika".
# But the HTML shows: "Horoscope", "Puja Vidhi", "Kundli", and "Daily Panchang".
