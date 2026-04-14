import { criarClienteServidor } from '@/lib/supabase/servidor';
import { sairDaSessao } from '@/app/autenticacao/acoes';
import { redirect } from 'next/navigation';

export default async function PaginaPainel() {
  const supabase = await criarClienteServidor();

  const {
    data: { user: usuario },
  } = await supabase.auth.getUser();

  if (!usuario) {
    return redirect('/entrar');
  }

  const possuiSessao = !!usuario;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="rounded-xl bg-white p-8 shadow-md border border-gray-100">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Painel de Teste</h1>
            <form action={sairDaSessao}>
              <button
                type="submit"
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Sair
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">E-mail do Usuário</p>
              <p className="text-lg text-gray-900">{usuario.email}</p>
            </div>
            <div className="border-b pb-4">
              <p className="text-sm font-medium text-gray-500">ID do Usuário</p>
              <p className="font-mono text-sm text-gray-900">{usuario.id}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Sessão Ativa</p>
              <div className="mt-1 flex items-center gap-2">
                <span className={`h-3 w-3 rounded-full ${possuiSessao ? 'bg-green-500' : 'bg-red-500'}`}></span>
                <p className="text-gray-900">{possuiSessao ? 'Sim' : 'Não'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700 border border-blue-100">
          <p>
            <strong>Nota:</strong> Este painel valida que a autenticação com Supabase está funcionando corretamente. 
            O próximo passo será integrar este token com seu backend Django.
          </p>
        </div>
      </div>
    </div>
  );
}
