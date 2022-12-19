<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>
        <MapDiv></MapDiv>
        <div class="time">
          <ion-label id="lblTime">15 MIN</ion-label>
          <ion-button class="btnTime" @click="timeP()" color="light" strong="true">+</ion-button>
          <ion-button class="btnTime" @click="timeM()" color="light" strong="true">-</ion-button>
        </div>
        <div class="Buttons">
          <ion-button color="medium" strong="true" @click="start()">Start Game</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import MapDiv from '@/components/Map'
import { geolocalisation } from '../stores/loginstore';
import { gameSession } from '../stores/loginstore';
import { useIonRouter } from '@ionic/vue';
import { Radiusstore } from '../stores/loginstore';

const storeradius = Radiusstore();
const ionRouter = useIonRouter();
const storeGeo = geolocalisation();
const store = gameSession();

let time = 15;
let sessionid = 9999;

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

function start() {
  store.addGame(sessionid, time, storeGeo.$state.lat, storeGeo.$state.lon, storeradius.$state.radius);
  ionRouter.push('/tabs/tab5');
}

</script>                           

<style>
ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 3rem;
  max-height: 35%;
}

.head {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  color: #ffffff;
}

.background_image {
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
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

.logo {
  max-width: 100px;
}

ion-label {
  font-size: 2rem;
  color:#ffffff;
  font-weight: 700;
  font-style: italic;
  margin-right: 12px;
}

</style>