window.fetch = jest.fn((url, options) => {
  fail(`A fetch is being made to url '${url}' with options:
${JSON.stringify(options, null, 2)}
Please mock this call.`);
  throw new Error();
});
