import { reactive } from 'vue'
import { defineStore } from 'pinia'

type FormSheetType = 'member'
type CreateFormSheet = {
  formSheetType: FormSheetType | null
  isOpen: boolean
}

export const useFormSheets = defineStore('sheets', () => {
  const state: CreateFormSheet = reactive({
    formSheetType: null,
    isOpen: false
  })

  const showFormSheet = (type: FormSheetType) => {
    state.formSheetType = type
    state.isOpen = true
  }

  const hideFormSheet = () => {
    state.formSheetType = null
    state.isOpen = false
  }

  return {
    showFormSheet,
    hideFormSheet,
    sheetState: state
  }
})
