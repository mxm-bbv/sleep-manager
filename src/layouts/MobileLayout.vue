<template>
    <div class="relative min-h-screen flex flex-col bg-gray-900 text-white">
        <main class="flex-1 overflow-y-auto p-4">
            <router-view />
        </main>

        <BottomNav />
    </div>
</template>

<script setup lang="ts">
    import BottomNav from '@/components/BottomNav.vue'
</script>