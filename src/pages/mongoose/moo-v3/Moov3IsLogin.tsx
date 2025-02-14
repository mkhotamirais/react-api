import { Navigate, Outlet } from "react-router";
import { useMoov3 } from "./useMoov3";
import Loading from "../../../components/Loading";

export default function Moov3IsLogin() {
  const { me, loadMe } = useMoov3();

  let content = null;
  if (loadMe) return <Loading />;
  else content = me ? <Navigate to="/sequelize-v3" replace /> : <Outlet />;

  return content;
}
