// Enum for OrderStatus
export enum OrderStatus {
  Pending = "Pending",
  Completed = "Completed",
  Canceled = "Canceled",
}

export enum PaymentMethod {
  CreditCard = "CreditCard",
  PayPal = "PayPal",
  BankTransfer = "BankTransfer",
}

export enum PaymentStatus {
  Pending = "Pending",
  Completed = "Completed",
  Failed = "Failed",
}

export interface JobService {
  JobServiceId?: number;
  ServiceName?: string;
}

export interface User {
  UserId?: number;
}

export interface Order {
  OrderId: number;
  Description?: string;
  Price: number;
  OrderDate?: Date;
  DateFrom?: Date;
  DateTo?: Date;
  JobServiceId?: number;
  JobService?: JobService;
  UserId?: number;
  User?: User;
  OrderStatus: OrderStatus;
  PaymentMethod?: PaymentMethod;
  PaymentDate?: Date;
  PaymentRef?: string;
  PaymentStatus: PaymentStatus;
}
