<script lang="ts" setup>
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { cn } from '@/lib/utils'

import { toRefs } from 'vue'

const props = defineProps<{
  isOpen?: boolean
  title?: string
  desc?: string
}>()

const { isOpen, title, desc } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
}>()

const close = () => {
  emit('update:isOpen', false)
}
</script>
<template>
  <Dialog :open="isOpen">
    <DialogContent
      :class="
        cn(
          'max-w-[45rem] max-h-[calc(100svh_-_90px)] overflow-y-auto custom-scrollbar-thin border-2 border-black'
        )
      "
      @pointer-down-outside="close"
      @close-auto-focus="close"
      @escape-key-down="close"
    >
      <DialogTitle class="capitalize">{{ title ?? 'Create' }}</DialogTitle>
      <DialogDescription>{{ desc ?? '' }} </DialogDescription>
      <slot />
    </DialogContent>
  </Dialog>
</template>
