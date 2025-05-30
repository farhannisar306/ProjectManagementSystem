// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();
// export const ConnectToSQLDB = async () => {
//     try {
//         await prisma.$connect();
//         console.log('Database connected successfully');
//     } catch (error) {
//         console.error('Database connection error:', error);
//         process.exit(1);
//     }
// };

// import { database_host, database_user, database_password, database_name } from "../config/config";

// Connect using mysql2
const mysql = require('mysql2');

export const dbcontext = () => {
    mysql.createConnection({
        host: 'localhost',
        user: 'instabrix',
        password: 'instabrix_306',
        database: 'instabrix_project_management',
        port: 3306,
        connectTimeout: 10000
    }).connect((err: Error) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL ');
    });
}