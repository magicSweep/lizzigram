import { init } from "./app";
import {
  herokuPingUrl,
  selfDomainNameHeroku,
  selfDomainNameLocal,
} from "./config";
import { wakeUpDyno, initWakeUpDyno, timeoutId } from "./utils/wakeUpDyno";
//import admin from "firebase-admin";

const port = parseInt(process.env.PORT, 10) || 3009;

//admin.initializeApp();

let server: any;

const wakeUpDynoOptions = {
  hostname:
    process.env.IENV === "local" ? selfDomainNameLocal : selfDomainNameHeroku,
  port,
  path: herokuPingUrl,
};

const start = async () => {
  const app = await init();

  wakeUpDyno(wakeUpDynoOptions, 25);

  server = app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    initWakeUpDyno(wakeUpDynoOptions);
  });
};

process.on("unhandledRejection", (err: Error) => {
  console.error(err.name, err.message);

  clearTimeout(timeoutId);

  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.error("SIGTERM received");

  clearTimeout(timeoutId);

  server.close(() => {
    process.exit(1);
  });
});

start();
