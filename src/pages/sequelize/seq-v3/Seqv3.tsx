import { useEffect } from "react";
import { useSeqv3 } from "./useSeqv3";
import Seqv3ProductCard from "./Seqv3ProductCard";
import { Seqv3ProductsFilterCategory, Seqv3ProductsSearch, Seqv3ProudctsFilterTags } from "./Seqv3ProductQuery";
import { useSearchParams } from "react-router";

export default function Seqv3() {
  const { products, getProducts, tags, getTags, categories, getCategories } = useSeqv3();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    getProducts(searchParams.toString());
    getTags();
    getCategories();
  }, [getProducts, getTags, getCategories, searchParams]);

  return (
    <>
      <div>
        <Seqv3ProductsSearch />
        <Seqv3ProudctsFilterTags tags={tags} />
        <Seqv3ProductsFilterCategory categories={categories} />
      </div>
      {/* Products List */}
      <div>
        <div>
          <h2 className="title">Product List</h2>
          {products.map((item, i) => (
            <Seqv3ProductCard item={item} key={i} />
          ))}
        </div>
      </div>
    </>
  );
}
