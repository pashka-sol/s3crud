import { PutObjectCommandOutput, DeleteObjectCommandOutput, HeadObjectCommandOutput, GetObjectCommandOutput } from "@aws-sdk/client-s3";
interface Connect {
    keyId: string;
    secretKey: string;
    region: string;
    server: string;
}
interface Create {
    bucket: string;
    key: string;
    type: string;
    content: string;
}
interface BucketParams {
    bucket: string;
    key: string;
}
export default class S3 {
    private keyId;
    private secretKey;
    private region;
    private server;
    private client;
    constructor(connect: Connect);
    /**
         * @param data - Object containing bucket, key, type, and content.
         * @returns A promise that resolves to the result of the put operation.
     */
    uploadObject(data: Create): Promise<PutObjectCommandOutput>;
    deleteObject(data: BucketParams): Promise<DeleteObjectCommandOutput>;
    headObject(data: BucketParams): Promise<HeadObjectCommandOutput>;
    getObject(data: BucketParams): Promise<GetObjectCommandOutput>;
    getTextObject(data: BucketParams): Promise<string | undefined>;
}
export {};
