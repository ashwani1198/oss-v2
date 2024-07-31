import { z } from 'zod'

export const MemberReceiptsSchema = z.object({
  id: z.number(),
  member_id: z.number(),
  receipt_number: z.string({ required_error: 'Receipt number is required' }),
  is_archived: z.boolean().default(false),
  is_deleted: z.boolean().default(false),
  created_at: z.string().optional().nullable().default(null),
  updated_at: z.string().optional().nullable().default(null),
  deleted_at: z.string().optional().nullable().default(null),
  archived_at: z.string().optional().nullable().default(null)
})

export type MemberReceipts = z.infer<typeof MemberReceiptsSchema>

export const MemberReceiptsCreationSchema = MemberReceiptsSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  archived_at: true,
  is_archived: true,
  is_deleted: true,
  member_id: true
}).extend({
  receipt_number: z.string({ required_error: 'Receipt number is required' })
})

export type MemberReceiptsCreationData = z.infer<typeof MemberReceiptsCreationSchema>
