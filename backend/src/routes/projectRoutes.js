import { Router } from "express";
import { ProjectController } from "../controllers/projectController.js";
import { validate, schemas } from "../middlewares/validate.js";

const router = Router();

router.get("/", ProjectController.getAll);
router.get("/:id", ProjectController.getById);
router.post("/", validate(schemas.crearProyecto), ProjectController.create);
router.put("/:id", validate(schemas.crearProyecto), ProjectController.update);
router.delete("/:id", ProjectController.delete);

export default router;
