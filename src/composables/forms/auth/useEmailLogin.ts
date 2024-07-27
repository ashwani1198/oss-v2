import { computed } from 'vue'
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'

const EmailLoginSchema = z.object({
  email_address: z.string().email().default(''),
  password: z.string().min(8).max(20).default('')
})

type SchemaType = z.infer<typeof EmailLoginSchema>

export function useEmailLogin(initialValues?: Partial<SchemaType>) {
  const form = useForm({
    validationSchema: toTypedSchema(EmailLoginSchema),
    validateOnMount: false,
    initialValues: initialValues
      ? initialValues
      : {
          email_address: 'test@xyz.com',
          password: '12345678'
        }
  })

  const canSubmit = computed(() => {
    return EmailLoginSchema.safeParse(form.values).success && !form.isSubmitting.value
  })

  const partialFormValues = computed(() => {
    return form.values
  })

  const validatedFormValues = computed(() => {
    if (canSubmit.value) {
      return EmailLoginSchema.parse(form.values)
    }

    return null
  })

  return {
    form,
    canSubmit,
    partialFormValues,
    validatedFormValues
  }
}
