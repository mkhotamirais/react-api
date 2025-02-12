import { Seqv3Product } from "./typesSeqv3";

interface Seqv3ProductCardProps {
  children?: React.ReactNode;
  item: Seqv3Product;
}

export default function Seqv3ProductCard({ children, item }: Seqv3ProductCardProps) {
  return (
    <div className="border border-gray-300 rounded p-2 flex justify-between">
      <div className="space-y-1">
        <h3>
          {item.name} - {item.price}
        </h3>
        <div className="border text-xs w-fit">{item.v3Category.name}</div>
        <div className="flex gap-1">
          {item.v3Tags.map((item, i) => (
            <div key={i} className="badge">
              {item.name}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
