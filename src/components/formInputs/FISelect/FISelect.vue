<script lang="ts" setup>
import { type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { type FormContext } from 'vee-validate'

const props = defineProps<{
  form: FormContext
  formKey: string
  label: string
  desc?: string
  placeholder?: string
  items: any[]
  itemValueKey: string
  itemLabelKey: string
  disabled?: boolean
  class?: HTMLAttributes['class']
  dropdownClass?: HTMLAttributes['class']
  btnClass?: HTMLAttributes['class']
}>()
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
    <FormItem class="relative">
      <FormLabel>{{ label }}</FormLabel>
      <Select v-bind="componentField">
        <FormControl>
          <SelectTrigger
            :disabled="props.disabled"
            :class="cn('bg-input-background', props.btnClass)"
          >
            <SelectValue :placeholder="props.placeholder || 'Select'" />
          </SelectTrigger>
        </FormControl>
        <SelectContent
          :class="
            cn(
              'max-h-60 overflow-y-auto custom-scrollbar-thin border-none bg-white text-foreground',
              props.dropdownClass
            )
          "
        >
          <SelectGroup>
            <SelectItem v-for="item in items" :key="item" :value="item[itemValueKey].toString()">
              {{ item[itemLabelKey] }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <FormDescription v-if="desc && desc !== '' && !form.errors.value[formKey]">
        {{ desc }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
