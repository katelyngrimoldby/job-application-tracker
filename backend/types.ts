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
  notes: string;
  jobId: string;
}

export interface NewInterview {
  applicationId: number;
  contact: string;
  time: Date;
  website: string;
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

interface NewFile {
  filename: string;
  fileData: string;
}

export interface NewApplicationFile extends NewFile {
  applicationId: number;
}

export interface NewInterviewFile extends NewFile {
  interviewId: number;
}
