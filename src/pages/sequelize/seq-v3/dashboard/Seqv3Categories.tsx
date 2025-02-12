import { useEffect, useState } from "react";
import { url, useSeqv3 } from "../useSeqv3";
import axios from "axios";
import { toast } from "sonner";
import Loading from "../../../../components/Loading";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Seqv3CategoriesModalDel from "./Seqv3CategoriesModalDel";
import Seqv3CategoriesEdit from "./Seqv3CategoriesEdit";

export default function Seqv3Categories() {
  const { categories, getCategories, loadCategories } = useSeqv3();
  const [name, setName] = useState("");
  const [loadCreate, setLoadCreate] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadCreate(true);
    axios
      .create({ withCredentials: true })
      .post(`${url}/api-sequelize/v3/category`, { name })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        getCategories();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoadCreate(false));
  };

  let content = null;
  if (loadCategories) content = <Loading />;
  else if (categories) {
    content = categories.map((category, i) => (
      <div key={i} className="border border-gray-300 p-2 rounded-md mb-1">
        <div className="flex items-center justify-between">
          <div className="capitalize">{category.name}</div>
          {editId === category.id ? (
            <div className="flex gap-4">
              <button type="button" title="delete" className="btn !bg-gray-400" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button type="button" title="update" onClick={() => setEditId(category.id)}>
                <FaPenToSquare className="text-green-500" />
              </button>
              <button type="button" title="delete" onClick={() => setDelId(category.id)}>
                <FaTrash className="text-red-500" />
              </button>
              <Seqv3CategoriesModalDel item={category} delId={delId} setDelId={setDelId} />
            </div>
          )}
        </div>
        {editId === category.id && <Seqv3CategoriesEdit item={category} setEditId={setEditId} />}
      </div>
    ));
  }

  return (
    <>
      <h2 className="title">Category</h2>
      {/* Create */}
      <div className="mb-4">
        <h3 className="font-semibold">Create Category</h3>
        <form onSubmit={onCreate} className="border border-gray-300 p-3 rounded-lg">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              className="input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button disabled={loadCreate} type="submit" className="btn">
            Create
          </button>
        </form>
      </div>
      {/* List */}
      <div className="mb-4">
        <h3 className="font-semibold">Category List</h3>
        {content}
      </div>
    </>
  );
}
