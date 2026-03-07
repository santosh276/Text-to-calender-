from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # We need to manually inject the script's functions because
        # reading directly might be blocked if window.appState takes time
        # Lets just read the file directly into evaluate

        with open("ai tex to calnder.html", "r") as f:
            html_content = f.read()

        page.set_content(html_content)

        # Inject custom data and mock today
        page.evaluate('''() => {
            const dateStr = "2024-03-01"; // Choose fixed date for simplicity
            const year = 2024;
            const month = 2; // March (0-indexed)
            const date = 1;

            if(typeof window.appState === 'undefined') {
                window.appState = { monthsData: [], details: {}, config: {} };
            }

            // Override window.appState.monthsData to have events today
            window.appState.monthsData = [
                {
                    year: year,
                    month: month,
                    events: [
                        { date: date, symbol: '!', engName: 'Today Major Event', locName: '', monthIndex: month, year: year, _monthData: window.appState.monthsData?.[0] || {} },
                        { date: date - 1, symbol: '^', engName: 'Yesterday Event', locName: '', monthIndex: month, year: year, _monthData: window.appState.monthsData?.[0] || {} },
                        { date: date + 1, symbol: '*', engName: 'Tomorrow Event', locName: '', monthIndex: month, year: year, _monthData: window.appState.monthsData?.[0] || {} },
                        { date: date + 2, symbol: '>', engName: 'Future Event', locName: '', monthIndex: month, year: year, _monthData: window.appState.monthsData?.[0] || {} }
                    ]
                }
            ];
            window.appState.activeMonthIndex = 0;
            window.currentIsolationFilter = null;
            window.currentTagFilter = null;
            window.shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

            // Mock Date constructor to ensure it returns today
            const OriginalDate = Date;
            window.Date = class extends OriginalDate {
                constructor(...args) {
                    if (args.length === 0) {
                        return new OriginalDate(year, month, date);
                    }
                    return new OriginalDate(...args);
                }
            };
            window.Date.now = OriginalDate.now;
        }''')

        # Try to find the list directly in the DOM
        list_items = page.evaluate('''() => {
            const list = document.createElement("ul");

            // Force a render
            if (window.renderFestivalListItems && window.appState.monthsData[0].events) {
                window.renderFestivalListItems(list, window.appState.monthsData[0].events, window.appState.monthsData[0], "");
            }

            const items = list.querySelectorAll("li");
            return Array.from(items).map(li => ({
                text: li.textContent,
                className: li.className
            }));
        }''')

        print("List Items:")
        for idx, item in enumerate(list_items):
            print(f"Item {idx + 1}:")
            # Strip whitespace correctly and split to make readable output
            clean_text = ' '.join(item['text'].split())
            print(f"  Text: {clean_text}")
            print(f"  Classes: {item['className']}")

        # Verify
        today_event_found = False
        yesterday_event_found = False
        tomorrow_event_found = False
        future_event_found = False

        for item in list_items:
            if "Today Major Event" in item['text']:
                today_event_found = True
                assert "bg-red-50" in item['className'], f"Missing bg-red-50 for Today Major Event: {item['className']}"
                assert "border-red-100" in item['className'], f"Missing border-red-100 for Today Major Event: {item['className']}"
                assert "hover:bg-red-100" in item['className'], f"Missing hover:bg-red-100 for Today Major Event: {item['className']}"
            elif "Yesterday Event" in item['text']:
                yesterday_event_found = True
                assert "bg-green-50" not in item['className'], f"Yesterday event should not be highlighted: {item['className']}"
            elif "Tomorrow Event" in item['text']:
                tomorrow_event_found = True
                assert "bg-blue-50" not in item['className'], f"Tomorrow event should not be highlighted: {item['className']}"
            elif "Future Event" in item['text']:
                future_event_found = True
                assert "bg-gray-100" not in item['className'], f"Future event should not be highlighted: {item['className']}"


        if today_event_found and yesterday_event_found and tomorrow_event_found and future_event_found:
            print("\nSUCCESS: All events highlighted correctly based on current date!")
        else:
            print(f"\nERROR: Missing some events! Today: {today_event_found}, Yesterday: {yesterday_event_found}, Tomorrow: {tomorrow_event_found}, Future: {future_event_found}")

        browser.close()

if __name__ == "__main__":
    run()
