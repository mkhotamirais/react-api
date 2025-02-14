import { useEffect, useState } from "react";
import { url, useMoov3 } from "../useMoov3";
import axios from "axios";
import { toast } from "sonner";
import Loading from "../../../../components/Loading";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Moov3TagsModalDel from "./Moov3TagsModalDel";
import Moov3TagsEdit from "./Moov3TagsEdit";

export default function Moov3Tags() {
  const { tags, getTags, loadTags } = useMoov3();
  const [name, setName] = useState("");
  const [loadCreate, setLoadCreate] = useState(false);
  const [delId, setDelId] = useState<string | null>(null);
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    getTags();
  }, [getTags]);

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoadCreate(true);
    axios
      .create({ withCredentials: true })
      .post(`${url}/api-mongoose/v3/tag`, { name })
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        getTags();
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => setLoadCreate(false));
  };

  let content = null;
  if (loadTags) content = <Loading />;
  else if (tags) {
    content = tags.map((tag, i) => (
      <div key={i} className="border border-gray-300 p-2 rounded-md mb-1">
        <div className="flex items-center justify-between">
          <div className="capitalize">{tag.name}</div>
          {editId === tag._id ? (
            <div className="flex gap-4">
              <button type="button" title="delete" className="btn !bg-gray-400" onClick={() => setEditId(null)}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="flex gap-3">
              <button type="button" title="update" onClick={() => setEditId(tag._id)}>
                <FaPenToSquare className="text-green-500" />
              </button>
              <button type="button" title="delete" onClick={() => setDelId(tag._id)}>
                <FaTrash className="text-red-500" />
              </button>
              <Moov3TagsModalDel item={tag} delId={delId} setDelId={setDelId} />
            </div>
          )}
        </div>
        {editId === tag._id && <Moov3TagsEdit item={tag} setEditId={setEditId} />}
      </div>
    ));
  }

  return (
    <>
      <h2 className="title">Tag</h2>
      {/* Create */}
      <div className="mb-4">
        <h3 className="font-semibold">Create Tag</h3>
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
        <h3 className="font-semibold">Tag List</h3>
        {content}
      </div>
    </>
  );
}
