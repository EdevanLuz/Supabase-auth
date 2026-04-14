import { criarClienteServidor } from '@/lib/supabase/servidor';
import { redirect } from 'next/navigation';

export default async function PaginaInicial() {
  const supabase = await criarClienteServidor();

  const {
    data: { user: usuario },
  } = await supabase.auth.getUser();

  if (!usuario) {
    return redirect('/entrar');
  }

  return redirect('/painel');
}
