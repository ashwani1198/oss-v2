<script lang="ts" setup>
import { watch, type HTMLAttributes, toRefs } from 'vue'
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

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const props = defineProps<{
  form: FormContext
  formKey: string
  label: string
  desc?: string
  placeholder?: string
  class?: HTMLAttributes['class']
  validateOnInput?: boolean
  autoSuggestions?: string[]
  suggestionsLabel?: string
}>()

const setSuggestion = (value: string) => {
  props.form.setFieldValue(props.formKey, value)
}

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
    :validate-on-input="validateOnInput ?? false"
    :validate-on-change="false"
  >
    <FormItem class="">
      <FormLabel>{{ label }}</FormLabel>
      <FormControl>
        <Input
          type="text"
          :placeholder="placeholder ?? ''"
          v-bind="componentField"
          @paste.prevent="handlePaste($event, processPastedData)"
          @input="form.setFieldError(formKey, '')"
          :class="cn('bg-input-background', props.class)"
          :maxlength="$attrs.maxlength"
          :minlength="$attrs.minlength"
          :disabled="$attrs.disabled"
        />
      </FormControl>
      <FormDescription v-if="desc && desc !== '' && !form.errors.value[formKey]">
        {{ desc }}
      </FormDescription>
      <FormMessage />
      <div
        v-if="props.autoSuggestions && props.autoSuggestions?.length > 0"
        class="absolute top-0 translate-y-16 -translate-x-2 w-full bg-white rounded-md p-3 flex flex-col gap-y-3"
      >
        <p class="text-foreground/50 text-xs">{{ suggestionsLabel ?? 'Previously Used' }}</p>
        <div v-for="i in props.autoSuggestions" :key="i" @click.prevent="setSuggestion(i)" class="">
          {{ i }}
        </div>
      </div>
    </FormItem>
  </FormField>
</template>
