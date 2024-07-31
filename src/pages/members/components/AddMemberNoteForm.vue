<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { MemberNotesCreationSchema, type MemberNotesCreationData } from '@/api/oss/models'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RefreshCw, X } from 'lucide-vue-next'
import FITextArea from '@/components/formInputs/FITextArea/FITextArea.vue'
import { useMemberNotes } from '@/stores/members/useMemberNotes'

const props = defineProps<{
  isOpen: boolean
  memberId: number
}>()

const { isOpen } = toRefs(props)
const { createNote } = useMemberNotes()

const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
}>()

const form = useForm({
  validationSchema: toTypedSchema(MemberNotesCreationSchema),
  validateOnMount: false,
  initialValues: {
    notes: undefined
  }
})

const close = () => {
  emit('update:isOpen', false)
  form.resetForm()
}

const canSubmit = computed(() => {
  return MemberNotesCreationSchema.safeParse(form.values).success && !form.isSubmitting.value
})

const onSubmit = form.handleSubmit(async (values: MemberNotesCreationData) => {
  const result = await createNote(props.memberId, values)

  if (result) {
    close()
  }
})
</script>
<template>
  <Dialog :open="isOpen">
    <DialogContent
      class="sm:max-w-full md:max-w-3xl"
      @pointer-down-outside=""
      @close-auto-focus="close"
      @escape-key-down="close"
    >
      <DialogTrigger as-child>
        <DialogClose class="absolute right-4 top-4 rounded-sm hover:opacity-100" @click="close">
          <X class="w-6 h-6" />
          <span class="sr-only">Close</span>
        </DialogClose>
      </DialogTrigger>
      <form @submit="onSubmit">
        <DialogHeader>
          <DialogTitle class="capitalize tracking-wide font-semibold"
            >Create Member Notes</DialogTitle
          >
          <DialogDescription>{{ '' }}</DialogDescription>
        </DialogHeader>
        <div class="w-full">
          <div class="flex gap-y-5 flex-col w-full">
            <FITextArea
              :form="form"
              form-key="notes"
              label="Note *"
              required
              class="focus-visible:ring-primary"
            />
          </div>
        </div>
        <DialogFooter>
          <div class="flex gap-2 justify-end">
            <Button type="button" @click="close" class="mt-5 bg-[#1f2937] hover:bg-[#4b5563] w-32">
              Cancel
            </Button>
            <Button type="submit" class="mt-5 w-32">
              <p v-if="!form.isSubmitting.value">Save</p>
              <RefreshCw v-else class="animate-spin" />
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
