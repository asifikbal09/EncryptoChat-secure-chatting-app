import { generateKeyPairSync } from 'crypto';

export interface RSAKeyPair {
  publicKey: string;
  privateKey: string;
}

export const generateRSAKeyPair = (): RSAKeyPair => {
  const { publicKey, privateKey } = generateKeyPairSync('rsa', {
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
