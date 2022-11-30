<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <div class="background_image">
        <div class="head">
          <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
          <ion-title >GeoLife</ion-title>
        </div>
<div class="slider">
  <ion-range @ionChange="onIonChange" :ticks="true" :snaps="true" :min="1" :max="10" :pin="true" :pin-formatter="pinFormatter"></ion-range>
</div>

  <capacitor-google-map id="map"></capacitor-google-map>
<ion-button @click="createMap">create map</ion-button>

      </div>   
    </ion-content>
  </ion-page>
</template>

<script setup>
import { GoogleMap } from '@capacitor/google-maps';
import {onIonViewWillEnter} from '@ionic/vue';
import {Geolocation} from '@capacitor/geolocation';
import { ref } from 'vue';
     
let pinFormatter = (value= Number) => `${value}km`;

     function onIonChange({detail}){
      console.log(detail.value)
     }
  const createMap = async () => {
    const mapRef = document.getElementById('map');
  await GoogleMap.create({
      id: 'my-map', // Unique identifier for this map instance
      element: mapRef, // reference to the capacitor-google-map element
      apiKey: 'AIzaSyCyBNLETssLzv7nOD-gwQ9ke4Q_YSVOmWQ', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: coords.value.latitude,
          lng: coords.value.longitude,
        },
        zoom: 1, // The initial zoom level to be rendered by the map
      },
    });
  };


const coords = ref({latitude:4,longitude:50});

const getlocation = async () => {
  let coordinates = await Geolocation.getCurrentPosition();
  coords.value.latitude = coordinates.coords.latitude;
  coords.value.longitude = coordinates.coords.longitude;
};


onIonViewWillEnter(() => {
    createMap();
    getlocation();
    console.log(coords)
});

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

  capacitor-google-map {
    display: inline-block;
    width: 50%;
    height: 30%;
    margin-right: auto;
    margin-left: auto;
  }

  ion-content{
    opacity: 1;
  }

.map{
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  --background: none !important;
}
</style>