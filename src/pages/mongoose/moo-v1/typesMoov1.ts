export interface Moov1Product {
  _id: string;
  name: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface Moov1State {
  data: Moov1Product[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
}
