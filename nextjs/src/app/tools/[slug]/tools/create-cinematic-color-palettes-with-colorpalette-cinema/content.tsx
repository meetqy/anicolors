import { withSave } from "@/components/card/with-save";
import type { ColorData } from "./utils";

const Content = ({ image, colors }: { image: string; colors: ColorData }) => {
  return (
    <div className="flex aspect-[4/3] w-full flex-col bg-white p-1">
      <img
        src={image}
        alt="Uploaded"
        className="aspect-[16/9] w-full object-center"
      />

      <div className="grid flex-1 grid-cols-6 gap-1 pt-1 md:grid-cols-12">
        {colors.map((color, index) => {
          return (
            <div
              key={index}
              className="h-full"
              style={{
                backgroundColor: color.hex,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

// 使用 withSave 包装图片和调色板组件
export const SaveableContent = withSave(Content);
