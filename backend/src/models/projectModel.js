import { query } from "../utils/db.js";

export const ProjectModel = {
  findAll: async (usuarioId) => {
    return query(
      `SELECT id, nombre, descripcion, creado_en
       FROM projects
       WHERE usuario_id = ?
       ORDER BY creado_en DESC`,
      [usuarioId],
    );
  },

  findById: async (id, usuarioId) => {
    const rows = await query(
      `SELECT id, nombre, descripcion, creado_en
       FROM projects
       WHERE id = ? AND usuario_id = ?`,
      [id, usuarioId],
    );
    return rows[0] ?? null;
  },

  create: async ({ nombre, descripcion, usuarioId }) => {
    const resultado = await query(
      `INSERT INTO projects (nombre, descripcion, usuario_id)
       VALUES (?, ?, ?)`,
      [nombre, descripcion ?? null, usuarioId],
    );
    return { id: resultado.insertId, nombre, descripcion, usuarioId };
  },

  update: async (id, { nombre, descripcion }, usuarioId) => {
    const resultado = await query(
      `UPDATE projects
       SET nombre = ?, descripcion = ?
       WHERE id = ? AND usuario_id = ?`,
      [nombre, descripcion ?? null, id, usuarioId],
    );
    return resultado.affectedRows > 0;
  },

  delete: async (id, usuarioId) => {
    const resultado = await query(
      `DELETE FROM projects
       WHERE id = ? AND usuario_id = ?`,
      [id, usuarioId],
    );
    return resultado.affectedRows > 0;
  },
};
