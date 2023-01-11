<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div :class="store.theme"></div>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>
        <div class="points">
          <ion-label id="userScore">0</ion-label>
          <ion-label id="maxPoint">%</ion-label>
        </div>
        <div id="buttons">
          <ion-button color="light">Menu</ion-button>
          <ion-button :class="store.theme">Play again</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
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

</script>

<script setup>
import { onIonViewDidEnter } from '@ionic/vue';
import { Scorestore } from '../stores/loginstore';
const scorestore = Scorestore();



function slowCount(end) {


  let time = 0.0008 * (100 - end);
  for (let i = 0; i <= end; i++) {
    setTimeout(() => {
      document.getElementById("userScore").innerHTML = i;
    }, i * i * i * time);
  }
}

onIonViewDidEnter(() => {
  setTimeout(function () { slowCount(scorestore.score) }, 100);
})

console.clear();
</script>

<style>
#buttons {
  margin-top: 10%;
  display: flex;
  justify-content: center;
}

ion-button {
  width: 140px;
  height: 65px;
  padding: 10px;
}

#userPoint {
  font-size: 6rem;
}

ion-title {
  font-size: 1.5rem;
  color: #ffffff;
  font-weight: 900;
}

ion-label {
  font-size: 3rem;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  color: #ffffff;
  font-weight: 700;
}

.points {
  margin-top: 20%;
  text-align: center;
  display: flex;
  justify-content: center;
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
}

.logo {
  max-width: 100px;
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
