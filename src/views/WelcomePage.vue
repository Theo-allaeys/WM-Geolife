<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div :class="store.theme"></div>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>

        <div class="Buttons">
          <ion-button class="button" strong="true" :class="store.theme" href="/tabs/tab4">login</ion-button>
          <ion-button class="button" strong="true" :class="store.theme" href="/tabs/tab8">register</ion-button>
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
      exp: localStorage.getItem("experience"),
    };
  }
}); 
</script>

<style>
.head {
  display: flex;
  align-content: center;
  align-items: center;
  flex-flow: column;
}

.Buttons {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  height: 50%;
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
  max-width: 200px;
}
</style>
