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

          <p><strong>Accel:</strong>
          X:${u.accel?.x ?? 0}
          Y:${u.accel?.y ?? 0}
          Z:${u.accel?.z ?? 0}</p>

          <p><strong>Gyro:</strong>
          X:${u.gyro?.x ?? 0}
          Y:${u.gyro?.y ?? 0}
          Z:${u.gyro?.z ?? 0}</p>

          <p><strong>Vibration:</strong> ${u.vibration ?? 0}</p>
          <p><strong>Tilt:</strong> ${u.tilt ?? 0}</p>
          <p><strong>Soil Moisture:</strong> ${u.soil?.moisture ?? 0}%</p>
          <p><strong>Rain:</strong> ${u.rain ?? 0}</p>

          <p class="fw-bold text-danger">
          Risk Level: ${u.risk ?? "UNKNOWN"}
          </p>

        </div>

      </div>
    </div>
    `;

    display.innerHTML += card;

  });

  /* ADD SIMULATOR AS 6TH GRID CARD */

  display.innerHTML += `

  <div class="col-md-4">

    <div class="card border-info shadow h-100">

      <div class="card-header bg-info text-dark">
      Sensor Simulator
      </div>

      <div class="card-body">

        <div class="row g-2">

          <div class="col-4">
            <input id="ax" class="form-control" placeholder="Accel X">
          </div>

          <div class="col-4">
            <input id="ay" class="form-control" placeholder="Accel Y">
          </div>

          <div class="col-4">
            <input id="az" class="form-control" placeholder="Accel Z">
          </div>

          <div class="col-4">
            <input id="gx" class="form-control" placeholder="Gyro X">
          </div>

          <div class="col-4">
            <input id="gy" class="form-control" placeholder="Gyro Y">
          </div>

          <div class="col-4">
            <input id="gz" class="form-control" placeholder="Gyro Z">
          </div>

          <div class="col-6">
            <input id="vibration" class="form-control" placeholder="Vibration">
          </div>

          <div class="col-6">
            <input id="tilt" class="form-control" placeholder="Tilt">
          </div>

          <div class="col-6">
            <input id="moisture" class="form-control" placeholder="Soil Moisture">
          </div>

          <div class="col-6">
            <input id="rain" class="form-control" placeholder="Rain">
          </div>

        </div>

        <button onclick="simulateRisk()" class="btn btn-info w-100 mt-3">
        Compute Risk
        </button>

        <div class="mt-3 fw-bold">
        Result: <span id="riskResult">---</span>
        </div>

      </div>

    </div>

  </div>
  `;

});

/* Risk simulation */

window.simulateRisk = async function(){

  const payload = {
    accel:{
      x:parseFloat(document.getElementById("ax").value),
      y:parseFloat(document.getElementById("ay").value),
      z:parseFloat(document.getElementById("az").value)
    },
    gyro:{
      x:parseFloat(document.getElementById("gx").value),
      y:parseFloat(document.getElementById("gy").value),
      z:parseFloat(document.getElementById("gz").value)
    },
    vibration:parseFloat(document.getElementById("vibration").value),
    tilt:parseFloat(document.getElementById("tilt").value),
    soil:{
      moisture:parseFloat(document.getElementById("moisture").value)
    },
    rain:parseFloat(document.getElementById("rain").value)
  };

  try{

    const res = await fetch(
      "https://asia-southeast1-terramove-75646.cloudfunctions.net/computeRisk",
      {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(payload)
      }
    );

    const data = await res.json();

    document.getElementById("riskResult").innerText = data.risk;

  }catch(e){

    document.getElementById("riskResult").innerText = "Error computing risk";

  }

};
