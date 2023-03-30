import {addTeamToOrg, createOrg, getAllOrgs, getOrgById, removeTeamFromOrg} from "@/services/org.service";

export default {
    namespaced: true,
    state: {
        orgs: [],
        currentOrg:null,
    },
    mutations: {
        setOrgs(state, orgs) {
            state.orgs.splice(0)
            orgs.forEach(o => state.orgs.push(o))
        },
        setCurrentOrg(state, org) {
            state.currentOrg = org
        }
    },
    actions:{
        async getOrgsFromAPI({commit}) {
            await getAllOrgs()
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('setOrgs',res.data)
                })
        },
        async createOrg({commit},data){
            await createOrg(data.name,data.secret)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async addTeamToOrg({commit},data){
            await addTeamToOrg(data.idTeam)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async removeTeamFromOrg({commit},data){
            await removeTeamFromOrg(data.idTeam)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else commit('events/pushEvent',{message:res.data},{root:true})
                })
        },
        async getOrgById({commit},data){
            await getOrgById(data.idOrg)
                .then(res=>{
                    if(res.error) commit('errors/pushError',res.data,{root:true})
                    else{
                        commit('setCurrentOrg',res.data)
                        commit('events/pushEvent',{message:'Current Org has been defined !'},{root:true})
                    }
                })
        }
    }
}
