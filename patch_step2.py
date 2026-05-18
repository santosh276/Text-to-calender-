import re

file_path = "ai tex to calnder.html"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Modify getSpecialTimes signature and add Choghadiya logic
old_getSpecialTimes = """        function getSpecialTimes(date, sunrise, sunset) {
            if (!sunrise || !sunset) return { auspicious: [], inauspicious: [] };

            const dayOfWeek = date.getDay(); // 0 = Sunday
            const duration = (sunset - sunrise); // Duration in ms
            const part = duration / 8; // Rahu/Yama/Gulika use 8 parts
            const muhurta = duration / 15; // Auspicious timings use 15 parts"""

new_getSpecialTimes = """        function getSpecialTimes(date, sunrise, sunset, tomorrowSunrise) {
            if (!sunrise || !sunset) return { auspicious: [], inauspicious: [] };

            const dayOfWeek = date.getDay(); // 0 = Sunday

            // For Night, we use Sunset to Tomorrow's Sunrise
            const duration = isNightViewActive ? (tomorrowSunrise - sunset) : (sunset - sunrise); // Duration in ms
            const part = duration / 8; // Choghadiya, Rahu/Yama/Gulika use 8 parts
            const muhurta = duration / 15; // Auspicious timings use 15 parts

            // Choghadiya Names mapping to themes
            const chogThemeMap = {
                "Amrit": { type: "good", desc: "Best for all type of works.", grad: "bg-skyblue-gradient", dot: "dot-skyblue", key: "skyblue" },
                "Shubha": { type: "good", desc: "Good for auspicious works.", grad: "bg-emerald-gradient", dot: "dot-emerald", key: "emerald" },
                "Labh": { type: "good", desc: "Good for starting a business or learning.", grad: "bg-lavender-gradient", dot: "dot-lavender", key: "lavender" },
                "Char": { type: "neutral", desc: "Good for travel.", grad: "bg-slate-gradient", dot: "dot-slate", key: "slate" },
                "Udveg": { type: "bad", desc: "Inauspicious. Avoid new works.", grad: "bg-crimson-gradient", dot: "dot-crimson", key: "crimson" },
                "Rog": { type: "bad", desc: "Inauspicious. Avoid travel or business.", grad: "bg-rust-gradient", dot: "dot-rust", key: "rust" },
                "Kaal": { type: "bad", desc: "Inauspicious. Avoid new beginnings.", grad: "bg-gold-gradient", dot: "dot-gold", key: "gold" } // using gold visually for Kaal, though maybe dark would be better. Let's use gold as it's distinct
            };

            const daySlotsNames = {
                0: ["Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubha", "Rog", "Udveg"], // Sun
                1: ["Amrit", "Kaal", "Shubha", "Rog", "Udveg", "Char", "Labh", "Amrit"], // Mon
                2: ["Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubha", "Rog"], // Tue
                3: ["Labh", "Amrit", "Kaal", "Shubha", "Rog", "Udveg", "Char", "Labh"], // Wed
                4: ["Shubha", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal", "Shubha"], // Thu
                5: ["Char", "Labh", "Amrit", "Kaal", "Shubha", "Rog", "Udveg", "Char"], // Fri
                6: ["Kaal", "Shubha", "Rog", "Udveg", "Char", "Labh", "Amrit", "Kaal"] // Sat
            };

            const nightSlotsNames = {
                0: ["Shubha", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubha"], // Sun
                1: ["Char", "Rog", "Kaal", "Labh", "Udveg", "Shubha", "Amrit", "Char"], // Mon
                2: ["Kaal", "Labh", "Udveg", "Shubha", "Amrit", "Char", "Rog", "Kaal"], // Tue
                3: ["Udveg", "Shubha", "Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg"], // Wed
                4: ["Amrit", "Char", "Rog", "Kaal", "Labh", "Udveg", "Shubha", "Amrit"], // Thu
                5: ["Rog", "Kaal", "Labh", "Udveg", "Shubha", "Amrit", "Char", "Rog"], // Fri
                6: ["Labh", "Udveg", "Shubha", "Amrit", "Char", "Rog", "Kaal", "Labh"] // Sat
            };"""

content = content.replace(old_getSpecialTimes, new_getSpecialTimes)

# Modify the part where we add the timings to also add Choghadiya, and only add Rahu/Yama/Gulika during Day
old_inaus_start = """            // --- INAUSPICIOUS ---

            // Rahu Kalam
            const rahuStart = sunrise.getTime() + (rahuSlots[dayOfWeek] * part);
            inauspicious.push(createTimeObj(
                "Rahu Kalam", rahuStart, rahuStart + part,
                "bad", "Strictly avoid for any new undertaking.",
                "bg-rust-gradient", "dot-rust", "rust"
            ));

            // Yamaganda
            const yamaStart = sunrise.getTime() + (yamaSlots[dayOfWeek] * part);
            inauspicious.push(createTimeObj(
                "Yamaganda", yamaStart, yamaStart + part,
                "bad", "Inauspicious period. Avoid travel.",
                "bg-crimson-gradient", "dot-crimson", "crimson"
            ));

            // Gulika Kalam
            const gulikaStart = sunrise.getTime() + (gulikaSlots[dayOfWeek] * part);
            inauspicious.push(createTimeObj(
                "Gulika Kalam", gulikaStart, gulikaStart + part,
                "neutral", "Period for repeating activities.",
                "bg-slate-gradient", "dot-slate", "slate"
            ));


            // --- AUSPICIOUS ---

            // Brahma Muhurta (Sunrise - 96m to -48m)
            const brahmaStart = sunrise.getTime() - (96 * 60000);
            const brahmaEnd = sunrise.getTime() - (48 * 60000);
            auspicious.push(createTimeObj(
                "Brahma Muhurta", brahmaStart, brahmaEnd,
                "good", "Ideal for meditation and learning.",
                "bg-gold-gradient", "dot-gold", "gold"
            ));"""

new_inaus_start = """            // Calculate Choghadiya
            const baseTime = isNightViewActive ? sunset.getTime() : sunrise.getTime();
            const chogNames = isNightViewActive ? nightSlotsNames[dayOfWeek] : daySlotsNames[dayOfWeek];

            for (let i = 0; i < 8; i++) {
                let name = chogNames[i];
                let theme = chogThemeMap[name];
                let startMs = baseTime + (i * part);
                let endMs = startMs + part;
                let chogObj = createTimeObj(
                    name + " Choghadiya", startMs, endMs,
                    theme.type, theme.desc, theme.grad, theme.dot, theme.key
                );
                if (theme.type === 'good' || theme.type === 'neutral') auspicious.push(chogObj);
                else inauspicious.push(chogObj);
            }

            if (!isNightViewActive) {
                // --- INAUSPICIOUS (Day only) ---

                // Rahu Kalam
                const rahuStart = sunrise.getTime() + (rahuSlots[dayOfWeek] * part);
                inauspicious.push(createTimeObj(
                    "Rahu Kalam", rahuStart, rahuStart + part,
                    "bad", "Strictly avoid for any new undertaking.",
                    "bg-rust-gradient", "dot-rust", "rust"
                ));

                // Yamaganda
                const yamaStart = sunrise.getTime() + (yamaSlots[dayOfWeek] * part);
                inauspicious.push(createTimeObj(
                    "Yamaganda", yamaStart, yamaStart + part,
                    "bad", "Inauspicious period. Avoid travel.",
                    "bg-crimson-gradient", "dot-crimson", "crimson"
                ));

                // Gulika Kalam
                const gulikaStart = sunrise.getTime() + (gulikaSlots[dayOfWeek] * part);
                inauspicious.push(createTimeObj(
                    "Gulika Kalam", gulikaStart, gulikaStart + part,
                    "neutral", "Period for repeating activities.",
                    "bg-slate-gradient", "dot-slate", "slate"
                ));


                // --- AUSPICIOUS (Day only) ---

                // Brahma Muhurta (Sunrise - 96m to -48m)
                const brahmaStart = sunrise.getTime() - (96 * 60000);
                const brahmaEnd = sunrise.getTime() - (48 * 60000);
                auspicious.push(createTimeObj(
                    "Brahma Muhurta", brahmaStart, brahmaEnd,
                    "good", "Ideal for meditation and learning.",
                    "bg-gold-gradient", "dot-gold", "gold"
                ));"""

content = content.replace(old_inaus_start, new_inaus_start)

# We need to wrap the rest of the auspicious times in the `if (!isNightViewActive)` block as well.
# They are: Pratah Sandhya, Abhijit Muhurat, Vijaya Muhurta, Amrit Kalam (Nakshatra Based)
# Wait, let's just do a regex sub to wrap everything up to "try {" block and its catch in `if (!isNightViewActive) { ... }`
# Actually, it's easier to find the end of the `catch (e)` and close the `if (!isNightViewActive) {` block.

wrap_start = """            // Pratah Sandhya (Sunrise - 48m to Sunrise)"""
wrap_end = """            } catch (e) { console.error("Amrit Kalam Calc Failed", e); }"""

if wrap_start in content and wrap_end in content:
    idx_start = content.find(wrap_start)
    idx_end = content.find(wrap_end) + len(wrap_end)
    wrapped_content = "\n" + content[idx_start:idx_end] + "\n            }\n" # close the if block
    content = content[:idx_start] + wrapped_content + content[idx_end:]


with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)
