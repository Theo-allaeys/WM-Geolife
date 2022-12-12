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
const store = gameSession();
let sec = 60;
let timeGame = store.$state.time[0] - 1;

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
}}, 1000);
}
startGame();

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
  color:#ffffff;
  font-weight: 700;
  margin-right: 12px;
}
</style>