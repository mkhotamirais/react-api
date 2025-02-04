import { Link } from "react-router";
import DynamicHead from "../../../components/DynamicHead";
import Layout from "../../../components/Layout";

interface Mdbv2LayoutProps {
  children: React.ReactNode;
}

export default function Mdbv2Layout({ children }: Mdbv2LayoutProps) {
  return (
    <Layout>
      <DynamicHead />
      <div className="flex justify-between items-center">
        {/* TITLE */}
        <Link to="/mdb-v2">
          <h1 className="title">Mongodb V2</h1>
        </Link>

        {/* AUTH BTN */}
        <div className="flex gap-2">
          <Link to="/mdb-v2/login" className="btn">
            Login
          </Link>
          <Link to="/mdb-v2/register" className="btn">
            Register
          </Link>
        </div>
      </div>
      {/* CONTENT */}
      <main>{children}</main>
    </Layout>
  );
}
