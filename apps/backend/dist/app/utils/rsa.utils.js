"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRSAKeyPair = void 0;
const crypto_1 = require("crypto");
const generateRSAKeyPair = () => {
    const { publicKey, privateKey } = (0, crypto_1.generateKeyPairSync)('rsa', {
        modulusLength: 2048, // secure key length
        publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
        privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
        },
    });
    return { publicKey, privateKey };
};
exports.generateRSAKeyPair = generateRSAKeyPair;
