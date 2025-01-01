<template>
  <div class="p-4 bg-gray-800 rounded shadow space-y-4">
    <h2 class="text-lg font-semibold">Анализ сна</h2>
    <canvas ref="chartRef" class="max-w-full"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Chart from 'chart.js/auto'

const chartRef = ref<HTMLCanvasElement | null>(null)
let myChart: Chart | null = null

onMounted(() => {
  if (!chartRef.value) return
  myChart = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
      datasets: [
        {
          label: 'Длительность сна (ч)',
          data: [7, 6.5, 7.2, 6, 8, 7.5, 6.8],
          backgroundColor: 'rgba(59,130,246,0.5)',
          borderColor: 'rgba(59,130,246,1)',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
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
