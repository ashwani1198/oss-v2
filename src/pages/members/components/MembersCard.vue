<script setup lang="ts">
import { Card, CardHeader, CardContent } from '@/components/ui/card'
import { storeToRefs } from 'pinia'
import { useMembers } from '@/stores/members/useMembers'
import MemberSearchFilterForm from './MemberSearchFilterForm.vue'
import MembersTable from './MembersTable.vue'
import MemberPagination from '@/components/MemberPagination.vue'

const { members } = storeToRefs(useMembers())
</script>

<template>
  <Card
    class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto w-full h-full p-3 custom-scrollbar-thin shadow-lg shadow-gray-300"
  >
    <CardHeader class="pt-0 w-full md:w-auto p-3">
      <div class="mb-2">
        <MemberSearchFilterForm />
      </div>
    </CardHeader>
    <CardContent class="p-0 custom-scrollbar-thin">
      <MembersTable :members="members"></MembersTable>
      <div class="md:flex md:items-center md:justify-end my-2 md:mr-4">
        <MemberPagination></MemberPagination>
      </div>
    </CardContent>
  </Card>
</template>
