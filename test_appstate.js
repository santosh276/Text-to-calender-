const appState = {
    config: undefined
};

try {
    const currentLang = appState.config.language || 'en';
    console.log("Success:", currentLang);
} catch (e) {
    console.log("Error:", e.message);
}
