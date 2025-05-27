import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const ConnectToSQLDB = async () => {
    try {
        await prisma.$connect();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection error:', error);
        process.exit(1);
    }
};