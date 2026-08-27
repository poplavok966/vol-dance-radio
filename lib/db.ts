import { neon, type NeonQueryFunction } from '@neondatabase/serverless'

// Single shared SQL client for the Neon Postgres database. Used by the history
// API route to persist the rolling track timeline durably (survives serverless
// cold starts and is shared across all instances/listeners).
//
// IMPORTANT: neon() must NOT run at module load time. During `pnpm run build`
// the DATABASE_URL may be absent, and calling neon() eagerly would throw
// ("No database connection string was provided to neon()") and fail the build.
// We therefore initialize it lazily on first use and expose `hasDatabase` so
// callers can fall back to in-memory storage when no connection string exists.

const connectionString = process.env.DATABASE_URL

export const hasDatabase = Boolean(connectionString)

let _sql: NeonQueryFunction<false, false> | null = null

// Returns the shared Neon client, or null when DATABASE_URL is not configured.
export function getSql(): NeonQueryFunction<false, false> | null {
  if (!connectionString) return null
  if (!_sql) _sql = neon(connectionString)
  return _sql
}
