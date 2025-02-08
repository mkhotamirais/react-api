import { useState } from "react";
import { Seqv3Category } from "../typesSeqv3";
import axios from "axios";
import { url, useSeqv3 } from "../useSeqv3";
import { toast } from "sonner";

interface Seqv3CategoriesEditProps {
  item: Seqv3Category;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Seqv3CategoriesEdit({ item, setEditId }: Seqv3CategoriesEditProps) {
  const [name, setName] = useState(item.name);
  const [loadUpdate, setLoadUpdate] = useState(false);
  const { getCategories } = useSeqv3();

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadUpdate(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/api-sequelize/v3/category/${item.id}`, { name })
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
    <form onSubmit={onUpdate} className="border border-gray-200 rounded p-4">
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
  );
}
