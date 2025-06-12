import { dbcontext } from "./app/context/dbContext";
import { backend_port } from "./config/config";
import { io, socketserver } from "./socket/socketServer";

/* Server Config */
const server = socketserver.listen(backend_port, () => {
    console.log(`App Running on port ${backend_port}`);
});

//db connection
dbcontext()
// Handling unhandled promise rejection
process.on('unhandledRejection', (error) => {
    console.log('UnhandleRejection is detected, shutting the server')
    if (server) {
        server.close(() => {
            process.exit(1)
        })
    }
    process.exit(1)
})


//handling uncaught exceptions
process.on('uncaughtException', (error) => {
    console.log('UncaughtException is detected, shutting the server')
    process.exit(1)
})


//Handling warning 
process.on('warning', (warn) => {
    console.log(`WARNING: ${warn.message}`)

})