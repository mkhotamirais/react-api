export interface Seqv3Tag {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Seqv3Category {
  id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Seqv3Product {
  id: string;
  name: string;
  price: string | number;
  tagIds: string[];
  categoryId: string;
  v3Category: Seqv3Category;
  v3Tags: Seqv3Tag[];
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

export interface Seqv3State {
  // Me
  me: User | null;
  loadMe: boolean;
  errMe: string | null;
  getMe: () => void;
  // Tags
  tags: Seqv3Tag[];
  loadTags: boolean;
  getTags: () => void;
  // Categories
  categories: Seqv3Category[];
  loadCategories: boolean;
  getCategories: () => void;
  // Products
  products: Seqv3Product[];
  loadProducts: boolean;
  getProducts: (params?: string) => void;
}
