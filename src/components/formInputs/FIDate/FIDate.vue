<script lang="ts" setup>
import { ref, type HTMLAttributes, type Ref, computed, toRef, watch } from 'vue'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription
} from '@/components/ui/form'

import {
  CalendarRoot,
  type CalendarRootEmits,
  type CalendarRootProps,
  useDateFormatter,
  useForwardPropsEmits
} from 'radix-vue'
import { createDecade, createYear, toDate } from 'radix-vue/date'
import {
  type DateValue,
  getLocalTimeZone,
  today,
  DateFormatter,
  CalendarDate
} from '@internationalized/date'

import { CalendarIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { useVModel } from '@vueuse/core'
import {
  CalendarCell,
  CalendarCellTrigger,
  CalendarGrid,
  CalendarGridBody,
  CalendarGridHead,
  CalendarGridRow,
  CalendarHeadCell,
  CalendarHeader,
  CalendarHeading
} from '@/components/ui/calendar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

import { type FormContext } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class']
    form: FormContext
    formKey: string
    label: string
    desc?: string
    disabled?: boolean
    placeholder?: DateValue
    weekdayFormat?: 'short' | 'narrow' | 'long'
  }>(),
  {
    placeholder() {
      return today(getLocalTimeZone())
    },
    weekdayFormat: 'short'
  }
)

//
const df = new DateFormatter('en-US', {
  dateStyle: 'long'
})

const emits = defineEmits<CalendarRootEmits>()
const isPopoverOpen = ref(false)
const delegatedProps = computed(() => {
  const { class: _, placeholder: __, ...delegated } = props

  return delegated
})

function convertDateStringToArray(dateString: string): number[] | null {
  // Regex to validate the date string format
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/

  // Check if the date string matches the required format
  if (!dateRegex.test(dateString)) {
    console.error('Invalid date format. Expected format: YYYY-MM-DD')
    return null
  }

  // Split the date string into components
  const parts = dateString.split('-').map((part) => parseInt(part, 10))

  // Validate that all parts are numbers and within valid ranges
  if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
    console.error('Date parts must be valid numbers.')
    return null
  }

  const [year, month, day] = parts

  // Check for valid month
  if (month < 1 || month > 12) {
    console.error('Month must be between 1 and 12.')
    return null
  }

  // Check for valid day
  const daysInMonth = new Date(year, month, 0).getDate() // Gets the last day of the previous month
  if (day < 1 || day > daysInMonth) {
    console.error('Day is out of range for the given month and year.')
    return null
  }

  // Return the array of numbers if all validations pass
  return parts
}

const dateValues = computed(() => {
  if (!props.form.values[props.formKey]) {
    return today(getLocalTimeZone())
  }

  const dateArray = convertDateStringToArray(props.form.values[props.formKey])

  if (!dateArray) {
    return today(getLocalTimeZone())
  }

  return new CalendarDate(dateArray[0], dateArray[1], dateArray[2])
})

const placeholder = ref<DateValue>(dateValues.value ?? today(getLocalTimeZone()))
// const placeholder = useVModel(props, 'formKey', emits, {
//   passive: true,
//   defaultValue: today(getLocalTimeZone())
// }) as Ref<DateValue>

const forwarded = useForwardPropsEmits(delegatedProps, emits)

const formatter = useDateFormatter('en')

watch(placeholder, (value) => {
  setDate(new CalendarDate(placeholder.value.year, placeholder.value.month, placeholder.value.day))
})

const setDay = (day: DateValue) => {
  setDate(new CalendarDate(day.year, day.month, day.day))
}

const setDate = (date: DateValue) => {
  props.form.setFieldValue(
    props.formKey,
    `${placeholder.value.year}-${date.month < 10 ? `0${date.month}` : date.month}-${date.day < 10 ? `0${date.day}` : date.day}`
  )

  isPopoverOpen.value = false
}
</script>
<template>
  <FormField
    v-slot="{ componentField, value }"
    :name="formKey"
    :validate-on-model-update="false"
    :validate-on-blur="true"
    :validate-on-input="false"
    :validate-on-change="false"
  >
    <FormItem>
      <FormLabel>{{ label }}</FormLabel>
      <Popover :open="isPopoverOpen" @update:open="(open: boolean) => (isPopoverOpen = open)">
        <PopoverTrigger as-child>
          <FormControl>
            <Button
              variant="outline"
              :class="cn('w-full ps-3 text-start font-normal', !value && 'text-muted-foreground')"
            >
              <span>{{ value ? value : 'Pick a date' }}</span>
              <CalendarIcon class="ms-auto h-4 w-4 opacity-50" />
            </Button>
            <input hidden />
          </FormControl>
        </PopoverTrigger>
        <PopoverContent class="w-auto p-0">
          <CalendarRoot
            v-slot="{ date, grid, weekDays }"
            v-bind="forwarded"
            :class="cn('rounded-md border p-3', props.class)"
          >
            <CalendarHeader>
              <CalendarHeading class="flex w-full items-center justify-between gap-2">
                <Select
                  :default-value="placeholder.month.toString()"
                  @update:model-value="
                    (v) => {
                      if (!v || !placeholder) return
                      if (Number(v) === placeholder?.month) return
                      placeholder = placeholder.set({
                        month: Number(v)
                      })
                    }
                  "
                >
                  <SelectTrigger aria-label="Select month" class="w-[60%]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent class="max-h-[300px]">
                    <SelectItem
                      v-for="month in createYear({ dateObj: date })"
                      :key="month.toString()"
                      :value="month.month.toString()"
                    >
                      {{ formatter.custom(toDate(month), { month: 'long' }) }}
                    </SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  :default-value="placeholder.year.toString()"
                  @update:model-value="
                    (v) => {
                      if (!v || !placeholder) return
                      if (Number(v) === placeholder?.year) return
                      placeholder = placeholder.set({
                        year: Number(v)
                      })
                    }
                  "
                >
                  <SelectTrigger aria-label="Select year" class="w-[40%]">
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent class="max-h-[300px]">
                    <SelectItem
                      v-for="yearValue in createDecade({
                        dateObj: date,
                        startIndex: -10,
                        endIndex: 10
                      })"
                      :key="yearValue.toString()"
                      :value="yearValue.year.toString()"
                    >
                      {{ yearValue.year }}
                    </SelectItem>
                  </SelectContent>
                </Select>
              </CalendarHeading>
            </CalendarHeader>

            <div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:gap-x-4 sm:gap-y-0">
              <CalendarGrid v-for="month in grid" :key="month.value.toString()">
                <CalendarGridHead>
                  <CalendarGridRow>
                    <CalendarHeadCell v-for="day in weekDays" :key="day">
                      {{ day }}
                    </CalendarHeadCell>
                  </CalendarGridRow>
                </CalendarGridHead>
                <CalendarGridBody class="grid">
                  <CalendarGridRow
                    v-for="(weekDates, index) in month.rows"
                    :key="`weekDate-${index}`"
                    class="mt-2 w-full"
                  >
                    <CalendarCell
                      v-for="weekDate in weekDates"
                      :key="weekDate.toString()"
                      :date="weekDate"
                      @click.prevent="setDay(weekDate)"
                    >
                      <CalendarCellTrigger :day="weekDate" :month="month.value" />
                    </CalendarCell>
                  </CalendarGridRow>
                </CalendarGridBody>
              </CalendarGrid>
            </div>
          </CalendarRoot>
        </PopoverContent>
      </Popover>
      <FormDescription v-if="desc && desc !== '' && !form.errors.value[formKey]">
        {{ props.desc }}
      </FormDescription>
      <FormMessage />
    </FormItem>
  </FormField>
</template>
