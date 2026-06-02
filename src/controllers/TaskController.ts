import { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";

export class TaskController {
  static createTask = async (req: Request, res: Response) => {
    try {
      //Al instanciar el modelo y pasarle el body como payload crea un registro automaticamente
      const task = new Task(req.body);

      //Ahora guarda el proyecto al que pertenece
      task.project = req.project.id;

      //Ademas, tenemos que crear la tarea en el proyecto
      req.project.tasks.push(task.id);

      await task.save();

      await req.project.save();
      res.send("Tarea creada correctamente");
    } catch (error) {
      console.log(error);
    }
  };
}
