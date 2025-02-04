import axios from "axios";
import { create } from "zustand";
import { Seqv1State } from "./typesSeqv1";

const url = import.meta.env.DEV ? import.meta.env.VITE_API_SEQ_DEV : import.meta.env.VITE_API_SEQ_PROD;

const useSeqv1 = create<Seqv1State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: () => {
    set({ loadData: true });
    axios
      .get(`${url}/api-sequelize/v1/product`)
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

export { url, useSeqv1 };
