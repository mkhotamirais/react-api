import { Helmet } from "react-helmet-async";

interface DynamicHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
}

export default function DynamicHead({ title, description, keywords }: DynamicHeadProps) {
  return (
    <Helmet>
      <title>{title || "React Api"}</title>
      <meta name="description" content={description || "React Api Description"} />
      <meta name="keywords" content={keywords || "React Api Keywords"} />
    </Helmet>
  );
}
