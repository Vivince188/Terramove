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

const sensorRef1 = ref(database, "sensor1");

onValue(sensorRef1, (snapshot) => {
  const data = snapshot.val();
  if (data) {
    document.getElementById("tilt").innerText = data.tilt ?? "--";
    document.getElementById("vibration").innerText = data.vibration ?? "--";
    document.getElementById("rain").innerText = data.rain ?? "--";
    document.getElementById("moisture").innerText = data.moisture ?? "--";
  }
});
