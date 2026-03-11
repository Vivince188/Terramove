import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

/* Firebase configuration */
const firebaseConfig = {
  apiKey: "AIzaSyCIioy1klCmRjZrROpLnjqRB-L2EEckUiM",
  authDomain: "terramove-75646.firebaseapp.com",
  databaseURL: "https://terramove-75646-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "terramove-75646",
  storageBucket: "terramove-75646.firebasestorage.app",
  messagingSenderId: "502743537596",
  appId: "1:502743537596:web:da5487f58873630fa1fdb9"
};

/* Initialize Firebase */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* DOM reference */
const display = document.getElementById("dataDisplay");

/* Database reference */
const terramoveRef = ref(db, "terramove");

/* Listen for realtime updates */
onValue(terramoveRef, (snapshot) => {

  display.innerHTML = "";

  const data = snapshot.val();
  if (!data) return;

  Object.keys(data).forEach(unit => {

    const u = data[unit] || {};

    /* Safe sensor access */
    const accel = u.accel || {x:0,y:0,z:0};
    const gyro = u.gyro || {x:0,y:0,z:0};
    const soil = u.soil || {moisture:0};

    const vibration = u.vibration ?? 0;
    const tilt = u.tilt ?? 0;
    const rain = u.rain ?? 0;
    const risk = u.risk ?? "UNKNOWN";

    /* Risk color */
    let riskColor = "text-success";

    if (risk === "MEDIUM") riskColor = "text-warning";
    if (risk === "HIGH") riskColor = "text-danger";
    if (risk === "CRITICAL") riskColor = "text-danger fw-bold";

    /* Create card */
    const card = `
    <div class="col-md-4">

      <div class="card shadow-sm h-100">

        <div class="card-body">

          <h5 class="card-title">
            ${unit.toUpperCase()}
          </h5>

          <p>
            <strong>Accel:</strong><br>
            X: ${accel.x}  
            Y: ${accel.y}  
            Z: ${accel.z}
          </p>

          <p>
            <strong>Gyro:</strong><br>
            X: ${gyro.x}  
            Y: ${gyro.y}  
            Z: ${gyro.z}
          </p>

          <p><strong>Vibration:</strong> ${vibration}</p>

          <p><strong>Tilt:</strong> ${tilt}</p>

          <p><strong>Soil Moisture:</strong> ${soil.moisture}%</p>

          <p><strong>Rain:</strong> ${rain}</p>

          <p class="fw-bold ${riskColor}">
            Risk Level: ${risk}
          </p>

        </div>

      </div>

    </div>
    `;

    display.innerHTML += card;

  });

});
