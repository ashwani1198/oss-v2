import {
  MemberCreationSchema,
  type MemberCreationData,
  type MembershipType
} from '@/api/oss/models'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { computed } from 'vue'

export function useMemberForm(initialValues?: Partial<MemberCreationData>) {
  const form = useForm({
    validationSchema: toTypedSchema(MemberCreationSchema),
    validateOnMount: false,
    initialValues: {
      first_name: initialValues?.first_name ?? undefined,
      middle_name: initialValues?.middle_name ?? null,
      last_name: initialValues?.last_name ?? undefined,
      address_line_1: initialValues?.address_line_1 ?? undefined,
      city: initialValues?.city ?? undefined,
      province: initialValues?.province ?? undefined,
      country: initialValues?.country ?? undefined,
      postal_code: initialValues?.postal_code ?? undefined,
      primary_phone: initialValues?.primary_phone ?? undefined,
      secondary_phone: initialValues?.secondary_phone ?? null,
      email: initialValues?.email ?? null,
      last_document_sigining_date:
        initialValues?.last_document_sigining_date ?? new Date().toISOString().split('T')[0],
      membership_type: initialValues?.membership_type ?? 'lifetime'
    }
  })

  const canSubmit = computed(() => {
    return MemberCreationSchema.safeParse(form.values).success && !form.isSubmitting.value
  })

  const membershipTypeOptions: { value: MembershipType; label: string }[] = [
    { value: 'lifetime', label: 'Lifetime' },
    { value: 'annual', label: 'Annual' }
  ]

  const countryOptions: { value: 'USA' | 'Canada'; label: string }[] = [
    { value: 'Canada', label: 'CANADA' },
    { value: 'USA', label: 'USA' }
  ]

  const provinceOptions = computed(() => {
    const canadaProvinces = [
      { value: 'AB', label: 'Alberta' },
      { value: 'BC', label: 'British Columbia' },
      { value: 'MB', label: 'Manitoba' },
      { value: 'NB', label: 'New Brunswick' },
      { value: 'NL', label: 'Newfoundland and Labrador' },
      { value: 'NT', label: 'Northwest Territories' },
      { value: 'NS', label: 'Nova Scotia' },
      { value: 'NU', label: 'Nunavut' },
      { value: 'ON', label: 'Ontario' },
      { value: 'PE', label: 'Prince Edward Island' },
      { value: 'QC', label: 'Quebec' },
      { value: 'SK', label: 'Saskatchewan' },
      { value: 'YT', label: 'Yukon' }
    ]

    const usaStates = [
      { value: 'AL', label: 'Alabama' },
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'AR', label: 'Arkansas' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'CT', label: 'Connecticut' },
      { value: 'DE', label: 'Delaware' },
      { value: 'FL', label: 'Florida' },
      { value: 'GA', label: 'Georgia' },
      { value: 'HI', label: 'Hawaii' },
      { value: 'ID', label: 'Idaho' },
      { value: 'IL', label: 'Illinois' },
      { value: 'IN', label: 'Indiana' },
      { value: 'IA', label: 'Iowa' },
      { value: 'KS', label: 'Kansas' },
      { value: 'KY', label: 'Kentucky' },
      { value: 'LA', label: 'Louisiana' },
      { value: 'ME', label: 'Maine' },
      { value: 'MD', label: 'Maryland' },
      { value: 'MA', label: 'Massachusetts' },
      { value: 'MI', label: 'Michigan' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'MS', label: 'Mississippi' },
      { value: 'MO', label: 'Missouri' },
      { value: 'MT', label: 'Montana' },
      { value: 'NE', label: 'Nebraska' },
      { value: 'NV', label: 'Nevada' },
      { value: 'NH', label: 'New Hampshire' },
      { value: 'NJ', label: 'New Jersey' },
      { value: 'NM', label: 'New Mexico' },
      { value: 'NY', label: 'New York' },
      { value: 'NC', label: 'North Carolina' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OH', label: 'Ohio' },
      { value: 'OK', label: 'Oklahoma' },
      { value: 'OR', label: 'Oregon' },
      { value: 'PA', label: 'Pennsylvania' },
      { value: 'RI', label: 'Rhode Island' },
      { value: 'SC', label: 'South Carolina' },
      { value: 'SD', label: 'South Dakota' },
      { value: 'TN', label: 'Tennessee' },
      { value: 'TX', label: 'Texas' },
      { value: 'UT', label: 'Utah' },
      { value: 'VT', label: 'Vermont' },
      { value: 'VA', label: 'Virginia' },
      { value: 'WA', label: 'Washington' },
      { value: 'WV', label: 'West Virginia' },
      { value: 'WI', label: 'Wisconsin' },
      { value: 'WY', label: 'Wyoming' }
    ]

    if (form.controlledValues.value.country === 'Canada') {
      return canadaProvinces
    } else if (form.controlledValues.value.country === 'USA') {
      return usaStates
    } else {
      return [...canadaProvinces, ...usaStates]
    }
  })

  return {
    form,
    canSubmit,
    membershipTypeOptions,
    countryOptions,
    provinceOptions
  }
}
