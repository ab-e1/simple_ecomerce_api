import { port } from "./config/loadEnv.js";
import { app } from "./app.js";
import { connectDb } from "./config/db.js";

connectDb();
console.log("Hello via Bun!");

app.listen(port, () => {
  console.log(`Server running on port: ${port} `);
});
