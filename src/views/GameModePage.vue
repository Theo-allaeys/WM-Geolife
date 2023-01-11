<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div :class="store.theme"></div>
      <div class="background_image">
        <div class="test">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>
        <ion-label class="lblwelcome">welcome {{ storegame.pseudo.toString() }}</ion-label>
        <div class="test">
          <ion-button class="button" :class="store.theme" href="/tabs/tab3">Solo</ion-button>
          <ion-button disabled class="button" :class="store.theme" href="#">Multiplayer </ion-button>
          <ion-button id="reward" class="button" :class="store.theme" href="/tabs/tab8">Rewards </ion-button>
          <ion-button class="button" :class="store.theme" href="/tabs/tab4">disconnect </ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { useLoginStore } from '../stores/loginstore';
import { LevelStore } from '../stores/loginstore';
import { toastController } from '@ionic/vue';
import { onIonViewDidEnter } from '@ionic/vue';
const storegame = useLoginStore();
const levels = LevelStore();
onIonViewDidEnter(() => {
  lvlverifier(storegame.xp);
});

function lvlverifier(xp) {
  console.log(levels.levels)

  if (xp >= levels.levels[7][2]) {
    presentToast("you are " + levels.levels[7][1] + "(level " + levels.levels[7][0] + ")");
  } else if (xp < 2500) {
    presentToast("you are a beginner (level 0) and " + (levels.levels[1][2] - xp + " xp away from being a Wayfarer"))
    document.getElementById("reward").disabled = true;
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
    duration: 999999999,
    position: 'bottom',
  });

  await toast.present();
}


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
</script>
<style>
ion-toast {
  --background: #121212;
  --box-shadow: 3px 3px 10px 0 rgba(0, 0, 0, 0.2);
  --color: #ffffff;
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