<template>
  <ion-modal :is-visible="isError" :css-class="modalClass">
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card>
        <ion-card-content>
          {{ errorMsg }}
        </ion-card-content>
      </ion-card>
      <ion-button expand="block" color="danger" @click="popError()">OK</ion-button>
    </ion-content>
  </ion-modal>
</template>

<script>
import {IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonButton} from "@ionic/vue"
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'ErrorDialogComponent',
  components:{
    IonModal,IonHeader,IonToolbar,IonTitle,IonContent,IonCard,IonCardContent,IonButton
  },
  props: {
    title: String,
    modalClass: String
  },
  computed: {
    ...mapState('errors', ['isError', 'errorMsg'])
  },
  methods: {
    ...mapMutations('errors', ['popError'])
  }
};
</script>

<style scoped>

</style>
