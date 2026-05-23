import mongoose, { Schema, Document } from "mongoose";

//Creamos un type que heradara todas las funciones y tipos de document (Esto es para ts)
export type ProjectType = Document & {
  projectName: string;
  clientName: string;
  description: string;
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
});


//Una vez creado el type y schema ya podemos crear nuestro modelo
const Project = mongoose.model<ProjectType>('Project', ProjectSchema)
export default Project