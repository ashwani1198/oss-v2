<script lang="ts" setup>
import { type HTMLAttributes } from 'vue'
import { type FormContext } from 'vee-validate'
import { handlePaste } from '@/utils/clipboardUtils'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { Textarea } from '@/components/ui/textarea'

const props = defineProps<{
  form: FormContext
  formKey: string
  label: string
  desc?: string
  placeholder?: string
  class?: HTMLAttributes['class']
}>()

const processPastedData = (value: string) => {
  props.form.setFieldValue(props.formKey, value)
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
    :validate-on-blur="true"
    :validate-on-input="false"
    :validate-on-change="false"
  >
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Textarea
          type="text"
          :placeholder="placeholder ?? ''"
          v-bind="componentField"
          @paste.prevent="handlePaste($event, processPastedData)"
          @input="form.setFieldError(formKey, '')"
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
