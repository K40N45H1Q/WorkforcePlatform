import router from '.'
import { createApp } from 'vue'
import Bootstrap from '@/components/Bootstrap.vue'
import "./styles/buttons.css"
import '@fortawesome/fontawesome-free/css/all.css'
import "./styles/styles.css"
import "./styles/palette.css"

createApp(Bootstrap)
  .use(router) 
  .mount('#app')