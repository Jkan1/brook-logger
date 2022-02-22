test("Check If Module Required", () => {
  const Logger = require("../../lib");

  expect(typeof Logger).toBe("object");
  expect(typeof Logger.Logger).toBe("function");
});
