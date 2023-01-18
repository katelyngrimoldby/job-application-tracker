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
  notes: string;
  contacts: { name: string; email: string; number: string }[];
}

export interface User {
  name: string;
  token: string;
}

export type NewJob = Omit<Job, 'id' | 'userId'>;
