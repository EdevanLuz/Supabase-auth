import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const atualizarSessao = async (requisicao: NextRequest) => {
  const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const chaveAnonimaSupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!urlSupabase || !chaveAnonimaSupabase) {
    // Se as variáveis estiverem faltando no middleware, retornamos a resposta normal
    // para evitar que o app quebre completamente, mas logamos o erro.
    console.error("Erro: Variáveis de ambiente do Supabase ausentes no middleware.");
    return NextResponse.next({
      request: {
        headers: requisicao.headers,
      },
    });
  }

  let respostaSupabase = NextResponse.next({
    request: {
      headers: requisicao.headers,
    },
  });

  const supabase = createServerClient(urlSupabase, chaveAnonimaSupabase, {
    cookies: {
      getAll() {
        return requisicao.cookies.getAll();
      },
      setAll(cookiesParaDefinir) {
        cookiesParaDefinir.forEach(({ name, value }) =>
          requisicao.cookies.set(name, value)
        );
        respostaSupabase = NextResponse.next({
          request: requisicao,
        });
        cookiesParaDefinir.forEach(({ name, value, options }) =>
          respostaSupabase.cookies.set(name, value, options)
        );
      },
    },
  });

  // Importante: Não remova o getUser() abaixo.
  // Ele é necessário para que o middleware atualize o token se necessário.
  await supabase.auth.getUser();

  return respostaSupabase;
};
