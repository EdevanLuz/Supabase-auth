import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const chaveAnonimaSupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const criarClienteServidor = async () => {
  const depositoCookies = await cookies();

  return createServerClient(urlSupabase, chaveAnonimaSupabase, {
    cookies: {
      getAll() {
        return depositoCookies.getAll();
      },
      setAll(cookiesParaDefinir) {
        try {
          cookiesParaDefinir.forEach(({ name, value, options }) =>
            depositoCookies.set(name, value, options)
          );
        } catch {
          // O método setAll foi chamado de um Server Component.
          // Isso pode ser ignorado se você tiver um middleware atualizando as sessões.
        }
      },
    },
  });
};
