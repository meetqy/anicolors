import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 } from "uuid";
import axios from "axios";
import { env } from "~/env";

interface R2Config {
  accountId: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  publicUrl?: string; // 可选的公共访问URL前缀
}

export class R2Uploader {
  private s3Client: S3Client;
  private bucketName: string;
  private publicUrl?: string;

  constructor(config: R2Config) {
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${config.accountId}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
    this.bucketName = config.bucketName;
    this.publicUrl = config.publicUrl;
  }

  /**
   * 从URL上传图片到R2
   * @param imageUrl 图片URL
   * @param folder 可选的存储文件夹
   * @returns 上传后的图片URL
   */
  async uploadFromUrl(imageUrl: string, folder = "images"): Promise<{ url: string; fileName: string }> {
    try {
      const ext = imageUrl.split(".").pop()?.toLowerCase();
      // 下载图片
      const response = await axios.get(imageUrl, {
        responseType: "arraybuffer",
      });

      // 获取图片类型和内容

      const fileName = `${folder}/${v4()}.${ext}`;

      // 上传到R2
      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: Buffer.from(response.data),
          ContentType: `image/${ext}`,
        }),
      );

      // 返回访问URL
      if (this.publicUrl) {
        return {
          url: `${this.publicUrl}/${fileName}`,
          fileName,
        };
      }

      return {
        url: `https://${this.bucketName}.r2.dev/${fileName}`,
        fileName,
      };
    } catch (error) {
      console.error("上传图片失败:", error);
      throw error;
    }
  }

  /**
   * 上传本地Buffer数据到R2
   * @param buffer 图片Buffer
   * @param contentType MIME类型
   * @param folder 可选的存储文件夹
   * @returns 上传后的图片URL
   */
  async uploadBuffer(buffer: Buffer, contentType: string, folder = "images"): Promise<{ url: string; fileName: string }> {
    try {
      const fileName = `${folder}/${v4()}.webp`;

      await this.s3Client.send(
        new PutObjectCommand({
          Bucket: this.bucketName,
          Key: fileName,
          Body: buffer,
          ContentType: "image/webp",
        }),
      );

      if (this.publicUrl) {
        return {
          url: `${this.publicUrl}/${fileName}`,
          fileName,
        };
      }

      return {
        url: `https://${this.bucketName}.r2.dev/${fileName}`,
        fileName,
      };
    } catch (error) {
      console.error("上传图片失败:", error);
      throw error;
    }
  }
}

export const r2Uploader = new R2Uploader({
  accountId: env.R2_ACCOUNT_ID,
  accessKeyId: env.R2_ACCESS_KEY_ID,
  secretAccessKey: env.R2_SECRET_ACCESS_KEY,
  bucketName: env.R2_BUCKET_NAME,
  publicUrl: env.NEXT_PUBLIC_R2_PUBLIC_URL,
});

// // 从URL上传
// const imageUrl = await r2Uploader.uploadFromUrl("https://example.com/image.jpg");
