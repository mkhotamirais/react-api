import { useState } from "react";
import { Moov3Tag } from "../typesMoov3";
import axios from "axios";
import { url, useMoov3 } from "../useMoov3";
import { toast } from "sonner";

interface Moov3CategoriesEditProps {
  item: Moov3Tag;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Moov3CategoriesEdit({ item, setEditId }: Moov3CategoriesEditProps) {
  const [name, setName] = useState(item.name);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const { getCategories } = useMoov3();

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadUpdate(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/api-mongoose/v3/category/${item._id}`, { name })
      .then((res) => {
        toast.success(res.data.message);
        getCategories();
      })
      .catch((err) => {
        toast.error(err.response.data.error || err.message);
      })
      .finally(() => {
        setLoadUpdate(false);
        setEditId(null);
      });
  };

  return (
    <div className="pt-3">
      <form onSubmit={onUpdate} className="border border-gray-200 rounded p-3">
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" disabled={loadUpdate} className="btn">
          Save
        </button>
      </form>
    </div>
  );
}
