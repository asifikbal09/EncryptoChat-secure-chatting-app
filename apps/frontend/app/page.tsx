import RsaEncryptionTool from "@/components/rsa-encryption-tool";
import ProtectedRoute from "../hooks/ProtectedRoute";

export default function Home() {
  return (
    <ProtectedRoute>

    <main className="container mx-auto p-4 max-w-4xl">
    <h1 className="text-2xl font-bold mb-6">RSA Encryption / Decryption Tool</h1>
    <RsaEncryptionTool />
  </main>
    </ProtectedRoute>
  );
}
