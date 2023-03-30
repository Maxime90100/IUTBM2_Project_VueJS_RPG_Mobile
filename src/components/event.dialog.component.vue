<template>
  <ion-modal :is-open="show">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="end">
          <ion-button fill="clear" @click="$emit('closeDialog', true)">
            Ok
          </ion-button>
          <ion-button
              v-if="cancellable"
              fill="clear"
              color="warning"
              @click="$emit('closeDialog', false)"
          >
            Cancel
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-card>
        <ion-card-content>{{ text }}</ion-card-content>
      </ion-card>
    </ion-content>
  </ion-modal>
</template>

<script>
import {IonModal,IonHeader,IonToolbar,IonTitle,IonButton,IonButtons,IonContent,IonCard,IonCardContent} from "@ionic/vue";

export default {
  name: 'EventDialogComponent',
  components:{
    IonModal,IonHeader,IonToolbar,IonTitle,IonButton,IonButtons,IonContent,IonCard,IonCardContent
  },
  props: {
    title: String,
    text: String,
    width: String,
    show: Boolean,
    cancellable: Boolean,
  },
};
</script>

<style scoped>

</style>
