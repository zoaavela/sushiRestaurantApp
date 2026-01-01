export interface Food {
  name: string;
  quantity: number;
}

export interface Box {
  id: number;
  name: string;
  description?: string;
  pieces: number;
  price: number;
  image: string;
  available: boolean;
  foods: Food[];
  flavors: string[];
}