export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  professor: string;
  branch: string;
  semester: number;
  credits: number;
  type: 'core' | 'elective';
  averageRating: number;
  difficulty: 'easy' | 'moderate' | 'hard';
  totalReviews: number;
  facilities: number; // 1-5 rating
  teaching: number; // 1-5 rating
}

export interface Review {
  id: string;
  courseId: string;
  studentName?: string;
  isAnonymous: boolean;
  overallRating: number;
  difficultyRating: number;
  facilitiesRating: number;
  teachingRating: number;
  feedback: string;
  date: string;
  helpful: number;
}

export interface Branch {
  id: string;
  name: string;
  code: string;
}

export interface SearchFilters {
  branch?: string;
  semester?: number;
  type?: 'core' | 'elective' | 'all';
  difficulty?: 'easy' | 'moderate' | 'hard' | 'all';
  minRating?: number;
}
