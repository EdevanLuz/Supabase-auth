import { createBrowserClient } from "@supabase/ssr";

export const criarClienteNavegador = () => {
  const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const chaveAnonimaSupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!urlSupabase || !chaveAnonimaSupabase) {
    throw new Error("As variáveis de ambiente do Supabase não foram configuradas corretamente.");
  }

  return createBrowserClient(urlSupabase, chaveAnonimaSupabase);
};
