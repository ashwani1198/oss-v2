import { ref } from 'vue'
import { defineStore } from 'pinia'

import { type Member, MemberSchema } from '@/api/oss/models'
import { AppApi } from '@/api/AppApi'
import { useErrorToast } from '@/composables/useToastAlerts'
import type { MemberQueryParams } from '@/api/utils/attachQueryParams'

export interface payloadPages {
  page: number
  total_pages: number
}

export const useMembers = defineStore('members', () => {
  const members = ref<Member[]>([])
  const paginatedPayload = ref<payloadPages>({
    page: 1,
    total_pages: 1
  })

  const addToList = (value: Member, addToFront = false) => {
    const parsedData = MemberSchema.safeParse(value)

    if (!parsedData.success) {
      console.error('Invalid submission data', parsedData.error)
      return
    }

    // check if the member already exists in the list
    const index = members.value.findIndex((member) => member.id === parsedData.data.id)

    if (index < 0) {
      if (addToFront) {
        members.value.unshift(parsedData.data)
      } else {
        members.value.push(parsedData.data)
      }
    } else {
      members.value[index] = { ...members.value[index], ...parsedData.data }
    }
  }

  const fetchPaginatedMembers = async (query: MemberQueryParams) => {
    members.value.splice(0, members.value.length)

    const [err, result] = await AppApi.ossMembers.members.getMembers(query)

    if (err) {
      if (err.statusCode !== 404) {
        useErrorToast(err.msg)
      }

      return false
    }

    for (let x = 0; x < result.data.length; x++) {
      addToList(result.data[x])
    }

    const { page, total_pages } = result
    paginatedPayload.value = {
      page: page,
      total_pages: total_pages
    }
    console.log('fetchPaginatedMembers', paginatedPayload.value)
    return true
  }

  return {
    members,
    fetchPaginatedMembers,
    paginatedPayload
  }
})
