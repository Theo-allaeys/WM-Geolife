<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div :class="store.theme"></div>
      <div class="background_image">
        <div class="test">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>
        <ion-label class="lblwelcome">welcome {{ loggedinstore.pseudo.toString() }}</ion-label>
        <div class="test">
          <ion-button class="button" :class="store.theme" href="/tabs/tab3">Solo</ion-button>
          <ion-button disabled class="button" :class="store.theme" href="#">Multiplayer </ion-button>
          <ion-button id="reward" class="button" :class="store.theme" href="/tabs/tab8">Rewards </ion-button>
          <ion-button class="button" :class="store.theme" @click="setlogger()">disconnect </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { LevelStore } from '../stores/loginstore';
import { toastController } from '@ionic/vue';
import { useIonRouter } from '@ionic/vue';
import { inject } from 'vue';
const router = useIonRouter();
const levels = LevelStore();
const axios = inject('axios')


const xpverifier = (id) => {
  axios
    .post('https://theoallaeys2021.be/web&mobile/taak1/api/getxp.php', {
      sqlid: id
    })
    .then(response => {
      // controleer de response
      if (response.status !== 200) {
        // er is iets fout gegaan, doe iets met deze info
        console.log(response.status);
      }
      if (response.data.data.length == 0) {
        console.log(response.data.data[0])
        console.log('response.data.data is not ok');
        return;
      } else {
        lvlverifier(response.data.data[0].xp);
        localStorage.setItem("experience", response.data.data[0].xp);
        loggedinstore.setItem();
      }
    });
};

if (loggedinstore.loggedin == "null" || loggedinstore.loggedin == null) {
  router.push('/tabs/tab2');
} else {
  xpverifier(loggedinstore.loggedin)
}




function lvlverifier(xp) {


  if (xp >= levels.levels[7][2]) {
    presentToast("you are " + levels.levels[7][1] + "(level " + levels.levels[7][0] + ")");
  } else if (xp < 2500) {
    presentToast("you are a beginner (level 0) and " + (levels.levels[1][2] - xp + " xp away from being a Wayfarer"))
  } else {
    for (let index = 0; index < levels.levels.length; index++) {
      let nexlvl = index + 1

      if (xp >= levels.levels[index][2] && xp < levels.levels[nexlvl][2]) {
        presentToast("you are " + levels.levels[index][1] + " (level " + levels.levels[index][0] + ") and " + (levels.levels[nexlvl][2] - xp) + " xp away from being " + levels.levels[nexlvl][1]);
      }

    }
  }

}

async function presentToast(message) {
  const toast = await toastController.create({
    message: message,
    duration: 30000,
    position: 'bottom',
    cssClass: store.theme,
    buttons: [
      {
        text: 'Dismiss',
        role: 'cancel',
      }
    ]
  });

  await toast.present();
}

const setlogger = () => {
  // @ts-ignore: Object is possibly 'null'.
  localStorage.setItem("loggedinuser", null);
  localStorage.setItem("pseudo", null);
  localStorage.setItem("experience", null);
  loggedinstore.setItem();
  router.push('/tabs/tab4')
  console.log(loggedinstore.loggedin)
}

</script>

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
</script>
<style>
ion-toast {
  --background: #121212;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  --color: #ffffff;
  font-size: 15px;
}

ion-toast::part(button) {
  border-left: 1px solid #d2d2d2;
  color: #ffffff;
  font-size: 15px;
}

.reward {
  --ion-color-primary: #566774;
}

.lblwelcome {
  display: flex;
  align-content: center;
  align-items: center;
  flex-flow: column;
  font-weight: 500;
  font-size: 30px;
  margin-top: 50px;
}


.test {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  height: 40%;

}

ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 3rem;
  max-height: 80%;
}

.button {
  width: 14rem;
  height: 3rem;
  margin-top: 1rem;
  --border-radius: 25px;
}

.logo {
  margin-top: 2rem;
  max-width: 200px;
}
</style>