<template>
  <div class="relative min-h-screen flex flex-col bg-gray-900 text-white">
    <main class="flex-1 overflow-y-auto p-4">
      <transition
          name="slide-fade"
          mode="out-in">
        <component :is="currentTabComponent" />
      </transition>
    </main>

    <BottomNav :active-tab="activeTab" @change-tab="onChangeTab"/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

import BottomNav from '@/components/BottomNav.vue'
import HomeView from "@/views/HomeView.vue";
import StatsView from "@/views/StatsView.vue";
import RecordingsView from "@/views/RecordingsView.vue";
import SleepCalcView from "@/views/SleepCalcView.vue";

const activeTab = ref<'home'|'calc'|'analysis'|'record'>('home')

const tabComponents = {
  home: HomeView,
  calc: SleepCalcView,
  analysis: StatsView,
  record: RecordingsView
}

function onChangeTab(tab: 'home'|'calc'|'analysis'|'record') {
  activeTab.value = tab
}

const currentTabComponent = computed(() => tabComponents[activeTab.value])
</script>

<style scoped>
.slide-fade-enter-active, .slide-fade-leave-active {
  @apply transition-all duration-300 ease-in-out;
}
.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
