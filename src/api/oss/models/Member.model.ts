import { z } from 'zod'
import { DateStringSchema } from '../common/zodSchemas'

export const MembershipTypeSchema = z.enum(['annual', 'lifetime'])
export type MembershipType = z.infer<typeof MembershipTypeSchema>

export const MemberStatusSchema = z.enum(['active', 'inactive'])
export type MemberStatus = z.infer<typeof MemberStatusSchema>

export const MemberSchema = z.object({
  id: z.number(),
  parent_id: z.number().nullable(),
  application_id: z.number(),
  ref_id: z.string(),
  first_name: z.string().optional().nullable().default(null),
  middle_name: z.string().optional().nullable().default(null),
  last_name: z.string().optional().nullable().default(null),
  primary_phone: z.string().optional().nullable().default(null),
  secondary_phone: z.string().optional().nullable().default(null),
  email: z.string().optional().nullable().default(null),
  address_line_1: z.string().optional().nullable().default(null),
  address_line_2: z.string().optional().nullable().default(null),
  city: z.string().optional().nullable().default(null),
  province: z.string().optional().nullable().default(null),
  country: z.string().optional().nullable().default(null),
  postal_code: z.string().optional().nullable().default(null),
  last_document_sigining_date:DateStringSchema.optional().default(null),
  renewal_date: DateStringSchema.optional().default(null),
  previous_renewal_date:DateStringSchema.optional().default(null),
  membership_type: MembershipTypeSchema.default('lifetime'),
  status: MemberStatusSchema.default('active'),
  is_archived: z.boolean().default(false),
  is_deleted: z.boolean().default(false),
  created_at: z.string().optional().nullable().default(null),
  updated_at: z.string().optional().nullable().default(null),
  deleted_at: z.string().optional().nullable().default(null)
})

export type Member = z.infer<typeof MemberSchema>
