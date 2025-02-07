export interface Seqv3Tag {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Seqv3Category {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Seqv3Product {
  id: string;
  name: string;
  price: string | number;
  imageName: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  createdAt: string;
  updatedAt: string;
}

export interface Seqv3State {
  tags: Seqv3Tag[];
  getTags: () => void;
  categories: Seqv3Category[];
  getCategories: () => void;
  me: User | null;
  getMe: () => void;
  //   data: Seqv3Product[];
  //   loadData: boolean;
  //   errData: string | null;
  //   getData: () => void;
  // singleData: Seqv3Products | null;
  // loadSingleData: boolean;
  // errSingleData: string | null;
  // getDataById: (id: string) => void;
}
