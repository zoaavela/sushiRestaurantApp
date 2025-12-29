export interface Commande {
  id?: number;
  client: {
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    notes?: string;
  };
  items: Array<{
    boxId: number;
    quantite: number;
    prix: number;
    boxName: string;
  }>;
  total: number;
  date?: Date;
  statut: string;
  codePromo?: string;
}