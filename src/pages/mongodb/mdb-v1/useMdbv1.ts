import axios from "axios";
import { create } from "zustand";
import { Mdbv1State } from "./typesMdbv1";

const url = import.meta.env.DEV ? import.meta.env.VITE_API_MDB_DEV : import.meta.env.VITE_API_MDB_PROD;

const useMdbv1 = create<Mdbv1State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: () => {
    set({ loadData: true });
    axios
      .get(`${url}/v1/product`)
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

export { url, useMdbv1 };
