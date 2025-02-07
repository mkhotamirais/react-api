import axios from "axios";
import { create } from "zustand";
import { Moov1State } from "./typesMoov1";

const url = import.meta.env.DEV ? import.meta.env.VITE_API_MOO_DEV : import.meta.env.VITE_API_MOO_PROD;

const useMoov1 = create<Moov1State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: () => {
    set({ loadData: true });
    axios
      .get(`${url}/api-mongoose/v1/product`)
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

export { url, useMoov1 };
