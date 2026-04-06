// 🔷 GLOBAL VARIABLES
let map;
let marker;
let userLat, userLon;

// 🔷 Initialize Map
function initMap(lat, lon) {

    userLat = lat;
    userLon = lon;

    if (!map) {
        // Create map
        map = L.map('map').setView([lat, lon], 15);

        // Load tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        // Add marker
        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup("📍 Patient Location")
            .openPopup();

    } else {
        // Update existing map
        map.setView([lat, lon], 15);
        marker.setLatLng([lat, lon]);
    }
}

// 🔷 Get GPS Location
function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(
            position => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                initMap(lat, lon);
            },
            error => {
                alert("❌ Unable to fetch location");
                console.error(error);
            }
        );

    } else {
        alert("❌ Geolocation not supported in this browser");
    }
}

// 🔷 Simulate Movement on Map
function simulateMovementOnMap() {

    if (!marker) return;

    let step = 0;

    const interval = setInterval(() => {

        if (step > 5) {
            clearInterval(interval);
            return;
        }

        // Slight movement (demo purpose)
        let newLat = userLat + (step * 0.0005);
        let newLon = userLon + (step * 0.0005);

        marker.setLatLng([newLat, newLon]);
        map.setView([newLat, newLon]);

        step++;

    }, 1000);
}
