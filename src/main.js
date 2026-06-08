import { createApp } from 'vue'
import Bootstrap from '@/components/Bootstrap.vue'
import "./styles.css"
import router from '.'
import '@fortawesome/fontawesome-free/css/all.css'

createApp(Bootstrap)
  .use(router)   // <-- без этого router-view не будет работать
  .mount('#app')