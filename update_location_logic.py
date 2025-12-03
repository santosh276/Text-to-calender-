import re

file_path = 'ai tex to calnder.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Replace getUserLocation with enhanced version
old_get_user_location = """        function getUserLocation() {
            if (!navigator.geolocation) {
                showToast("Geolocation is not supported by your browser.");
                return;
            }
            const btn = document.getElementById('btn-location');
            const originalContent = btn ? btn.innerHTML : '';
            if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Locating...';

            navigator.geolocation.getCurrentPosition((position) => {
                appState.config.location = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                render();
                showToast("Location updated! Sunrise times adjusted.");
            }, (error) => {
                console.error(error);
                showToast("Unable to retrieve your location.");
                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
            });
        }"""

new_get_user_location = """        function getUserLocation() {
            if (!navigator.geolocation) {
                showToast("Geolocation is not supported by your browser.");
                return;
            }
            const btn = document.getElementById('btn-location');
            const originalContent = btn ? btn.innerHTML : '';
            if(btn) btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Locating...';

            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                let locName = `${lat.toFixed(2)}, ${lng.toFixed(2)}`;

                // Optimistic update
                appState.config.location = { lat: lat, lng: lng, name: locName };
                render();

                // Try reverse geocoding
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10&addressdetails=1`);
                    if (response.ok) {
                        const data = await response.json();
                        if (data && data.address) {
                            // Construct a friendly name
                            const city = data.address.city || data.address.town || data.address.village || data.address.county;
                            const state = data.address.state || data.address.country;
                            if (city) locName = `${city}, ${state}`;
                            else if (state) locName = state;
                        } else if (data && data.display_name) {
                             locName = data.display_name.split(',')[0];
                        }
                        appState.config.location.name = locName;
                        render();
                    }
                } catch (e) {
                    console.log("Reverse geocoding failed, using coordinates", e);
                }

                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
                showToast("Location updated: " + locName);
            }, (error) => {
                console.error(error);
                showToast("Unable to retrieve your location.");
                if(btn) btn.innerHTML = originalContent || '📍 Use My Location';
            });
        }"""

content = content.replace(old_get_user_location, new_get_user_location)

# 2. Update renderPanchang logic to display name
old_render_logic = """                     locContainer.innerHTML = `<div class="text-center"><div class="text-xs text-green-600 font-bold mb-1"><i class="fa-solid fa-check-circle"></i> Using GPS Location</div><button id="btn-location" onclick="getUserLocation()" class="text-xs text-gray-500 hover:text-deepred underline">Update Location</button></div>`;"""

new_render_logic = """                     const locName = appState.config.location.name || `${appState.config.location.lat.toFixed(2)}, ${appState.config.location.lng.toFixed(2)}`;
                     locContainer.innerHTML = `<div class="text-center"><div class="text-xs text-green-600 font-bold mb-1"><i class="fa-solid fa-check-circle"></i> ${locName}</div><button id="btn-location" onclick="getUserLocation()" class="text-xs text-gray-500 hover:text-deepred underline">Update Location</button></div>`;"""

content = content.replace(old_render_logic, new_render_logic)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)
