export interface Moov2Product {
  _id: string;
  name: string;
  price: string | number;
  image: string;
  cloudinary_id?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Moov2State {
  data: Moov2Product[];
  loadData: boolean;
  errData: string | null;
  getData: () => void;
}
