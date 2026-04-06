// 🔷 Start Simulation (Main Function)
function startSimulation() {

    const status = document.getElementById("status");

    if (!status) return;

    // Step 1: Dispatch
    status.innerText = "🚨 Dispatching vehicle...";

    setTimeout(() => {
        status.innerText = "📍 Reaching patient location...";
    }, 2000);

    setTimeout(() => {
        status.innerText = "🩺 Providing initial assistance...";
    }, 4000);

    setTimeout(() => {
        status.innerText = "🏥 Transporting to hospital...";
    }, 6000);

    setTimeout(() => {
        status.innerText = "✅ Patient safely reached hospital";
    }, 8000);

    // Optional: Progress bar
    startProgressBar();
}

// 🔷 Progress Bar Logic (Optional)
function startProgressBar() {

    const progress = document.getElementById("progress");

    if (!progress) return;

    let width = 0;

    const interval = setInterval(() => {

        if (width >= 100) {
            clearInterval(interval);
        } else {
            width += 20;
            progress.style.width = width + "%";
        }

    }, 1500);
}
