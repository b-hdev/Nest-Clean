import { z } from 'zod';

export const envSchema = z.object({
  JWT_PRIVATE_KEY: z.string(),
  JWT_PUBLIC_KEY: z.string(),
  DATABASE_URL: z.string().url(),
  PORT: z.coerce.number().optional().default(3333),
  CLOUDFLARE_ACCOUNT_ID: z.string(),
  AWS_BUCKET_NAME: z.string(),
  AWS_ACCESS_KEY_ID: z.string(),
  AWS_SECRET_ACCESS_KEY: z.string(),
  NODE_ENV: z.string().optional().default('development'),
});

export type Env = z.infer<typeof envSchema>;
