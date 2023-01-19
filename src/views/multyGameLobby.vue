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
          <ion-button class="btnTimeS" :class="store.theme" strong="true" @click="start()">Start</ion-button>
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
import MapDiv from '@/components/Map'
// import { geolocalisation } from '../stores/loginstore';
// import { gameSession } from '../stores/loginstore';
// import { useIonRouter } from '@ionic/vue';
// import { Radiusstore } from '../stores/loginstore';
// const storeradius = Radiusstore();
// const ionRouter = useIonRouter();
// const storeGeo = geolocalisation();
// const storegame = gameSession();
// import {writeUserData, getAllOnValueFromDB, getAllOnceFromDB} from "@/components/firebase"
import {writeUserData, getAllOnceFromDB} from "@/components/firebase"
let aantalSpelers = 0;
let time = 15;
//let sessionid = 9999;
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
  const lblTime = document.getElementById("lblTime");
  if (time > 15) {
    time -= 15;
  }
  lblTime.textContent = time + " MIN";
}

function alertId() {
  let btnSessionId = document.getElementById("btn_ownSession");
  let generateSessionID = Math.floor(Math.random() * 90000000) + 10000000;
  btnSessionId.textContent = generateSessionID;
  btnSessionId.disabled = true;
  addPlayer(localStorage.getItem("pseudo"));
  writeUserData(localStorage.getItem("pseudo"),generateSessionID, true);
}

// function start() {
//   storegame.addGame(sessionid, time, storeGeo.$state.lat, storeGeo.$state.lon, storeradius.$state.radius);
//   ionRouter.push('/tabs/tab5');
// }

</script>

<script>
import { store } from "@/theme/theme";
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      theme: localStorage.getItem("themeSet"),
      store,
    };
  }
}); 

const joinSession = async () => {
  let number = document.getElementById("inpJoin").value;
  let listUsers = [[]];
  let aantalInSession = 0;
  const reg = /^\d{8}$/;
  if (reg.test(number)) {
    const data = getAllOnceFromDB("/users");
    data.then(function(result){
      for (var key in result) {
        listUsers.push([key, result[key]["leader"], result[key]["score"], result[key]["session"], result[key]["time"]]);
      }
      listUsers.forEach(e => {
        if (e[3] == number) {
          aantalInSession++;
        }
      });
      if (aantalInSession == 0) {console.log("This session does not exist");}
      if (aantalInSession >= 4) {console.log("This session is already full");}
      if (aantalInSession >= 1 && aantalInSession < 4) {
         writeUserData(localStorage.getItem("pseudo"),number, false);
      }
  
    })
  } 
  else {
    console.log("The number does not have 8 digits.");
  }
}

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