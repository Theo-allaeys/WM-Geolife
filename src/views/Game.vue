<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div :class="store.theme"></div>
      <div class="background_image">
        <div id="div__time">
          <div id="themesetter" :class="store.theme"></div>
          <ion-label id="lblTime2"></ion-label>
          <div id="themesetter" :class="store.theme"></div>
          <ion-label id="lblDistance">0 M</ion-label>
        </div>
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-label>GeoLife</ion-label>
        </div>
        <div id="game">
        </div>
        <div id="div__btn">
          <ion-button :class="store.theme" id="btn__end" strong="true" @click="EndGame()">End Game</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { IonButton } from '@ionic/vue';
import { Geolocation } from '@capacitor/geolocation';
import { useIonRouter } from '@ionic/vue';
import { gameSession } from '../stores/loginstore';
import { Scorestore } from '../stores/loginstore';
import { ref, inject } from 'vue';
const axios = inject('axios')
const storesession = gameSession();
const ionRouter = useIonRouter();
const scorestore = Scorestore();
let InitialDistance = "";
let sec = 60;
let timeGame = storesession.$state.time[0] - 1;
let Distance;

const coordUser = ref({ latitude: storesession.$state.lat[0], longitude: storesession.$state.lon[0] });
const selectedPOI = ref({ id: null, latitude: null, longitude: null, namePoi: null, photo: null })
console.log("game settings", storesession.$state)

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1);  // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  Distance = Math.round(d * 1000);
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}
function hmsToSecondsOnly(str) {
  var p = str.split(':'),
    s = 0, m = 1;

  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10);
    m *= 60;
  }
  console.log(s)
  return s;
}


function checkDistance() {
  Geolocation.getCurrentPosition().then((coordinates) => {
    console.log(coordinates);
    document.getElementById("lblDistance").textContent = Math.round(getDistanceFromLatLonInKm(coordinates.coords.latitude, coordinates.coords.longitude, selectedPOI.value.latitude, selectedPOI.value.longitude) * 1000) + " M";
  });
}

function startGame() {
  setInterval(function countDown() {
    const lblTime = document.getElementById("lblTime2");
    if (sec > 0) {
      if (sec <= 10) {
        sec--;
        lblTime.textContent = " " + timeGame + ":0" + sec + " ";
      }
      else {
        sec--;
        lblTime.textContent = " " + timeGame + ":" + sec + " ";
      }
    }
    else {
      sec = 59;
      timeGame--;
      lblTime.textContent = " " + timeGame + ":" + sec + " ";
    }
    if (sec == 30 || sec == 0) {
      checkDistance()
    }
    if (timeGame < 0) {
      lblTime.textContent = " 00:00 ";
      EndGame();
    }
  }, 1000);
}


const getPOIfromid = (selectedid) => {
  axios
    .post('https://theoallaeys2021.be/web&mobile/taak1/api/getselecPOI.php', {
      id: selectedid,

    })
    .then(response => {
      // controleer de response
      if (response.status !== 200) {
        // er is iets fout gegaan, doe iets met deze info
        console.log(response.status);
      }
      if (response.data.data.length == 0) {
        console.log('response.data.data is not ok');
        return;
      } else {
        console.log(response.data.data[0])
        selectedPOI.value.id = selectedid;
        selectedPOI.value.latitude = response.data.data[0].latitude;
        selectedPOI.value.longitude = response.data.data[0].longitude;
        selectedPOI.value.namePoi = response.data.data[0].name;
        selectedPOI.value.photo = response.data.data[0].photo;
        document.getElementById("game").style.backgroundImage = "url(" + selectedPOI.value.photo + ")";
        InitialDistance = getDistanceFromLatLonInKm(coordUser.value.latitude, coordUser.value.longitude, selectedPOI.value.latitude, selectedPOI.value.longitude) * 1000;
        document.getElementById("lblDistance").textContent = Math.round(InitialDistance) + " M";
        console.log("initialdistance " + InitialDistance)
        startGame();
      }
    });
};

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
          if (Math.round(getDistanceFromLatLonInKm(coordUser.value.latitude, coordUser.value.longitude, response.data.data[i].latitude, response.data.data[i].longitude)) <= storesession.radius) {
            selectablePOI.push(response.data.data[i].id);
          }
        }
        if (selectablePOI.length == 0) {
          document.getElementById('game').innerHTML = '<div id="noPOI"><ion-label>no points are currently available in your selected area. you will be redirected back to the game lobby in 5 seconds</ion-label></div>';
          setTimeout(function () { ionRouter.push('/tabs/tab3') }, 5000);

        } else {
          console.log(selectablePOI)
          let rndInt = Math.floor(Math.random() * selectablePOI.length);
          console.log(selectablePOI[rndInt])
          getPOIfromid(selectablePOI[rndInt]);
        }
      }
    });
}

function calculateScore(time_used, distance_ratio, time_max) {
  console.log(Math.round((1 - (time_used / time_max) * 0.1) * (90 * distance_ratio)));
  return Math.round((1 - (time_used / time_max) * 0.1) * (90 * distance_ratio));
}

function EndGame() {
  let timesec = hmsToSecondsOnly(document.getElementById("lblTime2").textContent);
  Geolocation.getCurrentPosition().then((coordinates) => {
    Distance = getDistanceFromLatLonInKm(coordinates.coords.latitude, coordinates.coords.longitude, selectedPOI.value.latitude, selectedPOI.value.longitude) * 1000;
    console.log("check distance " + Distance);

    let timeleft = 0;
    switch (storesession.$state.time[0]) {
      case 15: timeleft = 900; break;
      case 30: timeleft = 1800; break;
      case 45: timeleft = 2700; break;
      case 60: timeleft = 3600; break;
      case 75: timeleft = 4500; break;
      case 90: timeleft = 5400; break;
      case 105: timeleft = 6300; break;
      case 120: timeleft = 7200; break;
    }
    scorestore.addscore(calculateScore((timeleft - timesec), (InitialDistance - Distance) / InitialDistance, timeleft));
    ionRouter.push('/tabs/tab7');
  });
}

getallPOI();

</script>

<script>

import { store } from "@/theme/theme";
import { defineComponent } from "vue";
//import { distance } from 'ol/coordinate';

export default defineComponent({
  data() {
    return {
      theme: localStorage.getItem("themeSet"),
      store,
    };
  }
}); 
</script>

<style>
#themesetter {
  display: none;
}

#noPOI {
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  text-align: center;
  height: 100%;
}

ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 1.5rem;
}

#imagediv {
  height: 500px;
  width: 85%;
  border-radius: 10px;
  margin-top: 12px;
}

#check {
  margin: 0;
  width: 100%;
  --border-radius: 0%;
  height: 32px;
}

#game {
  margin: 12px 0 12px 0;
  background-size: cover;
  height: 50%;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
}



.head {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  color: #ffffff;
}

#div__btn {
  text-align: center;
}

.game {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
}

#lblTime2 {
  width: 100px;
  padding: 20px 0 20px 0;
  text-align: center;
  border-radius: 0px 0px 12px 0px;
  font-size: 20px;
}

#lblDistance {
  width: 100px;
  margin-right: 0px;
  padding: 20px 0 20px 0;
  text-align: center;
  border-radius: 0px 0px 0px 12px;
  font-size: 20px;
}

#div__time {

  display: flex;
  justify-content: space-between;
}

.logo {
  max-width: 100px;
}

ion-label {
  font-size: 2rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #ffffff;
  font-weight: 700;
}

#imagediv {
  display: flex;
  justify-content: center;
  align-content: center;
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;

}

img {
  margin-left: auto;
  margin-right: auto;
  max-width: 80%;
}
</style>