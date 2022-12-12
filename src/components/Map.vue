<template>
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
import Point from "ol/geom/Point";
import Feature from "ol/Feature";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import { ref } from 'vue';
import { geolocalisation } from '../stores/loginstore';
const store = geolocalisation();

const coord = ref({ latitude: 4, longitude: 50 });



export default {
  name: "MapDiv",
  data() {
    return {
      mainMap: null,
      initialCoordinates: [coord.value.latitude, coord.value.longitude],
    };
  },
  mounted() {
    const getlocation = () => {
  Geolocation.getCurrentPosition().then((coordinates) => {
    console.log(coordinates);
    coord.value.latitude = coordinates.coords.latitude;
    coord.value.longitude = coordinates.coords.longitude;
  console.log("ok")
  this.initialCoordinates = [coord.value.longitude, coord.value.latitude];
  console.log(this.initialCoordinates)
  this.myMap();
  store.addLoca(coord.value.latitude, coord.value.longitude);
  })
}
    getlocation();
  },
  methods: {
    myMap() {
      useGeographic();
      //gebruikermarker = new Feature(new Point(this.initialCoordinates))
      this.mainMap = new Map({
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: [new Feature(new Point(this.initialCoordinates))],
            }),
          }),
        ],
        target: "map",
        view: new View({
          center: this.initialCoordinates,
          zoom: 12,
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
</style>