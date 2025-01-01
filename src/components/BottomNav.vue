<template>
  <nav
      class="fixed bottom-0 left-0 w-full bg-gray-800 p-2 flex justify-around items-center"
      :style="safeAreaStyle"
  >
    <!-- Таб: Главная -->
    <button
        @click="$emit('change-tab', 'home')"
        :class="[
        'flex flex-col items-center transition',
        activeTab === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'
      ]"
    >
      <HomeIcon class="h-6 w-6" />
      <span class="text-xs mt-1">Главная</span>
    </button>

    <!-- Таб: Калькулятор -->
    <button
        @click="$emit('change-tab', 'calc')"
        :class="[
        'flex flex-col items-center transition',
        activeTab === 'calc' ? 'text-white' : 'text-gray-400 hover:text-white'
      ]"
    >
      <CalculatorIcon class="h-6 w-6" />
      <span class="text-xs mt-1">Калькулятор</span>
    </button>

    <!-- Таб: Анализ -->
    <button
        @click="$emit('change-tab', 'analysis')"
        :class="[
        'flex flex-col items-center transition',
        activeTab === 'analysis' ? 'text-white' : 'text-gray-400 hover:text-white'
      ]"
    >
      <ChartBarIcon class="h-6 w-6" />
      <span class="text-xs mt-1">Анализ</span>
    </button>

    <!-- Таб: Запись -->
    <button
        @click="$emit('change-tab', 'record')"
        :class="[
        'flex flex-col items-center transition',
        activeTab === 'record' ? 'text-white' : 'text-gray-400 hover:text-white'
      ]"
    >
      <MicrophoneIcon class="h-6 w-6" />
      <span class="text-xs mt-1">Запись</span>
    </button>
  </nav>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue'
import { HomeIcon, ChartBarIcon, MicrophoneIcon, CalculatorIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  activeTab: {
    type: String as PropType<'home'|'calc'|'analysis'|'record'>,
    default: 'home'
  }
})

/** Для iOS-safe-area, если требуется */
const safeAreaStyle = computed(() => {
  return {
    paddingBottom: 'env(safe-area-inset-bottom)',
  }
})
</script>
