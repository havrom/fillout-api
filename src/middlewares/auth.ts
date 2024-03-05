import { NextFunction, Request, Response } from 'express';

const AUTH_TOKEN = process.env.AUTH_TOKEN;

const responseHandler = (req: Request, res: Response, next: NextFunction) => {
  const [_, token] = (req.headers.authorization || '').split(' ');
  // get token from req headers first
  if (!token) {
    // if none provided - get token from env
    if (AUTH_TOKEN) {
      // set auth header with token from env
      req.headers.authorization = `Bearer ${AUTH_TOKEN}`;
      next();
    } else {
      // throw 400 if no token provided at all
      res.status(400).json({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Auth token not provided',
      });
    }
  } else {
    next();
  }
};

export default responseHandler;
