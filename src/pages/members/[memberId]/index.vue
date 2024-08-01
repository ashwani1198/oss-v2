<script setup lang="ts">
import { useRoute } from 'vue-router/auto'
import MemberIdCard from './components/MemberIdCard.vue';
const route = useRoute('/members/[memberId]')
import { useMembers } from '@/stores/members/useMembers';
import { storeToRefs } from 'pinia';

const { selectedMember } = storeToRefs(useMembers())
console.log(selectedMember.value)
</script>
<template>
  <div class="h-full w-full relative p-3 max-h-[calc(100svh_-_80px)] overflow-y-hidden">
    {{ selectedMember }}
    <MemberIdCard/>
  </div>
</template>
