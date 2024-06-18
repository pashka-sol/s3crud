
# CRUD Amazon S3
![NPM Unpacked Size](https://img.shields.io/npm/unpacked-size/s3crud?logo=npm)
CRUD operations using Amazon SDK. 



## Installation
Import the module in your project:
```bash
npm install s3crud
```

## Getting Started
1. Add module in project:
```javascript
import S3 from 's3crud'
//or
const S3 = require('s3crud').default;

```

2. Create a client connection to your S3 server (can be Amazon S3 or other providers like Selectel):
```javascript
const client = new S3({
    keyId: 'your-access-key-id',
    secretKey: 'your-secret-access-key',
    region: 'your-region',
    server: 'your-s3-server',
```

## Usage
**Upload Object**
Upload an object to a bucket:

```javascript
try {
    await client.uploadObject({
        bucket: 'your-bucket-name',
        key: 'object-key-in-bucket',
        type: 'text/plain', // Example: 'text/plain' or other MIME type
        content: 'My content',
    });
    console.log('Object uploaded successfully.');
} catch (error) {
    console.error('Error uploading object:', error);
}
```

**Get Object:**
Retrieve the entire object data:

```javascript
try {
    const objectData = await client.getObject({
        bucket: 'your-bucket-name',
        key: 'object-key-in-bucket',
    });
    console.log('Object data:', objectData);
} catch (error) {
    console.error('Error getting object:', error);
}
```

**Get Text from Object:**
Retrieve only the text content from the object:

```javascript
try {
    const textContent = await client.getTextObject({
        bucket: 'your-bucket-name',
        key: 'object-key-in-bucket',
    });
    console.log('Text content:', textContent);
} catch (error) {
    console.error('Error getting text from object:', error);
}
```

**Delete Object:**
Delete an object from the bucket:

```javascript
try {
    await client.deleteObject({
        bucket: 'your-bucket-name',
        key: 'object-key-in-bucket',
    });
    console.log('Object deleted successfully.');
} catch (error) {
    console.error('Error deleting object:', error);
}
```


**Get Object Headers**
Retrieve the headers of an object:

```javascript
try {
    const headers = await client.headObject({
        bucket: 'your-bucket-name',
        key: 'object-key-in-bucket',
    });
    console.log('Object headers:', headers);
} catch (error) {
    console.error('Error getting object headers:', error);
}
```

## Content-Type Info

Стандартный MIME-тип, описывающий формат содержимого. Для получения дополнительной информации см. https://www.rfc-editor.org/rfc/rfc9110.html#name-content-type

