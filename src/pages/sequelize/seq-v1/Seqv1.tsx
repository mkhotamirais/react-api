import React, { useEffect, useState } from "react";
import DynamicHead from "../../../components/DynamicHead";
import Layout from "../../../components/Layout";
import { url, useSeqv1 } from "./useSeqv1";
import Loading from "../../../components/Loading";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { Link } from "react-router";
import Seqv1Edit from "./Seqv1Edit";
import Seqv1ModalDel from "./Seqv1ModalDel";

export default function Seqv1() {
  const { data, getData, loadData, errData } = useSeqv1();
  const [editId, setEditId] = useState<string | null>(null);
  const [delId, setDelId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", price: "" });
  const [loadCreate, setLoadCreate] = useState(false);

  useEffect(() => {
    getData();
  }, [getData]);

  const onCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoadCreate(true);
    axios
      .post(`${url}/api-sequelize/v1/product`, formData)
      .then((res) => {
        toast.success(res.data.message);
      })
      .then(() => getData())
      .catch((err) => {
        if (err.response) {
          toast.error(err.response.data.error);
        } else toast.error(err.message);
      })
      .finally(() => setLoadCreate(false));
  };

  return (
    <Layout>
      <DynamicHead title="Sequelize V1 Mkhotami" />
      <Toaster position="top-right" richColors />
      {/* TITLE */}
      <Link to="/mdb-v1">
        <h1 className="title">Sequelize V1</h1>
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
                      <p>{item.name}</p>
                      <p>Rp{item.price}</p>
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
                        <Seqv1ModalDel item={item} delId={delId} setDelId={setDelId} />
                      </div>
                    )}
                  </div>
                </div>
                {/* EDIT */}
                <div>{editId === item.id && <Seqv1Edit item={item} setEditId={setEditId} />}</div>
              </React.Fragment>
            ))}
        </div>
      </div>
    </Layout>
  );
}
