import { neon } from '@neondatabase/serverless'

// Single shared SQL client for the Neon Postgres database. Used by the history
// API route to persist the rolling track timeline durably (survives serverless
// cold starts and is shared across all instances/listeners).
export const sql = neon(process.env.DATABASE_URL!)
