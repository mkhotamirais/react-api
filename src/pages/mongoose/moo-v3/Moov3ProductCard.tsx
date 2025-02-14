import { Moov3Product } from "./typesMoov3";

interface Moov3ProductCardProps {
  children?: React.ReactNode;
  item: Moov3Product;
}

export default function Moov3ProductCard({ children, item }: Moov3ProductCardProps) {
  return (
    <div className="border border-gray-300 rounded p-2 flex justify-between">
      <div className="space-y-1">
        <h3>
          {item.name} - {item.price}
        </h3>
        {/* <div className="border text-xs w-fit">{item.v3Category.name}</div>
        <div className="flex gap-1">
          {item.v3Tags.map((item, i) => (
            <div key={i} className="badge">
              {item.name}
            </div>
          ))}
        </div> */}
      </div>
      {children}
    </div>
  );
}
