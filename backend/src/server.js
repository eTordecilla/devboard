import express from "express";
import { logger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares globales — se ejecutan en TODOS los requests
app.use(express.json());
app.use(logger);

// Rutas
app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    message: "DevBoard API running",
    timestamp: new Date().toISOString(),
  });
});

// Ruta para probar el error handler
app.get("/error-test", (req, res, next) => {
  const err = new Error("Este es un error de prueba");
  err.statusCode = 422;
  err.code = "TEST_ERROR";
  next(err);
});

app.use((req, res, next) => {
  console.log(">> nuevo request:", req.method, req.originalUrl);
  next();
});
app.use(logger);

// Error handler — SIEMPRE al final, después de todas las rutas
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
