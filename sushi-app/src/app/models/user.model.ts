export interface User {
  id?: number;
  firstname: string;
  lastname: string;
  email: string;
  created_at?: string;
  role?: 'user' | 'admin';
  status?: string;
  
  // Champs de profil modifiables (doivent persister)
  age?: number | null;
  ville?: string | null;
  code_postal?: string | null;
  derniere_connexion?: string;

  // NOUVEAU: Statistiques (lus seulement, mis à jour par les commandes)
  nb_commande?: number;
  depense_totale?: number;
}

export interface LoginResponse {
  message: string;
  token: string;
  user?: User;
}