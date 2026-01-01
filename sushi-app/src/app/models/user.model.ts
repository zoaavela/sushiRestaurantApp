export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at?: string;
  role?: 'user' | 'admin';
  status?: string;
  age?: number | null;
  ville?: string | null;
  code_postal?: string | null;
  derniere_connexion?: string;

  nb_commande?: number;
  depense_totale?: number;
}

export interface LoginResponse {
  message: string;
  token: string;
  user?: User;
}