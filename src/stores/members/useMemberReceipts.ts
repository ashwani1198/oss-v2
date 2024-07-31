import { ref } from 'vue'
import { defineStore } from 'pinia'
import { MemberReceiptsSchema, type MemberReceipts, type MemberReceiptsCreationData } from '@/api/oss/models'
import { AppApi } from '@/api/AppApi'
import { useErrorToast } from '@/composables/useToastAlerts'

export const useMemberReceipts = defineStore('memberReceipts', () => {
  const memberReceipts = ref<MemberReceipts[]>([])

  const addToList = (value: MemberReceipts, addToFront = false) => {
    const parsedData = MemberReceiptsSchema.safeParse(value)

    if (!parsedData.success) {
      console.error('Invalid receipts data', parsedData.error)
      return
    }

    // check if the memberReceipt already exists in the list
    const index = memberReceipts.value.findIndex((receipt) => receipt.id === parsedData.data.id)

    if (index < 0) {
      if (addToFront) {
        memberReceipts.value.unshift(parsedData.data)
      } else {
        memberReceipts.value.push(parsedData.data)
      }
    } else {
      memberReceipts.value[index] = { ...memberReceipts.value[index], ...parsedData.data }
    }
  }

  const createOne = async (memberId: number, data: MemberReceiptsCreationData) => {
    const [err, result] = await AppApi.ossMembers.members.createReceipt(memberId, data)

    if (err) {
      useErrorToast(err.msg)
      return false
    }

    addToList(result, true)

    return true
  }
  return {
    memberReceipts,
    createReceipt: createOne
  }
})
