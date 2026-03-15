1. **Explore the codebase:** Understand the exact instances where `localStorage` is used in `ai tex to calnder.html`. The previous grep outputs show many usages.
2. **Create IndexedDB Helper:** Write an IndexedDB class/functions (`DBHelper`) at the top of the script tag.
   - `initDB()`: creates/opens the database and object store.
   - `setItem(key, value)`: saves an item.
   - `getItem(key)`: retrieves an item.
   - `removeItem(key)`: deletes an item.
   - `clear()`: clears the object store (if needed by `localStorage.clear()` replacements).
3. **Replace `localStorage` with `DBHelper`:**
   - Update `localStorage.setItem` to `await DBHelper.setItem`.
   - Update `localStorage.getItem` to `await DBHelper.getItem`.
   - Update `localStorage.removeItem` to `await DBHelper.removeItem`.
   - Update `localStorage.clear` to `await DBHelper.clear`.
4. **Implement Async/Await:**
   - Go through functions that now use `DBHelper` and ensure they are `async`.
   - Propagate `async`/`await` up the call stack as necessary.
   - Pay special attention to initialization code which might run synchronously. Use an async IIFE or promise chain if necessary.
   - E.g., `saveConfigToStorage`, `loadStateFromCache`, `saveStateToCache`, `syncAndResetApp`, initialization logic, etc.
5. **Pre-commit checks & Tests:**
   - Verify changes via `run_in_bash_session`.
   - Call `pre_commit_instructions` and follow steps.
