import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from './firebaseConfig'
import App from './App.vue'
import './assets/scss/reset.css'
initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
