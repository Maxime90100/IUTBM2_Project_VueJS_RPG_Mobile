import {addHeroesToTeam, createTeam, getAllTeams, getTeamById, removeHeroesFromTeam} from "@/services/team.service";

export default {
    namespaced: true,
    state: {
        teams: [],
        currentTeam:null,
    },
    mutations: {
        setTeams(state, teams) {
            state.teams.splice(0)
            teams.forEach(t => state.teams.push(t))
        },
        setCurrentTeam(state, team){
            state.currentTeam = team
        }
    },
    actions:{
        async getTeamsFromAPI({commit}) {
            await getAllTeams()
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setTeams',res.data)
                })
        },
        async createTeam({commit},data){
            await createTeam(data.name)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async addHeroesToTeam({commit},data){
            let idHeroes = []
            data.idHeroes.forEach(hero=>{idHeroes.push(hero.idHero)})
            await addHeroesToTeam(idHeroes,data.idTeam)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async removeHeroesFromTeam({commit},data){
            let idHeroes = []
            data.idHeroes.forEach(hero=>{idHeroes.push(hero.idHero)})
            await removeHeroesFromTeam(idHeroes,data.idTeam)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async getTeamById({commit},data){
            await getTeamById(data.idTeam)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else{
                        commit('setCurrentTeam',res.data)
                        commit('events/pushEvent',{message:'Current Team has been defined !'},{root:true})
                    }
                })
        }
    }
}
