import { z } from 'zod'
import { DateStringSchema } from '../oss/common/zodSchemas'

export const MemberQuerySchema = z.object({
  page: z.number().optional().default(1),
  per_page: z.number().optional().default(20),
  search: z.string().optional().nullable().default(null),
  order_by: z
    .enum([
      'first_name',
      'last_name',
      'address',
      'status',
      'membership_type',
      'general_body_meeting_date'
    ])
    .default('first_name'),
  order: z.enum(['asc', 'desc']).default('asc'),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  address: z.string().optional().nullable().default(null),
  status: z.string().optional().nullable().default(null),
  start_date: DateStringSchema.optional(),
  end_date: DateStringSchema.optional(),
  membership_type: z.string().optional().nullable().default(null),
  general_body_meeting_date: DateStringSchema.optional()
})

export type MemberQueryParams = z.infer<typeof MemberQuerySchema>

const PAGE_SIZE = 'per_page'
const PAGE = 'page'
const SEARCH = 'q'
const ORDER_BY = 'order_by'
const ORDER = 'order'
const FIRSTNAME = 'first_name'
const LASTNAME = 'last_name'
const ADDRESS = 'address'
const STATUS = 'status'
const START_DATE = 'start_date'
const END_DATE = 'end_date'
const MEMBERSHIPTYPE = 'membership_type'
const GENERAL_BODY_MEETING_DATE = 'general_body_meeting_date'

const mergeStr = (k: string, v: string | number, d = '&') => d + k + '=' + v

export const attachQueryParams = (url: string, params: MemberQueryParams): string => {
  url += mergeStr(PAGE_SIZE, params.per_page, '?')
  url += mergeStr(PAGE, params.page)

  if (params.search) url += mergeStr(SEARCH, params.search)
  if (params.order_by !== undefined) {
    url += mergeStr(ORDER_BY, params.order_by)
    if (params.order !== undefined) url += mergeStr(ORDER, params.order)
  }

  if (params.first_name) url += mergeStr(FIRSTNAME, params.first_name)
  if (params.last_name) url += mergeStr(LASTNAME, params.last_name)
  if (params.address) url += mergeStr(ADDRESS, params.address)
  if (params.status) url += mergeStr(STATUS, params.status)
  if (params.start_date) url += mergeStr(START_DATE, params.start_date)
  if (params.end_date) url += mergeStr(END_DATE, params.end_date)
  if (params.membership_type) url += mergeStr(MEMBERSHIPTYPE, params.membership_type)
  if (params.general_body_meeting_date)
    url += mergeStr(GENERAL_BODY_MEETING_DATE, params.general_body_meeting_date)

  return url
}
