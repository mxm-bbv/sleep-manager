<template>
  <section class="space-y-4">
    <h1 class="text-2xl font-bold">Статистика сна</h1>
    <SleepAnalysis />

    <!-- Карточки с достижениями, очками -->
    <div class="bg-gray-800 p-4 rounded">
      <h2 class="text-lg font-semibold mb-2">Мои очки сна</h2>
      <p class="text-2xl">{{ achievementsStore.sleepPoints }}</p>
    </div>

    <div class="bg-gray-800 p-4 rounded">
      <h2 class="text-lg font-semibold mb-2">Мои достижения</h2>
      <ul>
        <li
            v-for="ach in achievementsStore.unlockedAchievements"
            :key="ach.id"
            class="text-green-400"
        >
          {{ ach.title }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import SleepAnalysis from '@/components/SleepAnalysis.vue'
import { useAchievementsStore } from '@/store/achievementsStore'

const achievementsStore = useAchievementsStore()
</script>
