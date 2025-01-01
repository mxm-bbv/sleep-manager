<template>
  <div class="p-4 bg-gray-800 rounded shadow space-y-4">
    <h2 class="text-lg font-semibold">Запись сна (RecordRTC)</h2>

    <div class="flex space-x-2">
      <button
          class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
          @click="startRecording"
          :disabled="isRecording"
      >
        Начать запись
      </button>
      <button
          class="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
          @click="stopRecording"
          :disabled="!isRecording"
      >
        Остановить запись
      </button>
    </div>

    <div>
      <h3 class="text-md font-medium mt-4 mb-2">Сохранённые записи:</h3>
      <div v-if="recordings.length === 0" class="text-gray-400">Нет записей</div>
      <div
          v-for="(record, idx) in recordings"
          :key="idx"
          class="flex items-center space-x-2 mb-2"
      >
        <audio :src="record.url" controls class="w-full" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import RecordRTC, { RecordRTCPromisesHandler } from 'recordrtc'

const isRecording = ref(false)
const recordings = ref<{ url: string; blob: Blob }[]>([])
let recorder: RecordRTCPromisesHandler | null = null

async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    recorder = new RecordRTCPromisesHandler(stream, {
      type: 'audio',
      mimeType: 'audio/webm'
    })
    await recorder.startRecording()
    isRecording.value = true
  } catch (err) {
    console.error('Ошибка записи:', err)
  }
}

async function stopRecording() {
  if (!recorder) return
  await recorder.stopRecording()
  isRecording.value = false
  const blob = await recorder.getBlob()
  const url = URL.createObjectURL(blob)
  recordings.value.push({ url, blob })

  recorder.reset()
  recorder = null
}
</script>
