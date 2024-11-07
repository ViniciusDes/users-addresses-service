import crypto from "crypto";

export class CryptoUtils {
  private static key = Buffer.from("12345678901234567890123456789012");

  static encrypt(text: string): string {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv("aes-256-cbc", this.key, iv);
    let encrypted = cipher.update(text, "utf8", "hex");
    encrypted += cipher.final("hex");
    console.log('iv.toString("hex")', iv.toString("hex"));
    return iv.toString("hex");
  }

  static decrypt(encryptedText: string): string {
    const [ivHex, encryptedData] = encryptedText.split(":");
    if (!ivHex || !encryptedData) {
      throw new Error("O texto criptografado está em um formato inválido.");
    }

    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-cbc", this.key, iv);
    let decrypted = decipher.update(encryptedData, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }
}
