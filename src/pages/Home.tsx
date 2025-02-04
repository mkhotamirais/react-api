import { Link } from "react-router";
import DynamicHead from "../components/DynamicHead";
import Layout from "../components/Layout";
import { menu } from "../menu";

export default function Home() {
  return (
    <Layout>
      <DynamicHead />
      <h1 className="title">ReactApi</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 lg:gap-2">
        {menu.map((item) => (
          <div className="border border-gray-300 rounded p-2">
            <h2 className="title">{item.title}</h2>
            <div className="flex flex-col gap-1">
              {item.links.map((itm, idx) => (
                <Link key={idx} to={itm.href} className="btn">
                  {itm.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
