<script setup lang="ts">
import FIText from '@/components/formInputs/FIText/FIText.vue'
import FISelect from '@/components/formInputs/FISelect/FISelect.vue'
import FIDate from '@/components/formInputs/FIDate/FIDate.vue'
import FIPhoneNumber from '@/components/formInputs/FIPhoneNumber/FIPhoneNumber.vue'
import FIEmail from '@/components/formInputs/FIEmail/FIEmail.vue'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-vue-next'
import { storeToRefs } from 'pinia'
import { useMembers } from '@/stores/members/useMembers'
import { useErrorToast, useSuccessToast } from '@/composables/useToastAlerts'
import type { Member, MemberCreationData } from '@/api/oss/models'
import { useLoadingDialog } from '@/composables/useLoadingDialog'
import { useMemberForm } from '@/composables/forms/members/useMemberForm'

const { showLoading, hideLoading } = useLoadingDialog()
const { fetchPaginatedMembers, createOne, updateOne } = useMembers()
const { query } = storeToRefs(useMembers())

const emit = defineEmits<{
  (event: 'completed'): void
}>()

const props = defineProps<{
  member?: Member
}>()

const { form, canSubmit, countryOptions, membershipTypeOptions, provinceOptions } = useMemberForm(
  props.member as Partial<MemberCreationData>
)

const onSubmit = form.handleSubmit(async (values) => {
  try {
    showLoading()
    if (props.member) {
      await updateOne(props.member.id, values)
      useSuccessToast('Member updated successfully')
    } else {
      const result = await createOne(values)
      if (result) {
        form.resetForm()
      }
      await fetchPaginatedMembers(query.value)
      useSuccessToast('Member created successfully')
    }
    emit('completed')
  } catch (error) {
    console.error('An error occurred:', error)
  } finally {
    hideLoading()
  }
})
</script>
<template>
  <form @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <div class="space-y-4 p-3">
        <FIText :form="form" form-key="first_name" label="First Name" placeholder="First Name" />

        <FIText :form="form" form-key="middle_name" label="Middle Name" placeholder="Middle Name" />

        <FIText :form="form" form-key="last_name" label="Last Name" placeholder="Last Name" />
        <FIText :form="form" form-key="address_line_1" label="Address" placeholder="Address" />
        <FIText :form="form" form-key="city" label="City" placeholder="city" />
        <FIText :form="form" form-key="postal_code" label="Postal Code" placeholder="postal code" />
        <FISelect
          :form="form"
          form-key="country"
          :items="countryOptions"
          label="Country"
          placeholder="country"
          item-label-key="label"
          item-value-key="value"
        />
        <FISelect
          :form="form"
          form-key="province"
          label="Province"
          :items="provinceOptions"
          item-label-key="label"
          item-value-key="value"
        />
        <FIPhoneNumber
          :form="form"
          form-key="primary_phone"
          label="Primary Phone"
          placeholder="Primary Phone"
        />
        <FIPhoneNumber
          :form="form"
          form-key="secondary_phone"
          label="Secondary Phone"
          placeholder="Secondary Phone"
        />
        <FIEmail :form="form" form-key="email" label="Email" placeholder="Email" />
        <FISelect
          :form="form"
          form-key="membership_type"
          :items="membershipTypeOptions"
          label="Membership Type"
          item-label-key="label"
          item-value-key="value"
        />
        <FIDate
          :form="form"
          form-key="last_document_sigining_date"
          label="Last document sigining date"
        />
      </div>
      <Button type="submit" class="mt-5 self-end w-32">
        <p v-if="!form.isSubmitting.value">Submit</p>
        <RefreshCw v-else class="animate-spin" />
      </Button>
    </div>
  </form>
</template>
