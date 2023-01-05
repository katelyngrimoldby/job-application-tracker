export interface Job {
  positionTitle: string;
  company: string;
  location: string;
  applied: string;
  compensation: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  interviews: string[];
  id: number;
  jobDescription: string;
  userId: number;
}

export interface User {
  name: string;
  token: string;
  username: string;
}

export type NewJob = Omit<Job, 'id' | 'userId'>;
