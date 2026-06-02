import mongoose, { Schema, Document, Types } from "mongoose";



//Creamos un diccionario de propiedades read-only
const taskStatus = {
  PENDING: 'pending',
  ON_HOLD: 'onHold',
  IN_PROGRESS: 'inProgress',
  UNDER_REVIEW: 'underReview',
  COMPLETE: 'complete'
} as const

//Ahora creamos el type que solo acepete los values 
export type TaskStatus = typeof taskStatus[keyof typeof taskStatus]

//Primero creamos la interfaz
export interface ITask extends Document {
  id: Types.ObjectId;
  name: string;
  description: string;

  //Cada tarea tendra un proyecto. Types. da acceso a los diferentes tipos de dato de mong  
  project: Types.ObjectId

  status: TaskStatus
}

//Luego creamos el schema de mongo

export const TaskSchema: Schema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },

  description: {
    type: String,
    trim: true,
    required: true,
  },

  project: {
    type: Types.ObjectId,
    //Esto le indica a mongo a que esquema esta relacionado este dato
    ref: 'Project'
  },


  status: {
    type: String,
    //Esto sirve para que solo puedas almacenar datos que cumplan con el type
    enum: Object.values(taskStatus),
    default: taskStatus.PENDING
  }

  //Esto indica cuando se modifica un documentoa
}, {timestamps: true});


//Por ultimo, con un generico le indicamos que tome los datos de la interfaz y se apliquen al schema
const Task = mongoose.model<ITask>('Task', TaskSchema)

export default Task
