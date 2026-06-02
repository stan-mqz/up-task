import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    const { projectId } = req.params;

    try {
      //El método findById() para un modelo permite buscar un doc por id de ese modelo
      const project = await Project.findById(projectId);

      if (!project) {
        const error = new Error("Proyecto no encontrado");
        return res.status(404).json({ error: error });
      }

      //Al instanciar el modelo y pasarle el body como payload crea un registro automaticamente
      const task = new Task(req.body);

      //Ahora guarda el proyecto al que pertenece
      task.project = project.id

      //Ademas, tenemos que crear la tarea en el proyecto
      project.tasks.push(task.id)

      
      await task.save();


      await project.save()
      res.send("Tarea creada correctamente");
      res.send(project);
    } catch (error) {
      console.log(error);
    }
  };
}
