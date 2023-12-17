import dotenv from "dotenv";

import { App } from "./app";

dotenv.config();

const port = process.env.PORT ?? 3000;

new App().server.listen(port, () => {
  console.info(`Application running on port ${port}`);
});
