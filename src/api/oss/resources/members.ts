import { type FetchClient, type PaginationResult } from '@/api/httpClient'
import { type Member } from '../models'

export default (httpClient: FetchClient) => {
  return {
    getMembers: async () => {
      return await httpClient.get<PaginationResult<Member>>(`/api/members/`)
    },

  }
}
