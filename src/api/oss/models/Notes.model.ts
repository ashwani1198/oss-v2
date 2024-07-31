import { z } from 'zod'

export const MemberNotesSchema = z.object({
  id: z.number(),
  member_id: z.number(),
  notes: z.string({ required_error: 'Note is required' }),
  is_archived: z.boolean().default(false),
  is_deleted: z.boolean().default(false),
  created_at: z.string().optional().nullable().default(null),
  updated_at: z.string().optional().nullable().default(null),
  deleted_at: z.string().optional().nullable().default(null),
  archived_at: z.string().optional().nullable().default(null)
})

export type MemberNotes = z.infer<typeof MemberNotesSchema>

export const MemberNotesCreationSchema = MemberNotesSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
  archived_at: true,
  is_archived: true,
  is_deleted: true,
  member_id: true
}).extend({
  notes: z.string({ required_error: 'Note is required' })
})

export type MemberNotesCreationData = z.infer<typeof MemberNotesCreationSchema>
