<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
      <div class="head">
        <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
        <ion-title>GeoLife</ion-title>
      </div>

      <div class="Buttons">
        <ion-button class="button" strong="true" color="medium" href="/tabs/tab4">login</ion-button>
        <ion-button class="button" strong="true" color="medium" href="/tabs/tab8">register</ion-button>
      </div>
</div>
    </ion-content>
  </ion-page>
</template>

<script setup>
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

.background_image{
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

.button{
  width: 14rem;
  height: 3rem;
  margin-top: 1rem;
  --border-color: #173030;
  --border-style: solid;
  --border-width: 0.2rem;
  --border-radius: 25px;
}

.logo{
max-width: 200px;
}

</style>
