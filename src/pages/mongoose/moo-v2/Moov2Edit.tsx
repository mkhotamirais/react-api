import { useRef, useState } from "react";
import { Moov2Product } from "./typesMoov2";
import axios from "axios";
import { url, useMoov2 } from "./useMoov2";
import { toast } from "sonner";

interface Moov2EditProps {
  item: Moov2Product;
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Moov2Edit({ item, setEditId }: Moov2EditProps) {
  const { getData } = useMoov2();
  const [formData, setFormData] = useState({ name: item.name, price: item.price });
  const [loadUpdate, setLoadUpdate] = useState(false);
  const [image, setImage] = useState<File | string>("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onRemovePreview = () => {
    setImage("");
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset input file
    }
  };

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadUpdate(true);

    const fData = new FormData();

    fData.append("name", formData.name);
    fData.append("price", formData.price as string);
    fData.append("image", image);

    axios
      .patch(`${url}/api-mongoose/v2/product/${item._id}`, fData)
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
      <div className="mb-3">
        <label htmlFor="image">Image</label>
        <input type="file" id="image" ref={fileInputRef} accept="image/*" className="input" onChange={onImageChange} />
      </div>
      {preview ? (
        <div className="my-2 border w-fit p-1 border-gray-300 rounded space-y-2">
          <img src={preview} width={200} alt="image preview" className="object-contain object-center size-36" />
          <button disabled={loadUpdate} type="button" onClick={() => onRemovePreview()} className="text-red-500">
            Remove
          </button>
        </div>
      ) : null}
      <button type="submit" disabled={loadUpdate} className="btn">
        Save
      </button>
    </form>
  );
}
