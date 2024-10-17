import { JobType } from "./constant";

export interface JobList_Response {
  JobId: number;
  Title: string;
  JobCategoryName: string;
  JobType: JobType;
  Salary?: number;
  DateFrom?: string;
  DateTo?: string;
  Description?: string;
  Location?: string;
  JobDescription?: string;
  CompanyName?: string;
  CompanyLogo?: string;
  CompanyLocation?: string;
  CompanyIndustry?: string;
}
export interface PostJob_Request {
  Title: string;
  Description?: string;
  Salary?: number;
  DateFrom: string;
  DateTo: string;
  JobType: JobType; 
  JobCategoryId: number; 
  EmployerId: number; 
}
export interface JobCategory_Response {
  id: number;
  JobCategoryId: number;
  JobCategoryName?: string;
  Image?: string;
  Cover?: string;
  JobCategoryDescription?: string;
  Selected?: boolean;
}
