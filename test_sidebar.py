import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        await page.goto('http://localhost:8000/ai%20tex%20to%20calnder.html')
        await page.wait_for_timeout(3000)

        await page.evaluate("""() => {
            const mockData = {
                year: 2026,
                month: 3,
                events: [
                    { date: 23, engName: 'Hanuman Jayanti', locName: 'ହନୁମାନ ଜୟନ୍ତୀ', symbol: '!' }
                ]
            };
            window.renderFestivals(mockData);
        }""")

        await page.wait_for_timeout(1000)

        html = await page.evaluate('() => document.getElementById("sec-festivals").innerHTML')
        print(html)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
