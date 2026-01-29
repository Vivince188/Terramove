import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyCIioy1klCmRjZrROpLnjqRB-L2EEckUiM",
  authDomain: "terramove-75646.firebaseapp.com",
  databaseURL: "https://terramove-75646-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "terramove-75646",
  storageBucket: "terramove-75646.firebasestorage.app",
  messagingSenderId: "502743537596",
  appId: "1:502743537596:web:da5487f58873630fa1fdb9"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const nodesRef = ref(db, "nodes");
const container = document.getElementById("nodes");

onValue(nodesRef, (snapshot) => {
  container.innerHTML = "";
  const nodes = snapshot.val();

  for (const id in nodes) {
    const n = nodes[id];

    const riskColor =
      n.risk < 40 ? "text-success" :
      n.risk < 70 ? "text-warning" :
      "text-danger";

    container.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card shadow-sm h-100">
          <div class="card-body">
            <h5 class="card-title">${id.toUpperCase()}</h5>

            <p class="label">Acceleration (m/s²)</p>
            <p>X: ${n.accel.x} | Y: ${n.accel.y} | Z: ${n.accel.z}</p>

            <p class="label">Gyroscope (°/s)</p>
            <p>X: ${n.gyro.x} | Y: ${n.gyro.y} | Z: ${n.gyro.z}</p>

            <p class="label">Tilt</p>
            <p>${n.tilt}°</p>

            <p class="label">Vibration Index</p>
            <p>${n.vibration}</p>

            <p class="label">Soil</p>
            <p>Raw: ${n.soil.raw} | Moisture: ${n.soil.moisture}%</p>

            <p class="label">Rain / Wetness</p>
            <p>${n.soil.status}</p>

            <p class="risk ${riskColor}">
              Risk: ${n.risk}%
            </p>
          </div>
        </div>
      </div>
    `;
  }
});
