<script lang="ts" setup>
import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const props = withDefaults(
  defineProps<{
    tableHeaders: string[]
    emptyHeader?: boolean
  }>(),
  {
    emptyHeader: false
  }
)
</script>
<template>
  <div class="relative">
    <table class="caption-bottom w-full text-sm">
      <TableHeader class="bg-[#F0F0F0] sticky -top-0.5  z-10">
        <TableRow class="sticky top-0">
          <TableHead
            v-for="(header, index) in tableHeaders"
            :key="index"
            class="text-black text-nowrap"
          >
            {{ header }}
          </TableHead>

          <TableHead v-if="emptyHeader" class="text-center"> </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <slot />
      </TableBody>
    </table>
  </div>
</template>
