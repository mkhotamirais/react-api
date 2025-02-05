export interface Seqv2Products {
  id: string;
  name: string;
  price: string | number;
  imageName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Seqv2State {
  data: Seqv2Products[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
  // singleData: Seqv2Products | null;
  // loadSingleData: boolean;
  // errSingleData: string | null;
  // getDataById: (id: string) => void;
}
