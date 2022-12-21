export interface Job {
  positionTitle: string;
  companyName: string;
  address: string;
  applied: string;
  compensation: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected';
  interviews: string[];
  id: number;
}
