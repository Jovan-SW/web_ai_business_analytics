import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Files } from "files-sdk";
import { neon as neonStorageAdapter } from "files-sdk/neon";

const bucket = "assets";

// Native AWS S3 client configured with Neon S3-compatible endpoints
export const s3 = new S3Client({
  forcePathStyle: true,
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION || "ap-southeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

// Files SDK using the Neon adapter
export const files = new Files({
  adapter: neonStorageAdapter({ bucket }),
});

export async function testObjectStorage() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const endpoint = process.env.AWS_ENDPOINT_URL_S3;

  if (!accessKeyId || !endpoint) {
    throw new Error("AWS_ACCESS_KEY_ID or AWS_ENDPOINT_URL_S3 is missing");
  }

  const testKey = `health-check/test-${Date.now()}.txt`;
  const content = `Neon Object Storage test probe at ${new Date().toISOString()}`;

  // 1. Upload test object via S3Client
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: testKey,
      Body: Buffer.from(content, "utf-8"),
      ContentType: "text/plain",
    })
  );

  // 2. Generate presigned GET URL
  const presignedUrl = await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: bucket,
      Key: testKey,
    }),
    { expiresIn: 300 }
  );

  // 3. Clean up the test object
  await s3.send(
    new DeleteObjectCommand({
      Bucket: bucket,
      Key: testKey,
    })
  );

  return {
    bucket,
    testKey,
    presignedUrlGenerated: Boolean(presignedUrl),
    endpoint,
    status: "ok",
  };
}

