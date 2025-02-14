import { useState } from "react";
import { url } from "../useMoov3";
import { toast } from "sonner";
import axios from "axios";
import { FaXmark } from "react-icons/fa6";

interface Moov3AccountModalDelProps {
  openDel: boolean;
  setOpenDel: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Moov3AccountModalDel({ openDel, setOpenDel }: Moov3AccountModalDelProps) {
  const [loadDel, setLoadDel] = useState(false);

  const onDelete = async () => {
    setLoadDel(true);
    axios
      .create({ withCredentials: true })
      .delete(`${url}/api-mongoose/v3/me`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/mongoose-v3";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => {
        setLoadDel(false);
        setOpenDel(false);
      });
  };

  return (
    <div
      onClick={() => setOpenDel(false)}
      className={`${
        openDel ? "opacity-100 visible" : "opacity-0 invisible"
      } fixed inset-0 z-50 bg-white/50 transition-all`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`${
          openDel ? "translate-y-0" : "-translate-y-10"
        } max-w-sm mx-auto mt-24 rounded-lg bg-white transition-all border border-gray-200 p-4`}
      >
        <button
          type="button"
          title="close"
          onClick={() => setOpenDel(false)}
          className="absolute top-2 right-2 hover:text-red-500"
        >
          <FaXmark className="size-6" />
        </button>
        <div className="mb-2">
          <p>Delete your account</p>
          <p>Are you sure?</p>
        </div>
        <div className="flex gap-2">
          <button disabled={loadDel} type="button" className="btn !bg-red-500 hover:!bg-red-600" onClick={onDelete}>
            Delete
          </button>
          <button type="button" className="btn" onClick={() => setOpenDel(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
