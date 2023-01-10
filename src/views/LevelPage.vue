<template>
    <div :class="store.theme">
        <ion-page>
            <ion-content :fullscreen="true">
                <ion-radio-group v-model="theme">
                    <ion-item style="--background: #173030">
                        <ion-label>default</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="default"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #e52165">
                        <ion-label>roseRaisin</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="roseRaisin"
                            slot="end"></ion-radio>
                    </ion-item>
<<<<<<< Updated upstream
                    <ion-item style="--background: #c51162; opacity: 1">
                        <ion-label>Pink</ion-label>
=======
                    <ion-item style="--background: #077b8a; opacity: 1">
                        <ion-label>jadeViolet</ion-label>
>>>>>>> Stashed changes
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="jadeViolet"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #e2d810; opacity: 1">
                        <ion-label>yellowMagenta</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="yellowMagenta"
                            slot="end"></ion-radio>
                    </ion-item>
<<<<<<< Updated upstream
                    <ion-item style="--background: #6200ea; opacity: 1">
                        <ion-label>Deep Purple</ion-label>
=======
                    <ion-item style="--background: #039fbe; opacity: 1">
                        <ion-label>turquoiseBrick</ion-label>
>>>>>>> Stashed changes
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="turquoiseBrick"
                            slot="end"></ion-radio>
                    </ion-item>
<<<<<<< Updated upstream
                    <ion-item style="--background: #304ffe; opacity: 1">
                        <ion-label>Indigo</ion-label>
=======
                    <ion-item style="--background: #322514; opacity: 1">
                        <ion-label>roseMarron</ion-label>
>>>>>>> Stashed changes
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="roseMarron"
                            slot="end"></ion-radio>
                    </ion-item>
                     <ion-item style="--background: #408ec6">
                        <ion-label>indigomarron</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="indigomarron"
                            slot="end"></ion-radio>
                    </ion-item>
<<<<<<< Updated upstream
                    <ion-item style="--background: #0091ea; opacity: 1">
=======
                    <!-- <ion-item disabled style="--background: #0091ea; opacity: 1">
>>>>>>> Stashed changes
                        <ion-label>Light Blue</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkLightBlue"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #00b8d4; color: black; opacity: 1">
                        <ion-label>Cyan</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkCyan"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #00bfa5; color: black; opacity: 1">
                        <ion-label>Teal</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkTeal"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #00c853; opacity: 1">
                        <ion-label>Green</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkGreen"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #64dd17; color: black">
                        <ion-label>Light Green</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkLightGreen"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #aeea00; color: black; opacity: 1">
                        <ion-label>Lime</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkLime"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #ffd600; color: black; opacity: 1">
                        <ion-label>Yellow</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkYellow"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #ffab00; color: black; opacity: 1">
                        <ion-label>Amber</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkAmber"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #ff6d00; color: black; opacity: 1">
                        <ion-label>Orange</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkOrange"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #dd2c00; opacity: 1">
                        <ion-label>Deep Orange</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkDarkOrange"
                            slot="end"></ion-radio>
                    </ion-item> -->
                </ion-radio-group>
                <ion-card>
                    <ion-toolbar>
                        <ion-segment>
                            <ion-segment-button @click="$router.push({ path: '/tabs/tab1' })">
                                <ion-label>Cancel</ion-label></ion-segment-button>
                            <ion-segment-button @click="setTheme()">
                                <ion-label>Save</ion-label></ion-segment-button></ion-segment>
                    </ion-toolbar>
                </ion-card>
            </ion-content>
        </ion-page>
    </div>
</template>
  

<script>
import { store } from "@/theme/theme";
import { defineComponent } from "vue";

export default defineComponent({
    data() {
        return {
            theme: localStorage.getItem("themeSet"),
            store,
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

