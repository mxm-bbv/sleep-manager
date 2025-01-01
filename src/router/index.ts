import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import StatsView from '@/views/StatsView.vue'
import RecordingsView from '@/views/RecordingsView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/stats', name: 'stats', component: StatsView },
    { path: '/recordings', name: 'recordings', component: RecordingsView }
  ]
})

export default router
