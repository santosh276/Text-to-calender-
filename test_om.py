import http.server
import socketserver
import threading
import time
import os
from playwright.sync_api import sync_playwright

PORT = 8004
Handler = http.server.SimpleHTTPRequestHandler

def start_server():
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()

server_thread = threading.Thread(target=start_server, daemon=True)
server_thread.start()
time.sleep(1) # wait for server to start

with sync_playwright() as p:
    browser = p.chromium.launch()

    # Desktop
    page = browser.new_page()
    page.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")
    time.sleep(2)

    # Mock date and language to ensure predictable rendering
    page.evaluate("""
        window.appState = window.appState || {};
        window.appState.monthsData = [
            {
                "date": "2026-11-20",
                "festivals": [{"name": "Mock Festival Desktop"}]
            }
        ];

        // Hide home view, show festival view
        var homeView = document.getElementById('app-home-view');
        if (homeView) homeView.classList.add('hidden');
        var festView = document.getElementById('app-festival-view');
        if (festView) festView.classList.remove('hidden');
        var container = document.getElementById('month-view-container');
        if (container) container.classList.add('hidden');

        // Render festival view
        if (typeof renderAppFestivalView === 'function') {
            renderAppFestivalView();
        }
    """)
    time.sleep(1) # Wait for DOM to update

    banner = page.locator('#hero-festival-banner')
    if banner.is_visible():
        banner.screenshot(path="banner_om_desktop.png")

    # Mobile
    mobile_context = browser.new_context(viewport={'width': 375, 'height': 812})
    page_mobile = mobile_context.new_page()
    page_mobile.goto(f"http://localhost:{PORT}/ai%20tex%20to%20calnder.html")
    time.sleep(2)
    page_mobile.evaluate("""
        window.appState = window.appState || {};
        window.appState.monthsData = [
            {
                "date": "2026-11-20",
                "festivals": [{"name": "Mock Festival Mobile"}]
            }
        ];
        var homeView = document.getElementById('app-home-view');
        if (homeView) homeView.classList.add('hidden');
        var festView = document.getElementById('app-festival-view');
        if (festView) festView.classList.remove('hidden');
        var container = document.getElementById('month-view-container');
        if (container) container.classList.add('hidden');

        if (typeof renderAppFestivalView === 'function') {
            renderAppFestivalView();
        }
    """)
    time.sleep(1)
    banner_mobile = page_mobile.locator('#hero-festival-banner')
    if banner_mobile.is_visible():
        banner_mobile.screenshot(path="banner_om_mobile.png")

    browser.close()

print("Screenshots saved")
