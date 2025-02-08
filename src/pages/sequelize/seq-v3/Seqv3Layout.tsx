import React, { useEffect } from "react";
import DynamicHead from "../../../components/DynamicHead";
import Layout from "../../../components/Layout";
import { Link, Outlet } from "react-router";
import { toast, Toaster } from "sonner";
import { url, useSeqv3 } from "./useSeqv3";
import axios from "axios";
import { FaUser } from "react-icons/fa6";
import { seqV3Menu, seqV3MenuAdmin } from "./seqV3Menu";

export default function Seqv3Layout() {
  const { me, loadMe, getMe } = useSeqv3();
  useEffect(() => {
    getMe();
  }, [getMe]);

  const menus = me?.role === "admin" ? seqV3MenuAdmin : seqV3Menu;

  const onLogout = () => {
    axios
      .create({ withCredentials: true })
      .post(`${url}/api-sequelize/v3/signout`)
      .then((res) => {
        toast.success(res.data.message);
        window.location.href = "/sequelize-v3/login";
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.error || err.message);
      });
  };

  let userMenu = null;
  if (loadMe) userMenu = null;
  else
    userMenu = me ? (
      <div className="relative group">
        <button type="button" title="Profile" className="border border-gray-300 rounded-full p-2">
          <FaUser />
        </button>
        <div className="invisible opacity-0 scale-0 group-hover:visible group-hover:opacity-100 group-hover:scale-100 origin-top-right transition-all absolute right-0 pt-2">
          <div className="border border-gray-300 rounded-md p-2 bg-white z-50 flex flex-col gap-2">
            {menus.map((menu, i) => (
              <Link key={i} to={menu.href} className="btn">
                {menu.label}
              </Link>
            ))}
            <button onClick={onLogout} type="button" className="btn !bg-gray-500">
              Logout
            </button>
          </div>
        </div>
      </div>
    ) : (
      <div className="flex items-center gap-1">
        <Link to="/sequelize-v3/login" type="button" className="btn">
          login
        </Link>
        <Link to="/sequelize-v3/register" type="button" className="btn">
          register
        </Link>
      </div>
    );

  return (
    <Layout>
      <DynamicHead title="Sequelize v3 mkhotami" />
      <Toaster position="top-center" richColors />
      <div className="flex justify-between items-center">
        <Link to="/sequelize-v3">
          <h1 className="title">Sequelize v3</h1>
        </Link>
        {userMenu}
      </div>
      <main>
        <Outlet />
      </main>
    </Layout>
  );
}
