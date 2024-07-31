import { type FetchClient, type PaginationResult } from '@/api/httpClient'
import type {
  Member,
  MemberCreationData,
  MemberNotesCreationData,
  MemberNotes,
  MemberReceiptsCreationData,
  MemberReceipts
} from '../models'
import type { MemberQueryParams } from '@/api/utils/attachQueryParams'
import { attachQueryParams, MemberQuerySchema } from '@/api/utils/attachQueryParams'

export default (httpClient: FetchClient) => {
  return {
    getMembers: async (query: Partial<MemberQueryParams>) => {
      const parsedQuery = MemberQuerySchema.safeParse(query)
      const url = attachQueryParams(`/api/members/`, parsedQuery.data as MemberQueryParams)

      return await httpClient.get<PaginationResult<Member>>(url)
    },

    createOne: async (data: MemberCreationData) => {
      return await httpClient.post<Member>(`/api/members/`, data)
    },

    updateOne: async (memberId: number, data: Partial<Member>) => {
      return await httpClient.patch<Member>(`/api/members/${memberId}`, data)
    },

    deleteOne: async (memberId: number) => {
      return await httpClient.delete<Member>(`/api/members/${memberId}`)
    },

    //***Member notes api's */
    getAllNotes: async (memberId: number) => {
      return await httpClient.get<MemberNotes[]>(`/api/members/${memberId}/notes/`)
    },
    createNote: async (memberId: number, data: MemberNotesCreationData) => {
      return await httpClient.post<MemberNotes>(`/api/members/${memberId}/notes/`, data)
    },

    deleteNote: async (memberId: number, noteId: number) => {
      return await httpClient.delete<MemberNotes>(`/api/members/${memberId}/notes/${noteId}`)
    },

    //***Member receipts api's */
    getAllReceipts: async (memberId: number) => {
      return await httpClient.get<MemberReceipts[]>(`/api/members/${memberId}/member_receipts/`)
    },

    createReceipt: async (memberId: number, data: MemberReceiptsCreationData) => {
      return await httpClient.post<MemberReceipts>(
        `/api/members/${memberId}/member_receipts/`,
        data
      )
    },

    deleteReceipt: async (memberId: number, receiptId: number) => {
      return await httpClient.delete<MemberReceipts>(
        `/api/members/${memberId}/member_receipts/${receiptId}`
      )
    }
  }
}
