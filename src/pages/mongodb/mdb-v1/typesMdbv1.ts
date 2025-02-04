export interface Mdbv1Products {
  _id: string;
  name: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface Mdbv1State {
  data: Mdbv1Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  // singleData: Mdbv1Products | null;
  // loadSingleData: boolean;
  // errSingleData: string | null;
  // getDataById: (id: string) => void;
}
