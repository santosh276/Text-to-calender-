// 1. Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
            .then(reg => console.log('Service Worker Registered!', reg.scope))
            .catch(err => console.error('Service Worker Registration Failed!', err));
    });
}

// Ensure localforage matches the config used in the worker
localforage.config({
    name: 'OfflineMLApp',
    storeName: 'EmbeddingsStore'
});

// Function to fetch and display the data from IndexedDB
async function displayDataFromIndexedDB() {
    try {
        const data = await localforage.getItem('latestData');
        if (data) {
             const preview = {
                 timestamp: data.timestamp,
                 sourceUrl: data.sourceUrl,
                 recordCount: data.extractedTexts.length,
                 firstEmbeddingSample: data.embeddings.length > 0 ? data.embeddings[0].slice(0, 5) + '...' : null
             };
             document.getElementById('results').innerText = "Data read successfully from IndexedDB:\n\n" + JSON.stringify(preview, null, 2);
        } else {
             document.getElementById('results').innerText = "No data found in IndexedDB.";
        }
    } catch (e) {
        console.error("Failed to read from IndexedDB", e);
        document.getElementById('results').innerText = "Failed to read from IndexedDB.";
    }
}

// 2. Initialize Web Worker
let worker;
if (window.Worker) {
    worker = new Worker('worker.js', { type: 'module' }); // Use module type if needed

    // 3. Listen for messages from Worker
    worker.onmessage = function(e) {
        const data = e.data;

        if (data.status === 'downloading') {
            document.getElementById('status').innerText = `Status: Downloading models... ${data.file} (${data.progress.toFixed(2)}%)`;
        } else if (data.status === 'fetching') {
            document.getElementById('status').innerText = 'Status: Fetching data from GitHub...';
        } else if (data.status === 'processing') {
            document.getElementById('status').innerText = `Status: Generating embeddings...`;
        } else if (data.status === 'saving') {
             document.getElementById('status').innerText = 'Status: Saving data to IndexedDB...';
        } else if (data.status === 'done') {
            document.getElementById('status').innerText = 'Status: Process Complete! All data saved offline.';
            // Trigger reading from IndexedDB
            displayDataFromIndexedDB();
        } else if (data.status === 'error') {
            document.getElementById('status').innerText = `Status: Error - ${data.message}`;
            console.error(data.error);
        }
    };

    worker.onerror = function(err) {
        document.getElementById('status').innerText = 'Status: Worker Error!';
        console.error("Worker error:", err.message, err.filename, err.lineno);
    };
} else {
    document.getElementById('status').innerText = 'Status: Web Workers are not supported in your browser.';
}

// 4. Handle Button Click
document.getElementById('start-btn').addEventListener('click', () => {
    if (worker) {
        document.getElementById('status').innerText = 'Status: Starting background process...';
        document.getElementById('results').innerText = "Processing...";

        // Example Raw GitHub URL (using a simple JSON file for demonstration)
        const githubDataUrl = 'https://raw.githubusercontent.com/mdn/learning-area/master/javascript/oojs/json/superheroes.json';

        // Send message to worker
        worker.postMessage({
            action: 'startProcessing',
            url: githubDataUrl
        });
    }
});
