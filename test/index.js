const S3 = require('s3crud').default;

const client = new S3({
    keyId: 'f920f2258404447297caf37383814e80',
    secretKey: 'f17ab4e0abe448ffb315d05156645954',
    region: 'ru-1',
    server: 'https://s3.ru-1.storage.selcloud.ru',
})
console.log(client)
