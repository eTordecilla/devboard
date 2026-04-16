// Fábruca de middlewares - recibe un schema y devuelve un middleware
// En el mes 2 día 2 usaremos esto con cada endpoint
export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema(req.body);

    if (error) {
      const err = new Error(error);
      err.statusCode = 400;
      err.code = "VALIDATION_ERROR";
      return next(err);
    }
    next();
  };
};

// Schemas de validación para DevBoard
export const schemas = {
  crearProyecto: (body) => {
    if (!body.nombre || body.nombre.trim() === "") {
      return { error: "El nombre del proyecto es obligatorio" };
    }
    if (body.nombre.length > 100) {
      return {
        error: "El nombre del proyecto no puede superar 100 caracteres",
      };
    }
    return { error: null };
  },

  crearTarea: (body) => {
    if (!body.titulo || body.titulo.trim() === "") {
      return { error: "El titulo de la tarea es obligatorio" };
    }
    if (!body.proyectoId || isNaN(body.proyectoId)) {
      return { error: "El proyectoId debe ser un número válido" };
    }
    return { error: null };
  },
};
