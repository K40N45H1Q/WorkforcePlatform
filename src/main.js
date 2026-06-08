import { createApp } from 'vue'
import Bootstrap from '@/components/Bootstrap.vue'
import "./styles/buttons.css"
import "./styles/styles.css"
import "./styles/palette.css"
import router from '.'
import '@fortawesome/fontawesome-free/css/all.css'

createApp(Bootstrap)
  .use(router)   // <-- без этого router-view не будет работать
  .mount('#app')