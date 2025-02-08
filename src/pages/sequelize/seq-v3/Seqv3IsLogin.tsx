import { Navigate, Outlet } from "react-router";
import { useSeqv3 } from "./useSeqv3";
import Loading from "../../../components/Loading";

export default function Seqv3IsLogin() {
  const { me, loadMe } = useSeqv3();

  let content = null;
  if (loadMe) return <Loading />;
  else content = me ? <Navigate to="/sequelize-v3" replace /> : <Outlet />;

  return content;
}
