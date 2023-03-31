<template>
  <ion-app>
    <ion-toolbar>
      <ion-buttons>
        <ion-button v-for="(btn, index) in btns" :key="index" @click="goTo(btn.path)">
          {{ btn.title }}
        </ion-button>
      </ion-buttons>
    </ion-toolbar>

    <ion-content>
      <ErrorDialogComponent
          :title="'Error'"
          :width="'500'"
      ></ErrorDialogComponent>

      <EventDialogComponent
          :title="'Message'"
          :text="eventMessage"
          :show="isEvent"
          :cancellable="eventCancellable"
          :width="'500'"
          @closeDialog="closeDialog"
      ></EventDialogComponent>

      <span v-if="password">
        SECRET: {{password}}
      </span>
      <router-view name="central"></router-view>
    </ion-content>
  </ion-app>
</template>

<script>
import {IonButton, IonButtons, IonToolbar, IonContent, IonApp} from "@ionic/vue"
import ErrorDialogComponent from "@/components/error.dialog.component.vue";
import EventDialogComponent from "@/components/event.dialog.component.vue";
import {mapMutations, mapState} from "vuex";

export default {
  name: 'App',
  components:{
    ErrorDialogComponent,
    EventDialogComponent,
    IonButton, IonButtons, IonToolbar, IonContent, IonApp
  },
  computed:{
    ...mapState('events',['isEvent','eventMessage','eventCancellable']),
    ...mapState('auth',['password'])
  },
  data: () => ({
    index:-1,
    btns:[
      {title:'Home',path:'/'},
      {title:'Heroes',path:'/heroes'},
      {title:'Teams',path:'/teams'},
      {title:'Orgs',path:'/orgs'},
      {title:'Auth',path:'/auth'}
    ]
  }),
  methods: {
    ...mapMutations('events',['popEvent']),
    goTo(path) {
      this.$router.push(path)
    },
    closeDialog(bool){
      this.popEvent()
      if(!bool){
        //TODO
      }
    }
  },
  mounted() {
    this.$store.watch(
        state => state.message,
        data => alert(data)
    )
  }
}
</script>

<style scoped>

</style>
