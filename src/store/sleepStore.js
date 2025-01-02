import { defineStore } from 'pinia';
export const useSleepStore = defineStore('sleepStore', {
    state: () => ({
        bedtime: '23:00',
        wakeTime: '07:00',
    }),
    actions: {
        setBedtime(time) {
            this.bedtime = time;
        },
        setWakeTime(time) {
            this.wakeTime = time;
        },
    }
});
