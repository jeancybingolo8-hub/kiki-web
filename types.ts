
export enum UserRole {
  CANDIDATE = 'CANDIDATE',
  RECRUITER = 'RECRUITER',
}

export enum ApplicationStatus {
  APPLIED = 'Applied',
  PRE_SELECTED = 'Pre-selected',
  INTERVIEW = 'Interview',
  REJECTED = 'Rejected',
  HIRED = 'Hired',
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  industry: string;
}

export interface Job {
  id: string;
  title: string;
  company: Company;
  location: string;
  salary: string;
  type: 'Full-time' | 'Part-time' | 'Contract';
  description: string;
  responsibilities: string[];
  qualifications: string[];
  postedDate: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatar: string;
  headline: string;
  email: string;
  phone?: string;
  skills: string[];
  experience: string;
  education: string;
}

export interface Application {
  id: string;
  job: Job;
  candidate: Candidate;
  status: ApplicationStatus;
  appliedDate: string;
}

export interface AIAnalysisResult {
    bestMatches: {
        candidateId: string;
        rank: number;
        justification: string;
        score: number;
    }[];
}