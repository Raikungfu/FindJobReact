export enum JobServiceType {
  ForHire = "For Hire",
  ForSale = "For Sale",
  ForEmployee = "For Employee",
  ForEmployer = "For Employer",
  Service = "Service",
  Product = "Product",
  Subscription = "Subscription",
  Membership = "Membership",
  Other = "Other",
}

export interface JobService {
  JobServiceId: number;
  ServiceName: string;
  Description?: string;
  Image?: string;
  Price: number;
  Duration?: number;
  jobServiceType: JobServiceType;
}

export interface JobServiceListProps {
  jobServices: JobService[];
}
