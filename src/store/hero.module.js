import {createHero, getAllHeroes, getHeroById, updateHero} from "@/services/hero.service";

export default {
    namespaced: true,
    state: {
        heroes: [],
        currentHero:null,
    },
    mutations: {
        setHeroes(state, heroes) {
            state.heroes.splice(0)
            heroes.forEach(h => state.heroes.push(h))
        },
        setCurrentHero(state, hero) {
            state.currentHero = hero
        }
    },
    actions:{
        async getHeroesFromAPI({commit}) {
            await getAllHeroes()
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setHeroes',res.data)
                })
        },
        async createHero({commit},data){
            console.log(data)
            await createHero(data.publicName, data.realName, data.powers)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async updateHero({commit},data){
            await updateHero(data._id,data.publicName,data.realName,data.powers)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async getHeroById({commit},data){
            await getHeroById(data.idHero)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else{
                        commit('setCurrentHero',res.data)
                        commit('events/pushEvent',{message:'Current Hero has been defined !'},{root:true})
                    }
                })
        }
    }
}
