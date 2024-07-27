import { z } from 'zod'

const appEnvSchema = z.object({
  VITE_APP_ENV: z.enum(['dev', 'staging', 'uat', 'production']).default('dev'),
  VITE_AUTH_TOKEN: z
    .string()
    .optional()
    .nullable()
    .default('')
    .transform((val) => val || ''),
  VITE_OSS_API_URL: z
    .string()
    .optional()
    .nullable()
    .default('')
    .transform((val) => val || '')
})

const appEnv = appEnvSchema.parse(import.meta.env)

export default {
  ...appEnv
}
