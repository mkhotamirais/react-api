import React, { useEffect } from "react";
import DynamicHead from "../../../components/DynamicHead";
import Layout from "../../../components/Layout";
import { Link } from "react-router";
import { toast, Toaster } from "sonner";
import { url, useSeqv3 } from "./useSeqv3";
import axios from "axios";

export default function Seqv3Layout({ children }: { children: React.ReactNode }) {
  const { me, getMe } = useSeqv3();
  useEffect(() => {
    getMe();
  }, [getMe]);

  console.log(me);

  const onLogout = async () => {
    await axios
      .create({ withCredentials: true })
      .patch(`${url}/api-sequelize/v3/signout`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/sequelize-v3/login";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error || err.message);
      });
  };
  return (
    <Layout>
      <DynamicHead title="Sequelize v3 mkhotami" />
      <Toaster position="top-center" richColors />
      <div className="flex justify-between items-center">
        <Link to="/sequelize-v3">
          <h1 className="title">Sequelize v3</h1>
        </Link>
        <div className="flex items-center gap-1">
          <Link to="/sequelize-v3/login" type="button" className="btn">
            login
          </Link>
          <Link to="/sequelize-v3/register" type="button" className="btn">
            register
          </Link>
          <button onClick={onLogout} type="button" className="btn">
            Logout
          </button>
        </div>
      </div>
      <main>{children}</main>
    </Layout>
  );
}
