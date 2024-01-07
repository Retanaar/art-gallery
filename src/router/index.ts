import Details from '../pages/Details.vue'
import Home from '../pages/Home.vue'
import { RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: Home,
  },
  {
    name: 'Details',
    path: '/:id',
    component: Details,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
