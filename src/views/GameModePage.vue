<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
      <div class="test">
        <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
        <ion-title>GeoLife</ion-title>
      </div>
      
      <div class="test2">
        <ion-button class="button" color="light" href="/tabs/WelcomePage">page 2</ion-button>
        <ion-button class="button" color="light" href="/tabs/tab2">page 2</ion-button>
        <ion-button class="button" color="light" href="/tabs/tab2">page 2</ion-button>
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
  height: 70%;
  
}

.background_image{
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

.button{
  width: 200px;
  --border-radius: 25px;
  --border-color: white;
}

.logo{
max-width: 200px;
}

</style>