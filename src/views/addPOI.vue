<template>
    <div :class="store.theme">
        <ion-page>
            <ion-content :fullscreen="true">
                <div class="background_image">
                <div class="head">
                    <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
                    <ion-title>GeoLife</ion-title>
                </div>
                <input type="file" name="files[]"/>
                <ion-button @click="testfile()">Bevestig</ion-button>
            </div>
            </ion-content>
        </ion-page>
    </div>
</template>
  
<script setup>
import { inject } from 'vue';
import { Geolocation } from '@capacitor/geolocation';
const axios = inject('axios')
function testfile() {
let file = document.querySelector('[type=file]').files[0];
const formData = new FormData();
formData.append('files', file);
console.log(file.name)
axios.post('https://theoallaeys2021.be/process.php', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
    .then((response) => {
        if (response.status !== 200){
            console.log(response)
    }else{
        console.log(response)
        addpoi(file.name, "temp")
    }
    })
    .catch((error) => {
        console.log(error);
    })

}

const addpoi = (filename, _name) => {
let src = "https://theoallaeys2021.be/POI_images/" + filename;
Geolocation.getCurrentPosition().then((coordinates) => {
  axios
    .post('https://theoallaeys2021.be/web&mobile/taak1/api/addPOI.php', {
      photo: src,
      name: _name,
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    })
    .then(response => {
      // controleer de response
      if (response.status !== 200) {
        // er is iets fout gegaan, doe iets met deze info
        console.log(response.status);
      }
    });
  });
};

</script>

<script>
import { store } from "@/theme/theme";
import { defineComponent } from "vue";
import { loggedinstore } from "@/stores/userstore"

export default defineComponent({
  data() {
    return {
      theme: localStorage.getItem("themeSet"),
      store,
      loggedinstore,
      loggedin: localStorage.getItem("loggedinuser"),
      pseudo: localStorage.getItem("pseudo"),
      exp: localStorage.getItem("experience")
    };
  }
}); 
</script>
    
<style>
.head {
    display: flex;
    align-content: center;
    align-items: center;
    flex-flow: column;
}

ion-title {
    --color: rgb(255, 255, 255);
    font-weight: 900;
    font-size: 3rem;
    max-height: 80%;
}

.background_image {
    background: url('../../public/assets/img/background.png') no-repeat center/cover fixed;
    width: 100%;
    height: 100%;
}

.logo {
    max-width: 200px;
}
</style>

