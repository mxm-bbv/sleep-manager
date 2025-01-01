<template>
  <div>
    <!-- Кнопка "Рассчитать" -->
    <button
        class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        @click="openModal"
    >
      Рассчитать
    </button>

    <!-- Модальное окно -->
    <transition name="fade">
      <div
          v-if="isOpen"
          class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
      >
        <div class="bg-gray-900 rounded-lg p-4 w-80 relative">
          <!-- Кнопка закрытия (крестик) -->
          <button
              class="absolute top-3 right-3 text-gray-400 hover:text-white"
              @click="closeModal"
          >
            ✕
          </button>

          <h2 class="text-lg font-semibold text-gray-200 mb-4">Выберите время</h2>

          <!-- 1) Ручной ввод времени -->
          <div class="mb-4">
            <label class="block mb-1 text-gray-400 text-sm">Вручную</label>
            <input
                type="time"
                v-model="manualTime"
                class="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full"
            />
            <button
                class="mt-2 bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-500"
                @click="onPickManualTime"
            >
              Применить
            </button>
          </div>

          <hr class="border-gray-700 my-4" />

          <!-- 2) Список предложенного времени (6 ближайших получасовых слотов) -->
          <div class="mb-2 text-gray-400 text-sm">
            Или выберите из ближайшего:
          </div>
          <div class="grid grid-cols-2 gap-2">
            <button
                v-for="(t, idx) in availableTimes"
                :key="idx"
                class="p-2 rounded border border-blue-600 text-sm text-white hover:bg-blue-600 transition"
                :class="{ 'bg-blue-700': t === selectedTime }"
                @click="onPickTime(t)"
            >
              {{ t }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

/**
 * Форматируем часы/минуты (24-час) в строку AM/PM.
 * Например, (10, 30) -> "10:30 AM", (13, 0) -> "01:00 PM".
 */
function formatToAmPm(hours: number, minutes: number): string {
  const h12 = hours % 12 || 12
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const hh = String(h12).padStart(2, '0')
  const mm = String(minutes).padStart(2, '0')
  return `${hh}:${mm} ${ampm}`
}

/**
 * Генерируем массив из 6 ближайших получасовых интервалов,
 * начиная от "текущего момента" пользователя.
 *
 * Пример: сейчас 10:10 -> [10:30 AM, 11:00 AM, 11:30 AM, 12:00 PM, 12:30 PM, 01:00 PM]
 */
function getNextSixHalfHours(): string[] {
  const now = new Date()
  let hours = now.getHours()
  let minutes = now.getMinutes()

  if (minutes < 30) {
    minutes = 30
  } else {
    minutes = 0
    hours += 1
  }

  const result: string[] = []
  for (let i = 0; i < 6; i++) {
    result.push(formatToAmPm(hours, minutes))
    minutes += 30
    if (minutes >= 60) {
      minutes = 0
      hours += 1
    }
  }
  return result
}

const isOpen = ref(false)

const availableTimes = ref<string[]>([])

const selectedTime = ref<string | null>(null)

const manualTime = ref('')

function openModal() {
  availableTimes.value = getNextSixHalfHours()
  isOpen.value = true
}

function closeModal() {
  isOpen.value = false
}

/** Выбрать из списка */
function onPickTime(time: string) {
  selectedTime.value = time
  closeModal()
}

/** Применить вручную введённое время */
function onPickManualTime() {
  if (!manualTime.value) return
  selectedTime.value = manualTime.value
  closeModal()
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
