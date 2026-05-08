import { Request, Response, NextFunction, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { ParamsDictionary } from 'express-serve-static-core';

interface JwtPayload {
  id: string;
  role: string;
}

export interface AuthedRequest<Body = any, Params extends ParamsDictionary = ParamsDictionary> extends Request<Params, any, Body> {
  user?: JwtPayload;
}

export const authMiddleware: RequestHandler = (req, res: Response, next: NextFunction) => {
  const authedReq = req as AuthedRequest;
  const authHeader = req.headers.authorization as string | undefined;
  if (!authHeader) return res.status(401).json({ message: 'Missing auth header' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Invalid auth header' });

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    console.error('Missing JWT_SECRET environment variable');
    return res.status(500).json({ message: 'Server misconfiguration' });
  }

  try {
    const payload = jwt.verify(token, secret) as JwtPayload;
    authedReq.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export function requireRole(...roles: string[]) {
  return (req: AuthedRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    if (req.user.role === 'admin') return next();
    if (roles.includes(req.user.role)) return next();
    return res.status(403).json({ message: 'Forbidden' });
  };
}
