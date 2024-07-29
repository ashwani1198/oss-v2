<script setup lang="ts">
import  { Card,CardHeader,CardContent } from '@/components/ui/card'
import { storeToRefs } from 'pinia';
import { useMembers } from '@/stores/members/useMembers';
import MembersTable from './MembersTable.vue';
import MemberPagination from '@/components/MemberPagination.vue';

const { members } =  storeToRefs(useMembers())

</script>
<template>
    <Card class="md:max-w-[1240px] sm:max-w-[720px] max-w-[540px] mx-auto w-full h-full p-3 custom-scrollbar">
      <CardHeader class="pt-0">here Filter components</CardHeader>
      <CardContent class="max-h-[calc(100svh_-_192px)] custom-scrollbar-thin overflow-y-auto p-0">
        <MembersTable :members="members"></MembersTable>
       <div class="md:flex md:items-center md:justify-end my-2 md:mr-4">
        <MemberPagination></MemberPagination>
      </div>
      </CardContent>
    </Card>
</template>