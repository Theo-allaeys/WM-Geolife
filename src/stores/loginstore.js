import { defineStore } from 'pinia'

export const useLoginStore = defineStore('Login', {
  state: () => ({
    id: []
  }),
  actions: {
    addProduct(id) {
      this.id = [];
      this.id.push(id)
    }
  }
})


