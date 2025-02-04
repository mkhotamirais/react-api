export interface Mys2v1Products {
  id: string;
  name: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface Mys2v1State {
  data: Mys2v1Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
}
