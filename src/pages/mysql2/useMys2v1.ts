import axios from "axios";
import { create } from "zustand";
import { Mys2v1State } from "./typesMys2v1";

const url = import.meta.env.DEV ? import.meta.env.VITE_API_MYS2_DEV : import.meta.env.VITE_API_MYS2_PROD;

const useMys2v1 = create<Mys2v1State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: () => {
    set({ loadData: true });
    axios
      .get(`${url}/api-mysql2/v1/product`)
      .then((res) => {
        set({ data: res.data, loadData: false });
      })
      .catch((err) => {
        set({ errData: err.message, loadData: false });
      })
      .finally(() => {
        set({ loadData: false });
      });
  },
}));

export { url, useMys2v1 };
