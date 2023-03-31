<template>
  <div v-if="currentTeam">
    <ion-card class="current">
      <ion-card-header>
        <ion-card-title>{{currentTeam.name}}</ion-card-title>
        <ion-card-subtitle>{{currentTeam._id}}</ion-card-subtitle>
      </ion-card-header>
      <ion-card-content>
        <p>NBAFFILIATIONS:{{currentTeam.nbAffiliations}}</p>
        <ion-button size="small" @click="unselect">Désélectioner</ion-button>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script>
import {IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton} from "@ionic/vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "CurrentTeamView",
  components:{
    IonCard,IonCardHeader,IonCardTitle,IonCardSubtitle,IonCardContent,IonButton
  },
  computed: {
    ...mapState("teams", ["currentTeam"]),
  },
  methods: {
    ...mapMutations("teams", ["setCurrentTeam"]),
    unselect() {
      this.setCurrentTeam(null);
      this.$router.push("/teams");
    },
  },
};
</script>

<style scoped>

</style>
