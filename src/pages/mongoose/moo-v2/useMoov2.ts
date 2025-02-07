import axios from "axios";
import { create } from "zustand";
import { Moov2State } from "./typesMoov2";

const url = import.meta.env.DEV ? import.meta.env.VITE_API_MOO_DEV : import.meta.env.VITE_API_MOO_PROD;

const useMoov2 = create<Moov2State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: () => {
    set({ loadData: true });
    axios
      .get(`${url}/api-mongoose/v2/product`)
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

export { url, useMoov2 };
