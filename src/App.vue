<script setup lang="ts">
import AuthorizedLayout from './layouts/AuthorizedLayout.vue';
import { RouterView } from 'vue-router/auto'


</script>

<template>
  <div>
    <AuthorizedLayout>
      <router-view v-slot="{ Component }">
        <component :is="Component" />
      </router-view>
    </AuthorizedLayout>
  </div>
</template>

