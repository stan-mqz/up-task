import  express  from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db";
import ProjectRoutes from "./routes/projectRoutes"

dotenv.config()

connectDB()

const app = express()

//Esto permite que se pueda leer el json
app.use(express.json())

//Routes

app.use('/api/projects', ProjectRoutes)

export default app
