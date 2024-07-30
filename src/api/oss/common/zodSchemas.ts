import { z } from 'zod'

export const DateStringSchema = z
  .string()
  .regex(
    /^(\d{4}-\d{2}-\d{2}(?:\s\d{2}:\d{2}:\d{2}|T\d{2}:\d{2}:\d{2}\.\d{3}Z)?)$/,
    'Invalid date format. Expected yyyy-mm-dd, yyyy-mm-dd hh:mm:ss, or yyyy-mm-ddThh:mm:ss.sssZ.'
  )
  .optional()
  .nullable()
  .transform((str) => {
    if (!str || str === '') {
      return null
    }

    if (isNaN(new Date(str).getTime())) {
      return null
    }

    return str
  })

export const JsonObjectKeySchema = z
  .string()
  .regex(
    /^[a-z](?!.*_$)[a-z\d_]*[a-z\d]$/,
    'Key must start with a lowercase letter, only contain lowercase letters, underscores, and numbers, and cannot end with an underscore'
  )

export const NumberOrStringNumberSchema = z
  .union([
    z.string().optional().nullable().default(null),
    z.number().min(0).nullable().optional().default(0)
  ])
  .optional()
  .nullable()
  .default(null)
  .transform((value) => (typeof value !== 'number' ? undefined : value))
