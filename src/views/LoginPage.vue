<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>

        <div class="Inputs">
          <ion-input class="input" placeholder="Username" v-model="Username" required="true"></ion-input>
          <ion-input class="input" placeholder="Password" v-model="Password" required="true"></ion-input>
        </div>
        <div class="Buttons">
          <ion-button @click="getvak()">Bevestig</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import { ref, inject } from 'vue';
import { useIonRouter, toastController } from '@ionic/vue';
import { useLoginStore } from '../stores/loginstore';
const axios = inject('axios')
const Username = ref(''), Password = ref('');
const store = useLoginStore()
const ionRouter = useIonRouter();

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
        store.addProduct(response.data.data[0].id);
        console.log(store.$state.id)
        ionRouter.push('/tabs/tab1');
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
  background-color: #173030;
  height: 20%;
  border-radius: 25px;
  color: black;
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

.background_image {
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

.logo {
  max-width: 200px;
}
</style>
  