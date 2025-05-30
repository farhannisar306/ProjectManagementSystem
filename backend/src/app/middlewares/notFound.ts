/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {  Request, Response } from 'express';
import { NOT_FOUND } from '../utils/HTTPStatuses';

// Adding return type explicitly
const notFound = (req: Request, res: Response) => {
  res.status(NOT_FOUND).json({
    success: false,
    statusCode: NOT_FOUND,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
};

export default notFound;
