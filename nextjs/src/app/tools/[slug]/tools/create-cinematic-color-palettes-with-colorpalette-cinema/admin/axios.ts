import { env } from "@/env";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:1337"
      : env.NEXT_PUBLIC_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }
  return config;
});

export const strapiUpload = async (
  files: File[],
  options?: {
    path?: string;
    refId?: string;
    ref?: string;
    field?: string;
  },
) => {
  const formData = new FormData();

  // 添加可选参数
  formData.append("path", options?.path || "/");
  formData.append("refId", options?.refId || "");
  formData.append("ref", options?.ref || "");
  formData.append("field", options?.field || "");

  // 添加文件
  files.forEach((file) => {
    formData.append("files", file);
  });

  return await axiosInstance.post("/api/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const strapiCreatePalette = async (data: {
  name: string;
  categorySlug: string;
  points: { color: string; percent: number; name: string }[];
  imageIds: number[];
}) => {
  const res = await axiosInstance.get(
    `/api/categories?filters[slug][$eq]=${data.categorySlug}`,
  );

  const category: { id: number; name: string } = res.data.data[0];

  if (!category?.id) {
    return;
  }

  const [paletteImage, image] = data.imageIds;

  return await axiosInstance.post("/api/palettes", {
    data: {
      name: data.name.split(".")[0],
      categoryExtend: category.id,
      points: data.points,
      image,
      cover: paletteImage,
      category: category.name,
    },
  });
};
