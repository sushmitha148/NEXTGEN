// 🔷 GLOBAL VARIABLES
let map, marker;
let userLat, userLon;

// 🔷 Initialize Map
function initMap(lat, lon) {

    userLat = lat;
    userLon = lon;

    if (!map) {
        map = L.map('map').setView([lat, lon], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap'
        }).addTo(map);

        marker = L.marker([lat, lon]).addTo(map)
            .bindPopup("📍 Patient Location").openPopup();

    } else {
        map.setView([lat, lon], 15);
        marker.setLatLng([lat, lon]);
    }
}

// 🔷 Get GPS Location (Real-time)
function getLocation() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            initMap(lat, lon);

        }, () => {
            alert("Unable to fetch location");
        });

    } else {
        alert("Geolocation not supported");
    }
}

// 🔷 Dummy Hospital Data (for demo)
const hospitals = [
    { name: "City Care Hospital", distance: "2.5 km" },
    { name: "Apollo Hospital", distance: "3.2 km" },
    { name: "Metro Health Center", distance: "4 km" }
];

// 🔷 Get Random Hospital
function getNearestHospital() {
    let index = Math.floor(Math.random() * hospitals.length);
    return hospitals[index];
}

// 🔷 Decision Logic + Output
function findRoute() {

    let traffic = document.getElementById("traffic").value;
    let result = document.getElementById("result");
    let status = document.getElementById("status");

    let transport, reason, time;

    // 🔷 AI Decision Logic
    if (traffic === "High") {
        transport = "🚡 Sky Capsule";
        reason = "High traffic → avoids congestion";
        time = "5-8 mins";
    } else {
        transport = "🚑 Ambulance";
        reason = "Traffic is manageable";
        time = "10-15 mins";
    }

    let hospital = getNearestHospital();

    result.innerHTML = `
        <h2>${transport}</h2>
        <p>${reason}</p>
        <p><b>Estimated Time:</b> ${time}</p>
        <p><b>Nearest Hospital:</b> ${hospital.name} (${hospital.distance})</p>
    `;

    simulateMovement();
}

// 🔷 Simulate Real-Time Movement
function simulateMovement() {

    let status = document.getElementById("status");

    status.innerText = "🚨 Dispatching vehicle...";

    setTimeout(() => {
        status.innerText = "📍 Reaching patient...";
        moveMarker(0.0005, 0.0005);
    }, 2000);

    setTimeout(() => {
        status.innerText = "🏥 Transporting to hospital...";
        moveMarker(0.001, 0.001);
    }, 4000);

    setTimeout(() => {
        status.innerText = "✅ Patient reached hospital";
    }, 6000);
}

// 🔷 Move Marker (Fake movement for demo)
function moveMarker(latOffset, lonOffset) {

    if (marker) {
        let newLat = userLat + latOffset;
        let newLon = userLon + lonOffset;

        marker.setLatLng([newLat, newLon]);
        map.setView([newLat, newLon]);
    }
}
