import { NextFunction, Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  //Los metodos estaticos no se instancian
  static getAllProjects = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      //Esta variable le indica al modelo que haga una consulta y los datos se almacenaran en ella
      const projects = await Project.find({});
      res.json(projects);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  static getProjectById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      //Esta variable le indica al modelo que haga una consulta y los datos se almacenaran en ella
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error });
      }

      res.json(project);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  static updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;

      //findByIdAndUpdate(id, payload): Este método encuentra el documento y actualiza con el payload
      const project = await Project.findByIdAndUpdate(id, req.body);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error });
      }

      await project.save();
      res.send("Proyecto actualizado correctamente");

      res.json(project);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };

  static createProject = async (req: Request, res: Response) => {
    //Creamos una instancia del modelo la cual recibiria los params del request
    const project = new Project(req.body);

    try {
      //De esta manera lo guardamos en la base de datos
      await project.save();

      //send envía un string normal
      res.send("Proyecto creado correctamente");
    } catch (error) {
      console.log(error);
    }
  };

  static deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const { id } = req.params;
    try {
      const project = await Project.findById(id);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error });
      }

      //el método .deleteOne() permite eliminar el registro encontrado
      await project.deleteOne();

      res.send("Proyecto eliminado correctamente");
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
