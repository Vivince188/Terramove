import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// Firebase setup (still used for live units)
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
const db = getDatabase(app);
const display = document.getElementById("dataDisplay");
const terramoveRef = ref(db, "terramove");

onValue(terramoveRef, (snapshot) => {
  display.innerHTML = "";

  const data = snapshot.val();
  if (!data) return;

  Object.keys(data).forEach(unit => {
    const u = data[unit];

    const card = `
      <div class="col-md-4">
        <div class="card bg-dark text-light shadow h-100">
          <div class="card-body">
            <h5 class="card-title">${unit.toUpperCase()}</h5>

            <p><strong>Accel:</strong> X:${u.accel?.x ?? 0} Y:${u.accel?.y ?? 0} Z:${u.accel?.z ?? 0}</p>
            <p><strong>Gyro:</strong> X:${u.gyro?.x ?? 0} Y:${u.gyro?.y ?? 0} Z:${u.gyro?.z ?? 0}</p>
            <p><strong>Vibration:</strong> ${u.vibration ?? 0}</p>
            <p><strong>Tilt:</strong> ${u.tilt ?? 0}</p>
            <p><strong>Soil Moisture:</strong> ${u.soil?.moisture ?? 0}%</p>
            <p><strong>Rain:</strong> ${u.rain ?? 0}</p>
            <p class="fw-bold text-danger">Risk Level: ${u.risk ?? "UNKNOWN"}</p>
          </div>
        </div>
      </div>
    `;

    display.innerHTML += card;
  });

  // Append the Simulator as the 6th column
  display.innerHTML += `
    <div class="col-md-4">
      <div class="card border-info shadow h-100">
        <div class="card-header bg-info text-dark">Sensor Simulator</div>
        <div class="card-body">
          <div class="row g-2">
            <div class="col-4"><input id="ax" class="form-control" placeholder="Accel X"></div>
            <div class="col-4"><input id="ay" class="form-control" placeholder="Accel Y"></div>
            <div class="col-4"><input id="az" class="form-control" placeholder="Accel Z"></div>
            <div class="col-4"><input id="gx" class="form-control" placeholder="Gyro X"></div>
            <div class="col-4"><input id="gy" class="form-control" placeholder="Gyro Y"></div>
            <div class="col-4"><input id="gz" class="form-control" placeholder="Gyro Z"></div>
            <div class="col-6"><input id="vibration" class="form-control" placeholder="Vibration"></div>
            <div class="col-6"><input id="tilt" class="form-control" placeholder="Tilt"></div>
            <div class="col-6"><input id="moisture" class="form-control" placeholder="Soil Moisture"></div>
            <div class="col-6"><input id="rain" class="form-control" placeholder="Rain"></div>
          </div>
          <button onclick="simulateRisk()" class="btn btn-info w-100 mt-3">Compute Risk</button>
          <div class="mt-3 fw-bold">Result: <span id="riskResult">---</span></div>
        </div>
      </div>
    </div>
  `;
});

// Local simulator computation
window.simulateRisk = function() {
  // Read values
  const accelX = parseFloat(document.getElementById("ax").value) || 0;
  const accelY = parseFloat(document.getElementById("ay").value) || 0;
  const accelZ = parseFloat(document.getElementById("az").value) || 0;
  const gyroX = parseFloat(document.getElementById("gx").value) || 0;
  const gyroY = parseFloat(document.getElementById("gy").value) || 0;
  const gyroZ = parseFloat(document.getElementById("gz").value) || 0;
  const vibration = parseFloat(document.getElementById("vibration").value) || 0;
  const tilt = parseFloat(document.getElementById("tilt").value) || 0;
  const moisture = parseFloat(document.getElementById("moisture").value) || 0;
  const rain = parseFloat(document.getElementById("rain").value) || 0;

  // Simple risk logic
  let score = 0;

  score += Math.abs(accelX) + Math.abs(accelY) + Math.abs(accelZ);
  score += Math.abs(gyroX) + Math.abs(gyroY) + Math.abs(gyroZ);
  score += vibration * 5;
  score += tilt * 3;
  score += moisture * 0.5;
  score += rain * 0.5;

  let risk = "LOW";
  if(score > 50) risk = "MEDIUM";
  if(score > 100) risk = "HIGH";
  if(score > 150) risk = "CRITICAL";

  document.getElementById("riskResult").innerText = risk;
};
