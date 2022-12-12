<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>
        <div class="slider">
          <ion-range @ionChange="onIonChange" :ticks="true" :snaps="true" :min="1" :max="10" :pin="true"
            :pin-formatter="pinFormatter"></ion-range>
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
const ionRouter = useIonRouter();
const storeGeo = geolocalisation();
const store = gameSession();

let pinFormatter = (value = Number) => `${value}km`;
let time = 15;
let radius = 1;
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
  store.addGame(sessionid, time, storeGeo.$state.lat, storeGeo.$state.lon, radius);
  ionRouter.push('/tabs/tab5');
}

function onIonChange({ detail }) {
  console.log(detail.value)
  radius = detail.value;
}

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

.slider {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
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

ion-range {
  --bar-background: #173030;
  --bar-background-active: #ff7300;
  --bar-height: 8px;
  --bar-border-radius: 8px;
  --knob-background: #ffffff;
  --knob-size: 40px;
  --pin-background: #173030;
  --pin-color: #ff7300;
  margin-top: 20px;
  max-width: 90%;
}

ion-range::part(pin) {
  border-radius: 50%;
  transform: scale(1.50);
  top: -22.5px;
  font-weight: 900;
  font-size: 8px;
}

ion-range::part(tick) {
  max-width: 2px;
}
</style>