import { init } from "./app";

const port = parseInt(process.env.PORT, 10) || 3009;

const start = async () => {
  const app = await init();

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
};

start();
