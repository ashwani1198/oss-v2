import { ref } from 'vue'
import { defineStore } from 'pinia'

import { type Member, type MemberCreationData, MemberSchema } from '@/api/oss/models'
import { AppApi } from '@/api/AppApi'
import { useDefaultToast, useErrorToast } from '@/composables/useToastAlerts'
import type { MemberQueryParams } from '@/api/utils/attachQueryParams'

export interface payloadPages {
  page: number
  total_pages: number
}

export const useMembers = defineStore('members', () => {
  const members = ref<Member[]>([])
  const selected = ref<Member | undefined>()
  const currentPage = ref(1)
  const query = ref<MemberQueryParams>({
    page: currentPage.value,
    per_page: 20,
    order_by: 'first_name',
    order: 'asc',
    membership_type: 'lifetime',
    address: null,
    search: null,
    status: null
  })

  const paginatedPayload = ref<payloadPages>({
    page: 1,
    total_pages: 1
  })

  const resetQuery = () => {
    query.value = {
      page: currentPage.value,
      per_page: 20,
      order_by: 'first_name',
      order: 'asc',
      membership_type: 'lifetime',
      address: null,
      search: null,
      status: null
    }
  }

  const setSelected = (value: Member | undefined) => {
    if (value) {
      selected.value = value
    } else {
      selected.value = undefined
    }
  }

  const addToList = (value: Member, addToFront = false) => {
    const parsedData = MemberSchema.safeParse(value)

    if (!parsedData.success) {
      console.error('Invalid members data', parsedData.error)
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
    return true
  }

  const createOne = async (data: MemberCreationData) => {
    const [err, result] = await AppApi.ossMembers.members.createOne(data)

    if (err) {
      useErrorToast(err.msg)
      return false
    }

    addToList(result, true)

    return true
  }

  const updateOne = async (memberId: number, data: Partial<Member>) => {
    const [err, result] = await AppApi.ossMembers.members.updateOne(memberId, data)

    if (err) {
      useErrorToast(`An error occurred while updating form formField. ${err}`)
      return false
    }

    addToList(result)

    return true
  }

  const deleteOne = async (memberId: number) => {
    const [err, msg] = await AppApi.ossMembers.members.deleteOne(memberId)

    if (err) {
      useErrorToast(`An error occurred while deleting member Id ${memberId}. ${err}`)
      return false
    }

    members.value = members.value.filter((member) => member.id !== memberId)

    return true
  }

  return {
    members,
    selectedMember: selected,
    paginatedPayload,
    fetchPaginatedMembers,
    updateOne,
    deleteOne,
    createOne,
    setSelectedMember: setSelected,
    resetQuery,
    query,
    currentPage
  }
})
