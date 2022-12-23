import { defineStore } from 'pinia'

export const useLoginStore = defineStore('Login', {
  state: () => ({
    id: []
  }),
  actions: {
    addProduct(id) {
      this.id = [];
      this.id.push(id);
    }
  }
})

export const gameSession = defineStore('game', {
  state: () => ({
    sessionID: [],
    time: [],
    lat: [],
    lon: [],
    radius: []
  }),
  actions: {
    addGame(sessionID, time, lat, lon, radius) {
      this.sessionID = [];
      this.sessionID.push(sessionID);
      this.time = [];
      this.time.push(time);
      this.lat = [];
      this.lat.push(lat);
      this.lon = [];
      this.lon.push(lon);
      this.radius = [];
      this.radius.push(radius);
    }
  }
})

export const geolocalisation = defineStore('geolocation', {
  state: () => ({
    lat: [],
    lon: []
  }),
  actions: {
    addLoca(lat, lon) {
      this.lat = [];
      this.lat.push(lat);
      this.lon = [];
      this.lon.push(lon);
    }
  }
})

export const Radiusstore = defineStore('radius', {
  state: () => ({
    radius: [1]
  }),
  actions: {
    addradius(radius) {
      this.radius = [];
      this.radius.push(radius);
    }
  }
})

export const Scorestore = defineStore('score', {
  state: () => ({
    score: []
  }),
  actions: {
    addradius(score) {
      this.score = [];
      this.score.push(score);
    }
  }
})


