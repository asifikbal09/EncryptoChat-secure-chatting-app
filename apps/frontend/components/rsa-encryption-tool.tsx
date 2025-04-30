"use client"

import { useState } from "react"
import { generateKeyPair, encrypt, decrypt } from "@/lib/rsa-utils"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export default function RsaEncryptionTool() {
  const [keySize, setKeySize] = useState<string>("512")
  const [publicKey, setPublicKey] = useState<string>("")
  const [privateKey, setPrivateKey] = useState<string>("")
  const [encryptionText, setEncryptionText] = useState<string>("")
  const [encryptedText, setEncryptedText] = useState<string>("")
  const [decryptionText, setDecryptionText] = useState<string>("")
  const [decryptedText, setDecryptedText] = useState<string>("")
  const [isGeneratingKeys, setIsGeneratingKeys] = useState<boolean>(false)
  const [isEncrypting, setIsEncrypting] = useState<boolean>(false)
  const [isDecrypting, setIsDecrypting] = useState<boolean>(false)

  const handleGenerateKeys = async () => {
    setIsGeneratingKeys(true)
    try {
      const { publicKey, privateKey } = await generateKeyPair(Number.parseInt(keySize))
      setPublicKey(publicKey)
      setPrivateKey(privateKey)
      // Auto-populate the encryption public key and decryption private key
      setDecryptionText("")
      setDecryptedText("")
    } catch (error) {
      console.error("Error generating keys:", error)
      alert("Failed to generate keys. Please try again with a smaller key size.")
    } finally {
      setIsGeneratingKeys(false)
    }
  }

  const handleEncrypt = async () => {
    if (!publicKey || !encryptionText) return

    setIsEncrypting(true)
    try {
      const encrypted = await encrypt(publicKey, encryptionText)
      setEncryptedText(encrypted)
      setDecryptionText(encrypted) // Auto-populate the decryption input
    } catch (error) {
      console.error("Error encrypting:", error)
    } finally {
      setIsEncrypting(false)
    }
  }

  const handleDecrypt = async () => {
    if (!privateKey || !decryptionText) return

    setIsDecrypting(true)
    try {
      const decrypted = await decrypt(privateKey, decryptionText)
      setDecryptedText(decrypted)
    } catch (error) {
      console.error("Error decrypting:", error)
    } finally {
      setIsDecrypting(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Key Generation Section */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">Create RSA public / private keys</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="keySize" className="block mb-2">
                Encryption Mode
              </Label>
              <Select value={keySize} onValueChange={setKeySize}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select key size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="512">512 Bits</SelectItem>
                  <SelectItem value="1024">1024 Bits</SelectItem>
                  <SelectItem value="2048">2048 Bits</SelectItem>
                  <SelectItem value="4096">4096 Bits</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <Label htmlFor="publicKey" className="block mb-2">
                Public Key
              </Label>
              <Textarea id="publicKey" value={publicKey} readOnly className="font-mono text-xs h-48" />
            </div>
            <div>
              <Label htmlFor="privateKey" className="block mb-2">
                Private Key
              </Label>
              <Textarea id="privateKey" value={privateKey} readOnly className="font-mono text-xs h-48" />
            </div>
          </div>

          <Button
            onClick={handleGenerateKeys}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800"
            disabled={isGeneratingKeys}
          >
            {isGeneratingKeys ? "Generating..." : "Create public / Private key"}
          </Button>
        </CardContent>
      </Card>

      {/* Encryption Section */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">RSA Encryption</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="encryptionText" className="block mb-2">
                Encryption Text
              </Label>
              <Textarea
                id="encryptionText"
                value={encryptionText}
                onChange={(e) => setEncryptionText(e.target.value)}
                placeholder="Enter text to encrypt"
                className="h-32"
              />
            </div>
            <div>
              <Label htmlFor="encryptedText" className="block mb-2">
                Encrypted Text
              </Label>
              <Textarea id="encryptedText" value={encryptedText} readOnly className="h-32" />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="encryptionPublicKey" className="block mb-2">
              Public Key
            </Label>
            <Textarea id="encryptionPublicKey" value={publicKey} readOnly className="font-mono text-xs h-24" />
          </div>

          <Button
            onClick={handleEncrypt}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800"
            disabled={!publicKey || !encryptionText || isEncrypting}
          >
            {isEncrypting ? "Encrypting..." : "Encrypt"}
          </Button>
        </CardContent>
      </Card>

      {/* Decryption Section */}
      <Card>
        <CardContent className="pt-6">
          <h2 className="text-lg font-semibold mb-4">RSA Decryption</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="decryptionText" className="block mb-2">
                Encrypted Text
              </Label>
              <Textarea
                id="decryptionText"
                value={decryptionText}
                onChange={(e) => setDecryptionText(e.target.value)}
                placeholder="Enter text to decrypt"
                className="h-32"
              />
            </div>
            <div>
              <Label htmlFor="decryptedText" className="block mb-2">
                Decrypted Text
              </Label>
              <Textarea id="decryptedText" value={decryptedText} readOnly className="h-32" />
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="decryptionPrivateKey" className="block mb-2">
              Private Key
            </Label>
            <Textarea id="decryptionPrivateKey" value={privateKey} readOnly className="font-mono text-xs h-24" />
          </div>

          <Button
            onClick={handleDecrypt}
            className="w-full mt-4 bg-black text-white hover:bg-gray-800"
            disabled={!privateKey || !decryptionText || isDecrypting}
          >
            {isDecrypting ? "Decrypting..." : "Decrypt"}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
