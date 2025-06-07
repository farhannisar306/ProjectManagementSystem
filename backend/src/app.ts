import cookieParser from 'cookie-parser';
import express, { Application, Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";

import routes from "./app/routes/routes";
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

/* app default middlewares */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Length"],
  credentials: true
}));



app.get('/', (req: Request, res: Response) => {
  res.cookie('balerToken', 'amar_baler_token', { httpOnly: true, secure: true, sameSite: 'strict' });
  res.json({ message: 'Welcome habibi' });
});

/* application routes */
app.use(`/api/v1`, routes);

/* custom middlewares */

app.use(globalErrorHandler);
// not found route
app.use('/*path', notFound);


export default app;
