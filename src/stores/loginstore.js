import { defineStore } from 'pinia'

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

export const gameMulty = defineStore('multy', {
  state: () => ({
    sessionID: [],
    time: [],
    poi: []
  }),
  actions: {
    addMulty(sessionID, time, poi) {
      this.sessionID = [];
      this.sessionID.push(sessionID);
      this.time = [];
      this.time.push(time);
      this.poi = [];
      this.poi.push(poi);
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
    addscore(score) {
      this.score = [];
      this.score.push(score);
    }
  }
})

export const LevelStore = defineStore('level', {
  state: () => ({
    levels:
      [
        [0, "a beginner", 0],
        [1, "a Wayfarer", 2500],
        [2, "a Traveler", 5000],
        [3, "an Adventurer", 10000],
        [4, "a Pathfinder", 20000],
        [5, "an Explorer", 30000],
        [6, "a Voyager", 40000],
        [7, "a Master", 50000],
      ]
  })
})


