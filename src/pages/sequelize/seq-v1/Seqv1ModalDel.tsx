import { useState } from "react";
import { Seqv1Products } from "./typesSeqv1";
import { url, useSeqv1 } from "./useSeqv1";
import { toast } from "sonner";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";

interface Seqv1ModalDelProps {
  item: Seqv1Products;
  delId: string | null;
  setDelId: React.Dispatch<React.SetStateAction<string | null>>;
}
export default function Seqv1ModalDel({ item, delId, setDelId }: Seqv1ModalDelProps) {
  const [loadDel, setLoadDel] = useState(false);

  const { getData } = useSeqv1();
  const onDelete = async () => {
    setLoadDel(true);
    axios
      .delete(`${url}/api-sequelize/v1/product/${item.id}`)
      .then((res) => {
        toast.success(res.data.message);
      })
      .then(() => getData())
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
