"use client"

import forge from "node-forge"

export async function generateKeyPair(bits = 512): Promise<{ publicKey: string; privateKey: string }> {
  return new Promise((resolve, reject) => {
    try {
      // Generate RSA key pair
      // We need to use a callback-based approach for browser compatibility
      forge.pki.rsa.generateKeyPair({ bits, workers: -1 }, (err, keypair) => {
        if (err) {
          reject(err)
          return
        }

        // Convert to PEM format
        const publicKey = forge.pki.publicKeyToPem(keypair.publicKey)
        const privateKey = forge.pki.privateKeyToPem(keypair.privateKey)

        resolve({ publicKey, privateKey })
      })
    } catch (error) {
      reject(error)
    }
  })
}

export async function encrypt(publicKeyPem: string, plaintext: string): Promise<string> {
  try {
    // Convert PEM to public key
    const publicKey = forge.pki.publicKeyFromPem(publicKeyPem)

    // Encrypt data
    // For browser compatibility, we need to use the correct encryption method
    const buffer = forge.util.createBuffer(plaintext, "utf8")
    const encrypted = publicKey.encrypt(buffer.getBytes(), "RSAES-PKCS1-V1_5")

    // Convert to base64 for display
    return forge.util.encode64(encrypted)
  } catch (error) {
    console.error("Encryption error:", error)
    throw error
  }
}

export async function decrypt(privateKeyPem: string, ciphertext: string): Promise<string> {
  try {
    // Convert PEM to private key
    const privateKey = forge.pki.privateKeyFromPem(privateKeyPem)

    // Decode base64
    const encrypted = forge.util.decode64(ciphertext)

    // Decrypt data
    const decrypted = privateKey.decrypt(encrypted, "RSAES-PKCS1-V1_5")

    // Convert from bytes to string
    return forge.util.decodeUtf8(decrypted)
  } catch (error) {
    console.error("Decryption error:", error)
    throw error
  }
}
