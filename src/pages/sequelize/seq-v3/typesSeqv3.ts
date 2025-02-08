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
  role: "user" | "editor" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface Seqv3State {
  // Tags
  tags: Seqv3Tag[];
  loadTags: boolean;
  getTags: () => void;
  // Categories
  categories: Seqv3Category[];
  loadCategories: boolean;
  getCategories: () => void;
  // Me
  me: User | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
}
