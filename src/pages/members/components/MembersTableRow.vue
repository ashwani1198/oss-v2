<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { TableCell, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Ellipsis } from 'lucide-vue-next'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import BaseAlertDialog from '@/components/BaseAlertDialog.vue'
import { useSuccessToast } from '@/composables/useToastAlerts'
import { useMembers } from '@/stores/members/useMembers'
import { useLoadingDialog } from '@/composables/useLoadingDialog'
import { useFormSheets } from '@/stores/shared/useSheets'
import { useRouter } from 'vue-router/auto'
import { type Member } from '@/api/oss/models'
import AddMemberNoteForm from './AddMemberNoteForm.vue'
import AddMemberReceiptForm from './AddMemberReceiptForm.vue'
import AddDocumentSigningDateForm from './AddDocumentSigningDateForm.vue'
import ViewContractForm from './ViewContractForm.vue'

const { showFormSheet } = useFormSheets()
const { updateOne, fetchPaginatedMembers, setSelectedMember } = useMembers()
const { showLoading, hideLoading } = useLoadingDialog()
const { query } = storeToRefs(useMembers())

const props = defineProps<{
  member: Member
}>()

const editMember = (member: Member) => {
  setSelectedMember(member)
  showFormSheet('member')
}

const viewProfile = () => {
  setSelectedMember(props.member)
  router.push(`/members/${props.member.id}`)
}

const router = useRouter()
const showDelete = ref(false)
const showCreateNote = ref(false)
const showCreateReceipt = ref(false)
const showAddDocumentSigningDate = ref(false)
const showViewContract = ref(false)

const confirmDelete = async () => {
  const result = await updateOne(props.member.id, {
    is_archived: true
  })
  if (result) {
    showLoading()
    await fetchPaginatedMembers(query.value)
    hideLoading()
  }
  showDelete.value = false
  useSuccessToast('Member deleted successfully')
}
</script>
<template>
  <BaseAlertDialog
    v-model:is-open="showDelete"
    :title="'Are you sure you want to delete this Member'"
    desc="This cannot be undone"
    @confirm="confirmDelete"
  />
  <AddMemberNoteForm v-model:is-open="showCreateNote" :member-id="member.id"></AddMemberNoteForm>
  <AddMemberReceiptForm
    v-model:is-open="showCreateReceipt"
    :member-id="member.id"
  ></AddMemberReceiptForm>
  <AddDocumentSigningDateForm
    v-model:is-open="showAddDocumentSigningDate"
    :member-id="member.id"
    :last-document-signing-date="member.last_document_sigining_date"
  ></AddDocumentSigningDateForm>
  <ViewContractForm v-model:is-open="showViewContract" :member="member"></ViewContractForm>
  <TableRow class="group odd:bg-white even:bg-gray-100">
    <TableCell class="font-medium p-2">
      {{ member.ref_id }}
    </TableCell>
    <TableCell class="max-w-md p-2">{{ member.first_name }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.middle_name }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.last_name }} </TableCell>
    <TableCell class="max-w-md p-2"
      >{{ member.address_line_1 }} {{ member.address_line_2 ?? '' }}
    </TableCell>
    <TableCell class="max-w-md p-2">{{ member.city }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.last_document_sigining_date }} </TableCell>
    <TableCell class="max-w-md p-2">{{ member.renewal_date }} </TableCell>
    <TableCell class="max-w-md p-2 capitalize">{{ member.membership_type }} </TableCell>
    <TableCell>
      <div class="md:block hidden">
        <HoverCard :open-delay="0" :close-delay="0">
          <HoverCardTrigger>
            <Button size="icon" variant="ghost">
              <Ellipsis class="h-6 w-6 text-black" />
            </Button>
          </HoverCardTrigger>
          <HoverCardContent :side="'bottom'" :align="'center'" class="p-1 text-left">
            <Button class="w-full flex justify-start" variant="ghost" @click="editMember(member)">
              Edit
            </Button>
            <Button class="w-full flex justify-start" variant="ghost" @click="showDelete = true">
              Delete
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showCreateNote = true"
            >
              Add Notes
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showCreateReceipt = true"
            >
              Add Receipt
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showAddDocumentSigningDate = true"
            >
              Add Document Signing Date
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showViewContract = true"
              >View Contract
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click.prevent="viewProfile"
              >View Profile
            </Button>
          </HoverCardContent>
        </HoverCard>
      </div>
      <div class="md:hidden">
        <Popover>
          <PopoverTrigger>
            <Button size="icon" variant="ghost">
              <Ellipsis class="h-6 w-6 text-black" />
            </Button>
          </PopoverTrigger>
          <PopoverContent :align="'center'" :side="'bottom'" class="p-1">
            <Button class="w-full flex justify-start" variant="ghost" @click="editMember(member)">
              Edit
            </Button>
            <Button class="w-full flex justify-start" variant="ghost" @click="showDelete = true">
              Delete
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showCreateNote = true"
            >
              Add Notes
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showCreateReceipt = true"
            >
              Add Receipt
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showAddDocumentSigningDate = true"
            >
              Add Document Signing Date
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click="showViewContract = true"
              >View Contract
            </Button>
            <Button
              class="w-full flex justify-start"
              variant="ghost"
              @click.prevent="viewProfile"
              >View Profile
            </Button>
          </PopoverContent>
        </Popover>
      </div>
    </TableCell>
  </TableRow>
</template>
