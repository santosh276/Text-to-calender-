1. **HTML Updates**:
   - Before `<div id="sec-panchang"`, add the new `sec-astro-cycle` section with `order-4`, and change `sec-panchang` order to `order-5`.
2. **Javascript Updates**:
   - In `renderPanchang`, modify the code to check for `sec-astro-cycle` and `astro-cycle-content`.
   - Append `timelineContainer` (Sun/Moon cards) and `cycleWrapper` (Day cycle card) to `astro-cycle-content` instead of `list` (`panchang-list`).
   - Add logic to show/hide `sec-astro-cycle` based on if sunTimes exists.
3. **Language Data**:
   - Update `langData` to add `"astro_cycles_header": "Astro Cycles"` to the `en` object and its respective equivalents if needed.
4. **Pre-commit**:
   - Ensure proper testing, verification, review, and reflection are done using a Playwright script.
