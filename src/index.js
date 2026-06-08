import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import Carousel from './components/Carousel.vue'
import About from './layouts/About.vue'
import Resources from './layouts/Resources.vue'
import Entrance from './components/Entrance.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/for_employers',
    name: 'for_employers',
    component: Carousel
  },
  {
    path: '/about_us',
    name: 'about_us',
    component: About
  },
  {
    path: '/resources',
    name: 'resources',
    component: Resources
  },
  {
    path: '/signin',
    name: 'signin',
    component: Entrance
  }
]

const router = createRouter({
  history: createWebHistory('/WorkforcePlatform/'),
  routes,
})

export default router