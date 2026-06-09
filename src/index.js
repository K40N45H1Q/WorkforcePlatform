import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './components/HomeView.vue'
import Carousel from './components/Carousel.vue'
import About from './layouts/About.vue'
import Resources from './layouts/Resources.vue'
import Entrance from './components/Entrance.vue'
import Registration from './components/Registration.vue'
import Search from './components/Search.vue'

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
  },
  {
    path: '/signup',
    name: 'signup',
    component: Registration
  },
  {
    path: '/offers',
    name: 'offers',
    component: Search
  },

]

const router = createRouter({
  history: createWebHistory('/WorkforcePlatform/'),
  routes,
})

export default router