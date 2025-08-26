"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import copy from "copy-to-clipboard";
import download from "downloadjs";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

// 解析 SVG 颜色属性的正则
const COLOR_ATTRS = [
  "fill",
  "stroke",
  "stop-color",
  "flood-color",
  "lighting-color",
];
const COLOR_REGEX = new RegExp(
  `(${COLOR_ATTRS.join("|")})=["'](#[0-9a-fA-F]{3,8}|rgba?\\([^)]*\\)|hsla?\\([^)]*\\)|[a-zA-Z]+)["']`,
  "g",
);

function extractColors(svg: string) {
  const matches = Array.from(svg.matchAll(COLOR_REGEX));
  return matches.map((m) => ({
    attr: m[1],
    value: m[2],
    index: m.index ?? 0,
    raw: m[0],
  }));
}

function replaceColor(svg: string, oldRaw: string, newColor: string) {
  return svg.replace(oldRaw, (match) => {
    return match.replace(
      /(["'])(#[0-9a-fA-F]{3,8}|rgba?\([^)]*\)|hsla?\([^)]*\)|[a-zA-Z]+)\1/,
      `"${newColor}"`,
    );
  });
}

const ChangeSvgColor = () => {
  const [svgText, setSvgText] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [colors, setColors] = useState<
    { attr: string; value: string; raw: string; newValue: string }[]
  >([]);
  const [previewSvg, setPreviewSvg] = useState<string>("");

  // 处理 SVG 文件输入
  const handleSvgInput = (text: string, name = "") => {
    setSvgText(text);
    setFileName(name);
    const found = extractColors(text);
    setColors(
      found.map((c) => ({
        ...c,
        newValue: c.value!,
        attr: c.attr!,
        value: c.value!,
      })),
    );
    setPreviewSvg(text);
    toast.success(
      `Successfully loaded ${name}, found ${found.length} editable colors`,
    );
  };

  // 修改颜色
  const handleColorChange = (idx: number, color: string) => {
    const newColors = colors.map((c, i) =>
      i === idx ? { ...c, newValue: color } : c,
    );
    setColors(newColors);

    let newSvg = svgText;
    newColors.forEach((c) => {
      newSvg = replaceColor(newSvg, c.raw, c.newValue);
    });
    setPreviewSvg(newSvg);
  };

  // 导出 SVG
  const handleDownload = () => {
    const newFileName = fileName
      ? fileName.replace(".svg", "_modified.svg")
      : "modified.svg";
    download(previewSvg, newFileName, "image/svg+xml");
    toast.success("SVG file exported successfully");
  };

  // 复制 SVG
  const handleCopy = () => {
    copy(previewSvg);
    toast.success("SVG code copied to clipboard");
  };

  // 拖拽配置 - 覆盖整个页面区域
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/svg+xml": [".svg"],
    },
    multiple: false,
    noClick: !!previewSvg, // 有内容时禁用点击
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        void file.text().then((text) => handleSvgInput(text, file.name));
      }
    },
    onDropRejected: () => {
      toast.error("Please upload a valid SVG file");
    },
  });

  if (!previewSvg) {
    // 未上传状态 - 全屏拖拽区域
    return (
      <div className="mx-auto w-full max-w-4xl px-4 py-8">
        <div
          {...getRootProps()}
          className={`flex min-h-[500px] cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-16 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-accent/30"
              : "border-muted hover:border-primary/50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="max-w-md space-y-4">
            <div className="bg-muted mx-auto flex h-16 w-16 items-center justify-center rounded-full">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <div>
              <p className="mb-2 text-xl font-semibold">
                {isDragActive ? "Drop to upload" : "Upload SVG File"}
              </p>
              <p className="text-muted-foreground">
                Drag and drop your SVG file here, or click to select
              </p>
              <p className="text-muted-foreground mt-2 text-sm">
                Supports editing fill, stroke and other color attributes
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 已上传状态 - 左右布局
  return (
    <div
      {...getRootProps()}
      className={`mx-auto w-full max-w-6xl px-4 py-8 ${
        isDragActive ? "bg-accent/20 rounded-lg" : ""
      }`}
    >
      <input {...getInputProps()} />

      {/* 拖拽提示 */}
      {isDragActive && (
        <div className="bg-background/80 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="border-primary bg-background rounded-lg border-2 p-8 text-center shadow-lg">
            <p className="text-primary text-xl font-semibold">
              Drop to replace SVG file
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* 左侧操作区 */}
        <div className="space-y-6">
          {/* 文件信息 */}
          <div className="bg-muted/50 rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div className="bg-primary text-primary-foreground flex h-10 w-10 items-center justify-center rounded-lg">
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-medium">{fileName}</p>
                <p className="text-muted-foreground text-sm">
                  {colors.length} editable colors
                </p>
              </div>
            </div>
          </div>

          {/* 颜色列表 */}
          {colors.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Color Editor</h3>
              <div className="space-y-3">
                {colors.map((c, idx) => (
                  <div
                    key={idx}
                    className="bg-background flex items-center gap-3 rounded-lg border p-4"
                  >
                    <span className="text-muted-foreground min-w-[60px] text-sm font-medium">
                      {c.attr}
                    </span>
                    <div
                      className="h-10 w-10 rounded-lg border-2"
                      style={{ backgroundColor: c.newValue }}
                    />
                    <div className="relative flex h-10 flex-1 items-center justify-center overflow-hidden rounded-lg border">
                      <div
                        className="size-full"
                        style={{
                          backgroundColor: c.newValue,
                        }}
                      />
                      <input
                        type="color"
                        value={c.newValue}
                        onChange={(e) => handleColorChange(idx, e.target.value)}
                        className="absolute size-full cursor-pointer opacity-0"
                      />
                    </div>
                    <span className="text-muted-foreground bg-muted rounded px-2 py-1 font-mono text-xs">
                      {c.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 操作按钮 */}
          <div className="flex gap-3">
            <Button onClick={handleDownload} className="flex-1">
              Export SVG
            </Button>
            <Button variant="outline" onClick={handleCopy} className="flex-1">
              Copy Code
            </Button>
          </div>
        </div>

        {/* 右侧预览区 */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">SVG Preview</h3>
          <div className="bg-background relative flex min-h-[400px] items-center justify-center rounded-lg border p-8">
            <div className="flex size-64 items-center justify-center">
              <div
                className="flex size-full items-center justify-center"
                dangerouslySetInnerHTML={{
                  __html: previewSvg.replace("<svg", "<svg class='size-full'"),
                }}
              />
            </div>
            {/* 预览区域也可以拖拽 */}
            <div className="text-muted-foreground bg-muted absolute top-2 right-2 rounded px-2 py-1 text-xs">
              Drop new file to replace
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeSvgColor;
