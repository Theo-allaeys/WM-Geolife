// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, set, get } from "firebase/database"
// import { addPlayer2 } from "@/views/multyGameLobby.vue"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8DXcqhXgSkbMU_xPSki0dM9dQMFSidjU",
  authDomain: "geolife-14a2f.firebaseapp.com",
  databaseURL: "https://geolife-14a2f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "geolife-14a2f",
  storageBucket: "geolife-14a2f.appspot.com",
  messagingSenderId: "668660145720",
  appId: "1:668660145720:web:711f07f1c38696a53d10cd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export async function getAllOnceFromDB(path) {
  const db = getDatabase(app);
  let data;
  const dref = ref(db, path)
  data = await get(dref);
  if (data.exists()) {
    return data.val();
  }
}

//  Neemt data iedere keer er een verandering is.
export function getAllOnValueFromDB(path) {
  return new Promise((resolve) => {
    const db = getDatabase(app);
    let compteur = 0;
    let data;
      const dref = ref(db,path)
      onValue(dref, (snapshot) => {
        data = snapshot.val();
        resolve(data);
        for (var e in data) {
          compteur++;
          document.getElementById("player" + compteur).textContent = e;
        }
        compteur = 0;
      });
  });
}

export function onValueSession(path) {
  const db = getDatabase();
  const starCountRef = ref(db, path);
  onValue(starCountRef, (snapshot) => {
  const data = snapshot.val();
  if (data.time == 0 && data.idPoi == 0) {
    console.log("Game is not Started");
  }  
  else {
    console.log("Game Started");
  }
  });
}




export function writeUserData(pseudo, sessionid, leaderTF) {
  const db = getDatabase();
  set(ref(db, '/' + sessionid + '/' + pseudo), {
    time: 0,
    score: 0,
    leader: leaderTF,
    finish: false
  });
}

export function writeNewPoi(sessionid) {
  const db = getDatabase();
  set(ref(db, '/sessions/' + sessionid), {
    idPoi: 0,
    time: 0
  });
}

export function SelectListenNewPoi(sessionid) {
  const db = getDatabase(app);
  let data;
  const dref = ref(db, '/sessions/' + sessionid);
  onValue(dref, (snapshot) => {
    data = snapshot.val();
    console.log(data);
  });
}

const db = getDatabase(app);
let data;
const dref = ref(db, "/users/");
onValue(dref, (snapshot) => {
  data = snapshot.val();
  for (var key in data) {
    console.log([key, data[key]["leader"], data[key]["score"], data[key]["session"], data[key]["time"]]);
  }
});

