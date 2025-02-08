import { Link } from "react-router";
import { seqV3MenuAdmin } from "../seqV3Menu";
import { useSeqv3 } from "../useSeqv3";

export default function Seqv3Dashboard() {
  const { me } = useSeqv3();
  return (
    <>
      <h2 className="title">Welcome {me?.name}</h2>
      <div className="flex flex-col gap-2">
        {seqV3MenuAdmin.map((menu, i) => (
          <Link key={i} to={menu.href} className="btn w-fit">
            {menu.label}
          </Link>
        ))}
      </div>
    </>
  );
}
