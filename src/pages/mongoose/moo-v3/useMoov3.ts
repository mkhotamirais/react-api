import axios from "axios";
import { Moov3State } from "./typesMoov3";
import { create } from "zustand";
const axiosCred = axios.create({ withCredentials: true });

const url = import.meta.env.DEV ? import.meta.env.VITE_API_MOO_DEV : import.meta.env.VITE_API_MOO_PROD;

const useMoov3 = create<Moov3State>((set) => ({
  // Me
  me: null,
  loadMe: true,
  errMe: null,
  getMe: () => {
    set({ loadMe: true });
    axiosCred
      .get(`${url}/api-mongoose/v3/me`)
      .then((res) => {
        set({ me: res.data?.user });
      })
      .catch(() => {
        set({ me: null, errMe: "You are not logged in..." });
        return null;
      })
      .finally(() => set({ loadMe: false }));
  },
  // Tags
  tags: [],
  loadTags: false,
  getTags: () => {
    set({ loadTags: true });
    axios
      .get(`${url}/api-mongoose/v3/tag`)
      .then((res) => {
        set({ tags: res.data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => set({ loadTags: false }));
  },
  // Categories
  categories: [],
  loadCategories: false,
  getCategories: () => {
    set({ loadCategories: true });
    axios
      .get(`${url}/api-mongoose/v3/category`)
      .then((res) => {
        set({ categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => set({ loadCategories: false }));
  },
  // Products
  products: [],
  loadProducts: false,
  getProducts: (params = "") => {
    set({ loadProducts: true });
    axios
      .get(`${url}/api-mongoose/v3/product?${params}`)
      .then((res) => {
        set({ products: res.data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => set({ loadProducts: false }));
  },
}));

export { url, useMoov3 };
