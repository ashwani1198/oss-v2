<script lang="ts" setup>
import { ref, useAttrs } from 'vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'

import { type FormContext } from 'vee-validate'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { Eye, EyeOff } from 'lucide-vue-next'

const props = defineProps<{
  form: FormContext
  formKey: string
  label: string
  desc?: string
  placeholder?: string
}>()

const { class: className } = useAttrs()

const showPassword = ref(false)
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
        <div class="relative overflow-hidden">
          <Input
            :type="showPassword ? 'text' : 'password'"
            :placeholder="placeholder ?? ''"
            v-bind="componentField"
            @input="form.setFieldError(formKey, '')"
            :class="className ?? ''"
          />
          <div class="absolute top-0 right-0 z-10">
            <Button
              @click.prevent="showPassword = !showPassword"
              variant="ghost"
              size="icon"
              class="rounded-none"
            >
              <Eye v-if="!showPassword" />
              <EyeOff v-else />
            </Button>
          </div>
        </div>
      </FormControl>
      <FormDescription v-if="desc && desc !== '' && !form.errors.value[formKey]">
        {{ desc }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
