<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-label>GeoLife</ion-label>
        </div>
        <div class="game">
          <ion-label id="lblTime2"></ion-label>
          <ion-label id="lblDistance"></ion-label>
          <ion-label id="lblId"></ion-label>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { gameSession } from '../stores/loginstore';
import { ref, inject } from 'vue';
const axios = inject('axios')
const store = gameSession();
let sec = 60;
let timeGame = store.$state.time[0] - 1;
let selectablePOI = [];
const coordUser = ref({ latitude: store.$state.lat[0], longitude: store.$state.lon[0] });
const selectedPOI = ref({id: null, latitude: null, longitude: null, namePoi: null, photo: null })
console.log(" coords user" + coordUser.value)

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
  console.log(d)
  return d;
}
function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function startGame() {
  setInterval(function countDown() {
    const lblTime = document.getElementById("lblTime2");
    if (sec > 0) {
      if (sec <= 10) {
        sec--;
        lblTime.textContent = timeGame + ":0" + sec;
      }
      else {
        sec--;
        lblTime.textContent = timeGame + ":" + sec;
      }
    }
    else {
      sec = 59;
      timeGame--;
      lblTime.textContent = timeGame + ":" + sec;
    }
    if (timeGame < 0) {
      lblTime.textContent = "00:00";
    }
  }, 1000);
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
        console.log(response.data);
        selectablePOI = [];
        for (let i = 0, end = response.data.data.length; i < end; i++) {
          if (getDistanceFromLatLonInKm(coordUser.value.latitude, coordUser.value.longitude, response.data.data[i].latitude, response.data.data[i].longitude) <= store.radius / 2) {
            selectablePOI.push(response.data.data[i].id);
          }
        }
      }
    });
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
        selectedPOI.value.photo = response.data.data[0].photo
      }
    });
};

function initiategame(){
  getallPOI();
  const rndInt = Math.floor(Math.random() * (selectablePOI.length - 1))
  getPOIfromid(selectablePOI[rndInt]);
//calculer la distance pour montrer au debut
//afficher l'image qui est dans selectedPOI.value.photo avec peutaire base64 (a voir)
//en dernier demarrer le jeux et peutaitre rajouter les chose aux quelles jai pas pensé
startGame();
}
initiategame();
</script>

<style>
ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 1.5rem;
}

.head {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  color: #ffffff;
}

.game {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 10px;
}

.background_image {
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

.logo {
  max-width: 100px;
}

ion-label {
  font-size: 2rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #ffffff;
  font-weight: 700;
  margin-right: 12px;
}
</style>