import colors from 'colors'
import server from './server'


const port = process.env.PORT || 4000

server.listen(port, () => {
    console.log(colors.cyan.bold(`REST API en el puerto 4000`))
})

//mongodb+srv://moscarstanley37_db_user:root@cluster0.iclmzy5.mongodb.net/