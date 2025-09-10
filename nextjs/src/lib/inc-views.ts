import { env } from "@/env";

export const fetchIncViews = (
  documentId: string,
  type: "blogs" | "tools" | "palettes" | "categories" | "colors",
) => {
  void fetch(`${env.NEXT_PUBLIC_API_URL}/api/${type}/${documentId}/incViews`);
};
