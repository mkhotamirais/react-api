import { Link, useSearchParams } from "react-router";
import { useSeqv3 } from "../useSeqv3";
import { useEffect, useState } from "react";
import { FaPenToSquare, FaTrash } from "react-icons/fa6";
import Seqv3ProductsModalDel from "./Seqv3ProductsModalDel";
import Seqv3ProductCard from "../Seqv3ProductCard";
import { Seqv3ProductsFilterCategory, Seqv3ProductsSearch, Seqv3ProudctsFilterTags } from "../Seqv3ProductQuery";

export default function Seqv3Products() {
  const { products, getProducts, tags, getTags, categories, getCategories } = useSeqv3();
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
        <Link to="/sequelize-v3/products/create" className="btn">
          Create
        </Link>
      </div>
      <div>
        <Seqv3ProductsSearch />
        <Seqv3ProudctsFilterTags tags={tags} />
        <Seqv3ProductsFilterCategory categories={categories} />
      </div>{" "}
      {/* List */}
      <div className="space-y-1">
        {products.map((item, i) => (
          <Seqv3ProductCard key={i} item={item}>
            <div className="flex gap-3 items-center">
              <Link to={`/sequelize-v3/products/edit/${item.id}`} title="edit">
                <FaPenToSquare className="text-green-500" />
              </Link>
              <button type="button" title="delete" onClick={() => setDelId(item.id)}>
                <FaTrash className="text-red-500" />
              </button>
              <Seqv3ProductsModalDel item={item} delId={delId} setDelId={setDelId} />
            </div>
          </Seqv3ProductCard>
        ))}
      </div>
    </div>
  );
}
