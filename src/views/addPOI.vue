<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="background_image">
                <div class="head">
                    <ion-img class="logo" src="../../assets/img/logo1024trans.png"></ion-img>
                    <ion-title>GeoLife</ion-title>
                </div>
                <input type="file" name="files[]" />
                <ion-button @click="testfile()">Bevestig</ion-button>
            </div>
        </ion-content>
    </ion-page>
</template>
  
<script setup>
import { inject } from 'vue';
const axios = inject('axios')
function testfile() {
let file = document.querySelector('[type=file]').files[0];
console.log(file)
const formData = new FormData();
formData.append('files', file);
console.log(formData.values())

axios.post('https://theoallaeys2021.be/process.php', formData, {
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})
    .then((response) => {
        console.log(response);
    })
    .catch((error) => {
        console.log(error);
    });
}


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