const mockEvents = [
    { date: 15, monthIndex: 0, year: 2024, engName: "Test Holiday Event", locName: "", symbol: "*" },
    { date: 20, monthIndex: 0, year: 2024, engName: "Test Normal Event", locName: "", symbol: "*" }
];

const mockAppState = {
    monthsData: [
        { month: 0, year: 2024, events: [] }
    ],
    details: {
        "2024-0-15": [
            { tags: ["#holiday"] }
        ]
    },
    recurringDetails: {}
};

function simulateFilter(events, appState, currentTagFilter, currentIsolationFilter, query) {
    return events.filter(e => {
        const matchesQuery = (e.engName.toLowerCase().includes(query) || (e.locName && e.locName.toLowerCase().includes(query)));
        const matchesFilter = (currentIsolationFilter === null) || (e.symbol === currentIsolationFilter);

        let matchesTag = true;
        if (currentTagFilter) {
            matchesTag = false;
            const eMonthData = appState.monthsData.find(m => m.month === e.monthIndex && m.year === e.year);
            if (eMonthData) {
                const dateKey = `${e.year}-${e.monthIndex}-${e.date}`;
                const recKey = `rec-${e.monthIndex}-${e.date}`;
                const detailArr = (appState.details && appState.details[dateKey]) || (appState.recurringDetails && appState.recurringDetails[recKey]);
                if (detailArr) {
                    for (const d of detailArr) {
                        if (d.tags) {
                            for (const t of d.tags) {
                                const tagStr = t.startsWith('#') ? t.toLowerCase() : '#' + t.toLowerCase();
                                if (tagStr === currentTagFilter) {
                                    matchesTag = true;
                                    break;
                                }
                            }
                        }
                        if (matchesTag) break;
                    }
                }
            }
        }
        return matchesQuery && matchesFilter && matchesTag;
    });
}

console.log("Initial state (no filters):");
let result = simulateFilter(mockEvents, mockAppState, null, null, "");
console.log("Filtered events length:", result.length);
console.log("Events:", result.map(e => e.engName));

console.log("\nApplying #holiday tag filter:");
result = simulateFilter(mockEvents, mockAppState, "#holiday", null, "");
console.log("Filtered events length:", result.length);
console.log("Events:", result.map(e => e.engName));

if (result.length === 1 && result[0].engName === "Test Holiday Event") {
    console.log("\nSUCCESS: Filtering logic behaves as expected.");
} else {
    console.error("\nFAILURE: Filtering logic is incorrect.");
    process.exit(1);
}
