// 🔷 MAIN FUNCTION (Called when user clicks button)
function findRoute() {

    // 1. Get user inputs
    const traffic = document.getElementById("traffic").value;
    const resultDiv = document.getElementById("result");

    // 2. Decision Logic
    let transport, reason, time;

    if (traffic === "High") {
        transport = "🚡 Sky Capsule";
        reason = "Heavy traffic detected → avoids congestion";
        time = "5-8 mins";
    } else if (traffic === "Medium") {
        transport = "🚑 Ambulance";
        reason = "Moderate traffic → road is usable";
        time = "8-12 mins";
    } else {
        transport = "🚑 Ambulance";
        reason = "Low traffic → fastest road transport";
        time = "10-15 mins";
    }

    // 3. Get nearest hospital (from data)
    const hospital = getNearestHospital();

    // 4. Display output
    resultDiv.innerHTML = `
        <h2>${transport}</h2>
        <p>${reason}</p>
        <p><b>Estimated Time:</b> ${time}</p>
        <p><b>Nearest Hospital:</b> ${hospital.name} (${hospital.distance})</p>
    `;

    // 5. Start simulation
    startSimulation();

    // 6. Optional: trigger map movement
    simulateMovementOnMap();
}
