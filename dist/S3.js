"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
class S3 {
    constructor(connect) {
        this.keyId = connect.keyId;
        this.secretKey = connect.secretKey;
        this.region = connect.region;
        this.server = connect.server;
        this.client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: this.keyId,
                secretAccessKey: this.secretKey,
            },
            endpoint: this.server,
            region: this.region = connect.region,
            apiVersion: "latest"
        });
    }
    /**
         * @param data - Object containing bucket, key, type, and content.
         * @returns A promise that resolves to the result of the put operation.
     */
    uploadObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.PutObjectCommand({
                    Bucket: data.bucket,
                    Key: data.key,
                    Body: data.content,
                    ContentType: data.type,
                });
                const response = yield this.client.send(command);
                console.log("Success. Object created.");
                return response;
            }
            catch (e) {
                console.log(`Error upload object in bucket: ${data.bucket}.`);
                throw e;
            }
        });
    }
    deleteObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.DeleteObjectCommand({
                    Bucket: data.bucket,
                    Key: data.key,
                });
                const response = yield this.client.send(command);
                console.log("Success. Object deleted.");
                return response;
            }
            catch (e) {
                console.log(`Error deleted object in bucket: ${data.bucket}.`);
                throw e;
            }
        });
    }
    headObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.HeadObjectCommand({
                    Bucket: data.bucket,
                    Key: data.key,
                });
                const response = yield this.client.send(command);
                console.log("Success. Object head.");
                return response;
            }
            catch (e) {
                console.log(`Error head object in bucket: ${data.bucket}.`);
                throw e;
            }
        });
    }
    getObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: data.bucket,
                    Key: data.key,
                });
                const response = yield this.client.send(command);
                console.log("Success. Object GET.");
                return response;
            }
            catch (e) {
                console.log(`Error GET object in bucket: ${data.bucket}.`);
                throw e;
            }
        });
    }
    getTextObject(data) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const command = new client_s3_1.GetObjectCommand({
                    Bucket: data.bucket,
                    Key: data.key,
                });
                const response = yield this.client.send(command);
                console.log("Success. Object GET.");
                const text = yield ((_a = response.Body) === null || _a === void 0 ? void 0 : _a.transformToString());
                return text;
            }
            catch (e) {
                console.log(`Error GET object in bucket: ${data.bucket}.`);
                throw e;
            }
        });
    }
}
exports.default = S3;
