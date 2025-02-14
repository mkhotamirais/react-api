import { Navigate, Outlet } from "react-router";
import { useMoov3 } from "./useMoov3";
import Loading from "../../../components/Loading";

export default function Moov3ProtectedAdmin() {
  const { me, loadMe } = useMoov3();

  if (loadMe) return <Loading />;
  if (!me || me === null) return <Navigate to="/sequelize-v3" replace />;

  if (me.role !== "admin") return <Navigate to="/sequelize-v3" replace />;

  return <Outlet />;
}
