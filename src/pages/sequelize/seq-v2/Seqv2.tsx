import { toast, Toaster } from "sonner";
import DynamicHead from "../../../components/DynamicHead";
import Layout from "../../../components/Layout";
import { Link } from "react-router";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { url, useSeqv2 } from "./useSeqv2";
import Loading from "../../../components/Loading";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Seqv2ModalDel from "./Seqv2ModalDel";
import Seqv2Edit from "./Seqv2Edit";

export default function Seqv2() {
  const { data, getData, loadData, errData } = useSeqv2();
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
      .post(`${url}/api-sequelize/v2/product`, fData)
      .then((res) => {
        toast.success(res.data.message);
        getData();
        setFormData({ name: "", price: "" });
        onRemovePreview();
      })
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      })
      .finally(() => setLoadCreate(false));
  };

  return (
    <Layout>
      <DynamicHead title="Sequeize V2 Mkhotami" />
      <Toaster position="top-right" richColors />
      {/* TITLE */}
      <Link to="/sequelize-v2">
        <h1 className="title">Sequelize V2</h1>
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
              <React.Fragment key={item.id}>
                <div className="card">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <img src={item.imageUrl} alt={item.imageName} className="w-28 rounded" />
                      <p>
                        {item.name} - Rp{item.price}
                      </p>
                    </div>
                    {/* EDIT & DELETE BTN */}
                    {editId === item.id ? (
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
                        <button type="button" title="edit" onClick={() => setEditId(item.id)}>
                          <FaPenToSquare className="text-green-500" />
                        </button>
                        <button type="button" title="delete" onClick={() => setDelId(item.id)}>
                          <FaTrash className="text-red-500" />
                        </button>
                        <Seqv2ModalDel item={item} delId={delId} setDelId={setDelId} />
                      </div>
                    )}
                  </div>
                </div>
                {/* EDIT */}
                <div>{editId === item.id && <Seqv2Edit item={item} setEditId={setEditId} />}</div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </Layout>
  );
}
