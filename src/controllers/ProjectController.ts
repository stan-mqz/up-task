import { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
  //Los metodos estaticos no se instancian
  static getAllProjects = async (req: Request, res: Response) => {
    try {

        //Esta variable le indica al modelo que haga una consulta y los datos se almacenaran en ella
        const projects = await Project.find({})
        res.json(projects)

    } catch (error) {
        console.log(error)
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
}
