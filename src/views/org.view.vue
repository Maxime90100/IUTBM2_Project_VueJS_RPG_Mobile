<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Organisations</ion-title>
      </ion-toolbar>
    </ion-header>
    <router-view name="currentOrg"></router-view>
    <ion-content>
      <ListComponent
          listName="Organisations"
          :data="orgs"
          :attributes="['_id','name']"
          :filters="['_id','name']"
          @loadData="getOrgsFromAPI"
      >
      </ListComponent>
      <FormComponent
          formName="Sélectionner une Organisation"
          :text-fields="[
          {name:'idOrg',type:'text',value:currentOrg ? currentOrg._id : null,required:true}
        ]"
          send-button="Obtenir"
          @sendData="selectOrg"
      >
      </FormComponent>
      <FormComponent
          formName="Créer une Organisation"
          :text-fields="[
          {name:'name',type:'text',required:true},
          {name:'secret',type:'text',required:true}
        ]"
          send-button="Créer"
          @sendData="create"
      >
      </FormComponent>
      <FormComponent
          formName="Ajouter une Team"
          :text-fields="[
          {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true}
        ]"
          send-button="Ajouter"
          @sendData="addTeamToOrg"
      >
      </FormComponent>
      <FormComponent
          formName="Supprimer une Team"
          :text-fields="[
          {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true}
        ]"
          send-button="Supprimer"
          @sendData="removeTeamFromOrg"
      >
      </FormComponent>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonHeader,IonToolbar,IonContent,IonTitle} from "@ionic/vue";
import ListComponent from "@/components/list.component.vue";
import FormComponent from "@/components/form.component.vue";
import { mapActions, mapState } from "vuex";

export default {
  name: "OrgView",
  components: {
    IonHeader,IonToolbar,IonContent,IonTitle,
    ListComponent,
    FormComponent,
  },
  computed: {
    ...mapState("orgs", ["orgs", "currentOrg"]),
    ...mapState("teams", ["currentTeam"]),
  },
  methods: {
    ...mapActions("orgs", [
      "getOrgsFromAPI",
      "createOrg",
      "addTeamToOrg",
      "removeTeamFromOrg",
      "getOrgById",
    ]),
    async create(data) {
      await this.createOrg(data);
      this.getOrgsFromAPI();
    },
    async selectOrg(data) {
      await this.getOrgById(data);
      if (this.currentOrg) this.$router.push(`/orgs/${this.currentOrg._id}`);
    },
  },
  created() {
    if (this.currentOrg) this.$router.push(`/orgs/${this.currentOrg._id}`);
  },
};
</script>

<style scoped>
</style>
