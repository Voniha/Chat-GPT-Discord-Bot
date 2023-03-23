module.exports = (client: any) => {
  process.on("unhandledRejection", (err: any) => {
    client.utils.logger.error(`Unhandled Rejection: ${err.stack}`);
  });

  process.on("uncaughtException", (err: any) => {
    client.utils.logger.error(`Uncaught Exception: ${err.stack}`);
  });

  process.on("warning", (warning: any) => {
    client.utils.logger.error(`Warning: ${warning.stack}`);
  });

  process.on("exit", (code: any) => {
    client.utils.logger.error(`Process exited with code ${code}`);
  });

  process.on("beforeExit", (code: any) => {
    client.utils.logger.error(`Process exited with code ${code}`);
  });

  client.on("error", (err: any) => {
    client.utils.logger.error(`Client error: ${err.stack}`);
  });

  process.on("rejectionHandled", (promise: any) => {
    client.utils.logger.error(`Rejection handled: ${promise}`);
  });
};
