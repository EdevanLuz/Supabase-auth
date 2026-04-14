import { type NextRequest } from 'next/server';
import { atualizarSessao } from '@/lib/supabase/middleware';

export async function middleware(requisicao: NextRequest) {
  return await atualizarSessao(requisicao);
}

export const config = {
  matcher: [
    /*
     * Corresponde a todos os caminhos de solicitação, exceto os que começam com:
     * - _next/static (arquivos estáticos)
     * - _next/image (arquivos de otimização de imagem)
     * - favicon.ico (arquivo favicon)
     * Sinta-se à vontade para modificar este padrão para incluir mais caminhos.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
