import axios from "axios";
import { create } from "zustand";
import { Seqv2State } from "./typesSeqv2";

const url = import.meta.env.DEV ? import.meta.env.VITE_API_SEQ_DEV : import.meta.env.VITE_API_SEQ_PROD;

const useSeqv2 = create<Seqv2State>((set) => ({
  data: [],
  loadData: false,
  errData: null,
  getData: () => {
    set({ loadData: true });
    axios
      .get(`${url}/api-sequelize/v2/product`)
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

export { url, useSeqv2 };
