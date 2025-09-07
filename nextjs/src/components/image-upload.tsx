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

interface UploadProps {
  onImageChange?: (imageDataUrl: string | null, file: File | null) => void;
  className?: string;
  showRemoveButton?: boolean;
  placeholder?: string;
  dropzoneText?: string;
  buttonText?: string;
}

export interface UploadRef {
  openFileDialog: () => void;
  removeImage: () => void;
}

export const ImageUpload = forwardRef<UploadRef, UploadProps>(
  (
    {
      onImageChange,
      className = "",
      showRemoveButton = true,
      dropzoneText = "Drag and drop your image or click to browse",
    },
    ref,
  ) => {
    const [image, setImage] = React.useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = useCallback(
      (imageDataUrl: string | null, file: File | null) => {
        setImage(imageDataUrl);
        onImageChange?.(imageDataUrl, file);
      },
      [onImageChange],
    );

    const onDrop = useCallback(
      (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            handleImageChange(reader.result as string, file);
          };
          reader.readAsDataURL(file);
        }
      },
      [handleImageChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".gif", ".bmp", ".webp"],
      },
      multiple: false,
      noClick: false,
      noKeyboard: false,
    });

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          handleImageChange(reader.result as string, file);
        };
        reader.readAsDataURL(file);
      }
    };

    const openFileDialog = useCallback(() => {
      fileInputRef.current?.click();
    }, []);

    const removeImage = useCallback(() => {
      handleImageChange(null, null);
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
              <div>
                <h4 className="font-medium">
                  {isDragActive ? "Drop new image here" : "Upload new image"}
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  {isDragActive
                    ? "Release to replace current image"
                    : dropzoneText}
                </p>
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
                {isDragActive ? "Drop your image here" : "Upload an image"}
              </h4>
              <p className="text-muted-foreground mt-1 text-sm">
                {isDragActive ? "Release to upload your file" : dropzoneText}
              </p>
            </div>
          )}
        </div>

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    );
  },
);

ImageUpload.displayName = "ImageUpload";
