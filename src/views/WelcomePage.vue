<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
      <div class="head">
        <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
        <ion-title>GeoLife</ion-title>
      </div>

      <div class="Buttons">
        <ion-button class="button" color="light" href="/tabs/GameModePage">login</ion-button>
        <ion-button class="button" color="light" href="/tabs/WelcomePage">register</ion-button>
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
  justify-content: center;
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

.background_image{
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

.button{
  width: 250px;
  height: 60px;
  --border-radius: 25px;
  --border-color: white;
}

.logo{
max-width: 200px;
}

</style>
