// Función 1: formatear una tarea para la respuesta de la API
// Recibe el objeto crudo de la DB, devuelve solo los campos necesarios
export const formatearTarea = ({
  id,
  titulo,
  estado,
  prioridad = "media",
  creado_en,
}) => {
  return {
    id,
    titulo,
    estado,
    prioridad,
    creadoEn: creado_en, // camelCase para la API → snake_case de DB
  };
};

// Función 2: aplicar filtros a una lista de tareas
// Usa rest para recibir cualquier cantidad de filtros
export const filtrarTareas = (tareas, { estado, prioridad } = {}) => {
  return tareas
    .filter((t) => (estado ? t.estado === estado : true))
    .filter((t) => (prioridad ? t.prioridad === prioridad : true));
};

// Función 3: actualizar una tarea sin mutar el original
export const actualizarTarea = (tareaOriginal, cambios) => {
  return {
    ...tareaOriginal,
    ...cambios,
    actualizadoEn: new Date().toISOString(),
  };
};

// Función 4: obtener el nombre del asignado de forma segura
export const obtenerAsignado = (tarea) => {
  return tarea?.asignado?.nombre ?? "Sin asignar";
};
