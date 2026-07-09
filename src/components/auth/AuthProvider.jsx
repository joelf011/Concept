'use client';

import { useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useUserStore } from '@/store/userStore';

export default function AuthProvider({ children }) {
  const { setUser, clearUser } = useUserStore();
  // Usamos o cliente de browser
  const supabase = createClient();

  useEffect(() => {
    // Verifica a sessão imediatamente quando o site abre
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setUser(session.user, session);
      } else {
        clearUser();
      }
    });

    // Fica à espera de mudanças (se o utilizador fizer logout)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user, session);
      } else {
        clearUser();
      }
    });

    return () => subscription.unsubscribe();
  }, [setUser, clearUser]);

  return <>{children}</>;
}