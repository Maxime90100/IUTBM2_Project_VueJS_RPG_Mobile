<template>
  <ion-card>
    <ion-button id="btn" size="small" @click="loadData">Obtenir la liste des {{ listName }}</ion-button>
    <ion-button size="small" :dark="true" v-if="data.length > 0" @click="show">
      <span v-if="extend">&lt; hide</span>
      <span v-else>&gt; show</span>
    </ion-button>
    <div v-if="extend">
      <div v-if="filters" class="filerList">
        <h4>Filtres</h4>
        <span v-for="(filter,i) in filterList" :key="'filter-'+i">
          <ion-input v-model="filterListValues[i]" class="filter" :placeholder="filter"></ion-input>
        </span>
      </div>
      <span style="text-align: left">
        <h5>{{DATA.length}} item(s)</h5>
      </span>
      <ion-table v-if="data.length > 0">
        <ion-header>
          <ion-row>
            <ion-col v-for="(attr, i) in attributes" :key="'attr-th-'+i">{{attr}}</ion-col>
          </ion-row>
        </ion-header>
        <ion-body>
          <ion-row v-for="(i, index) in DATA" :key="'data-'+index">
            <ion-col v-for="(attr, index2) in attributes" :key="'attr-td-'+index2">
              <span v-if="i[attr]">{{i[attr]}}</span>
            </ion-col>
          </ion-row>
        </ion-body>
      </ion-table>
    </div>
  </ion-card>
</template>

<script>
import { IonCard, IonButton, IonInput, IonHeader, IonRow, IonCol} from "@ionic/vue";
export default {
  components: {
    IonCard,
    IonButton,
    IonInput,
    IonHeader,
    IonRow,
    IonCol,
  },
  name: 'ListComponent',
  props:{
    listName:String,
    data:Array,
    attributes:Array,
    filters:Array
  },
  computed:{
    DATA(){
      return this.filterByKeyAndValue(this.data,this.filterList,this.filterListValues)
    }
  },
  data(){
    return{
      extend:false,
      filterList:[],
      filterListValues:[]
    }
  },
  methods:{
    show(){
      this.extend = !this.extend
    },
    loadData(){
      this.$emit('loadData')
    },
    filterByKeyAndValue(arr, filterList, filterListValues) {
      return arr.filter(obj => {
        return filterList.map((key, i) => {
          if(filterListValues[i]) {
            return obj[key].toLowerCase().startsWith(filterListValues[i].toString().toLowerCase());
          } else {
            return true;
          }
        }).every(Boolean);
      });
    }
  },
  created() {
    this.filterList = this.attributes.filter(a=>{
      return this.filters.includes(a)
    })
  }
}
</script>
<style scoped>

</style>