<template>
  <div class="slider">
    <ion-range :class="store.theme" @ionChange="onIonChange" :ticks="true" :snaps="true" :min="1" :max="10" :pin="true"
      :pin-formatter="pinFormatter"></ion-range>
  </div>
  <div id="map" class="map"></div>
</template>

<script>
import { Geolocation } from '@capacitor/geolocation'
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { useGeographic } from "ol/proj";
import Circle from 'ol/geom/Circle';
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { ref } from 'vue';
import { Point } from 'ol/geom';
import { geolocalisation } from '../stores/loginstore';
import { Radiusstore } from '../stores/loginstore';
import { store } from "@/theme/theme";


const storeradius = Radiusstore();
const storeGeo = geolocalisation();
const coord = ref({ latitude: 4, longitude: 50 });

export default {
  name: "MapDiv",
  data() {
    return {
      mainMap: null,
      initialCoordinates: [coord.value.latitude, coord.value.longitude],
      pinFormatter: (value = Number) => `${value}km`,
      radius: 1,
      theme: localStorage.getItem("themeSet"),
      store,
    };
  },
  mounted() {
    const getlocation = () => {
      Geolocation.getCurrentPosition().then((coordinates) => {
        console.log(coordinates);
        coord.value.latitude = coordinates.coords.latitude;
        coord.value.longitude = coordinates.coords.longitude;
        this.initialCoordinates = [coord.value.longitude, coord.value.latitude];
        storeGeo.addLoca(coord.value.latitude, coord.value.longitude);
        console.log("store coord " + storeGeo.lat + " " + storeGeo.lon)
        document.getElementById('map').innerHTML = null;
        this.myMap();
      })
    }
    getlocation();

  },
  methods: {
    onIonChange({ detail }) {
      console.log(detail.value);
      this.radius = detail.value;
      document.getElementById('map').innerHTML = null;
      storeradius.addradius(detail.value);
      this.myMap();
    },

    myMap() {
      useGeographic();
      this.mainMap = new Map({
        interaction: null,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [new Feature({ geometry: new Circle(this.initialCoordinates, 0.0142 * this.radius) }), new Feature(new Point(this.initialCoordinates))],
            }),
          }),
        ],
        target: "map",
        view: new View({
          center: this.initialCoordinates,
          zoom: 15 - this.radius / 2,
        }),
      });
      setTimeout(() => {
        this.mainMap.updateSize();
      }, 500);
    },
  },
};
</script>

<style>
.map {
  width: 95vw;
  height: 80vw;
  margin-left: auto;
  margin-right: auto;
}

.slider {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  margin-top: 30px;
}

ion-range {
  --bar-height: 8px;
  --bar-border-radius: 8px;
  --knob-size: 40px;
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