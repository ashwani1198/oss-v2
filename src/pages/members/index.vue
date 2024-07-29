<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MembersCard from './components/MembersCard.vue';
import { useMembers } from '@/stores/members/useMembers'
import type { MemberQueryParams } from '@/api/utils/attachQueryParams'

const { fetchPaginatedMembers } = useMembers()

const query = ref<MemberQueryParams>({
  page: 1,
  per_page: 20,
  order_by: 'first_name',
  order: 'asc',
  membership_type:'lifetime'
})

const isReady = ref<boolean>(false)

const init = async () => {
  await fetchPaginatedMembers(query.value)
  isReady.value = true
}

onMounted(() => {
  init()
})
</script>
<template>
   <div class="h-full w-full relative p-3 max-h-[calc(100svh_-_80px)] overflow-y-hidden">
    <MembersCard/>
  </div>
</template>
