<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div :class="store.theme"></div>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>

        <div class="Inputs">
          <div :class="store.theme"></div>
          <ion-input class="input" placeholder="Username" v-model="Username" required="true"></ion-input>
          <div :class="store.theme"></div>
          <ion-input class="input" placeholder="Password" v-model="Password" required="true"></ion-input>
        </div>
        <div class="Buttons">
          <ion-button :class="store.theme" @click="getvak()">confirm</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useIonRouter, toastController } from '@ionic/vue';
import { useLoginStore } from '../stores/loginstore';
import { store } from "@/theme/theme";
import { loggedinstore } from "@/stores/userstore"
const axios = inject('axios')
const Username = ref(''), Password = ref('');
const storegame = useLoginStore()
const ionRouter = useIonRouter();

const setlogger = () => {
  // @ts-ignore: Object is possibly 'null'.
  localStorage.setItem("loggedinuser", storegame.id);
  localStorage.setItem("pseudo", storegame.pseudo);
  localStorage.setItem("experience", storegame.xp);
  loggedinstore.setItem();

}

const getvak = () => {
  axios
    .post('https://theoallaeys2021.be/web&mobile/taak1/api/LOGIN.php', {
      Username: Username.value,
      Password: Password.value
    })
    .then(response => {
      // controleer de response
      if (response.status !== 200) {
        // er is iets fout gegaan, doe iets met deze info
        console.log(response.status);
      }
      if (response.data.data.length == 0) {
        console.log('response.data.data is not ok');
        presentToast('bottom');
        return;
      } else {
        console.log(response.data.data[0])
        storegame.adduser(response.data.data[0].id, response.data.data[0].pseudo, response.data.data[0].xp);
        console.log(storegame.$state)
        ionRouter.push('/tabs/tab1');
        setlogger();
      }
    });
};

async function presentToast(position) {
  const toast = await toastController.create({
    message: 'wrong identifiers',
    duration: 1500,
    position: position
  });

  await toast.present();
}
</script>

<script>

import { defineComponent } from "vue";

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
.head {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
}

.Inputs {
  margin-left: auto;
  margin-right: auto;
  max-width: 70%;
}

.input {
  height: 20%;
  border-radius: 25px;
  font-weight: 900;
  margin-top: 20px;
}

.Buttons {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  margin-top: 10px;
}


ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 3rem;
}

.logo {
  max-width: 200px;
}
</style>
