import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

/* 🔥 Firebase Config */
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
const database = getDatabase(app);

/* 📦 Default Sensor Template */
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function createUnit() {
  return {
    accel: { x: 0, y: 0, z: 0 },
    gyro: { x: 0, y: 0, z: 0 },
    vibration: 0,
    tilt: 0,
    soil: { raw: 0, moisture: 0 },
    rain: 0,
    risk: 0
  };
}

/* ✅ DEFINE function */
function initializeTerraMoveDB() {
  const terramoveData = {
    terramove: {
      unit1: createUnit(),
      unit2: createUnit(),
      unit3: createUnit(),
      unit4: createUnit(),
      unit5: createUnit()
    }
  };

  update(ref(db), terramoveData)
    .then(() => console.log("✅ TerraMove database initialized"))
    .catch(err => console.error("❌ Firebase error:", err));
}

/* 🚨 EXPOSE to browser */
window.initializeTerraMoveDB = initializeTerraMoveDB;
