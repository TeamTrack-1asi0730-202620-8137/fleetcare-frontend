<template>
  <div class="app-shell">
    <AppSidebar
      :open="menuOpen"
      @navigate="menuOpen = false"
    />

    <div class="app-area">
      <AppTopbar @toggle-menu="menuOpen = !menuOpen" />

      <main class="app-content">
        <RouterView />
      </main>
    </div>

    <div
      v-if="menuOpen"
      class="sidebar-overlay"
      @click="menuOpen = false"
    ></div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { RouterView } from 'vue-router'

import AppSidebar from '../components/AppSidebar.vue'
import AppTopbar from '../components/AppTopbar.vue'

const menuOpen = ref(false)
</script>
