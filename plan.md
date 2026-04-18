1. **Update `ai tex to calnder.html` for Custom Card Modal Responsiveness:**
   - Modify the `custom-card-modal` HTML structure to match the user's requirements.
   - Adjust the modal content container `div` class to use dynamic viewport height `max-h-[85dvh]` or `max-h-[85vh]` to limit the height safely on mobile screens.
   - Reduce the overall padding inside the modal on mobile, i.e. changing the internal div padding from `p-6` to `p-4 md:p-6`.
   - Ensure the internal form area is scrollable by using `overflow-y-auto`.
   - Update font sizes, paddings and text sizes for labels, inputs and descriptions inside the modal to save space on mobile:
     - `text-sm` -> `text-xs md:text-sm` for labels.
     - `p-3` -> `p-2 md:p-3` for inputs and textareas.
     - `text-sm` -> `text-xs md:text-sm` for inputs and textareas.
   - Add extra bottom margin/padding (e.g. `mb-4 md:mb-0` or `pb-safe`) for the submit button area to clear bottom OS-level navigation bars.
   - Use `sed` or `replace_with_git_merge_diff` to make these specific changes on the lines from 2709 to 2755.

2. **Create Playwright Verification Script:**
   - I will create a python or node.js script to run playwright testing.
   - The test will emulate an iPhone viewport (e.g., iPhone 12/13 with width: 390, height: 844).
   - Load the `ai tex to calnder.html` file.
   - Trigger the `custom-card-modal` to open.
   - Assert the modal's `clientHeight` is less than or equal to `window.innerHeight`.
   - Verify the scrollability (`overflow-y: auto`) of the form area.
   - Scroll and click the "Add Card" submit button successfully.
   - Ensure the test passes successfully and confirm it.

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
   - Run `pre_commit_instructions` and follow them exactly.

4. **Submit final code.**
   - Submit changes with descriptive title, description, branch name, and commit message.
