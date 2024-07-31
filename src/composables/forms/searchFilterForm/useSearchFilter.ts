import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { MemberQuerySchema } from '@/api/utils/attachQueryParams'
import { computed } from 'vue'
import type { MembershipType } from '@/api/oss/models'

export const MemberSearchFilterSchema = MemberQuerySchema.omit({
  page: true,
  per_page: true,
  address: true,
  order: true,
  order_by: true,
  first_name: true,
  last_name: true
})

export type MemberSearchFilter = z.infer<typeof MemberSearchFilterSchema>

export function useSearchFilter(initialValues?: Partial<MemberSearchFilter>) {
  const form = useForm({
    validationSchema: toTypedSchema(MemberSearchFilterSchema),
    validateOnMount: false,
    initialValues: {
      search: initialValues?.search ?? undefined,
      membership_type: initialValues?.membership_type ?? undefined,
      status: initialValues?.status ?? undefined,
      general_body_meeting_date: initialValues?.general_body_meeting_date ?? undefined,
      start_date: initialValues?.start_date ?? undefined,
      end_date: initialValues?.end_date ?? undefined
    }
  })

  const canSubmit = computed(() => {
    return MemberSearchFilterSchema.safeParse(form.values).success && !form.isSubmitting.value
  })

  const membershipTypeOptions: { value: MembershipType; label: string }[] = [
    { value: 'lifetime', label: 'Lifetime' },
    { value: 'annual', label: 'Annual' }
  ]

  const statusOptions: { value: 'active' | 'inactive'; label: string }[] = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' }
  ]

  return {
    form,
    canSubmit,
    membershipTypeOptions,
    statusOptions
  }
}
