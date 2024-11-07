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
// src/Types/job.ts

export interface JobApplyDetail {
  JobApplyId: number;
  ApplyDate: string; // Có thể đổi sang Date nếu cần
  EmployeeId: number;
  LastName: string;
  FirstName: string;
  Phone: string;
  Status: string;
  Avt: string; // Đường dẫn đến ảnh đại diện
  Cover: string; // Đường dẫn đến ảnh bìa
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
