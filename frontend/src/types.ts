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
  userId: number;
  notes: string;
  jobId: string;
}

export interface Interview {
  id: number;
  contact?: string;
  time: Date;
  website?: string;
  notes: string;
  applicationId: number;
  userId: number;
}

export interface BasicFile {
  filename: string;
  fileData: string;
}

export interface ApplicationFile extends BasicFile {
  id: number;
  applicationId: number;
}

export interface InterviewFile extends BasicFile {
  id: number;
  interviewId: number;
}

export interface User {
  name: string;
  token: string;
}

export type NewApplication = Omit<Application, 'id' | 'userId' | 'applyDate'>;
export type NewInterview = Omit<Interview, 'id' | 'userId'>;
export type NewApplicationFile = Omit<ApplicationFile, 'id'>;
export type NewInterviewFile = Omit<InterviewFile, 'id'>;
