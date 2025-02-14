export interface Moov3Tag {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Moov3Category {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Moov3Product {
  id: string;
  name: string;
  price: string | number;
  tagIds: string[];
  categoryId: string;
  v3Category: Moov3Category;
  v3Tags: Moov3Tag[];
  createdAt?: string;
  updatedAt?: string;
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

export interface Moov3State {
  // Me
  me: User | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
  // Tags
  tags: Moov3Tag[];
  loadTags: boolean;
  getTags: () => void;
  // Categories
  categories: Moov3Category[];
  loadCategories: boolean;
  getCategories: () => void;
  // Products
  products: Moov3Product[];
  loadProducts: boolean;
  getProducts: (params?: string) => void;
}
