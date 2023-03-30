import { createStore } from 'vuex';
import auth from "@/store/auth.module.js";
import errors from "@/store/error.dialog.module.js";
import events from "@/store/event.dialog.module.js";
import heroes from "@/store/hero.module.js";
import teams from "@/store/team.module.js";
import orgs from "@/store/org.module.js";

const store = createStore({
    state: {

    },
    getters: {

    },
    mutations: {

    },
    actions: {

    },
    modules: {
        orgs, teams, heroes,
        events, errors,
        auth
    }
});

export default store;
