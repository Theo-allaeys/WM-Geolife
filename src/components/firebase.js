// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase, ref, get, onValue, set } from "firebase/database"
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
// Neemt data ene keer op.

export async function getAllOnceFromDB(path) {
  const db = getDatabase(app);
  let data;
  if (path == "none") {
    const dref = ref(db,'/')
    data = await get(dref);
  }
  else {
    console.log(path)
    const dref = ref(db,path)
    data = await get(dref);
  }
  if(data.exists()){
    return data.val();
  }
}

//  Neemt data iedere keer er een verandering is.
export function getAllOnValueFromDB(path) {
  const db = getDatabase(app);
  if (path == "none") {
    const dref = ref(db,'/')
    onValue(dref, (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  }
  else {
    const dref = ref(db, path)
    onValue(dref, (snapshot) => {
      const data = snapshot.val();
      return data;
    });
  }
}

export function writeUserData(pseudo, sessionid, leaderTF) {
  const db = getDatabase();
  set(ref(db, '/users/' + pseudo), {
    session: sessionid,
    time: 0,
    score: 0,
    leader: leaderTF
  });
}
