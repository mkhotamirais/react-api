import { Seqv3Category, Seqv3Tag } from "./typesSeqv3";
import { useDebouncedCallback } from "use-debounce";
import { useNavigate, useSearchParams } from "react-router";
import { useEffect, useState } from "react";

export const Seqv3ProductsSearch = () => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const onSearch = useDebouncedCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const params = new URLSearchParams(searchParams);
    const search = e.target.value;

    if (search.length > 0) {
      params.set("q", search);
    } else params.delete("q");

    navigate(`?${params.toString()}`);
  }, 300);

  return (
    <div>
      <input
        type="search"
        name="search"
        id="search"
        className="input"
        placeholder="search product.."
        defaultValue={searchParams.get("q") || ""}
        onChange={onSearch}
      />
    </div>
  );
};

export const Seqv3ProudctsFilterTags = ({ tags }: { tags: Seqv3Tag[] }) => {
  const [tagsQuery, setTagsQuery] = useState<string[]>([]);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const onTags = (val: string) => {
    if (tagsQuery.includes(val)) {
      setTagsQuery(tagsQuery.filter((item) => item !== val));
    } else setTagsQuery([...tagsQuery, val]);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (tagsQuery.length > 0) {
      params.set("tags", tagsQuery.toString());
    } else params.delete("tags");

    navigate(`?${params.toString()}`);
  }, [navigate, searchParams, tagsQuery]);

  return (
    <div className="flex gap-1">
      {tags.map((item, i) => (
        <button
          type="button"
          key={i}
          className={`${tagsQuery.includes(item.name) ? "!bg-gray-500" : ""} badge`}
          onClick={() => onTags(item.name)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};

export const Seqv3ProductsFilterCategory = ({ categories }: { categories: Seqv3Category[] }) => {
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const onCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams);

    if (cat) {
      params.set("category", cat);
    } else params.delete("category");

    navigate(`?${params.toString()}`);
  };
  return (
    <div className="flex gap-1">
      <button
        type="button"
        className={`${searchParams.get("category") === null ? "bg-gray-800 text-white" : ""} border text-sm px-1`}
        onClick={() => onCategory("")}
      >
        All Categories
      </button>
      {categories.map((item, i) => (
        <button
          type="button"
          key={i}
          className={`${
            searchParams.get("category") === item.name ? "bg-gray-800 text-white" : ""
          } border text-sm px-1`}
          onClick={() => onCategory(item.name)}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
};
