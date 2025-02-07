import axios from "axios";
import { Seqv3State } from "./typesSeqv3";
import { create } from "zustand";
const axiosCred = axios.create({ withCredentials: true });

const url = import.meta.env.DEV ? import.meta.env.VITE_API_SEQ_DEV : import.meta.env.VITE_API_SEQ_PROD;

const useSeqv3 = create<Seqv3State>((set) => ({
  tags: [],
  getTags: () => {
    axios
      .get(`${url}/api-sequelize/v3/tag`)
      .then((res) => {
        set({ tags: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  categories: [],
  getCategories: () => {
    axios
      .get(`${url}/api-sequelize/v3/category`)
      .then((res) => {
        set({ categories: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  me: null,
  getMe: () => {
    axiosCred
      .get(`${url}/api-sequelize/v3/me`)
      .then((res) => {
        console.log(res);
        set({ me: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
}));

export { url, useSeqv3 };
