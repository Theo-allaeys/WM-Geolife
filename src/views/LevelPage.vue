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
                    <ion-item style="--background: #d50000">
                        <ion-label>Red</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkRed"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #c51162; opacity: 1">
                        <ion-label>Pink</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkPink"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #aa00ff; opacity: 1">
                        <ion-label>Purple</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkPurple"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #6200ea; opacity: 1">
                        <ion-label>Deep Purple</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkDarkPurple"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #304ffe; opacity: 1">
                        <ion-label>Indigo</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkIndigo"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #2962ff">
                        <ion-label>Blue</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkBlue"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #0091ea; opacity: 1">
                        <ion-label>Light Blue</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkLightBlue"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #00b8d4; color: black; opacity: 1">
                        <ion-label>Cyan</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkCyan"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #00bfa5; color: black; opacity: 1">
                        <ion-label>Teal</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkTeal"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #00c853; opacity: 1">
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
                    <ion-item disabled style="--background: #aeea00; color: black; opacity: 1">
                        <ion-label>Lime</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkLime"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #ffd600; color: black; opacity: 1">
                        <ion-label>Yellow</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkYellow"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #ffab00; color: black; opacity: 1">
                        <ion-label>Amber</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkAmber"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #ff6d00; color: black; opacity: 1">
                        <ion-label>Orange</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: black; --color: black" value="darkOrange"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item disabled style="--background: #dd2c00; opacity: 1">
                        <ion-label>Deep Orange</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="darkDarkOrange"
                            slot="end"></ion-radio>
                    </ion-item>
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

