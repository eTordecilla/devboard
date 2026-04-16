export const errorHandler = (err, req, res, next) => {
  // Logueamos el error completo en el servidor
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message);

  // Al cliente solo mandamos lo necesario - nunca el stack trace completo
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    ok: false,
    error: {
      message: err.message || "Error interno del servidor",
      code: err.code || "INTERNAL_ERROR",
    },
  });
};
