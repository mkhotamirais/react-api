import { useState } from "react";
import { Mys2v1Products } from "./typesMys2v1";
import axios from "axios";
import { url, useMys2v1 } from "./useMys2v1";
import { toast } from "sonner";

interface Mys2v1EditProps {
  item: Mys2v1Products;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Mys2v1Edit({ item, setEditId }: Mys2v1EditProps) {
  const [formData, setFormData] = useState({ name: item.name, price: item.price });
  const [loadUpdate, setLoadUpdate] = useState(false);
  const { getData } = useMys2v1();

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadUpdate(true);
    axios
      .patch(`${url}/api-mysql2/v1/product/${item.id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
      })
      .then(() => getData())
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
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="input"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="price">Price</label>
        <input
          type="text"
          id="price"
          placeholder="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          className="input"
        />
      </div>
      <button type="submit" disabled={loadUpdate} className="btn">
        Save
      </button>
    </form>
  );
}
