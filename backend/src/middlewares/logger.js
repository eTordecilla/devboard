export const logger = (req, res, next) => {
  const inicio = Date.now();

  // res.on('finish') se ejecuta cuando la respuesta se ha enviado al cliente
  // en ese momento ya tenemos el status code real
  res.once("finish", () => {
    const fin = Date.now();
    const duracion = fin - inicio;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duracion}ms`,
    );
  });

  next();
};

/* export const logger = (req, res, next) => {
  const inicio = Date.now();
  req._logInicio = inicio;

  res.once("finish", function () {
    const duracion = Date.now() - (req._logInicio || Date.now());
    if (!req.method || !req.originalUrl) return;
    console.log(
      `${req.method} ${req.originalUrl} ${res.statusCode} - ${duracion}ms`,
    );
  });

  next();
}; */

/* export const logger = (req, res, next) => {
  console.log("MIDDLEWARE LOGGER EJECUTADO:", req.method, req.originalUrl);
  next();
}; */
