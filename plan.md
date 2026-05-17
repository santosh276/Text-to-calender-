1. **Add `solarMonths` to `langData`**
   - Update the `langData` object in `ai tex to calnder.html`.
   - Add `solarMonths` array to all 12 supported languages (`en`, `hi`, `or`, `bn`, `mr`, `gu`, `pa`, `ta`, `te`, `kn`, `ml`, `as`) properly translated according to the Sankranti mappings (Mesha=0->Vaishakha).
2. **Add `getSolarMonthDay` to `VedicAstro`**
   - In the `VedicAstro` module returned object, add the `getSolarMonthDay: function(dateObj)` method using the exact logic provided in the issue description.
3. **Update `renderPanchang`**
   - Inside `renderPanchang(data)`, before generating the `<div class="panchang-grid">`, call `VedicAstro.getSolarMonthDay(calcDate)`.
   - Extract `solarMonthName` (using the new `langObj.solarMonths` array, and `% 12` to ensure bounds, although index comes from rashi 0-11). Note that Sankranti (Mesha=0->Vaishakha). Wait, `langData.hi.solarMonths[0]` is "वैशाख", which maps to Mesha. So the mapping is straight `langObj.solarMonths[monthIndex]`.
   - Extract `solarDayNum` and pass it through `toNativeNum(solarInfo.day, currentLang)`.
   - Insert the provided Sub-Card HTML block right BEFORE the `<div class="panchang-grid">`.
4. **Update `generateDayModalHTML`**
   - Inside `generateDayModalHTML(day, monthData)`, calculate `solarInfo` using `VedicAstro.getSolarMonthDay(dateObj)`.
   - Extract localized `solarMonthName` and `solarDayNum` (`toNativeNum`).
   - Insert the provided sub-card right BEFORE the `<!-- 2. Panchang Details -->` block in the modal.
5. **Update Syntax Guide Labels**
   - Locate the `::: labels` block in the HTML and append:
     ```
     Solar Date : ସୌର ତାରିଖ
     Day : ଦିନ
     ```
6. **Complete pre-commit steps**
   - Complete pre-commit steps to make sure proper testing, verifications, reviews and reflections are done.
7. **Submit the change**
   - Once all tests pass and are verified visually using Playwright, I will submit the change.
