import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

const urlSupabase = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const chaveAnonimaSupabase = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const atualizarSessao = async (requisicao: NextRequest) => {
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
