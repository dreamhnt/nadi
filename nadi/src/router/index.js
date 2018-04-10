import Vue from 'vue'
import Router from 'vue-router'
import FoodMap from '@/components/foodMap'
import Layout from '@/components/layout'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      component: Layout,
      redirect: 'foodmap',
      children: [{
        path: 'foodmap',
        component: FoodMap,
        name: 'foodmap'
      }]
    }
  ]
})
