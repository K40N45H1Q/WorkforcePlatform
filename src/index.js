import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import Carousel from './components/Carousel.vue'
import Net from './components/Net.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/employers',
    name: 'employers',
    component: Carousel
  },
  {
    path: '/sandbox',
    name: 'sandbox',
    component: Net
  },
]

const router = createRouter({
  history: createWebHistory('/K40N45H1Q/WorkforcePlatform/'), // <--- совпадает с base
  routes,
})

export default router