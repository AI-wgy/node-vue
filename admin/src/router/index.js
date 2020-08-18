import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Main from '../views/Main.vue'

import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'

import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'

import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'main',
    component: Main,
    children:[
      { path: '/categories/create', component: CategoryEdit },
      { path: '/categories/list', component: CategoryList },
      {
        //表示把/categories/edit 任何的URL参数，比如id，都注入到这个CategoryEdit页面里面，
        //则在这个页面就可以直接使用这个变量id
        path: '/categories/edit/:id', component: CategoryEdit , props: true
      },

      //装备物品
      { path: '/items/create', component: ItemEdit },
      { path: '/items/list', component: ItemList },
      { path: '/items/edit/:id', component: ItemEdit , props: true },

      //英雄
      { path: '/heroes/create', component: HeroEdit },
      { path: '/heroes/list', component: HeroList },
      { path: '/heroes/edit/:id', component: HeroEdit , props: true }
    ]
  },
  
]

const router = new VueRouter({
  routes
})

export default router

