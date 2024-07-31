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
  last_document_sigining_date: DateStringSchema.optional().default(null),
  renewal_date: DateStringSchema.optional().default(null),
  previous_renewal_date: DateStringSchema.optional().default(null),
  membership_type: MembershipTypeSchema.default('lifetime'),
  status: MemberStatusSchema.default('active'),
  is_archived: z.boolean().default(false),
  is_deleted: z.boolean().default(false),
  created_at: z.string().optional().nullable().default(null),
  updated_at: z.string().optional().nullable().default(null),
  deleted_at: z.string().optional().nullable().default(null)
})

export type Member = z.infer<typeof MemberSchema>

export const MemberCreationSchema = MemberSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  parent_id: true,
  deleted_at: true,
  application_id: true,
  is_archived: true,
  is_deleted: true,
  ref_id: true,
  address_line_2: true,
  renewal_date: true,
  previous_renewal_date: true,
  status: true
}).extend({
  first_name: z.string({
    required_error: 'First name is required'
  }),
  middle_name: z.string().optional().nullable().default(null),
  last_name: z.string({
    required_error: 'Last name is required'
  }),
  primary_phone: z.string({
    required_error: 'Primary phone is required'
  }),
  secondary_phone: z.string().optional().nullable().default(null),
  email: z.string().email().optional().nullable().default(null),
  address_line_1: z.string({
    required_error: 'Address Field is required'
  }),
  city: z.string({
    required_error: 'City is required'
  }),
  province: z.string({
    required_error: 'Province is required'
  }),
  country: z.string({
    required_error: 'Country is required'
  }),
  postal_code: z.string({
    required_error: 'Postal code is required'
  }),
  membership_type: MembershipTypeSchema.default('lifetime'),
  last_document_sigining_date: DateStringSchema.optional().default(
    new Date().toISOString().split('T')[0]
  ),
  status: MemberStatusSchema.default('active')
})

export type MemberCreationData = z.infer<typeof MemberCreationSchema>

export const LastDocumentSigningDateSchema = z.object({
  last_document_sigining_date: DateStringSchema.optional().default(null)
})
