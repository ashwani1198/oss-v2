<script setup lang="ts">
import {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@/components/ui/pagination'

import { Button } from '@/components/ui/button'

import { useMembers } from '@/stores/members/useMembers'
import { useLoadingDialog } from '@/composables/useLoadingDialog'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { watch } from 'vue'

const { showLoading, hideLoading } = useLoadingDialog()
const { fetchPaginatedMembers } = useMembers()
const { paginatedPayload } = storeToRefs(useMembers())

const currentPage = ref(paginatedPayload.value.page)

watch(currentPage, async () => {
  showLoading()
  await fetchPaginatedMembers({
    page: currentPage.value,
    per_page: 20,
    order: 'asc',
    order_by: 'first_name',
    membership_type: 'lifetime'
  })
  hideLoading()
})
</script>

<template>
  <Pagination
    v-model:page="currentPage"
    v-slot="{ page }"
    :total="paginatedPayload.total_pages * 20"
    :items-per-page="20"
    :sibling-count="1"
    show-edges
    :default-page="2"
  >
    <PaginationList v-slot="{ items }" class="flex items-center gap-1">
      <PaginationFirst />
      <PaginationPrev />

      <template v-for="(item, index) in items">
        <PaginationListItem v-if="item.type === 'page'" :key="index" :value="item.value" as-child>
          <Button
            class="w-10 h-10 p-0 rounded-full"
            :variant="item.value === page ? 'default' : 'outline'"
          >
            {{ item.value }}
          </Button>
        </PaginationListItem>
        <PaginationEllipsis v-else :key="item.type" :index="index" />
      </template>

      <PaginationNext />
      <PaginationLast />
    </PaginationList>
  </Pagination>
</template>
