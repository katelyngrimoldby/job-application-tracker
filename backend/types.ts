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

export interface NewJob {
  positionTitle: string;
  company: string;
  location: string;
  applied: string;
  compensation: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  interviews: string[];
  jobDescription: string;
}
