<template>
  <div class="relative min-h-screen text-white flex flex-col"
       :class="bgClass">
    <!-- Абстрактный фон со звёздочками/частицами (декор под референс) -->
    <!-- Можно добавить ещё изображений или svg-шейпов, если хотите -->

    <!-- Контейнер с отступами -->
    <div class="p-4 flex flex-col flex-1">

      <!-- Верхний блок: приветствие -->
      <header class="mb-6 text-center">
        <h1 class="text-2xl font-bold leading-snug">
          Morning, Max!
        </h1>
        <p class="text-gray-300 text-sm mt-1">
          Your sleep report from last night is in, <br />
          and it’s looking really good!
        </p>
      </header>

      <!-- Центральный блок: кольцевая диаграмма -->
      <section class="flex flex-col items-center justify-center mb-6">
        <!-- Обёртка для donut диаграммы -->
        <div class="relative w-64 h-64">
          <canvas ref="chartRef" class="w-full h-full"></canvas>
          <!-- Текст в центре диаграммы -->
          <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div class="text-xl font-semibold">Good</div>
            <div class="text-sm text-gray-400 mt-1">7h 12m</div>
          </div>
        </div>

        <!-- Время засыпания / пробуждения -->
        <div class="flex justify-between w-3/4 mt-4">
          <div class="flex items-center text-gray-400 space-x-1 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m8.485-8.485h1m-16.97 0h1M16.949 7.05l.707-.707m-9.9 9.9l.707-.707M18 12a6 6 0 11-12 0 6 6 0 0112 0z"/>
            </svg>
            <span>01:10</span>
          </div>
          <div class="flex items-center text-gray-400 space-x-1 text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 rotate-180" fill="none"
                 viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 3v1m0 16v1m8.485-8.485h1m-16.97 0h1M16.949 7.05l.707-.707m-9.9 9.9l.707-.707M18 12a6 6 0 11-12 0 6 6 0 0112 0z"/>
            </svg>
            <span>08:22</span>
          </div>
        </div>
      </section>

      <!-- Карточки: Deep, Light, REM, Awake -->
      <section class="grid grid-cols-2 gap-3">
        <div class="bg-gray-800 rounded p-3 flex flex-col space-y-1">
          <div class="text-xs text-gray-400">Deep sleep</div>
          <div class="text-sm font-semibold">49 min</div>
          <div class="text-xs text-green-400">In range</div>
        </div>
        <div class="bg-gray-800 rounded p-3 flex flex-col space-y-1">
          <div class="text-xs text-gray-400">Light sleep</div>
          <div class="text-sm font-semibold">5h 11m</div>
          <div class="text-xs text-yellow-400">Below avg</div>
        </div>
        <div class="bg-gray-800 rounded p-3 flex flex-col space-y-1">
          <div class="text-xs text-gray-400">REM</div>
          <div class="text-sm font-semibold">35 min</div>
          <div class="text-xs text-gray-400">-</div>
        </div>
        <div class="bg-gray-800 rounded p-3 flex flex-col space-y-1">
          <div class="text-xs text-gray-400">Awake</div>
          <div class="text-sm font-semibold">15 min</div>
          <div class="text-xs text-gray-400">-</div>
        </div>
      </section>

      <!-- Ваш компонент TimePickerModal (внизу экрана) -->
      <div class="mt-8">
        <TimePickerModal />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Chart from 'chart.js/auto'

import TimePickerModal from '@/components/UI/TimePicker.vue'

const chartRef = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

const bgClass = computed(() => {
  return `bg-gradient-to-b from-[#1e1e2e] to-[#0a0a0f]`
})

onMounted(() => {
  if (!chartRef.value) return

  myChart = new Chart(chartRef.value, {
    type: 'doughnut',
    data: {
      labels: ['Deep', 'Light', 'REM', 'Awake'],
      datasets: [
        {
          // Пример: минуты сна
          data: [49, 311, 35, 15],
          backgroundColor: [
            '#4c6ef5',
            '#4cceac',
            '#f7b84b',
            '#fa5252'
          ],
          borderWidth: 0,
          cutout: '70%'
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false }
      }
    }
  })
})

onBeforeUnmount(() => {
  if (myChart) {
    myChart.destroy()
  }
})
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0 }
  to   { opacity: 1 }
}
</style>
