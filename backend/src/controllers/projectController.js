import { ProjectModel } from "../models/projectModel.js";

export const ProjectController = {
  getAll: async (req, res, next) => {
    try {
      const proyectos = await ProjectModel.findAll(req.usuario.id);
      res.status(200).json({ ok: true, data: proyectos });
    } catch (error) {
      next(error);
    }
  },

  getById: async (req, res, next) => {
    try {
      const proyecto = await ProjectModel.findById(
        req.params.id,
        req.usuario.id,
      );
      if (!proyecto) {
        const err = new Error("Proyecto no encontrado");
        err.statusCode = 404;
        err.code = "NOT_FOUND";
        return next(err);
      }
      res.status(200).json({ ok: true, data: proyecto });
    } catch (error) {
      next(error);
    }
  },

  create: async (req, res, next) => {
    try {
      const { nombre, descripcion } = req.body;
      const proyecto = await ProjectModel.create({
        nombre,
        descripcion,
        usuarioId: req.usuario.id,
      });
      res.status(201).json({ ok: true, data: proyecto });
    } catch (error) {
      next(error);
    }
  },

  update: async (req, res, next) => {
    try {
      const { nombre, descripcion } = req.body;
      const actualizado = await ProjectModel.update(
        req.params.id,
        { nombre, descripcion },
        req.usuario.id,
      );
      if (!actualizado) {
        const err = new Error("Proyecto no encontrado");
        err.statusCode = 404;
        err.code = "NOT_FOUND";
        return next(err);
      }
      res.status(200).json({ ok: true, message: "Proyecto actualizado" });
    } catch (error) {
      next(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const eliminado = await ProjectModel.delete(
        req.params.id,
        req.usuario.id,
      );
      if (!eliminado) {
        const err = new Error("Proyecto no encontrado");
        err.statusCode = 404;
        err.code = "NOT_FOUND";
        return next(err);
      }
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  },
};
