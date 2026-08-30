import { port } from "./config/loadEnv.js";
import { app } from "./app.js";

console.log("Hello via Bun!");

app.listen(port, () => {
  console.log(`Server running on port: ${port} `);
});
