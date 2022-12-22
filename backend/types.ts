import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface Signature extends JwtPayload {
  id: number;
  username: string;
  name: string;
}

export interface RequestUserAuth extends Request {
  decodedToken?: Signature;
}
