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
  Image?: File | null;
  Resume?: File | null;
  CIFront?: File | null;
  CIBehind?: File | null;
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
  Image: null,
  Resume: null,
  CIFront: null,
  CIBehind: null,
};