import { createRouter, createWebHistory } from '@ionic/vue-router';
import HeroView from "@/views/hero.view.vue";
import CurrentHeroView from "@/views/hero_current.view.vue";

const routes = [
  {
    path:'/',
    name:'home',
    redirect:'/heroes'
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
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
