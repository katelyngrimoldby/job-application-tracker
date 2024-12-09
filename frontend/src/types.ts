export interface Application {
  positionTitle: string;
  company: string;
  location: string;
  status: 'applied' | 'assessments' | 'interviewing' | 'offered' | 'rejected';
  applyDate: Date;
  assessmentDate: Date | null;
  interviewDate: Date | null;
  offerDate: Date | null;
  rejectionDate: Date | null;
  id: number;
  files: string[];
  userId: number;
  notes: string;
  jobId: string;
}

export interface Interview {
  id: number;
  contact?: string;
  time: Date;
  website?: string;
  files: string[];
  notes: string;
  applicationId: number;
  userId: number;
}

export interface User {
  name: string;
  token: string;
}

export type NewApplication = Omit<Application, 'id' | 'userId' | 'applyDate'>;
export type NewInterview = Omit<Interview, 'id' | 'userId'>;
