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
