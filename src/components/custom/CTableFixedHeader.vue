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
  <Table class="w-full h-full">
    <TableHeader class="sticky -top-0.5 bg-[#F0F0F0] z-10">
      <TableRow class="sticky top-0">
        <TableHead
          v-for="(header, index) in tableHeaders"
          :key="index"
          class="text-black whitespace-nowrap"
        >
          {{ header }}
        </TableHead>

        <TableHead v-if="emptyHeader" class="text-center"> </TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      <slot />
    </TableBody>
  </Table>
</template>
