<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router/auto'
import AuthorizedLayout from './layouts/AuthorizedLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { Toaster } from './components/ui/toast'
import { RouterView } from 'vue-router/auto'

const router = useRouter()
const isLoggedIn = computed(() => {
  return router.currentRoute.value.name !== '/login/'
})
</script>

<template>
  <div>
    <Toaster/>
    <AuthorizedLayout v-if="isLoggedIn">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </AuthorizedLayout>
    <DefaultLayout v-if="!isLoggedIn">
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </DefaultLayout>
  </div>
</template>
<style>
.custom-scrollbar {
  /* background-color: hsl(var(--background)); */
  overflow-y: auto;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 0.65rem;
  position: absolute;
}

.custom-scrollbar::-webkit-scrollbar-track {
  border-radius: 100vw;
  background: hsl(var(--accent));
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  border-radius: 100vw;
  background-color: hsl(var(--primary));
}

.custom-scrollbar {
  scrollbar-color: red;
}

.custom-scrollbar-thin {
  /* background-color: hsl(var(--background)); */
  overflow-y: auto;
}

.custom-scrollbar-thin::-webkit-scrollbar {
  width: 0.35rem;
  position: absolute;
}

.custom-scrollbar-thin::-webkit-scrollbar-thumb {
  border-radius: 100vw;
  background-color: hsl(var(--primary));
}

.custom-scrollbar-thin {
  scrollbar-color: red;
}
</style>

