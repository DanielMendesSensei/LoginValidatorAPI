import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
const PORT = process.env.PORT || 5000;

dotenv.config();

// const corsOptions = {
//   origin: "",
//   optionsSuccessStatus: 200,
// };

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use(cors());

app.get("/", (req, res) => res.json({ message: "Hello World!" }));

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Servidor rodando na porta ${PORT}`);
});
