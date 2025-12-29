export interface Food {
  name: string;
  quantity: number;
}

export interface Box {
  id: number;
  name: string;
  description?: string; // Rendre optionnel car pas dans votre JSON
  pieces: number; // Ajouter ce champ qui existe dans votre JSON
  price: number;
  image: string;
  available: boolean; // On va le définir toujours à true
  foods: Food[];
  flavors: string[];
}