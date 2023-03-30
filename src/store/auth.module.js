import {login, signIn} from "@/services/auth.service";
export default {
    namespaced: true,
    state: {
        password: null,
        login:null,
        user:null
    },
    mutations: {
        setPassword(state,pwd) {
            state.password = pwd
        },
        setLogin(state,login) {
            state.login = login
        },
        setUser(state, user) {
            state.user = user
        }
    },
    actions: {
        async signIn({commit},data){
            await signIn(data.login,data.password)
                .then(res=>{
                    if(res.error !== 0) commit('errors/pushError',res.data,{root:true})
                    else{
                        localStorage.setItem("user",res.data)
                        commit('setLogin',res.data)
                        commit('events/pushEvent',{message:'You\'re successfully sign in !'},{root:true})
                    }
                })
        },
        async logIn({commit}, data){
            await login(data.login)
                .then(res=>{
                    if(res.error !== 0) commit('errors/pushError',res.data,{root:true})
                    else{
                        commit('setUser',res.data)
                        commit('events/pushEvent',{message:'You\'re successfully login !'},{root:true})
                    }
                })
        }
    }
}
