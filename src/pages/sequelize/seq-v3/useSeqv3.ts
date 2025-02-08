import axios from "axios";
import { Seqv3State } from "./typesSeqv3";
import { create } from "zustand";
const axiosCred = axios.create({ withCredentials: true });

const url = import.meta.env.DEV ? import.meta.env.VITE_API_SEQ_DEV : import.meta.env.VITE_API_SEQ_PROD;

const useSeqv3 = create<Seqv3State>((set) => ({
  // Tags
  tags: [],
  loadTags: false,
  getTags: () => {
    set({ loadTags: true });
    axios
      .get(`${url}/api-sequelize/v3/tag`)
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
      .get(`${url}/api-sequelize/v3/category`)
      .then((res) => {
        set({ categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => set({ loadCategories: false }));
  },
  // Me
  me: null,
  loadMe: true,
  errMe: null,
  getMe: () => {
    set({ loadMe: true });
    axiosCred
      .get(`${url}/api-sequelize/v3/me`)
      .then((res) => {
        set({ me: res.data?.user });
      })
      .catch(() => {
        set({ me: null, errMe: "You are not logged in..." });
        return null;
      })
      .finally(() => set({ loadMe: false }));
  },
}));

export { url, useSeqv3 };
