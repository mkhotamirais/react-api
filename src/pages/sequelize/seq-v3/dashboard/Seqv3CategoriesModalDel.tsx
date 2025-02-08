import { useState } from "react";
import { Seqv3Category } from "../typesSeqv3";
import { url, useSeqv3 } from "../useSeqv3";
import { toast } from "sonner";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";

interface Seqv3ModalDelProps {
  item: Seqv3Category;
  delId: string | null;
  setDelId: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function Seqv3CategoriesModalDel({ item, delId, setDelId }: Seqv3ModalDelProps) {
  const [loadDel, setLoadDel] = useState(false);

  const { getCategories } = useSeqv3();
  const onDelete = async () => {
    setLoadDel(true);
    axios
      .create({ withCredentials: true })
      .delete(`${url}/api-sequelize/v3/category/${item.id}`)
      .then((res) => {
        toast.success(res.data.message);
        getCategories();
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => {
        setLoadDel(false);
        setDelId(null);
      });
  };
  return (
    <div
      onClick={() => setDelId(null)}
      className={`${
        delId === item.id ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed inset-0 z-50 bg-white/50 transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          delId === item.id ? "translate-y-0" : "-translate-y-10"
        } max-w-sm mx-auto mt-24 rounded-lg bg-white transition-all border border-gray-200 p-4`}
      >
        <button
          type="button"
          title="close"
          onClick={() => setDelId(null)}
          className="absolute top-2 right-2 hover:text-red-500"
        >
          <FaXmark className="size-6" />
        </button>
        <div className="mb-2">
          <p>
            Delete <i className="text-red-500">{item.name}</i>
          </p>
          <p>Are you sure?</p>
        </div>
        <div className="flex gap-2">
          <button disabled={loadDel} type="button" className="btn !bg-red-500 hover:!bg-red-600" onClick={onDelete}>
            Delete
          </button>
          <button type="button" className="btn" onClick={() => setDelId(null)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
