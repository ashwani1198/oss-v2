<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'
import { useMembers } from '@/stores/members/useMembers'
import { useFormSheets } from '@/stores/shared/useSheets'
import MemberSearchFilterForm from './MemberSearchFilterForm.vue'
import MembersTable from './MembersTable.vue'
import MemberPagination from '@/components/MemberPagination.vue'
import MemberSheet from './MemberSheet.vue'

const { members, selectedMember } = storeToRefs(useMembers())
const { hideFormSheet, showFormSheet } = useFormSheets()

const showCreateForm = () => {
  showFormSheet('member')
}
</script>

<template>
  <Card
    class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto w-full h-full p-3 custom-scrollbar-thin shadow-lg shadow-gray-300"
  >
    <CardHeader class="pt-0 w-full md:w-auto p-3">
      <div class="mb-2">
        <MemberSearchFilterForm />
      </div>
      <div class="flex self-end gap-2">
        <Button
          class="md:w-[190px] w-full rounded-lg"
          size="icon"
          @click="showCreateForm"
        >
          <span class="capitalize">Add New Member</span>
        </Button>
        <Button
          class="md:w-[100px] bg-[#157347] hover:bg-[#157347] w-32 rounded-lg"
          size="icon"
        >
          <span class="capitalize">Export All</span>
        </Button>
      </div>
    </CardHeader>
    <CardContent class="p-0 custom-scrollbar-thin">
      <MembersTable :members="members"></MembersTable>
      <MemberSheet :member="selectedMember"></MemberSheet>
      <div class="md:flex md:items-center md:justify-end my-2 md:mr-4">
        <MemberPagination></MemberPagination>
      </div>
    </CardContent>
  </Card>
</template>
