import { type FetchClient, type PaginationResult } from '@/api/httpClient'
import { type Member } from '../models'
import type { MemberQueryParams } from '@/api/utils/attachQueryParams'
import { attachQueryParams, MemberQuerySchema } from '@/api/utils/attachQueryParams'

export default (httpClient: FetchClient) => {
  return {
    getMembers: async (query: Partial<MemberQueryParams>) => {
      const parsedQuery = MemberQuerySchema.safeParse(query)
      const url = attachQueryParams(`/api/members/`, parsedQuery.data as MemberQueryParams)

      return await httpClient.get<PaginationResult<Member>>(url)
    },

    updateOne: async (memberId:number, data: Partial<Member>) => {
      return await httpClient.patch<Member>(
        `/api/members/${memberId}`,
        data
      )
    },

    deleteOne: async (memberId:number) => {
      return await httpClient.delete<{ msg: string }>(
        `/api/members/${memberId}`
      )
    },
  }
}
