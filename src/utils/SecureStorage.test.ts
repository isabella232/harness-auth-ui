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

const cases = [
  "token",
  10,
  0,
  true,
  false,
  { a: 1, b: "str", c: { d: 1 } },
  [1, 2, 3]
];

describe("Encode and Decode", () => {
  test.each(cases)("for input %p", (input) => {
    const encoded = encode(input);
    if (encoded) expect(decode(encoded)).toEqual(input);
  });
});
