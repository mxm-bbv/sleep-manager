import { defineStore } from 'pinia'

interface Achievement {
    id: string
    title: string
    description: string
    unlocked: boolean
}

export const useAchievementsStore = defineStore('achievements', {
    state: () => ({
        sleepPoints: 0,
        achievements: [] as Achievement[]
    }),
    actions: {
        addPoints(points: number) {
            this.sleepPoints += points
        },
        unlockAchievement(id: string) {
            const ach = this.achievements.find(a => a.id === id)
            if (ach && !ach.unlocked) ach.unlocked = true
        },
        initAchievements() {
            this.achievements = [
                { id: 'first-record', title: 'Первая запись', description: 'Сделать первую аудиозапись сна', unlocked: false },
                { id: 'week-sleep', title: '7 ночей подряд', description: 'Спать 7 дней подряд, используя приложение', unlocked: false }
            ]
        }
    },
    getters: {
        unlockedAchievements(state) {
            return state.achievements.filter(a => a.unlocked)
        },
        lockedAchievements(state) {
            return state.achievements.filter(a => !a.unlocked)
        }
    }
})
