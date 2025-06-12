import { database_host, database_name, database_password, database_port, database_username } from "../../config/config";

const mysql = require('mysql2');

export const dbcontext = () => {
    mysql.createConnection({
        host: database_host,
        user: database_username,
        password: database_password,
        database: database_name,
        port: database_port,
        connectTimeout: 10000
    }).connect((err: Error) => {
        if (err) {
            console.error('Error connecting to MySQL:', err);
            return;
        }
        console.log('Connected to MySQL');
    });
}