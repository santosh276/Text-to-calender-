1. **Locate `renderFestivals` in `ai tex to calnder.html`**: Look for the "Up Next" festival rendering block.
2. **Update the `upNextEvent` calculation**:
   - If `upNextEvent` is `null` after checking the current month (i.e., we are in the current month or a future month, but there are no more events in the current viewed month), look through `appState.monthsData`.
   - Filter `appState.monthsData` for months that are strictly after the current `data.year` and `data.month`.
   - Sort these future months chronologically.
   - Iterate through them to find the first event with symbol `!`, `^`, or `*`.
   - If found, assign this event to `upNextEvent` and also store the month's data in a variable like `upNextEventMonthData` so that the event links to the correct month.
3. **Update the rendering logic**:
   - Use `upNextEventMonthData` (fallback to `data` if not looking ahead) when creating the `Date` object for the event (`eventDate`).
   - Use `upNextEventMonthData.month` for the short month string display (`shortMonths[eventMonthData.month]`).
   - Pass `eventMonthData` to `openDayModal` so that clicking the "Up Next" card opens the correct day.
4. **Pre-commit Checks**: Run `pre_commit_instructions` before submitting to ensure we meet all the pre-commit instructions.
5. **Submit**: After confirming the changes are working, commit the changes using `submit`.
