import { Router } from "express";
import { body, param } from "express-validator";
//Usamos metodos estaticos para evitar tener tantas exportaciones
import { ProjectController } from "../controllers/ProjectController";
import { handleInputErrors } from "../middleware/validation";

const router = Router();

router.get("/", ProjectController.getAllProjects);
router.get(
  "/:id",

  param("id").isMongoId().withMessage("ID no válido"),

  handleInputErrors,

  ProjectController.getProjectById,
);

router.post(
  "/",
  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),

  body("description")
    .notEmpty()
    .withMessage("La descripcion del proyeto es obligatoria"),

  handleInputErrors,
  ProjectController.createProject,
);

router.put(
  "/:id",

  param("id").isMongoId().withMessage("ID no válido"),

  body("projectName")
    .notEmpty()
    .withMessage("El nombre del proyecto es obligatorio"),
  body("clientName")
    .notEmpty()
    .withMessage("El nombre del cliente es obligatorio"),

  body("description")
    .notEmpty()
    .withMessage("La descripcion del proyeto es obligatoria"),

  handleInputErrors,

  ProjectController.updateProject,
);

export default router;
