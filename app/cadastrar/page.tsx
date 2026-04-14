import { cadastrarUsuario } from '@/app/autenticacao/acoes';
import Link from 'next/link';

export default async function PaginaCadastrar({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const parametros = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-md border border-gray-100">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Criar Conta</h1>
          <p className="mt-2 text-gray-600">Cadastre-se para começar</p>
        </div>

        <form action={cadastrarUsuario} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="seu@email.com"
              />
            </div>
            <div>
              <label htmlFor="senha" id="senha-label" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                required
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          {parametros.erro && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-600">
              {parametros.erro}
            </div>
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Cadastrar
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Já tem uma conta? </span>
          <Link href="/entrar" className="font-medium text-blue-600 hover:text-blue-500">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
