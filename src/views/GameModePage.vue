<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
      <div class="test">
        <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
        <ion-title>GeoLife</ion-title>
      </div>
      <div class="test2">
        <ion-button class="button" color="medium" href="/tabs/tab1">page 1</ion-button>
        <ion-button class="button" color="medium" href="/tabs/tab2">page 2</ion-button>
        <ion-button class="button" color="medium" href="/tabs/tab3">page 3</ion-button>
      </div>
</div>
    </ion-content>
  </ion-page>
</template>
<script setup>
</script>
<style>

.test {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
}

.test2 {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  height: 60%;
  
}

.background_image{
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

ion-title {
  --color: rgb(255, 255, 255);
  font-weight: 900;
  font-size: 3rem;
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
  margin-top: 2rem;
  max-width: 200px;
}

</style>