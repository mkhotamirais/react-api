import { useEffect, useState } from "react";
import { useSeqv3 } from "./useSeqv3";

export default function Seqv3() {
  const { tags, getTags, categories, getCategories } = useSeqv3();
  const [search, setSearch] = useState("");

  useEffect(() => {
    getTags();
    getCategories();
  }, [getTags, getCategories]);

  return (
    <>
      {/* Filter and Sort */}
      <div>
        <input
          type="search"
          name="search"
          id="search"
          className="input"
          placeholder="search product.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div>
        {tags.map((item, i) => (
          <div key={i}>{item.name}</div>
        ))}
      </div>
      <div>
        {categories.map((item, i) => (
          <div key={i}>{item.name}</div>
        ))}
      </div>
    </>
  );
}
