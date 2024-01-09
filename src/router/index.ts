import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'
import Details from '../pages/Details.vue'
import Home from '../pages/Home.vue'
import Favorites from '../pages/Favorites.vue'

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
  {
    name: 'Favorites',
    path: '/favorites',
    component: Favorites,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
