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
                    <ion-item style="--background: #077b8a;">
                        <ion-label>jadeViolet</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="jadeViolet"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #e2d810;">
                        <ion-label>yellowMagenta</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="yellowMagenta"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #039fbe;">
                        <ion-label>turquoiseBrick</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="turquoiseBrick"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #322514;">
                        <ion-label>roseMarron</ion-label>
                        <ion-label slot="end">(Pro Color)</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="roseMarron"
                            slot="end"></ion-radio>
                    </ion-item>
                    <ion-item style="--background: #408ec6">
                        <ion-label>indigomarron</ion-label>
                        <ion-radio style="--color-checked: white; --color: white" value="indigomarron"
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

