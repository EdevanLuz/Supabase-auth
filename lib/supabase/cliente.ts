import { createBrowserClient } from "@supabase/ssr";

const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const chaveAnonimaSupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const criarClienteNavegador = () =>
  createBrowserClient(urlSupabase, chaveAnonimaSupabase);
