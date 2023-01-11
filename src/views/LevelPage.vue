<template>
    <div :class="store.theme">
        <ion-page>
            <ion-content :fullscreen="true">
                <ion-radio-group v-model="theme">
                    <ion-item disabled id="color0" style="--background: #173030">
                        <ion-label>default</ion-label>
                        <ion-label slot="end">(Beginner)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="default"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color1" style="--background: #e52165">
                        <ion-label>roseRaisin</ion-label>
                        <ion-label slot="end">(Wayfarer)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="roseRaisin"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color2" style="--background: #077b8a;">
                        <ion-label>jadeViolet</ion-label>
                        <ion-label slot="end">(Traveler)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="jadeViolet"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color3" style="--background: #e2d810;">
                        <ion-label>yellowMagenta</ion-label>
                        <ion-label slot="end">(Rookie Adventurer)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="yellowMagenta"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color4" style="--background: #039fbe;">
                        <ion-label>turquoiseBrick</ion-label>
                        <ion-label slot="end">(Pathfinder)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="turquoiseBrick"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color5" style="--background: #322514;">
                        <ion-label>rose</ion-label>
                        <ion-label slot="end">(Explorer)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="roseMarron"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color6" style="--background: #408ec6">
                        <ion-label>indigo</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="indigomarron"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color7" style="--background: #ffa781">
                        <ion-label>lotus</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="lotus"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color8" style="--background: #5c1e61">
                        <ion-label>bordeauxRose</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="bordeauxRose"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color9" style="--background: #408ec6">
                        <ion-label>brazilSubzero</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="brazilSubzero"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color10" style="--background: #ff1f1f">
                        <ion-label>Redblack</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="rougeNoir"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color11" style="--background: #000000">
                        <ion-label>black</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="black"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled id="color12" style="--background: #00d9ff">
                        <ion-label>blueSun</ion-label>
                        <ion-label slot="end">(Voyager)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="blueSun"
                            slot="end"></ion-radio>
                    </ion-item>
                </ion-radio-group>
                <ion-card>
                    <ion-toolbar>
                        <ion-segment>
                            <ion-segment-button @click="$router.push({ path: '/tabs/tab1' })">
                                <ion-label>back to menu</ion-label></ion-segment-button>
                            <ion-segment-button @click="setTheme()">
                                <ion-label>Save</ion-label></ion-segment-button></ion-segment>
                    </ion-toolbar>
                </ion-card>
                <ion-progress-bar :value="progress"></ion-progress-bar>
            </ion-content>
        </ion-page>
    </div>
</template>


<script setup>
import { LevelStore } from '../stores/loginstore';
import { ref } from 'vue';
const levels = LevelStore();
let progress = ref(0);
setTimeout(function () {
    if (loggedinstore.loggedin == "null") {
        //rien de grave
        console.log('pas ok')
    } else {
        console.log(loggedinstore.loggedin)
        lvlverifier(loggedinstore.exp);

    }
}, 500);


setInterval(() => {

    if (progress.value >= lvlcounter(loggedinstore.exp)) {
setTimeout(() => {
            progress.value = lvlcounter(loggedinstore.exp);
          }, 30000);
    }else {
        progress.value += 0.01;
    }
}, 90);


function lvlcounter(xp) {

    if (xp >= levels.levels[7][2]) {
        return 1;
    } else {
        for (let index = 0; index < levels.levels.length - 1; index++) {
            let nexlvl = index + 1
            if (xp >= levels.levels[index][2] && xp < levels.levels[nexlvl][2]) {
               return (xp / levels.levels[nexlvl][2]) ;
            }
        }
    }

}


function lvlverifier(xp) {


    if (xp >= levels.levels[7][2]) {
        //progress bar max
        for (let index = 0; index <= 12; index++) {
            document.getElementById("color" + index).disabled = false;
        }
    } else if (xp < 2500) {
        //unable to see this
        console.log(' ');
    } else {
        for (let index = 0; index < levels.levels.length * 2; index++) {

            if (xp >= levels.levels[index][2]) {
                document.getElementById("color" + index).disabled = false;
            }

        }
    }

}

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
    },
    methods: {
        setTheme() {
            // @ts-ignore: Object is possibly 'null'.
            localStorage.setItem("themeSet", this.theme);
            store.setItem();
        },
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

