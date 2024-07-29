<script lang="ts" setup>
import { TableCell, TableRow } from '@/components/ui/table'
</script>
<template>
  <TableRow v-for="i in 'abcdefghi'" :key="i" class="group">
    <TableCell class="font-medium">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-md"> <div class="h-4 skeleton"></div></TableCell>
    <TableCell class="max-w-md"> <div class="h-4 skeleton"></div></TableCell>

    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
    <TableCell class="max-w-sm">
      <div class="h-4 skeleton"></div>
    </TableCell>
  </TableRow>
</template>
<style>
.skeleton {
  border-radius: 1rem;
  --tw-bg-opacity: 1;
  background-color: #e5e6e6; /* Removed the incorrect syntax */
  will-change: background-position;
  animation-duration: 1.8s;
  animation-timing-function: ease-in-out;
  animation-delay: 0s;
  animation-iteration-count: infinite;
  animation-direction: normal;
  animation-fill-mode: none;
  animation-play-state: running;
  animation-name: skeleton;
  animation-timeline: auto;
  animation-range-start: normal;
  background-image: linear-gradient(
    105deg,
    transparent 0%,
    transparent 40%,
    #ffffff 50%,
    transparent 60%,
    transparent 100%
  );
  background-size: 200% auto;
  background-repeat: no-repeat;
  background-position: -50%;
}

@media (prefers-reduced-motion: reduce) {
  .skeleton {
    animation-duration: 15s;
  }
}

@keyframes skeleton {
  0% {
    background-position: 150%;
  }
  to {
    background-position: -50%;
  }
}
</style>
