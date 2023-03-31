<template>
  <ion-page>
    <IonHeader>
      <IonToolbar>
        <IonTitle>Teams</IonTitle>
      </IonToolbar>
    </IonHeader>
    <router-view name="currentTeam"></router-view>
    <IonContent>
      <ListComponent
          listName="Teams"
          :data="teams"
          :attributes="['_id','name','nbAffiliations']"
          :filters="['_id','name']"
          @loadData="getTeamsFromAPI"
      >
      </ListComponent>
      <FormComponent
          formName="Sélectionner une Team"
          :text-fields="[
          {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true}
      ]"
          send-button="Obtenir"
          @sendData="selectTeam"
      >
      </FormComponent>
      <FormComponent
          formName="Créer une Team"
          :text-fields="[
              {name:'name',type:'text',required:true}
          ]"
          send-button="Créer"
          @sendData="create"
      >
      </FormComponent>
      <FormComponent
          formName="Ajouter des membres"
          :text-fields="[
              {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true},
              {name:'idHeroes',type:'add',components:[
                  {name:'idHero',type:'text',value:currentHero ? currentHero._id : null,required:true}
              ], required: true}
          ]"
          send-button="Ajouter"
          @sendData="addHeroesToTeam"
      >
      </FormComponent>
      <FormComponent
          formName="Supprimer des membres"
          :text-fields="[
              {name:'idTeam',type:'text',value:currentTeam ? currentTeam._id : null,required:true},
              {name:'idHeroes',type:'add',components:[
                  {name:'idHero',type:'text',required:true}
              ], required: true}
          ]"
          send-button="Supprimer"
          @sendData="removeHeroesFromTeam"
      >
      </FormComponent>
    </IonContent>
  </ion-page>
</template>
<script>
import {IonHeader,IonToolbar,IonContent,IonTitle} from "@ionic/vue";
import ListComponent from "@/components/list.component.vue";
import FormComponent from "@/components/form.component.vue";
import {mapActions, mapState} from "vuex";
export default {
  name: "TeamView",
  components: {
    IonHeader,IonToolbar,IonContent,IonTitle,
    ListComponent,
    FormComponent
  },
  computed:{
    ...mapState('teams',['teams','currentTeam']),
    ...mapState('heroes',['currentHero'])
  },
  methods:{
    ...mapActions('teams',[
      'getTeamsFromAPI',
      'createTeam',
      'addHeroesToTeam',
      'removeHeroesFromTeam',
      'getTeamById'
    ]),
    async create(data){
      this.createTeam(data).then(()=>{
        this.getTeamsFromAPI()
      })
    },
    async selectTeam(data){
      this.getTeamById(data).then(()=>{
        if(this.currentTeam) this.$router.push(`/teams/${this.currentTeam._id}`)
      })
    }
  },
  created() {
    if(this.currentTeam) this.$router.push(`/teams/${this.currentTeam._id}`)
  }
}
</script>
<style scoped>

</style>