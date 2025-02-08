import { useEffect, useState } from "react";
import { url, useSeqv3 } from "../useSeqv3";
import axios from "axios";
import Seqv3ModalDel from "./Seqv3ModalDel";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export default function Seqv3Account() {
  const { me } = useSeqv3();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confPassword: "" });
  const [changePass, setChangePass] = useState(false);
  const [pending, setPending] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (me) {
      setFormData({ name: me.name, email: me.email, password: "", confPassword: "" });
    }
  }, [me, navigate]);

  const onUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    axios
      .create({ withCredentials: true })
      .patch(`${url}/api-sequelize/v3/me`, formData)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setPending(false);
      });
  };

  return (
    <div>
      <h2 className="title">Detail {me?.name}</h2>
      <div className="text-sm text-gray-600">
        <div>ID: {me?.id}</div>
        <div>Created Time: {me?.createdAt}</div>
        <div>Updated TIme: {me?.updatedAt}</div>
      </div>

      <form onSubmit={onUpdate} className="mt-3 max-w-lg">
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData?.name}
            className="input"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className="input"
            value={formData?.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>
        <button type="button" className="btn !bg-gray-500 block mb-3" onClick={() => setChangePass(!changePass)}>
          {changePass ? "Cancel" : "Change"} Password
        </button>
        <br />
        {changePass && (
          <div>
            <div className="mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confPassword">Confirm Password</label>
              <input
                type="password"
                name="confPassword"
                id="confPassword"
                className="input"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between items-center mt-3">
          <button disabled={pending} type="submit" className="btn">
            Save
          </button>
          <button type="button" className="text-red-500 text-sm hover:underline" onClick={() => setOpenDel(true)}>
            Delete My Account
          </button>
          <Seqv3ModalDel openDel={openDel} setOpenDel={setOpenDel} />
        </div>
      </form>
    </div>
  );
}
