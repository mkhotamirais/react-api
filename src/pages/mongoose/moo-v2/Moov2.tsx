import React, { useEffect, useRef, useState } from "react";
import DynamicHead from "../../../components/DynamicHead";
import Layout from "../../../components/Layout";
import { url, useMoov2 } from "./useMoov2";
import Loading from "../../../components/Loading";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Moov2Edit from "./Moov2Edit";
import Moov2ModalDel from "./Moov2ModalDel";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Link } from "react-router";

export default function Moov2() {
  const { data, getData, loadData, errData } = useMoov2();
  const [editId, setEditId] = useState<string | null>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [loadCreate, setLoadCreate] = useState(false);
  const [image, setImage] = useState<File | string>("");
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    getData();
  }, [getData]);

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

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadCreate(true);

    const fData = new FormData();

    fData.append("name", formData.name);
    fData.append("price", formData.price);
    fData.append("image", image);

    axios
      .post(`${url}/api-mongoose/v2/product`, fData)
      .then((res) => {
        toast.success(res.data.message);
        getData();
        setFormData({ name: "", price: "" });
        onRemovePreview();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.message);
        } else toast.error(err.message);
      })
      .finally(() => setLoadCreate(false));
  };

  return (
    <Layout>
      <DynamicHead />
      <Toaster position="top-right" richColors />
      {/* TITLE */}
      <Link to="/mdb-v1">
        <h1 className="title">Mongodb V1</h1>
      </Link>

      {/* CREATE */}
      <div className="mb-4">
        <h2 className="title">Create</h2>
        <form onSubmit={onCreate} className="border border-gray-200 rounded p-4">
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input"
              disabled={loadCreate}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              placeholder="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="input"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              ref={fileInputRef}
              accept="image/*"
              className="input"
              onChange={onImageChange}
            />
          </div>
          {preview ? (
            <div className="my-2 border w-fit p-1 border-gray-300 rounded space-y-2">
              <img src={preview} width={200} alt="image preview" className="object-contain object-center size-36" />
              <button disabled={loadCreate} type="button" onClick={() => onRemovePreview()} className="text-red-500">
                Remove
              </button>
            </div>
          ) : null}
          <button type="submit" className="btn" disabled={loadCreate}>
            Create
          </button>
        </form>
      </div>

      {/* LIST */}
      <div>
        <h2 className="title">List</h2>
        {errData && <p>{errData}</p>}
        {loadData && <Loading />}
        <div className="flex flex-col gap-1">
          {data
            .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
            .map((item) => (
              <React.Fragment key={item._id}>
                <div className="card">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <img src={item.image} alt="" className="w-32 rounded-lg" />
                      <p>
                        {item.name} - Rp{item.price}
                      </p>
                    </div>
                    {/* EDIT & DELETE BTN */}
                    {editId === item._id ? (
                      <div className="flex gap-4">
                        <button
                          type="button"
                          title="delete"
                          className="btn !bg-gray-400"
                          onClick={() => setEditId(null)}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-4">
                        <button type="button" title="edit" onClick={() => setEditId(item._id)}>
                          <FaPenToSquare className="text-green-500" />
                        </button>
                        <button type="button" title="delete" onClick={() => setDelId(item._id)}>
                          <FaTrash className="text-red-500" />
                        </button>
                        <Moov2ModalDel item={item} delId={delId} setDelId={setDelId} />
                      </div>
                    )}
                  </div>
                </div>
                {/* EDIT */}
                <div>{editId === item._id && <Moov2Edit item={item} setEditId={setEditId} />}</div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </Layout>
  );
}
