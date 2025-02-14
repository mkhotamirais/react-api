import { useEffect, useState } from "react";
import { url, useMoov3 } from "../useMoov3";
import axios from "axios";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";

export default function Moov3ProductsCreate() {
  const [formData, setFormData] = useState<{ name: string; price: string; tagIds: string[]; categoryId: string }>({
    name: "",
    price: "",
    tagIds: [],
    categoryId: "",
  });
  const { tags, getTags, categories, getCategories } = useMoov3();
  const [loadCreate, setLoadCreate] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    getTags();
    getCategories();
  }, [getTags, getCategories]);

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);
    setLoadCreate(true);
    axios
      .create({ withCredentials: true })
      .post(`${url}/api-mongoose/v3/product`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setFormData({ name: "", price: "", tagIds: [], categoryId: "" });
        navigate("/mongoose-v3/products");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoadCreate(false));
  };

  return (
    <div>
      <h2 className="title">Create Product</h2>
      <form onSubmit={onCreate} className="max-w-lg">
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            className="input"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price">Price</label>
          <input
            type="text"
            id="price"
            className="input"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category">Category</label>
          <Link to="/mongoose-v3/categories" className="link ml-3 text-sm">
            Add Category
          </Link>
          <select
            name="category"
            id="category"
            className="input"
            value={formData.categoryId}
            onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
          >
            <option value="">Select Category</option>
            {categories.map((item, i) => (
              <option key={i} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Tags</label>
          <Link to="/mongoose-v3/tags" className="link ml-3 text-sm">
            add tag
          </Link>
          <div className="flex gap-3 border py-1 px-2 rounded-md border-gray-300">
            {tags.map((item, i) => (
              <label key={i} className="flex gap-1">
                <input
                  type="checkbox"
                  value={item._id}
                  checked={formData.tagIds.includes(item._id.toString())}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      tagIds: e.target.checked
                        ? [...formData.tagIds, e.target.value]
                        : formData.tagIds.filter((id) => id !== e.target.value),
                    });
                  }}
                />
                {item.name}
              </label>
            ))}
          </div>
        </div>
        <button disabled={loadCreate} type="submit" className="btn">
          Add Product
        </button>
      </form>
    </div>
  );
}
