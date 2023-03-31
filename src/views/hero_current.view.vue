<template>
  <ion-content v-if="currentHero">
    <ion-card>
      <ion-card-header>
        <ion-card-title>{{currentHero.publicName}} ({{currentHero.realName}})</ion-card-title>
        <ion-card-subtitle>{{currentHero._id}}</ion-card-subtitle>
      </ion-card-header>

      <ion-card-content>
        <ion-list>
          <ion-item v-for="(power,i) in currentHero.powers" :key="'currentHero-power-'+i">
            <ion-label>{{power}}</ion-label>
          </ion-item>
        </ion-list>
      </ion-card-content>

      <ion-footer>
        <ion-toolbar>
          <ion-buttons slot="end">
            <ion-button small @click="unselect">Désélectioner</ion-button>
          </ion-buttons>
        </ion-toolbar>
      </ion-footer>
    </ion-card>
  </ion-content>
</template>

<script>
import { mapMutations, mapState } from "vuex";
import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonList,
  IonItem,
  IonLabel,
  IonFooter,
  IonToolbar,
  IonButtons,
  IonButton,
} from "@ionic/vue";

export default {
  name: "CurrentHeroView",
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonFooter,
    IonToolbar,
    IonButtons,
    IonButton,
  },
  computed: {
    ...mapState("heroes", ["currentHero"]),
  },
  methods: {
    ...mapMutations("heroes", ["setCurrentHero"]),
    unselect() {
      this.setCurrentHero(null);
      this.$router.push("/heroes");
    },
  },
};
</script>

<style scoped>

</style>
