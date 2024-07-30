<script setup lang="ts">
import { ref, onMounted } from 'vue'
import CTable from '@/components/custom/CTable.vue'
import MembersTableRow from './MembersTableRow.vue'
import MemberTableRowSkeleton from '@/components/MemberTableRowSkeleton.vue'
import { useLoadingDialog } from '@/composables/useLoadingDialog'

import { type Member } from '@/api/oss/models'

const { isLoading } = useLoadingDialog()

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
    <template v-else-if="!isLoading && isReady">
      <tr v-if="members.length === 0">
        <td :colspan="tableHeaders.length" class="text-center">
          <h1
            class="border-b border-primary bg-white capitalize w-full font-semibold px-6 py-4 mb-4"
          >
            No member found
          </h1>
        </td>
      </tr>
    </template>
    <MemberTableRowSkeleton v-else />
  </CTable>
</template>
