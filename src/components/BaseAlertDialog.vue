<script lang="ts" setup>
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogFooter
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

import { toRefs } from 'vue'

const props = defineProps<{
  isOpen: boolean
  title: string
  desc?: string
}>()

const { isOpen, title, desc } = toRefs(props)

const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
  (event: 'confirm'): void
}>()

const cancel = () => {
  emit('update:isOpen', false)
}

const confirm = () => {
  emit('confirm')
}
</script>
<template>
  <AlertDialog :open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ title }}</AlertDialogTitle>
        <AlertDialogDescription v-if="desc && desc !== ''">
          {{ desc }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <div class="flex items-center gap-3 justify-end">
          <Button variant="outline" @click="cancel"> Cancel </Button>
          <Button variant="destructive" @click="confirm"> Confirm </Button>
        </div>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
