import { NextResponse } from 'next/server';
import { criarClienteServidor } from '@/lib/supabase/servidor';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // Se "next" estiver presente, use-o como a URL de redirecionamento após o login bem-sucedido
  const next = searchParams.get('next') ?? '/painel';

  if (code) {
    const supabase = await criarClienteServidor();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // Retornar o usuário para uma página de erro com algumas instruções
  return NextResponse.redirect(`${origin}/entrar?erro=Falha na autenticação social`);
}
