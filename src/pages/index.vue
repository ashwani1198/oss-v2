<script lang="ts" setup>
import { useRouter, RouterView } from 'vue-router/auto'

const router = useRouter()

router.push({
  path: '/login',
  replace: true
})
</script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
