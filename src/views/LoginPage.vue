<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>

        <div class="Inputs">
          <ion-input class="input" placeholder="Username" required="true"></ion-input>
          <ion-input class="input" placeholder="Password" required="true"></ion-input>
        </div>
        <div class="Buttons">
          <ion-button>Bevestig</ion-button>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>
  
<script setup>
//  import { ref, inject } from 'vue';
//  const axios = inject('axios') // inject axios
//  const Username = ref(''), Password= ref('');
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
  max-width: 30%;

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
  