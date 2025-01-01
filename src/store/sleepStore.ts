import { defineStore } from 'pinia'

interface SleepState {
  bedtime: string
  wakeTime: string
}

export const useSleepStore = defineStore('sleepStore', {
  state: (): SleepState => ({
    bedtime: '23:00',
    wakeTime: '07:00',
  }),
  actions: {
    setBedtime(time: string) {
      this.bedtime = time
    },
    setWakeTime(time: string) {
      this.wakeTime = time
    },
  }
});