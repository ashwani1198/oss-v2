<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
const route = useRoute('/members/[memberId]')
</script>
<template>
  <div class="h-full w-full relative p-3 max-h-[calc(100svh_-_80px)] overflow-y-hidden">
    {{ route.params.memberId }}
  </div>
</template>
