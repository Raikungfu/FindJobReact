export interface EmployeeProfile {
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
  employerId: number;
  name?: string;
  description?: string;
  companyName?: string;
  companyDescription?: string;
  companyWebsite?: string;
  companyLogo?: string;
  companyLocation?: string;
  companyContact?: string;
  companyEmail?: string;
  companyPhone?: string;
  companyType?: string;
  companySize?: string;
  companyIndustry?: string;
  companyFounded?: string;
  companyMission?: string;
  companyVision?: string;
  companyValues?: string;
  companyBenefits?: string;
  companyProjects?: string;
  companyServices?: string;
  avt?: string; // Avatar
  cover?: string; // Cover image
  ciFront?: string; // Company Identification Front
  ciBehind?: string; // Company Identification Behind
  userId: number;
}
