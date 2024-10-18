export interface EmployeeFormData {
    FirstName: string;
    LastName: string;
    Phone: string;
    Skills: string;
    Description: string;
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