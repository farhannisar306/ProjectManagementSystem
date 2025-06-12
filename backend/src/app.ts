import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import routes from "./app/routes/routes";
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

import './app/lib/passport'
import { api_version, base_url, frontend_url } from './config/config';


const app: Application = express();

/* app default middlewares */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: frontend_url,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "Origin"],
  exposedHeaders: ["Content-Length"],
  credentials: true
}));



app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome habibi' });
});

/* application routes */
app.use(`/api/${api_version}`, routes);

/* custom middlewares */

app.use(globalErrorHandler);
// not found route
app.use('/*path', notFound);


export default app;
