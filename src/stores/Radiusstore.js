import { defineStore } from 'pinia'

export const useRadiusstore = defineStore('radius', {
  state: () => ({
    selectedradius: [1]
  }),
  actions: {
    addRadius(selectedradius) {
      this.selectedradius = []
      this.selectedradius.push(selectedradius)
      
    }
  }
})