<script lang="ts" setup>
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Button } from './ui/button'
import { X } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import { toRefs } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title?: string
}>()

const { isOpen } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
}>()

const close = () => {
  emit('update:isOpen', false)
}
</script>
<template>
  <Sheet :open="isOpen">
    <SheetContent
      side="right"
      :class="cn('w-full md:w-2/4 border-none md:border  sm:max-w-full overflow-hidden')"
      @pointer-down-outside="close"
      @close-auto-focus="close"
      @escape-key-down="close"
    >
      <SheetHeader>
        <SheetTitle class="uppercase">{{ title ?? 'Create' }}</SheetTitle>
        <SheetDescription aria-describedby="create form "> </SheetDescription>
      </SheetHeader>
      <div class="relative w-full">
        <div class="block absolute -translate-y-full -top-4 md:-top-3.5 -right-5 z-[100]">
          <Button
            @click.prevent="close"
            variant="ghost"
            class="p-0 m-0 hover:bg-transparent text-primary hover:text-primary"
            size="icon"
          >
            <X class="h-5 w-5 md:h-8 md:w-8" />
          </Button>
        </div>
        <div
          class="min-h-[calc(100svh_-_80px)] max-h-[calc(100svh_-_80px)] overflow-y-auto w-full custom-scrollbar"
        >
          <slot />
        </div>
      </div>
    </SheetContent>
  </Sheet>
</template>
