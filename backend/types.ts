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

export enum Status {
  Applied = 'applied',
  Assessments = 'assesments',
  Interviewing = 'interviewing',
  Offered = 'offered',
  Rejected = 'rejected',
}

export interface NewApplication {
  positionTitle: string;
  company: string;
  location: string;
  status: Status;
  files: File[];
  notes: string;
  jobId: string;
}

export interface NewInterview {
  applicationId: number;
  contact: string;
  time: Date;
  website: string;
  files: File[];
  notes: string;
}

export interface NewUser {
  username: string;
  name: string;
  password: string;
}

export interface AuthUser {
  username: string;
  password: string;
}
