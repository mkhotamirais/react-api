export interface Seqv1Products {
  id: string;
  name: string;
  price: string | number;
  createdAt: string;
  updatedAt: string;
}

export interface Seqv1State {
  data: Seqv1Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  // singleData: Seqv1Products | null;
  // loadSingleData: boolean;
  // errSingleData: string | null;
  // getDataById: (id: string) => void;
}
