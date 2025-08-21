import { withSave } from "@/components/card/with-save";
import { sortColors } from "@/lib/sort-colors";
import Color from "color";

// 图片和调色板展示组件
const Content = ({
  image,
  colors,
  loading,
}: {
  image: string;
  colors: { rgb: [number, number, number] }[];
  loading: boolean;
}) => {
  return (
    <div className="flex h-full flex-col gap-2 bg-white p-2">
      {/* 图片展示区域 - 占用上半部分 */}
      <div className="flex flex-1 justify-center">
        <img src={image} alt="Uploaded" className="object-contain" />
      </div>

      {/* 调色板区域 - 占用下半部分 */}
      <div>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Extracting colors...</div>
          </div>
        ) : colors.length > 0 ? (
          <div className="space-y-3">
            {/* 颜色网格 */}
            <div className="grid grid-cols-6 gap-2 md:grid-cols-12">
              {sortColors(
                colors.map((e) =>
                  Color(`rgb(${e.rgb[0]}, ${e.rgb[1]}, ${e.rgb[2]})`).hex(),
                ),
              ).map((color, index) => {
                return (
                  <div key={index} className="group">
                    <div
                      className="aspect-[9/16] w-full cursor-pointer transition-transform group-hover:scale-105"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// 使用 withSave 包装图片和调色板组件
export const SaveableContent = withSave(Content);
