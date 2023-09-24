import { app } from "./app.js";
import { connectDB } from "./config/db.js";
const PORT = process.env.PORT || 4000;

connectDB();

const server = app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
