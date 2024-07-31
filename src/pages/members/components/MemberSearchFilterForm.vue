<script setup lang="ts">
import FIText from '@/components/formInputs/FIText/FIText.vue'
import FISelect from '@/components/formInputs/FISelect/FISelect.vue'
import FIDate from '@/components/formInputs/FIDate/FIDate.vue'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useMembers } from '@/stores/members/useMembers'
import { useLoadingDialog } from '@/composables/useLoadingDialog'
import { useSearchFilter } from '@/composables/forms/searchFilterForm/useSearchFilter'

const { showLoading, hideLoading } = useLoadingDialog()
const { form, canSubmit, membershipTypeOptions, statusOptions } = useSearchFilter()
const { fetchPaginatedMembers } = useMembers()
const { query, currentPage } = storeToRefs(useMembers())

const onSubmit = form.handleSubmit(async (values) => {
  if (currentPage.value !== 1) {
    // it will start from page 1 when search submit button is clicked if current page is not 1
    currentPage.value = 1
    ;(query.value.page = currentPage.value), (query.value = { ...query.value, ...values })
  } else {
    query.value = { ...query.value, ...values }
    showLoading()
    await fetchPaginatedMembers(query.value)
    hideLoading()
  }
})

const onCancel = async () => {
  form.resetForm()
  query.value = { ...query.value, ...form.values }
  showLoading()
  await fetchPaginatedMembers(query.value)
  hideLoading()
}
</script>
<template>
  <form @submit="onSubmit">
    <div class="flex flex-col justify-between">
      <div class="grid md:grid-cols-6 sm:grid-cols-3 grid-cols-2 gap-2">
        <FIText
          :form="form"
          form-key="search"
          label="Search"
          placeholder="search by firstName,lastName,address"
          class="focus-visible:ring-primary"
        />
        <FISelect
          :form="form"
          form-key="membership_type"
          label="Membership Type"
          :items="membershipTypeOptions"
          item-label-key="label"
          item-value-key="value"
        />
        <FISelect
          :form="form"
          form-key="status"
          label="Status"
          :items="statusOptions"
          item-label-key="label"
          item-value-key="value"
        />
        <FIDate :form="form" form-key="start_date" label="Start Date" />
        <FIDate :form="form" form-key="end_date" label="End Date" />
        <FIDate
          :form="form"
          form-key="general_body_meeting_date"
          label="General Body Meeting Date"
        />
      </div>
      <div class="mt-5 flex self-end gap-2">
        <Button
          type="button"
          @click="onCancel"
          class="w-32 bg-[#F8F9FA] text-black hover:bg-[#F8F9FA]"
        >
          <p v-if="!form.isSubmitting.value">Cancel</p>
        </Button>
        <Button type="submit" class="w-32 bg-black hover:bg-black" :disabled="!canSubmit">
          <p v-if="!form.isSubmitting.value" class="flex justify-center items-center">Search</p>
          <RefreshCw v-else class="animate-spin" />
        </Button>
      </div>
    </div>
  </form>
</template>
