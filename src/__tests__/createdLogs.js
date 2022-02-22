test("Check If Log Files Created", () => {
  const fs = require("fs");
  const brook = require("../../lib");
  const logger = new brook.Logger({ preserveLogs: true });

  logger.log("Logging Some message", [1, 2, 3, 4, 5]);
  logger.warn("Warning This is an Object", { name: "kan" });
  logger.error("Error Occurred while Executing", [1, 2, 3, 4, 5], JSON.stringify({ name: "kan" }));

  const logFileName = logger.LOG_PATH + "logs-" + new Date().toISOString().slice(0, 10);
  const errorLogFileName = logger.ERROR_LOG_PATH + "error-logs-" + new Date().toISOString().slice(0, 10);

  expect(fs.existsSync(logFileName) && fs.existsSync(errorLogFileName)).toBe(true);
});
