const { Gematria } = require("../lib/index");

describe("Gematria (Compiled)", () => {
  it("calculates the gematria of Hebrew words correctly in standard style", () => {
    expect(Gematria.calculate("אבג")).toBe(6);
    expect(Gematria.calculate("שבת")).toBe(702);
  });

  it("calculates the gematria of Hebrew words correctly in ordinal style", () => {
    expect(Gematria.calculate("אבג", "hebrew", "ordinal")).toBe(6);
    expect(Gematria.calculate("שבת", "hebrew", "ordinal")).toBe(63);
  });

  it("calculates the gematria of Hebrew words correctly in reduced style", () => {
    expect(Gematria.calculate("אבג", "hebrew", "reduced")).toBe(6);
    expect(Gematria.calculate("שבת", "hebrew", "reduced")).toBe(9);
  });

  it("calculates the gematria of Hebrew words correctly in full style", () => {
    expect(Gematria.calculate("אבג", "hebrew", "full")).toBe(6);
    expect(Gematria.calculate("שבת", "hebrew", "full")).toBe(702);
  });

  it("calculates the gematria of English words correctly in standard style", () => {
    expect(Gematria.calculate("ABC")).toBe(6);
    expect(Gematria.calculate("GEMATRIA")).toBe(74);
  });

  it("calculates the gematria of English words correctly in ordinal style", () => {
    expect(Gematria.calculate("ABC", "english", "ordinal")).toBe(6);
    expect(Gematria.calculate("GEMATRIA", "english", "ordinal")).toBe(74);
  });

  it("calculates the gematria of English words correctly in reduced style", () => {
    expect(Gematria.calculate("ABC", "english", "reduced")).toBe(6);
    expect(Gematria.calculate("GEMATRIA", "english", "reduced")).toBe(32);
  });

  it("calculates the gematria of Hebrew sentences correctly", () => {
    expect(Gematria.calculateSentence("אבג שבת")).toBe(708);
  });

  it("calculates the gematria of English sentences correctly", () => {
    expect(Gematria.calculateSentence("ABC GEMATRIA")).toBe(80);
  });

  it("throws an error for invalid Hebrew characters", () => {
    expect(() => Gematria.calculate("אבג123")).toThrow("Invalid character");
  });

  it("throws an error for invalid English characters", () => {
    expect(() => Gematria.calculate("ABC123")).toThrow("Invalid character");
  });

  it("calculates the gematria of words using a custom alphabet", () => {
    const customAlphabet = { A: 1, B: 2, C: 3, 1: 4, 2: 5, 3: 6 };
    expect(
      Gematria.calculate("ABC123", "custom", "standard", customAlphabet)
    ).toBe(21);
  });

  it("throws an error for unsupported languages without custom alphabet", () => {
    expect(() => Gematria.calculate("ABC", "unsupported")).toThrow(
      "Unsupported language"
    );
  });

  it("calculates gematria for sentences with a mix of supported languages and custom alphabets", () => {
    const customAlphabet = { X: 1, Y: 2, Z: 3 };
    expect(Gematria.calculateSentence("אבג XYZ שבת", "hebrew")).toBe(708 + 6); // 708 (hebrew) + 6 (custom)
  });

  it("detects language automatically for single words", () => {
    expect(Gematria.calculate("אבג")).toBe(6); // Hebrew
    expect(Gematria.calculate("ABC")).toBe(6); // English
  });

  it("throws an error if language cannot be detected and no custom alphabet is provided", () => {
    expect(() => Gematria.calculate("123")).toThrow(
      "Language could not be detected and no custom alphabet was provided"
    );
  });
});
