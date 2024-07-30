<script lang="ts" setup>
import { type HTMLAttributes } from 'vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { type FormContext } from 'vee-validate'
import { handlePaste } from '@/utils/clipboardUtils'

import { AsYouType, isPossiblePhoneNumber, type CountryCode } from 'libphonenumber-js'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const props = withDefaults(
  defineProps<{
    form: FormContext
    formKey: string
    label: string
    desc?: string
    placeholder?: string
    errorMessage?: string
    countryCode?: CountryCode
    class?: HTMLAttributes['class']
  }>(),
  {
    countryCode: 'CA'
  }
)

if (props.form.values[props.formKey] === null) {
  props.form.setFieldValue(props.formKey, '')
}

const setInvalidError = () => {
  if (!props.form.values[props.formKey]) {
    props.form.setFieldError(
      props.formKey,
      props.errorMessage ? props.errorMessage : 'invalid phone number'
    )
    return
  }

  if (!isPossiblePhoneNumber(props.form.values[props.formKey], props.countryCode)) {
    props.form.setFieldError(
      props.formKey,
      props.errorMessage ? props.errorMessage : 'invalid phone number'
    )
  } else {
    props.form.setFieldError(props.formKey, '')
  }
}

const handlePhoneNumberChange = (value: string) => {
  let formattedValue = value.replace(/\D/g, '')

  const asYouType = new AsYouType(props.countryCode).input(formattedValue)

  props.form.setFieldValue(props.formKey, asYouType)
}

if (props.form.values[props.formKey] && props.form.values[props.formKey] !== '') {
  handlePhoneNumberChange(props.form.values[props.formKey])
}
</script>

<script lang="ts">
// disable attributes on root element
export default {
  inheritAttrs: false
}
</script>
<template>
  <FormField
    v-slot="{ componentField }"
    :name="formKey"
    :validate-on-model-update="false"
    :validate-on-blur="false"
    :validate-on-input="false"
    :validate-on-change="false"
  >
    <FormItem class="w-full">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          type="text"
          inputmode="numeric"
          :placeholder="placeholder ?? ''"
          v-bind="componentField"
          @paste.prevent="handlePaste($event, handlePhoneNumberChange)"
          @input="form.setFieldError(formKey, '')"
          @blur="setInvalidError"
          @update:model-value="handlePhoneNumberChange($event.toString())"
          :class="cn('bg-input-background', props.class)"
          :disabled="$attrs.disabled"
        />
      </FormControl>
      <FormDescription v-if="desc && desc !== '' && !form.errors.value[formKey]">
        {{ desc }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
