import mongoose, { Schema, Document, PopulatedDoc, Types} from "mongoose";
import { ITask } from "./Task";

//Creamos un type que heradara todas las funciones y tipos de document (Esto es para ts)
export interface IProject extends Document  {
  id: Types.ObjectId
  projectName: string;
  clientName: string;
  description: string;

  //Esto PopulatedDoc<> nos sirve para poder dejarle saber a ts que esta relacionado a otro modelo. Esto es un subdocument
  tasks:  PopulatedDoc<ITask & Document>[]

};

//Este es el schema de mongo
const ProjectSchema: Schema = new Schema({
  projectName: {
    type: String,
    required: true,
    //Recorta el espacio al inicio y al final
    trim: true,
    unique: true,
  },

  clientName: {
    type: String,
    required: true,
    //Recorta el espacio al inicio y al final
    trim: true,
  },

  description: {
    type: String,
    required: true,
    //Recorta el espacio al inicio y al final
    trim: true,
  },

  //Asi mongo db sabe que esto sera un arreglo

  tasks : [
    {
      type: Types.ObjectId,
      ref: "Task"
    }
  ]
}, {timestamps: true});


//Una vez creado el type y schema ya podemos crear nuestro modelo
const Project = mongoose.model<IProject>('Project', ProjectSchema)
export default Project