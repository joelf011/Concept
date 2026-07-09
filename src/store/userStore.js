import { create } from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  session: null,
  isLoading: true, // Começa como true ate confirmar o estado com o Supabase

  // Atualiza o estado quando o utilizador faz login ou a página carrega
  setUser: (user, session) => set({ user, session, isLoading: false }),

  // Limpa o estado quando o utilizador faz logout
  clearUser: () => set({ user: null, session: null, isLoading: false }),
  
  // Apenas para controlo de loading manual se necessário
  setLoading: (status) => set({ isLoading: status }),
}));