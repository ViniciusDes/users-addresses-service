import { CryptoUtils } from "./utils";

describe.skip("Utils crypto suite", () => {
  let sut: CryptoUtils;

  beforeEach(() => {
    sut = new CryptoUtils();
  });

  it("Crypto utils should have encrypt method", () => {
    expect(CryptoUtils.encrypt).not.toBeUndefined();
  });

  it("Encrypt method must return string", () => {
    expect(CryptoUtils.encrypt("string")).toBeDefined();
  });

  it("Encrypt method must return a valid string", () => {
    expect(CryptoUtils.encrypt("string")).not.toEqual("string");
  });

  it("Crypto utils should have decrypt method", () => {
    expect(CryptoUtils.decrypt).not.toBeUndefined();
  });

  it("Decrypt method must return string", () => {
    expect(CryptoUtils.decrypt("string")).toBeDefined();
  });

  it("Decrypt method must return a valid string", () => {
    expect(CryptoUtils.decrypt("string").length).toBeGreaterThanOrEqual(1);
    expect(CryptoUtils.decrypt("string")).not.toEqual("string");
  });
});
