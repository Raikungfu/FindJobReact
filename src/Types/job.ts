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
  CompanyName?: string;
  CompanyLogo?: string;
  CompanyLocation?: string;
  CompanyIndustry?: string;
}

export interface JobCategory_Response {
  JobCategoryId: number;
  JobCategoryName?: string;
  Image?: string;
  Cover?: string;
  JobCategoryDescription?: string;
  Selected?: boolean;
}
