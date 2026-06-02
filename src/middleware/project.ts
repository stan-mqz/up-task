import { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

//De esta manera agregamos una propiedad a la interfaz global de TypeScript
declare global {
    namespace Express {
        interface Request {
            project: IProject
        }
    }
}

export const validateProjectExists =  async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { projectId } = req.params;
    
    

    const project = await Project.findById(projectId);

    if (!project) {
      const error = new Error("Proyecto no encontrado");
      return res.status(404).json({ error: error });
    }

     // De esta manera creamos una propiedad personalizada para el request. Esto sirve para pasar informacion entre diferentes middleware que comparten la misma rut
    req.project = project

    //Si el proyecto existe se va al siguiente middleware
    next()
  } catch (error) {
    res.status(500).json({ error: "Hubo un error" });
  }
};
