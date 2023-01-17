<template>
    <div :class="store.theme">
        <ion-page>
            <ion-content :fullscreen="true">
                <ion-card>
                    <ion-radio-group v-model="theme">
                        <ion-card>
                            <ion-item id="0" style="--background: #173030">
                                <ion-label>default</ion-label>
                                <ion-label slot="end">(Beginner)</ion-label>
                                <ion-radio style="--color-checked: white; --color: white" value="default"
                                    slot="end"></ion-radio>
                            </ion-item>
                        </ion-card>
                        <ion-card>
                            <div id="1">
                                <ion-item disabled style="--background: #e52165">
                                    <ion-label>roseRaisin</ion-label>
                                    <ion-label slot="end">(Wayfarer)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="roseRaisin"
                                        slot="end"></ion-radio>
                                </ion-item>
                                <ion-item disabled style="--background: #077b8a;">
                                    <ion-label>jadeViolet</ion-label>
                                    <ion-label slot="end">(Wayfarer)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="jadeViolet"
                                        slot="end"></ion-radio>
                                </ion-item>
                            </div>
                        </ion-card>
                        <ion-card>
                            <div id="2">
                                <ion-item disabled style="--background: #e2d810;">
                                    <ion-label>yellowMagenta</ion-label>
                                    <ion-label slot="end">(Traveler)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="yellowMagenta"
                                        slot="end"></ion-radio>
                                </ion-item>
                                <ion-item disabled style="--background: #039fbe;">
                                    <ion-label>turquoiseBrick</ion-label>
                                    <ion-label slot="end">(Traveler)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="turquoiseBrick"
                                        slot="end"></ion-radio>
                                </ion-item>
                            </div>
                        </ion-card>
                        <ion-card>
                            <div id="3">
                                <ion-item disabled style="--background: #322514;">
                                    <ion-label>rose</ion-label>
                                    <ion-label slot="end">(Adventurer)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="roseMarron"
                                        slot="end"></ion-radio>
                                </ion-item>
                                <ion-item disabled style="--background: #408ec6">
                                    <ion-label>indigo</ion-label>
                                    <ion-label slot="end">(Adventurer)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="indigomarron"
                                        slot="end"></ion-radio>
                                </ion-item>
                            </div>
                        </ion-card>
                        <ion-card>
                            <div id="4">
                                <ion-item disabled style="--background: #ffa781">
                                    <ion-label>lotus</ion-label>
                                    <ion-label slot="end">(Pathfinder)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="lotus"
                                        slot="end"></ion-radio>
                                </ion-item>
                                <ion-item disabled style="--background: #5c1e61">
                                    <ion-label>bordeauxRose</ion-label>
                                    <ion-label slot="end">(Pathfinder)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="bordeauxRose"
                                        slot="end"></ion-radio>
                                </ion-item>
                            </div>
                        </ion-card>
                        <ion-card>
                            <div id="5">
                                <ion-item disabled style="--background: #408ec6">
                                    <ion-label>brazilSubzero</ion-label>
                                    <ion-label slot="end">(Explorer)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="brazilSubzero"
                                        slot="end"></ion-radio>
                                </ion-item>
                                <ion-item disabled style="--background: #ff1f1f">
                                    <ion-label>Redblack</ion-label>
                                    <ion-label slot="end">(Explorer)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="rougeNoir"
                                        slot="end"></ion-radio>
                                </ion-item>
                            </div>
                        </ion-card>
                        <ion-card>
                            <div id="6">
                                <ion-item disabled style="--background: #000000">
                                    <ion-label>black</ion-label>
                                    <ion-label slot="end">(Voyager)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="black"
                                        slot="end"></ion-radio>
                                </ion-item>
                                <ion-item disabled style="--background: #00d9ff">
                                    <ion-label>blueSun</ion-label>
                                    <ion-label slot="end">(Voyager)</ion-label>
                                    <ion-radio style="--color-checked: white; --color: white" value="blueSun"
                                        slot="end"></ion-radio>
                                </ion-item>
                            </div>
                        </ion-card>
                    </ion-radio-group>
                </ion-card>
                <ion-card>
                    <ion-toolbar>
                        <ion-segment>
                            <ion-segment-button @click="$router.push({ path: '/tabs/tab1' })">
                                <ion-label>back to menu</ion-label></ion-segment-button>
                            <ion-segment-button @click="setTheme()">
                                <ion-label>Save</ion-label></ion-segment-button></ion-segment>
                    </ion-toolbar>
                </ion-card>
                <div class="progresslabel">
                    <Ion-label>{{ Math.round(levels.levels[lvlverifier2(loggedinstore.exp)][2] * progress) * 2 }}
                        xp</Ion-label>
                    <Ion-label> / {{ levels.levels[nextlvl()][2] }} xp</Ion-label>
                </div>
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
    } else {
        progress.value += 0.01;
    }
}, 70);

function nextlvl() {
    if (lvlverifier2(loggedinstore.exp) == 7) {
        return lvlverifier2(loggedinstore.exp);
    } else {
        return lvlverifier2(loggedinstore.exp) + 1;
    }
}


function lvlcounter(xp) {

    if (xp >= levels.levels[7][2]) {
        return 1;
    } else {
        for (let index = 0; index < levels.levels.length - 1; index++) {
            let nexlvl = index + 1
            if (xp >= levels.levels[index][2] && xp < levels.levels[nexlvl][2]) {
                return (xp / levels.levels[nexlvl][2]);
            }
        }
    }

}
console.log(levels.levels)


function lvlverifier(xp) {


    if (xp >= levels.levels[7][2]) {
        //progress bar max
        for (let index = 0; index <= 6; index++) {
            document.getElementById(index).childNodes[0].disabled = false;
            document.getElementById(index).childNodes[1].disabled = false;
        }
    } else if (xp < 2500) {
        //unable to see this
        console.log(' ');
    } else {
        for (let index = 0; index < levels.levels.length; index++) {

            if (xp >= levels.levels[index][2]) {
                document.getElementById(index).childNodes[0].disabled = false;
                document.getElementById(index).childNodes[1].disabled = false;
                console.log(index)
            }

        }
    }

}

function lvlverifier2(xp) {


    if (xp >= levels.levels[7][2]) {
        return 7;
    } else if (xp < 2500) {
        return 0;
    } else {
        for (let index = 0; index < levels.levels.length; index++) {
            let nexlvl = index + 1

            if (xp >= levels.levels[index][2] && xp < levels.levels[nexlvl][2]) {
                return index;
            }

        }
    }

}

</script>

<script>
import { store } from "@/theme/theme";
import { defineComponent } from "vue";
import { loggedinstore } from "@/stores/userstore"
import { IonLabel } from '@ionic/vue';

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
    },
    components: { IonLabel }
}); 
</script>
    
<style>
.progresslabel {
    text-align: center;
}

ion-progress-bar {
    height: 1%;
}

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

