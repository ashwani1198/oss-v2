<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router/auto'
import AuthorizedLayout from './layouts/AuthorizedLayout.vue'
import DefaultLayout from './layouts/DefaultLayout.vue'
import { RouterView } from 'vue-router/auto'

const router = useRouter()
const isLoggedIn = computed(() => {
  return router.currentRoute.value.name !== '/login/'
})
</script>

<template>
  <div>
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
