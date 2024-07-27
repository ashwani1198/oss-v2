<script lang="ts" setup>
import { RouterView } from 'vue-router/auto'
</script>
<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
</template>
