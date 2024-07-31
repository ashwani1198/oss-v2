<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import { type Member, LastDocumentSigningDateSchema } from '@/api/oss/models'
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
import FIDate from '@/components/formInputs/FIDate/FIDate.vue'
import { useMembers } from '@/stores/members/useMembers'
import { useSuccessToast } from '@/composables/useToastAlerts'

const props = defineProps<{
  isOpen: boolean
  memberId: number
  lastDocumentSigningDate: string | null
}>()

const { isOpen } = toRefs(props)
const { updateOne } = useMembers()

const emit = defineEmits<{
  (event: 'update:isOpen', value: boolean): void
}>()

const form = useForm({
  validationSchema: toTypedSchema(LastDocumentSigningDateSchema),
  validateOnMount: false,
  initialValues: {
    last_document_sigining_date:
      props.lastDocumentSigningDate ?? new Date().toISOString().split('T')[0]
  }
})

const close = () => {
  emit('update:isOpen', false)
  form.resetForm()
}

const canSubmit = computed(() => {
  return LastDocumentSigningDateSchema.safeParse(form.values).success && !form.isSubmitting.value
})

const onSubmit = form.handleSubmit(async (values: Pick<Member, 'last_document_sigining_date'>) => {
  const result = await updateOne(props.memberId, values)

  if (result) {
    close()
  }
  useSuccessToast('Last document signing date updated successfully')
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
            >Add Document Signing Date</DialogTitle
          >
          <DialogDescription>{{ '' }}</DialogDescription>
        </DialogHeader>
        <div class="w-full">
          <div class="flex gap-y-5 flex-col w-full">
            <FIDate
              :form="form"
              form-key="last_document_sigining_date"
              label="Document Signing *"
            />
          </div>
        </div>
        <DialogFooter>
          <div class="flex gap-2 justify-end">
            <Button
              type="button"
              @click="close"
              class="mt-5 bg-[#e5e7eb] hover:bg-[#e5e7eb] text-black w-32"
            >
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
