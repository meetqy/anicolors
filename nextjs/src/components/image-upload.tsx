"use client";
import React, {
  useCallback,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { fileToDataUrl } from "@/lib/utils";

interface UploadProps {
  onImageChange?: (imageDataUrl: string | null, file: File | null) => void;
  onMultipleImagesChange?: (imageDataUrls: string[], files: File[]) => void;
  className?: string;
  showRemoveButton?: boolean;
  placeholder?: string;
  dropzoneText?: string;
  buttonText?: string;
  multiple?: boolean;
}

export interface UploadRef {
  openFileDialog: () => void;
  removeImage: () => void;
}

export const ImageUpload = forwardRef<UploadRef, UploadProps>(
  (
    {
      onImageChange,
      onMultipleImagesChange,
      className = "",
      showRemoveButton = true,
      dropzoneText = "Drag and drop your image or click to browse",
      multiple = false,
    },
    ref,
  ) => {
    const [image, setImage] = React.useState<string | null>(null);
    const [files, setFiles] = React.useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = useCallback(
      (imageDataUrl: string | null, file: File | null) => {
        setImage(imageDataUrl);
        setFiles(file ? [file] : []); // 确保单文件模式下也更新 files 数组
        onImageChange?.(imageDataUrl, file);
      },
      [onImageChange],
    );

    const handleMultipleFiles = useCallback(
      async (acceptedFiles: File[]) => {
        if (acceptedFiles.length === 0) return;

        setFiles(acceptedFiles);

        // 显示第一张图片的预览
        const firstFile = acceptedFiles[0]!;
        const firstDataUrl = await fileToDataUrl(firstFile);
        setImage(firstDataUrl);

        // 转换所有文件为 DataURL
        const imageDataUrls: string[] = [];
        for (const file of acceptedFiles) {
          const dataUrl = await fileToDataUrl(file);
          imageDataUrls.push(dataUrl);
        }

        // 通知父组件，传递 DataURL 数组和文件数组
        onMultipleImagesChange?.(imageDataUrls, acceptedFiles);

        // 如果有单文件回调，也传递第一张图片
        if (onImageChange) {
          onImageChange(firstDataUrl, firstFile);
        }
      },
      [onMultipleImagesChange, onImageChange],
    );

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        if (multiple) {
          void handleMultipleFiles(acceptedFiles);
        } else {
          const file = acceptedFiles[0];
          if (file) {
            void fileToDataUrl(file).then((dataUrl) => {
              handleImageChange(dataUrl, file);
            });
          }
        }

        return files;
      },
      [handleImageChange, handleMultipleFiles, multiple, files],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
      },
      multiple,
      noClick: false,
      noKeyboard: false,
    });

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || []);

      if (multiple) {
        void handleMultipleFiles(selectedFiles);
      } else {
        const file = selectedFiles[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            handleImageChange(reader.result as string, file);
          };
          reader.readAsDataURL(file);
        }
      }
    };

    const openFileDialog = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    const removeImage = useCallback(() => {
      handleImageChange(null, null);
      setFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }, [handleImageChange]);

    // 暴露方法给外部调用
    useImperativeHandle(
      ref,
      () => ({
        openFileDialog,
        removeImage,
      }),
      [openFileDialog, removeImage],
    );

    const fileCount = files.length;

    return (
      <div className={className}>
        {/* 拖拽上传区域 */}
        <div
          {...getRootProps()}
          className={`relative cursor-pointer rounded-lg border-2 border-dashed p-6 text-center transition-colors ${
            isDragActive
              ? "border-primary bg-primary/5"
              : "border-muted-foreground/25 hover:border-muted-foreground/50"
          }`}
        >
          <input {...getInputProps()} />

          {image ? (
            // 有图片时显示预览和上传提示
            <div className="space-y-4">
              <div className="relative mx-auto w-fit">
                <Image
                  src={image}
                  alt="Uploaded preview"
                  width={200}
                  height={200}
                  className="rounded-lg object-cover"
                  style={{ maxHeight: "200px", width: "auto" }}
                  unoptimized
                />

                {/* 多文件计数显示 */}
                {multiple && fileCount > 1 && (
                  <div className="bg-primary text-primary-foreground absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium">
                    {fileCount}
                  </div>
                )}

                {showRemoveButton && (
                  <Button
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-8 w-8 rounded-full p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage();
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ) : (
            // 无图片时显示上传区域
            <div className="flex flex-col items-center justify-center">
              <ImageIcon
                className={`h-12 w-12 ${
                  isDragActive ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <h4 className="mt-4 font-medium">
                {isDragActive
                  ? multiple
                    ? "Drop your images here"
                    : "Drop your image here"
                  : multiple
                    ? "Upload images"
                    : "Upload an image"}
              </h4>
              <p className="text-muted-foreground mt-1 text-sm">
                {isDragActive
                  ? multiple
                    ? "Release to upload your files"
                    : "Release to upload your file"
                  : dropzoneText}
              </p>
            </div>
          )}
        </div>

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";
