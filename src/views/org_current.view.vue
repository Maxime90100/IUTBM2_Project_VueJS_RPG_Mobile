<template>
  <div v-if="currentOrg">
    <div class="current card">
      <div>
        <h1>{{currentOrg.name}}</h1>
        <h4>{{currentOrg._id}}</h4>
        <h4>SECRET:{{currentOrg.secret}}</h4>
        <ion-list>
          <ion-item v-for="(team,i) in currentOrg.teams" :key="'currentOrg-team-'+i">
            {{team.name}} [{{team._id}}]
            <ion-list v-if="team.members.length">
              <ion-item v-for="(member,i) in team.members" :key="'currentOrg-team-'+i">
                {{member}}
              </ion-item>
            </ion-list>
          </ion-item>
        </ion-list>
      </div>
      <ion-button expand="block" color="secondary" @click="unselect">Désélectioner</ion-button>
    </div>
  </div>
</template>

<script>
import {IonList,IonItem,IonButton} from "@ionic/vue";
import {mapMutations, mapState} from "vuex";

export default {
  name: "CurrentOrgView",
  components:{
    IonList,IonItem,IonButton
  },
  computed:{
    ...mapState('orgs',['currentOrg'])
  },
  methods:{
    ...mapMutations('orgs',['setCurrentOrg']),
    unselect(){
      this.setCurrentOrg(null)
      this.$router.push('/orgs')
    }
  }
}
</script>

<style scoped>

</style>
