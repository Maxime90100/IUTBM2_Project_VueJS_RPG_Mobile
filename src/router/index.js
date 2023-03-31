import { createRouter, createWebHistory } from '@ionic/vue-router';
import HeroView from "@/views/hero.view.vue";
import CurrentHeroView from "@/views/hero_current.view.vue";
import TeamView from "@/views/team.view.vue";
import CurrentTeamView from "@/views/team_current.view.vue";
import OrgView from "@/views/org.view.vue";
import CurrentOrgView from "@/views/org_current.view.vue";
import AuthenticationView from "@/views/auth.view.vue";

import store from "@/store/index.js";

const routes = [
  {
    path:'/',
    name:'home'
  },
  {
    path: '/heroes',
    name: 'heroes',
    access:1,
    components:{
      central: HeroView
    },
    children:[
      {
        path: ':id',
        components: {
          currentHero: CurrentHeroView
        }
      }
    ]
  },
  {
    path: '/teams',
    name: 'teams',
    components: {
      central: TeamView
    },
    children:[
      {
        path: ':id',
        components: {
          currentTeam: CurrentTeamView
        }
      }
    ]
  },
  {
    path: '/orgs',
    name: 'orgs',
    access:1,
    components: {
      central: OrgView
    },
    children:[
      {
        path: ':id',
        components: {
          currentOrg: CurrentOrgView
        }
      }
    ]
  },
  {
    path: '/auth',
    name: 'authentication',
    components: {
      central: AuthenticationView
    },
  },
  {
    path: '/:catchAll(.*)',
    name: 'error404'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

function checkAccess(to) {
  for (let i=0;i<routes.length;i++) {
    if (routes[i].path === to.path)
      return !((routes[i].access) && (routes[i].access === 1) && !(store.state.auth.password));
  }
  return true
}

router.beforeEach((to, from, next) => {
  if (to.name === 'error404') {
    store.commit('errors/pushError','Invalid route', {root: true})
    next('/')
  }
  else if (checkAccess(to)) {
    next()
  }
  else {
    store.commit('errors/pushError','You need secret password !', {root: true})
    next('/auth');
  }
});
export default router
