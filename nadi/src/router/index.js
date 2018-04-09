import Vue from 'vue'
import Router from 'vue-router'
import FoodMap from '@/components/FoodMap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FoodMap',
      component: FoodMap
    }
  ]
})
