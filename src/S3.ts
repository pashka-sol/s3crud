import { S3Client, PutObjectCommand, PutObjectCommandOutput, DeleteObjectCommand, DeleteObjectCommandOutput, HeadObjectCommand, HeadObjectCommandOutput, GetObjectCommand, GetObjectCommandOutput } from "@aws-sdk/client-s3";

interface Connect {
    keyId: string,
    secretKey: string,
    region: string,
    server: string,
}

interface Create {
    bucket: string,
    key: string,
    type: string,
    content: string,
}

interface BucketParams {
    bucket: string;
    key: string;
}

export default class S3 {
    private keyId: string;
    private secretKey: string;
    private region: string;
    private server: string;
    private client: S3Client;

    constructor(connect: Connect) {
        this.keyId = connect.keyId
        this.secretKey = connect.secretKey
        this.region = connect.region
        this.server = connect.server

        this.client = new S3Client({
            credentials: {
                accessKeyId: this.keyId,
                secretAccessKey: this.secretKey,
            },
            endpoint: this.server,
            region: this.region = connect.region,
            apiVersion: "latest"
        })
    }

    /**
         * @param data - Object containing bucket, key, type, and content.
         * @returns A promise that resolves to the result of the put operation.
     */
    async uploadObject(data: Create): Promise<PutObjectCommandOutput> {
        try {
            const command = new PutObjectCommand({
                Bucket: data.bucket,
                Key: data.key,
                Body: data.content,
                ContentType: data.type,
            });

            const response = await this.client.send(command);
            console.log("Success. Object created.",);
            return response;

        } catch (e) {
            console.log(`Error upload object in bucket: ${data.bucket}.`);
            throw e;
        }
    }

    async deleteObject(data: BucketParams): Promise<DeleteObjectCommandOutput> {
        try {
            const command = new DeleteObjectCommand({
                Bucket: data.bucket,
                Key: data.key,
            });

            const response = await this.client.send(command);
            console.log("Success. Object deleted.",);
            return response;

        } catch (e) {
            console.log(`Error deleted object in bucket: ${data.bucket}.`);
            throw e;
        }
    }

    async headObject(data: BucketParams): Promise<HeadObjectCommandOutput> {
        try {
            const command = new HeadObjectCommand({
                Bucket: data.bucket,
                Key: data.key,
            });

            const response = await this.client.send(command);
            console.log("Success. Object head.",);
            return response;

        } catch (e) {
            console.log(`Error head object in bucket: ${data.bucket}.`);
            throw e;
        }
    }

    async getObject(data: BucketParams): Promise<GetObjectCommandOutput> {
        try {
            const command = new GetObjectCommand({
                Bucket: data.bucket,
                Key: data.key,
            });

            const response = await this.client.send(command);
            console.log("Success. Object GET.",);
            return response;

        } catch (e) {
            console.log(`Error GET object in bucket: ${data.bucket}.`);
            throw e;
        }
    }

    async getTextObject(data: BucketParams) {
        try {
            const command = new GetObjectCommand({
                Bucket: data.bucket,
                Key: data.key,
            });

            const response = await this.client.send(command);
            console.log("Success. Object GET.",);

            const text = await response.Body?.transformToString()
            return text;

        } catch (e) {
            console.log(`Error GET object in bucket: ${data.bucket}.`);
            throw e;
        }
    }

}
