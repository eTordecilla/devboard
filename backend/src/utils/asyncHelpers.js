// Wraper que elimina el try/catch repetitivo en cada controller
// En el Mes 2 lo usaremos en todos los endpoints
export const asyncHandler = (fn) => {
  return async (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Simula una consulta a la DB con delay real
// En el Mes 2 esto será una query real a MySQL
export const simularQueryDB = (datos, demora = 100) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!datos) {
        reject(new Error("No se encontraron datos"));
      }
      resolve(datos);
    }, demora);
  });
};

// Obtener datos del dashboard en paralelo
export const obtenerDashboard = async (proyectoId) => {
  try {
    const tareasMock = [
      { id: 1, titulo: "Diseñar DB", estado: "done", prioridad: "alta" },
      { id: 2, titulo: "Crear API", estado: "todo", prioridad: "alta" },
      {
        id: 3,
        titulo: "Hacer login",
        estado: "in-progress",
        prioridad: "media",
      },
    ];
    const usuariosMock = [
      { id: 1, nombre: "Elkin" },
      { id: 2, nombre: "Lina" },
    ];

    // Promise.all ejecuta ambas queries AL MISMO TIEMPO
    // más eficiente que await una, después await la otra
    const [tareas, usuarios] = await Promise.all([
      simularQueryDB(tareasMock, 80),
      simularQueryDB(usuariosMock, 60),
    ]);
    return {
      proyectoId,
      tareas,
      usuarios,
      resumen: {
        total: tareas.length,
        completadas: tareas.filter((t) => t.estado === "done").length,
        enProgreso: tareas.filter((t) => t.estado === "in-progress").length,
        pendientes: tareas.filter((t) => t.estado === "todo").length,
      },
    };
  } catch (error) {
    throw new Error(`Error obteniendo dashboard: ${error.message}`);
  }
};
