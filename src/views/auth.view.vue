<template>
  <ion-content>
    <ion-card>
      <ion-card-header>
        <ion-card-title>Authentification</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <ion-item>
          <ion-label position="floating">Secret password</ion-label>
          <ion-input v-model="pwd"></ion-input>
        </ion-item>
      </ion-card-content>
    </ion-card>

    <hr>

    <ion-card v-if="login" class="info">
      <ion-card-content>
        LOGIN: {{ login.name }}
      </ion-card-content>
    </ion-card>

    <FormComponent
        form-name="Sign in"
        :text-fields="[
        { name: 'login', type: 'text', required: true },
        { name: 'password', type: 'password', required: true }
      ]"
        send-button="sign in"
        @sendData="signIn"
    />

    <ion-card v-if="user" class="info">
      <ion-card-content>
        USER: {{ user }}
      </ion-card-content>
    </ion-card>

    <FormComponent
        form-name="Log in"
        :text-fields="[
        { name: 'login', type: 'text', required: true }
      ]"
        send-button="log in"
        @sendData="logIn"
    />

  </ion-content>
</template>

<script>
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonLabel, IonInput } from '@ionic/vue';
import { mapActions, mapMutations, mapState } from 'vuex';
import FormComponent from '@/components/form.component.vue';

export default {
  name: 'AuthenticationView',
  components: {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    FormComponent
  },
  computed: {
    ...mapState('auth', ['password', 'login', 'user'])
  },
  methods: {
    ...mapMutations('auth', ['setPassword']),
    ...mapActions('auth', ['signIn', 'logIn'])
  },
  data() {
    return {
      pwd: this.password
    }
  },
  watch: {
    pwd(secret) {
      this.setPassword(secret)
    }
  }
}
</script>

<style scoped>

</style>
