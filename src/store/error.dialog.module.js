export default {
    namespaced: true,
    state: {
        isError: false,
        errorMsg: '',
    },
    mutations: {
        pushError(state, msg){
            state.errorMsg = msg
            state.isError = true
        },
        popError(state) {
            state.isError = false
        },
    },
}
