<template>
  <ion-page>
    <ion-content :fullscreen="true" transparent>
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title>GeoLife</ion-title>
        </div>
        <div class="slider">
          <ion-range @ionChange="onIonChange" :ticks="true" :snaps="true" :min="1" :max="10" :pin="true"
            :pin-formatter="pinFormatter"></ion-range>
        </div>
        <MapDiv></MapDiv>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup>
import MapDiv from '@/components/Map'

let pinFormatter = (value = Number) => `${value}km`;

function onIonChange({ detail }) {
  console.log(detail.value)
}

</script>

<style>
.head {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  flex-flow: column;
  color: #ffffff;
}

.slider {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.background_image {
  background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
  width: 100%;
  height: 100%;
}

.button {
  width: 250px;
  height: 60px;
  --border-radius: 25px;
  --border-color: white;
}

.logo {
  max-width: 100px;
}

ion-range {
  --bar-background: #173030;
  --bar-background-active: #ff7300;
  --bar-height: 8px;
  --bar-border-radius: 8px;
  --knob-background: #ffffff;
  --knob-size: 40px;
  --pin-background: #173030;
  --pin-color: #ff7300;
  margin-top: 20px;
  max-width: 90%;
}

ion-range::part(pin) {
  border-radius: 50%;
  transform: scale(1.50);
  top: -22.5px;
  font-weight: 900;
}

ion-range::part(tick) {
  max-width: 2px;
}
</style>