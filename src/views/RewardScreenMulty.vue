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
        <div id="classment">
        </div>
        <div id="buttons">
          <ion-button :class="store.theme" @click="$router.push({ path: '/tabs/tab1' })">Menu</ion-button>
          <ion-button :class="store.theme" @click="$router.push({ path: '/tabs/tab3' })">Play again</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
<script>
import { store } from "@/theme/theme";
import { defineComponent } from "vue";
import { loggedinstore } from "@/stores/userstore"

export default defineComponent({
  data() {
    return {
      theme: localStorage.getItem("themeSet"),
      store,
      loggedinstore,
      loggedin: localStorage.getItem("loggedinuser"),
      pseudo: localStorage.getItem("pseudo"),
      exp: localStorage.getItem("experience")
    };
  }
});

export function givePlayers(pseudo, score, time) {
  document.getElementById("classment").innerHTML += "<p>"+ score + " of " + pseudo + " in " + time + " minutes" + "</p>";
}
</script>

<script setup>
//import { onIonViewDidEnter } from '@ionic/vue';
import { gameMulty } from '../stores/loginstore';
import { EndGame } from "@/components/firebase"
// import { inject } from 'vue';
// const axios = inject('axios')
const storegameMulty = gameMulty();


EndGame(storegameMulty.$state.sessionID[0]);

// function slowCount(end) {

//   let time = 0.0008 * (100 - end);
//   for (let i = 0; i <= end; i++) {
//     setTimeout(() => {
//       document.getElementById("userScore").innerHTML = i;
//     }, i * i * i * time);
//   }
//   // setxp()
// }

// onIonViewDidEnter(() => {
//   setTimeout(function () { slowCount() }, 100);
// })

// const setxp = () => {
//   let totalxp = loggedinstore.exp + (scorestore.score * 50);
//   if (totalxp < 0) {
//     totalxp = 0;
//   }
//   axios
//     .post('https://theoallaeys2021.be/web&mobile/taak1/api/setxp.php', {
//       xp: totalxp,
//       id: loggedinstore.loggedin
//     })
//     .then(response => {
//       // controleer de response
//       if (response.status !== 200) {
//         // er is iets fout gegaan, doe iets met deze info
//         console.log(response.status);
//       } else {
//         localStorage.setItem("experience", totalxp)
//         loggedinstore.setItem();
//       }
//     });
// };
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

#classment {
  text-align: center;
  font-weight: 700;
  font-size: 1.5rem;
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
