<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div :class="store.theme"></div>
      <div class="background_image">
        <div class="head">
          <div class="join">
            <div :class="store.theme"></div>
            <ion-input class="input" placeholder="session id" id="inpJoin"></ion-input>
            <ion-button @click="joinSession()" id="btnJoin" :class="store.theme" strong="true">Join</ion-button>
          </div>
        </div>
        <MapDiv></MapDiv>
        <div class="time">
          <ion-label id="lblTime">15 MIN</ion-label>
          <ion-button class="btnTime" @click="timeP()" :class="store.theme" strong="true">+</ion-button>
          <ion-button class="btnTime" @click="timeM()" :class="store.theme" strong="true">-</ion-button>
          <ion-button class="btnTimeS" id="btnTimeStart" :class="store.theme" strong="true" @click="start(),$router.push({ path: '/tabs/tab10' })">Start</ion-button>
        </div>
        <ion-grid>
          <ion-row>
            <div :class="store.theme"></div>
            <ion-col id="player1">empty</ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid>
          <ion-row>
            <div :class="store.theme"></div>
            <ion-col id="player2">empty</ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid>
          <ion-row>
            <div :class="store.theme"></div>
            <ion-col id="player3">empty</ion-col>
          </ion-row>
        </ion-grid>
        <ion-grid>
          <ion-row>
            <div :class="store.theme"></div>
            <ion-col id="player4">empty</ion-col>
          </ion-row>
        </ion-grid>
        <div class="btn__idsession">
          <ion-button :class="store.theme" @click="alertId()" id="btn_ownSession">my session id</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import MapDiv from '@/components/Map';
import { geolocalisation } from '../stores/loginstore';
import { Radiusstore } from '../stores/loginstore';
import { writeUserData, writeNewSessionGame,getAllOnceFromDB, writeNewPoi, getAllOnValueFromDB, onValueSession} from "@/components/firebase"
import { inject } from 'vue';
import { useIonRouter } from '@ionic/vue';
const axios = inject('axios');
const storeradius = Radiusstore();
const storeGeo = geolocalisation();
let aantalSpelers = 0;
let time = 15;
let sessionIdStart;
let globalPoiID;
function addPlayer(name) {
  if (name == document.getElementById("player1").textContent || name == document.getElementById("player2").textContent || name == document.getElementById("player3").textContent || name == document.getElementById("player4").textContent) {
    console.log("You are already here !!!");
  }
  else {
    switch (aantalSpelers) {
      case 0:
        document.getElementById("player1").textContent = name;
        aantalSpelers = 1;
        break;
      case 1:
        document.getElementById("player2").textContent = name;
        aantalSpelers = 2;
        break;
      case 2:
        document.getElementById("player3").textContent = name;
        aantalSpelers = 3;
        break;
      case 3:
        document.getElementById("player4").textContent = name;
        aantalSpelers = 4;
        break;
      default:
        console.log("Too many players");
        break;
    }
  }
}

function timeP() {
  const lblTime = document.getElementById("lblTime");
  if (time < 120) {
    time += 15;
  }
  lblTime.textContent = time + " MIN";
}

function timeM() {
  const ionRouter = useIonRouter();
  ionRouter.push('/tabs/tab1');
  const lblTime = document.getElementById("lblTime");
  if (time > 15) {
    time -= 15;
  }
  lblTime.textContent = time + " MIN";
}

const getallPOI = () => {
  axios
    .post('https://theoallaeys2021.be/web&mobile/taak1/api/getallPOI.php')
    .then(response => {
      // controleer de response
      if (response.status !== 200) {
        // er is iets fout gegaan, doe iets met deze info
        console.log(response.status);
      }
      if (!response.data.data) {
        console.log('response.data.data is not ok');
        return;
      } else {
        let selectablePOI = [];
        for (let i = 0, end = response.data.data.length; i < end; i++) {
          if (Math.round(getDistanceFromLatLonInKm(storeGeo.$state.lat, storeGeo.$state.lon, response.data.data[i].latitude, response.data.data[i].longitude)) <= storeradius.radius) {
            selectablePOI.push(response.data.data[i].id);
          }
        }
        if (selectablePOI.length == 0) {
          FullAlert("There is no avaible points from your location")
        } else {
          let rndInt = Math.floor(Math.random() * selectablePOI.length);
          console.log("id: " + selectablePOI[rndInt] + " time: " + time + " sessionid: " + sessionIdStart);
          globalPoiID = selectablePOI[rndInt];
          writeNewSessionGame(globalPoiID, time, sessionIdStart);
        }
      }
    });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function alertId() {
  let btnSessionId = document.getElementById("btn_ownSession");
  let generateSessionID = Math.floor(Math.random() * 90000000) + 10000000;
  sessionIdStart = generateSessionID;
  btnSessionId.textContent = generateSessionID;
  btnSessionId.disabled = true;
  addPlayer(localStorage.getItem("pseudo"));
  writeUserData(localStorage.getItem("pseudo"), generateSessionID, true);
  writeNewPoi(generateSessionID);
  getAllOnValueFromDB("/" + generateSessionID);
  onValueSession("/sessions/" + generateSessionID, generateSessionID);
}

function start() {
  getallPOI();
}

</script>

<script>
import { store } from "@/theme/theme";
import { defineComponent } from "vue";
import { alertController } from '@ionic/vue';
let aantalSpelers2 = 0;

export default defineComponent({
  data() {
    return {
      theme: localStorage.getItem("themeSet"),
      store,
    };
  }
});



export function addPlayer2(name) {
  if (name == document.getElementById("player1").textContent || name == document.getElementById("player2").textContent || name == document.getElementById("player3").textContent || name == document.getElementById("player4").textContent) {
    console.log("You are already here !!!");
  } 
  else {
    switch (aantalSpelers2) {
      case 0:
        document.getElementById("player1").textContent = name;
        aantalSpelers2 = 1;
        break;
      case 1:
        document.getElementById("player2").textContent = name;
        aantalSpelers2 = 2;
        break;
      case 2:
        document.getElementById("player3").textContent = name;
        aantalSpelers2 = 3;
        break;
      case 3:
        document.getElementById("player4").textContent = name;
        aantalSpelers2 = 4;
        break;
      default:
        aantalSpelers2++;
        console.log("Too many players: " + aantalSpelers2);
        break;
    }
    aantalSpelers2 = 0;
  }
}



const joinSession = async () => {
  let number = document.getElementById("inpJoin").value;
  let listUsers = [];
  let aantalInSession = 0;
  const reg = /^\d{8}$/;
  if (reg.test(number)) {
    const data = getAllOnceFromDB("/" + number + "/");
    data.then(function (result) {
      for (var key in result) {
        listUsers.push(key);
        aantalInSession++;
      }
      if (aantalInSession == 0) { FullAlert("This session does not exist"); }
      if (aantalInSession >= 4) { FullAlert("This session is already full"); }
      if (aantalInSession >= 1 && aantalInSession < 4) {
        listUsers.forEach(e => addPlayer2(e));
        writeUserData(localStorage.getItem("pseudo"),number, false);
        addPlayer2(localStorage.getItem("pseudo"));
        getAllOnValueFromDB("/" + number);
        document.getElementById("btnTimeStart").disabled = true;
        onValueSession("/sessions/" + number, number);
      }
    })
  }
  else {
    FullAlert("A sessionid contains 8 numbers");
  }
}

const FullAlert = async (message) => {
  const alert = await alertController.create({
    header: 'Alert',
    subHeader: message,
    buttons: ['OK'],
  });
  await alert.present();
};
</script>

<style>
.join {
  display: inline-flex;
  margin-bottom: -30px;
}

#inpJoin {
  margin-top: 4px;
  width: 120px;
  height: 60px;
  border: rgb(210, 210, 210) solid 2px;
  font-size: 20px;
  font-weight: 900;
}

#btnJoin {
  width: 60px;
  height: 60px;
  --border-radius: 10%;
  font-family: Arial, Helvetica, sans-serif;
}

.head {
  display: flex;
  justify-content: space-around;
}

#lbl__session {
  font-style: normal;
}

ion-col {
  text-align: center;
}

ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 3rem;
  max-height: 35%;
}

.button {
  width: 250px;
  height: 60px;
  --border-radius: 25px;
}

.Buttons {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 10px;
}

.time {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 10px;
}

.btnTime {
  width: 40px;
  height: 40px;
  --border-radius: 5px;
}

.btnTimeS {
  width: 60px;
  height: 40px;
  --border-radius: 5px;
}

#btn_ownSession {
  margin-top: 10px;
  width: 200px;
  height: 50px;
  border-radius: 10%;
  opacity: 1;
}

.btn__idsession {
  text-align: center;
}

.logo {
  max-width: 100px;
}

ion-label {
  font-size: 2rem;
  color: #ffffff;
  font-weight: 700;
  font-style: italic;
  margin-right: 12px;
}
</style>