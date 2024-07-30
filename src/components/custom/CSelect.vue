<script lang="ts" setup>
import { computed } from 'vue'
import { cn } from '@/lib/utils'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

const props = defineProps<{
  modelValue?: string
  label?: string
  desc?: string
  placeholder?: string
  items: any[]
  itemValueKey: string
  itemLabelKey: string
}>()

const emit = defineEmits<{
  (event: 'update:modelValue', value: string | undefined): void
}>()

const selectedItem = computed({
  get() {
    return props.modelValue
  },
  set(value: string | undefined) {
    emit('update:modelValue', value ?? undefined)
  }
})
</script>

<script lang="ts">
// disable attributes on root element
export default {
  inheritAttrs: false
}
</script>
<template>
  <div class="space-y-2 relative">
    <p
      v-if="label && label !== ''"
      class="block text-sm tracking-tight font-medium text-foreground text-left"
    >
      {{ label }}
    </p>
    <Select v-model="selectedItem" v-bind="$attrs">
      <SelectTrigger :class="cn($attrs.disabled ? 'bg-muted text-muted-foreground' : '')">
        <SelectValue :placeholder="placeholder ?? 'Select'" />
      </SelectTrigger>
      <SelectContent class="max-h-52 w-full overflow-y-auto custom-scrollbar-thin">
        <SelectGroup>
          <SelectItem v-for="item in items" :value="item[itemValueKey]">
            {{ item[itemLabelKey] }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <p v-if="desc && desc !== ''" class="text-sm text-muted-foreground">{{ desc }}</p>
  </div>
</template>
