import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Lazy-initialized to avoid build-time throw when env vars aren't present.
// Call getSupabase() inside route handlers, never at module level.
let _client: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_client) {
    _client = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
  }
  return _client;
}
