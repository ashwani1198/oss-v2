import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MemberNotesSchema, type MemberNotes, type MemberNotesCreationData } from '@/api/oss/models'
import { AppApi } from '@/api/AppApi'
import { useErrorToast } from '@/composables/useToastAlerts'

export const useMemberNotes = defineStore('memberNotes', () => {
  const memberNotes = ref<MemberNotes[]>([])

  const addToList = (value: MemberNotes, addToFront = false) => {
    const parsedData = MemberNotesSchema.safeParse(value)

    if (!parsedData.success) {
      console.error('Invalid notes data', parsedData.error)
      return
    }

    // check if the memberNote already exists in the list
    const index = memberNotes.value.findIndex((note) => note.id === parsedData.data.id)

    if (index < 0) {
      if (addToFront) {
        memberNotes.value.unshift(parsedData.data)
      } else {
        memberNotes.value.push(parsedData.data)
      }
    } else {
      memberNotes.value[index] = { ...memberNotes.value[index], ...parsedData.data }
    }
  }

  const createOne = async (memberId: number, data: MemberNotesCreationData) => {
    const [err, result] = await AppApi.ossMembers.members.createNote(memberId, data)

    if (err) {
      useErrorToast(err.msg)
      return false
    }

    addToList(result, true)

    return true
  }
  return {
    memberNotes,
    createNote: createOne
  }
})
