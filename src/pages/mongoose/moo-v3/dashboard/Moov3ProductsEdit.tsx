import { useEffect, useState } from "react";
import { url, useMoov3 } from "../useMoov3";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import Loading from "../../../../components/Loading";

export default function Moov3ProductsEdit() {
  const { id } = useParams();

  const [formData, setFormData] = useState<{ name: string; price: string; tagIds: string[]; categoryId: string }>({
    name: "",
    price: "",
    tagIds: [],
    categoryId: "",
  });
  const { tags, getTags, categories, getCategories } = useMoov3();
  const [loadEdit, setLoadEdit] = useState(false);
  const [loadDataId, setLoadDataId] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${url}/api-sequelize/v3/product/${id}`)
      .then((res) => {
        console.log(res.data.v3Tags.map((item: { id: string }) => item.id));
        setFormData({
          name: res.data.name,
          price: res.data.price,
          tagIds: res.data.v3Tags.map((item: { id: string }) => item.id.toString()),
          categoryId: res.data.categoryId,
        });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadDataId(false);
      });
  }, [id]);

  useEffect(() => {
    getTags();
    getCategories();
  }, [getTags, getCategories]);

  const onEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadEdit(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/api-sequelize/v3/product/${id}`, formData)
      .then((res) => {
        toast.success(res.data.message);
        setFormData({ name: "", price: "", tagIds: [], categoryId: "" });
        navigate("/sequelize-v3/products");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
      .finally(() => setLoadEdit(false));
  };

  let formContent = null;
  if (loadDataId) formContent = <Loading />;
  else
    formContent = (
      <form onSubmit={onEdit} className="max-w-lg">
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
          <Link to="/sequelize-v3/categories" className="link ml-3 text-sm">
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
          <Link to="/sequelize-v3/tags" className="link ml-3 text-sm">
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
        <button disabled={loadEdit} type="submit" className="btn">
          Save
        </button>
      </form>
    );

  return (
    <div>
      <h2 className="title">Edit Product</h2>
      {formContent}
    </div>
  );
}
