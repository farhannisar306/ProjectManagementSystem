import { Request, Response } from 'express';
import { HTTPResponse } from '../utils/HTTPResponseHandler';

const notFound = (req: Request, res: Response) => {
  const response = new HTTPResponse(res);
  response.notFound("Not Found", {
    success: false,
    path: req.originalUrl
  })
};

export default notFound;
