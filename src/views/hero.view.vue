<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Héros</ion-title>
      </ion-toolbar>
    </ion-header>
    <router-view name="currentHero"></router-view>
    <ion-content>
      <ListComponent
          listName="Héros"
          :data="heroes"
          :attributes="['_id', 'publicName']"
          :filters="['_id', 'publicName']"
          @loadData="getHeroesFromAPI"
      >
      </ListComponent>
      <FormComponent
          formName="Sélectionner un héro"
          :text-fields="[
          {name:'idHero',type:'text',value:currentHero ? currentHero._id : null,required:true}
        ]"
          send-button="Obtenir"
          @sendData="selectHero"
      >
      </FormComponent>
      <FormComponent
          formName="Créer un héro"
          :text-fields="[
          {name:'publicName',type:'text',required:true},
          {name:'realName',type:'text',required:true},
          {name:'powers',type:'add',components:[
              {name:'name',type:'text',required:true},
              {name:'type',type:'number',min:1,max:7,required:true},
              {name:'level',type:'number',min:0,max:100,required:true}
          ],required:false}
        ]"
          send-button="Créer"
          @sendData="create"
      >
      </FormComponent>
      <FormComponent
          formName="Modifier un héro"
          :text-fields="[
          {name:'_id',type:'text',value:currentHero ? currentHero._id : null,required:true},
          {name:'publicName',type:'text',required:true},
          {name:'realName',type:'text',required:true},
          {name:'powers',type:'add',components:[
              {name:'name',type:'text',required:true},
              {name:'type',type:'number',min:1,max:7,required:true},
              {name:'level',type:'number',min:0,max:100,required:true}
          ],required:false}
        ]"
          send-button="Modifier"
          @sendData="updateHero"
      >
      </FormComponent>
    </ion-content>
  </ion-page>
</template>

<script>
import {IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
import ListComponent from "@/components/list.component.vue";
import FormComponent from "@/components/form.component.vue";
import {mapActions, mapState} from "vuex";

export default {
  name: "HeroView",
  components: {
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    ListComponent,
    FormComponent
  },
  computed:{
    ...mapState('heroes',['heroes','currentHero']),
    ...mapState('orgs',['currentOrg'])
  },
  data(){
    return{
      heroById:null
    }
  },
  methods:{
    ...mapActions('heroes',[
      'getHeroesFromAPI',
      'createHero',
      'updateHero',
      'getHeroById'
    ]),
    async create(data){
      this.createHero(data).then(()=>{
        this.getHeroesFromAPI()
      })
    },
    async selectHero(data){
      this.getHeroById(data).then(()=>{
        if(this.currentHero) this.$router.push(`/heroes/${this.currentHero._id}`)
      })
    }
  },
  created() {
    if(this.currentHero) this.$router.push(`/heroes/${this.currentHero._id}`)
  }
}
</script>

<style scoped>

</style>