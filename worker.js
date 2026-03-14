import { pipeline, env } from 'https://cdn.jsdelivr.net/npm/@xenova/transformers@2.17.1';
import localforage from 'https://cdn.jsdelivr.net/npm/localforage@1.10.0/+esm';

// We disable local models since we are running in the browser and fetching from the CDN
env.allowLocalModels = false;

// 1. Initialize Pipeline Singleton
class PipelineSingleton {
    static task = 'feature-extraction';
    static model = 'Xenova/all-MiniLM-L6-v2';
    static instance = null;

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, this.model, { progress_callback });
        }
        return this.instance;
    }
}

// 2. Setup IndexedDB using localForage
const db = localforage.createInstance({
    name: 'OfflineMLApp',
    storeName: 'EmbeddingsStore'
});

// 3. Listen to messages from the Main Thread
self.addEventListener('message', async (event) => {
    if (event.data.action === 'startProcessing') {
        try {
            const url = event.data.url;

            // 4. Fetch JSON Data
            self.postMessage({ status: 'fetching' });
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Extract texts from the JSON data. (Here we extract 'name' or 'superPower' for embeddings as an example)
            // Adapting the superheroes JSON to text array.
            let textsToEmbed = [];
            if (data.members && Array.isArray(data.members)) {
                 textsToEmbed = data.members.map(member => `${member.name}: ${member.powers.join(', ')}`);
            } else {
                 textsToEmbed = [JSON.stringify(data)]; // fallback
            }

            self.postMessage({ status: 'processing', total: textsToEmbed.length });

            // 5. Load Model and Generate Embeddings
            const extractor = await PipelineSingleton.getInstance((x) => {
                // Send download progress back to main thread
                if (x.status === 'progress') {
                     self.postMessage({
                         status: 'downloading',
                         file: x.file,
                         progress: x.progress
                     });
                }
            });

            // Generate embeddings
            const embeddings = [];
            for (let i = 0; i < textsToEmbed.length; i++) {
                // Using pooling 'mean' to get a single vector per sentence
                const output = await extractor(textsToEmbed[i], { pooling: 'mean', normalize: true });
                // Convert Float32Array to standard Array so it's easily serializable
                embeddings.push(Array.from(output.data));
            }

            // 6. Save to IndexedDB
            self.postMessage({ status: 'saving' });

            const recordToSave = {
                timestamp: new Date().toISOString(),
                sourceUrl: url,
                originalData: data,
                extractedTexts: textsToEmbed,
                embeddings: embeddings
            };

            await db.setItem('latestData', recordToSave);

            // 7. Notify Main Thread
            self.postMessage({
                status: 'done',
                result: {
                    message: `Successfully processed ${textsToEmbed.length} records.`,
                    firstEmbeddingSample: embeddings.length > 0 ? embeddings[0].slice(0, 5) + '...' : null
                }
            });

        } catch (error) {
            self.postMessage({
                status: 'error',
                message: error.message,
                error: error.stack
            });
        }
    }
});