import { Navigate, Outlet } from "react-router";
import { useSeqv3 } from "./useSeqv3";
import Loading from "../../../components/Loading";

export default function Seqv3ProtectedAdmin() {
  const { me, loadMe } = useSeqv3();

  if (loadMe) return <Loading />;
  if (!me || me === null) return <Navigate to="/sequelize-v3" replace />;

  if (me.role !== "admin") return <Navigate to="/sequelize-v3" replace />;

  return <Outlet />;
}
