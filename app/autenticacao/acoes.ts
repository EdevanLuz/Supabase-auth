'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { criarClienteServidor } from '@/lib/supabase/servidor';

export async function entrarComEmailESenha(dadosFormulario: FormData) {
  const supabase = await criarClienteServidor();

  const email = dadosFormulario.get('email') as string;
  const senha = dadosFormulario.get('senha') as string;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    return redirect('/entrar?erro=' + encodeURIComponent(error.message));
  }

  revalidatePath('/', 'layout');
  redirect('/painel');
}

export async function cadastrarUsuario(dadosFormulario: FormData) {
  const supabase = await criarClienteServidor();

  const email = dadosFormulario.get('email') as string;
  const senha = dadosFormulario.get('senha') as string;

  const { error } = await supabase.auth.signUp({
    email,
    password: senha,
  });

  if (error) {
    return redirect('/cadastrar?erro=' + encodeURIComponent(error.message));
  }

  revalidatePath('/', 'layout');
  redirect('/painel');
}

export async function sairDaSessao() {
  const supabase = await criarClienteServidor();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error('Erro ao sair:', error);
  }

  revalidatePath('/', 'layout');
  redirect('/entrar');
}
