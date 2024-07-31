<script setup lang="ts">
import { ref, onMounted,onBeforeUnmount } from 'vue'
import { storeToRefs } from 'pinia'
import MembersCard from './components/MembersCard.vue'
import { useMembers } from '@/stores/members/useMembers'
import { useLoadingDialog } from '@/composables/useLoadingDialog'

const { showLoading, hideLoading } = useLoadingDialog()
const { fetchPaginatedMembers,resetQuery } = useMembers()
const { query } = storeToRefs(useMembers())

const isReady = ref<boolean>(false)

const init = async () => {
  showLoading()
  await fetchPaginatedMembers(query.value)
  isReady.value = true
  hideLoading()
}

onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  resetQuery()
})
</script>
<template>
  <div class="h-full w-full relative p-3 max-h-[calc(100svh_-_80px)] overflow-y-hidden">
    <MembersCard />
  </div>
</template>
