export type Application = {
  id: string;
  applicant_name: string;
  status: string;
  assigned_reviewer_name: string | null;
};
export interface Application_id {
  id: string;
  applicant_name: string;
  status: string;
  school: string;
  studnet_id: string;
  country: string;
  degree: string;
  leetcode_handle: string;
  codeforces_handle: string;
  essay_why_a2sv: string;
  essay_about_you: string;
  resume_url: string;
  submitted_at: string;
  updated_at: string;
}

export type Reviewer = {
  id: string;
  full_name: string;
  email: string;
};

export type ReviewerResponse = {
  success: boolean;
  data: {
    reviewers: Reviewer[];
    total_count: number;
  };
};
export type Feedback = {
  id: string;
  application_id: string;
  reviewer_id: string;
  activity_check_notes: string;
  resume_score: number;
  essay_why_a2sv_score: number;
  essay_about_you_score: number;
  technical_interview_score: number;
  behavioral_interview_score: number;
  interview_notes?: string;
  created_at: string;
  updated_at: string;
}