<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CTable from '@/components/custom/CTable.vue'
import MembersTableRow from './MembersTableRow.vue'

import { type Member } from '@/api/oss/models'

const props = defineProps<{
  members: Member[]
}>()

const isReady = ref<boolean>(false)

const tableHeaders = [
  'Member Id',
  'First Name',
  'Middle Name',
  'Last Name',
  'Address',
  'City',
  'Document Signing Date',
  'Renewal Date',
  'Membership Type',
  'Actions'
]

onMounted(() => {
  isReady.value = true
})
</script>
<template>
  <CTable :table-headers="tableHeaders">
    <template v-if="members.length">
      <MembersTableRow v-for="member in members" :key="member.ref_id" :member="member" />
    </template>
  </CTable>
</template>
