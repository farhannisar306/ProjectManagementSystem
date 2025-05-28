import { Router } from 'express';
import fs from "fs";
import path from "path";

const router = Router();

const routesPath = path.join(__dirname, 'Application-Files/routes');

fs.readdirSync(routesPath).forEach((file) => {
    if (file.endsWith('Routes.ts')) {
        const route = require(path.join(routesPath, file));
        const formattedFileName = file.replace(/Routes\.ts$/, '');
        const routeName = '/' + formattedFileName.toLowerCase();
        router.use(routeName, route.default || route);
    }
});

export default router;