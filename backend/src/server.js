import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

import express from "express";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import projectRoutes from "./routes/projectRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

// Middleware temporal — simula autenticación hasta el Día 4
// REMOVER cuando implementemos JWT
app.use((req, res, next) => {
  req.usuario = { id: 1, nombre: "Elkin Tordecilla" };
  next();
});

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "DevBoard API running",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/projects", projectRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
