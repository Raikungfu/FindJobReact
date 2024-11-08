export interface EmployeeProfile {
  UserId: number;
  Description: string;
  FirstName: string;
  LastName: string;
  Phone: string;
  Address?: string;
  City?: string;
  Region?: string;
  Country?: string;
  PostalCode?: string;
  Skills: string;
  Education: string;
  Experience: string;
  Language: string;
  Interest: string;
  SocialMedia: string;
  Status: string;
  Avt?: File | null;
  Cover?: File | null;
  CV?: File | null;
  CIFront?: File | null;
  CIBehind?: File | null;
}
export interface HiredEmployee {
  HireId: number;
  HireDate: string;  
  Status: string;
  JobId: number;
  EmployerId: number;
  EmployeeId: number;
  JobApplyId: number;
}
export const defaultProfile: EmployeeProfile = {
  UserId: 0,
  Description: "",
  FirstName: "",
  LastName: "",
  Phone: "",
  Skills: "",
  Education: "",
  Experience: "",
  Language: "",
  Interest: "",
  SocialMedia: "",
  Status: "",
  Avt: null,
  Cover: null,
  CV: null,
  CIFront: null,
  CIBehind: null,
};
export interface EmployerProfile {
  EmployerId: number;
  Name?: string;
  Description?: string;
  CompanyName?: string;
  CompanyDescription?: string;
  CompanyWebsite?: string;
  CompanyLogo?: string;
  CompanyLocation?: string;
  CompanyContact?: string;
  CompanyEmail?: string;
  CompanyPhone?: string;
  CompanyType?: string;
  CompanySize?: string;
  CompanyIndustry?: string;
  CompanyFounded?: string;
  CompanyMission?: string;
  CompanyVision?: string;
  CompanyValues?: string;
  CompanyBenefits?: string;
  CompanyProjects?: string;
  CompanyServices?: string;
  Avt?: string; // Avatar
  Cover?: string; // Cover image
  CiFront?: string; // Company Identification Front
  CiBehind?: string; // Company Identification Behind
  UserId: number;
}
export interface ProfileUser {
  employer?: EmployerProfile,
  employee?: EmployeeProfile,
  Email?: String,
  Phone?: String,
  UserType?: String,
  UserId?: number,
  Username?: String,
  Gender?: String,
}