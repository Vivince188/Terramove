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

/* Firebase Init */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

/* DOM */
const display = document.getElementById("dataDisplay");

/* Firebase reference */
const terramoveRef = ref(db, "terramove");

onValue(terramoveRef, (snapshot) => {

  display.innerHTML = "";

  const data = snapshot.val();
  if (!data) return;

  Object.keys(data).forEach(unit => {

    const u = data[unit];

    /* Safe access */
    const accel = u.accel || {x:0,y:0,z:0};
    const gyro = u.gyro || {x:0,y:0,z:0};
    const soil = u.soil || {moisture:0};

    /* Risk color */
    let riskColor = "text-success";

    if(u.risk === "MEDIUM") riskColor = "text-warning";
    if(u.risk === "HIGH") riskColor = "text-danger";
    if(u.risk === "CRITICAL") riskColor = "text-danger fw-bold";

    display.innerHTML += `
    
    <div class="col-md-4">

        <div class="card shadow-sm h-100">

            <div class="card-body">

                <h5 class="card-title text-info">
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

                <p><strong>Vibration:</strong> ${u.vibration ?? 0}</p>

                <p><strong>Tilt:</strong> ${u.tilt ?? 0}</p>

                <p><strong>Soil Moisture:</strong> ${soil.moisture}%</p>

                <p><strong>Rain:</strong> ${u.rain ?? 0}</p>

                <p class="fw-bold ${riskColor}">
                    Risk Level: ${u.risk ?? "UNKNOWN"}
                </p>

            </div>

        </div>

    </div>
    
    `;
  });

});
