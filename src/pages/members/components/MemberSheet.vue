<script setup lang="ts">
import { computed, watch } from 'vue'
import { storeToRefs } from 'pinia'

import CreateFormSheet from '@/components/CreateFormSheet.vue'

import { type Member } from '@/api/oss/models'
import { useFormSheets } from '@/stores/shared/useSheets'
import { useMembers } from '@/stores/members/useMembers'
import NewMemberForm from './NewMemberForm.vue'

const { hideFormSheet, showFormSheet } = useFormSheets()

const { sheetState } = storeToRefs(useFormSheets())


const props = defineProps<{
  member?: Member
}>()

// watch(selectedForm, () => {
//   if (!selectedForm.value) {
//     hideFormSheet()
//   } else {
//     showFormSheet('form')
//   }
// })

const showForm = computed(() => {
  return sheetState.value.isOpen && sheetState.value.formSheetType === 'member'
})

const toggleFormSheet = () => {
  // setSelectedForm(undefined)

  hideFormSheet()
}
</script>
<template>
  <CreateFormSheet
    :is-open="showForm"
    @update:is-open="toggleFormSheet"
    :title="member ? 'Edit Member' : 'Add New Member'"
  >
    <NewMemberForm v-if="showForm" :member="member" @completed="toggleFormSheet" />
  </CreateFormSheet>
</template>
