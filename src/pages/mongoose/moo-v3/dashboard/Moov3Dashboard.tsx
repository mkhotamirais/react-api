import { Link } from "react-router";
import { moov3MenuAdmin } from "../moov3Menu";
import { useMoov3 } from "../useMoov3";

export default function Moov3Dashboard() {
  const { me } = useMoov3();
  return (
    <>
      <h2 className="title">Welcome {me?.name}</h2>
      <div className="flex flex-col gap-2">
        {moov3MenuAdmin.map((menu, i) => (
          <Link key={i} to={menu.href} className="btn w-fit">
            {menu.label}
          </Link>
        ))}
      </div>
    </>
  );
}
