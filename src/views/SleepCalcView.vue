<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 flex flex-col space-y-8">
    <header>
      <h1 class="text-2xl font-bold mb-2">Рассчитать цикл сна</h1>
      <p class="text-gray-300 text-sm leading-relaxed">
        Используйте калькуляторы, чтобы определить удобное время для засыпания или пробуждения, исходя из 90-минутных циклов сна.
      </p>
    </header>

    <section>
      <h2 class="text-xl font-semibold mb-3">Я планирую уснуть…</h2>
      <button
          class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          @click="openModal1"
      >
        Рассчитать
      </button>
      <div v-if="wakeResults1.length" class="mt-4 space-y-1">
        <p class="text-sm text-gray-300">Лучше встать в одно из следующих времён:</p>
        <ul class="flex flex-wrap gap-2">
          <li
              v-for="(t, i) in wakeResults1"
              :key="i"
              class="px-3 py-1 bg-gray-700 rounded text-sm text-blue-300"
          >
            {{ t }}
          </li>
        </ul>
      </div>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-3">Я хочу проснуться…</h2>
      <button
          class="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
          @click="openModal2"
      >
        Рассчитать
      </button>
      <div v-if="sleepResults2.length" class="mt-4 space-y-1">
        <p class="text-sm text-gray-300">Лучше лечь примерно в одно из этих времён:</p>
        <ul class="flex flex-wrap gap-2">
          <li
              v-for="(t, i) in sleepResults2"
              :key="i"
              class="px-3 py-1 bg-gray-700 rounded text-sm text-blue-300"
          >
            {{ t }}
          </li>
        </ul>
      </div>
    </section>

    <transition name="fade">
      <div v-if="modal1Open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div class="bg-gray-900 w-80 p-4 rounded relative">
          <button class="absolute top-3 right-3 text-gray-400" @click="modal1Open=false">✕</button>
          <h3 class="text-lg font-semibold mb-4">Планирую уснуть</h3>
          <label class="block mb-1 text-sm text-gray-400">Вручную</label>
          <input
              type="time"
              v-model="manual1"
              class="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full mb-2"
          />
          <button
              class="bg-blue-600 px-3 py-2 rounded w-full hover:bg-blue-500 mb-4"
              @click="onPickManual1"
          >
            Применить
          </button>
          <hr class="border-gray-700 mb-4" />
          <p class="text-sm text-gray-400 mb-2">Или ближайшие полчасовые интервалы</p>
          <div class="grid grid-cols-2 gap-2">
            <button
                v-for="(t, i) in times1"
                :key="i"
                class="border border-blue-600 text-white text-sm p-2 rounded hover:bg-blue-600"
                @click="pickFromList1(t)"
            >
              {{ t }}
            </button>
          </div>
        </div>
      </div>
    </transition>

    <transition name="fade">
      <div v-if="modal2Open" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div class="bg-gray-900 w-80 p-4 rounded relative">
          <button class="absolute top-3 right-3 text-gray-400" @click="modal2Open=false">✕</button>
          <h3 class="text-lg font-semibold mb-4">Хочу проснуться</h3>
          <label class="block mb-1 text-sm text-gray-400">Вручную</label>
          <input
              type="time"
              v-model="manual2"
              class="border border-gray-700 bg-gray-800 text-white p-2 rounded w-full mb-2"
          />
          <button
              class="bg-blue-600 px-3 py-2 rounded w-full hover:bg-blue-500 mb-4"
              @click="onPickManual2"
          >
            Применить
          </button>
          <hr class="border-gray-700 mb-4" />
          <p class="text-sm text-gray-400 mb-2">Или ближайшие полчасовые интервалы</p>
          <div class="grid grid-cols-2 gap-2">
            <button
                v-for="(t, i) in times2"
                :key="i"
                class="border border-blue-600 text-white text-sm p-2 rounded hover:bg-blue-600"
                @click="pickFromList2(t)"
            >
              {{ t }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'

function toAmPm(h, m) {
  let hh = h
  let mm = m
  while (mm < 0) {
    mm += 60
    hh -= 1
  }
  while (hh < 0) {
    hh += 24
  }
  hh = hh % 24
  const ampm = hh >= 12 ? 'PM' : 'AM'
  const h12 = hh % 12 || 12
  const hhStr = String(h12).padStart(2, '0')
  const mmStr = String(mm).padStart(2, '0')
  return `${hhStr}:${mmStr} ${ampm}`
}

function getNextHalfHours(count = 6) {
  const now = new Date()
  let h = now.getHours()
  let m = now.getMinutes()
  if (m < 30) {
    m = 30
  } else {
    m = 0
    h += 1
  }
  const arr = []
  for (let i = 0; i < count; i++) {
    arr.push(toAmPm(h, m))
    m += 30
    if (m >= 60) {
      m -= 60
      h++
    }
  }
  return arr
}

function calcWakeTimes(h, m) {
  const list = []
  for (let i = 1; i <= 5; i++) {
    const x = h * 60 + m + 14 + 90 * i
    const hh = Math.floor(x / 60)
    const mm = x % 60
    list.push(toAmPm(hh, mm))
  }
  return list
}

function calcSleepTimes(h, m) {
  const list = []
  for (let i = 1; i <= 5; i++) {
    const x = h * 60 + m - 14 - 90 * i
    const hh = Math.floor(x / 60)
    const mm = x % 60
    list.unshift(toAmPm(hh, mm))
  }
  return list
}

const modal1Open = ref(false)
const times1 = ref([])
const manual1 = ref('')
const wakeResults1 = ref([])

const modal2Open = ref(false)
const times2 = ref([])
const manual2 = ref('')
const sleepResults2 = ref([])

function openModal1() {
  times1.value = getNextHalfHours()
  modal1Open.value = true
}

function openModal2() {
  times2.value = getNextHalfHours()
  modal2Open.value = true
}

function pickFromList1(t) {
  computeWake1(t)
  modal1Open.value = false
}

function onPickManual1() {
  if (!manual1.value) return
  computeWake1(manual1.value)
  modal1Open.value = false
}

function computeWake1(str) {
  const [hm, ap] = str.split(' ')
  let [h, m] = hm.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  wakeResults1.value = calcWakeTimes(h, m)
}

function pickFromList2(t) {
  computeSleep2(t)
  modal2Open.value = false
}

function onPickManual2() {
  if (!manual2.value) return
  computeSleep2(manual2.value)
  modal2Open.value = false
}

function computeSleep2(str) {
  const [hm, ap] = str.split(' ')
  let [h, m] = hm.split(':').map(Number)
  if (ap === 'PM' && h !== 12) h += 12
  if (ap === 'AM' && h === 12) h = 0
  sleepResults2.value = calcSleepTimes(h, m)
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
