import { encode, decode } from "utils/SecureStorage";

describe("Encode", () => {
  test("string", () => {
    const id = "AQ8xhfNCRtGIUjq5bSM8Fg";
    expect(encode(id)).toEqual("JTIyQVE4eGhmTkNSdEdJVWpxNWJTTThGZyUyMg==");
  });
});

describe("Decode", () => {
  test("string", () => {
    const str = "JTIyQVE4eGhmTkNSdEdJVWpxNWJTTThGZyUyMg==";
    expect(decode(str)).toEqual("AQ8xhfNCRtGIUjq5bSM8Fg");
  });
});

describe("Encode and Decode", () => {
  test("string", () => {
    const input = "token";
    const encoded = encode(input);
    expect(decode(encoded)).toEqual(input);
  });

  test("number", () => {
    const input = 10;
    const encoded = encode(input);
    expect(decode(encoded)).toEqual(input);
  });

  test("object", () => {
    const input = { a: 1, b: "str", c: { d: 1 } };
    const encoded = encode(input);
    expect(decode(encoded)).toEqual(input);
  });

  test("empty", () => {
    let input;
    const encoded = encode(input);
    expect(decode(encoded)).toEqual(input);
  });

  test("array", () => {
    const input = [1, 2, 3];
    const encoded = encode(input);
    expect(decode(encoded)).toEqual(input);
  });
});
