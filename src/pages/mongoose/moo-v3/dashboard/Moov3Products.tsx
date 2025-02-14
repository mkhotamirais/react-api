import { Link, useSearchParams } from "react-router";
import { useMoov3 } from "../useMoov3";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Moov3ProductsModalDel from "./Moov3ProductsModalDel";
import Moov3ProductCard from "../Moov3ProductCard";
import { Moov3ProductsFilterCategory, Moov3ProductsSearch, Moov3ProudctsFilterTags } from "../Moov3ProductQuery";

export default function Moov3Products() {
  const { products, getProducts, tags, getTags, categories, getCategories } = useMoov3();
  const [delId, setDelId] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getProducts(searchParams.toString());
    getTags();
    getCategories();
  }, [getProducts, getTags, getCategories, searchParams]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h2 className="title">Product</h2>
        <Link to="/mongoose-v3/products/create" className="btn">
          Create
        </Link>
      </div>
      <div>
        <Moov3ProductsSearch />
        <Moov3ProudctsFilterTags tags={tags} />
        <Moov3ProductsFilterCategory categories={categories} />
      </div>{" "}
      {/* List */}
      <div className="space-y-1">
        {products.map((item, i) => (
          <Moov3ProductCard key={i} item={item}>
            <div className="flex gap-3 items-center">
              <Link to={`/mongoose-v3/products/edit/${item.id}`} title="edit">
                <FaPenToSquare className="text-green-500" />
              </Link>
              <button type="button" title="delete" onClick={() => setDelId(item.id)}>
                <FaTrash className="text-red-500" />
              </button>
              <Moov3ProductsModalDel item={item} delId={delId} setDelId={setDelId} />
            </div>
          </Moov3ProductCard>
        ))}
      </div>
    </div>
  );
}
