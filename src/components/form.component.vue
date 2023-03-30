<template>
  <ion-card>
    <ion-card-header>
      <ion-card-title>{{ formName }}</ion-card-title>
      <ion-button slot="end" v-on:click="show">
        {{ extend ? "< hide" : "> show" }}
      </ion-button>
    </ion-card-header>

    <ion-card-content>
      <ion-list v-if="extend">
        <ion-item-group v-for="(tf, index) in textFields" :key="'Form-textField-' + index">
          <ion-item-divider>
            <ion-label>
              {{ tf.name }}
              <span v-if="tf.required">*</span>
            </ion-label>
          </ion-item-divider>

          <ion-item v-if="tf.type !== 'add'">
            <ion-input
                :id="formName + '-id-' + index"
                :type="tf.type"
                :value="tf.value"
            ></ion-input>
          </ion-item>

          <ion-item v-else class="item">
            <ion-item-group v-for="(item, i) in tf.components" :key="'Form-textField-item-' + i">
              <ion-item>
                <ion-label position="floating">{{ item.name }}</ion-label>
                <ion-input
                    :id="formName + '-item-' + item.name"
                    :name="item.name"
                    :type="item.type"
                    :min="item.min"
                    :max="item.max"
                    :value="item.value"
                    :class="'required-' + item.required"
                ></ion-input>
              </ion-item>
            </ion-item-group>

            <ion-button size="small" shape="round" v-on:click="add(tf, index)">
              + Add
            </ion-button>

            <ion-list>
              <ion-item v-for="(item, i) in addItems" :key="'Form-textField-list-item-' + i">
                <ion-label>{{ item }}</ion-label>
                <ion-button size="small" fill="solid" slot="end" v-on:click="supress(i)">
                  Delete
                </ion-button>
              </ion-item>
            </ion-list>
          </ion-item>
        </ion-item-group>

        <ion-button
            size="small"
            style="margin: 5px 0"
            v-on:click="sendData"
        >
          {{ sendButton }}
        </ion-button>

        <ion-label>
          Les champs marqués d'un * sont obligatoires
        </ion-label>
      </ion-list>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "FormComponent",
  props:{
    formName:String,
    textFields:Array,
    sendButton:String
  },
  data(){
    return{
      addItems:[],
      extend:false
    }
  },
  methods:{
    ...mapMutations('events',['pushEvent']),
    show(){
      this.extend = !this.extend
    },
    add(tf,index){
      let object = {}
      let check = true

      tf.components.forEach(item=>{
        const name = item.name
        const input = document.getElementById(this.formName+'-item-'+item.name)
        input.style.borderColor = "white"
        let value = input.value
        const required = input.classList.contains('required-true')

        if(!value){
          value = null
          if(required){
            check = false
            input.style.borderColor = "red"
          }
        }

        if(item.type === 'number' && (value<item.min || value>item.max)){
          check = false
          input.style.borderColor = "red"
          this.pushEvent({message:`"${name}" must be between ${item.min} and ${item.max}`})
        }
        object[name] = value
      });

      if(check){
        object['_id'] = index
        this.addItems.push(object)
      }
    },
    supress(index){
      this.addItems.splice(index,1)
    },
    sendData(){
      let response = {}
      let check = true
      let emptyInputs = []

      this.textFields.forEach((tf,index)=>{
        let value

        if(tf.type !== 'add'){
          value = document.getElementById(`${this.formName}-id-${index}`).value
          if(tf.required === true && !value){
            check = false
            emptyInputs.push(tf.name)
          }
        }

        else{
          value = this.addItems.filter(item=>item._id === index)
          if(value.length > 0) delete value[0]._id
          if(tf.required === true && value.length === 0){
            check = false
            emptyInputs.push(tf.name)
          }
        }

        response[tf.name] = value
      })

      if(check) this.$emit('sendData',response)
      else this.pushEvent({message:`"${emptyInputs.toString()}" required !`})
    }
  }
}
</script>

<style scoped>
input{
  background-color: white;
  border: 2px solid white;
  border-radius: 10px;
  width: 100%;
  height: 30px;
}
div{
  text-align: left;
}
.item{
  padding: 5px 20px 10px 20px;
  background-color: #4b6986;
  border-radius: 10px;
}
.item > div{
  margin-bottom: 5px;
}
</style>
