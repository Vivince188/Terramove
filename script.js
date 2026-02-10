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

/* ✅ Initialize Firebase AGAIN */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* DOM */
const display = document.getElementById("dataDisplay");

/* Listen for updates */
const terramoveRef = ref(db, "terramove");

onValue(terramoveRef, (snapshot) => {
  display.innerHTML = "";

  const data = snapshot.val();
  if (!data) return;

  Object.keys(data).forEach(unit => {
    const u = data[unit];

    display.innerHTML += `
      <div class="col-md-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">${unit.toUpperCase()}</h5>

            <p><strong>Accel:</strong>
              X:${u.accel.x} Y:${u.accel.y} Z:${u.accel.z}</p>

            <p><strong>Gyro:</strong>
              X:${u.gyro.x} Y:${u.gyro.y} Z:${u.gyro.z}</p>

            <p><strong>Vibration:</strong> ${u.vibration}</p>
            <p><strong>Tilt:</strong> ${u.tilt}</p>
            <p><strong>Soil Moisture:</strong> ${u.soil.moisture}%</p>
            <p><strong>Rain:</strong> ${u.rain}</p>

            <p class="fw-bold text-danger">
              Risk Level: ${u.risk}
            </p>
          </div>
        </div>
      </div>
    `;
  });
});
