export interface IUser {
  id: number;
  DRARCUnit?: string;
  lastname: string;
  firstname: string;
  email: string;
  role: string;
  mob?: string;
  gender?: string;
  competition?: string;
}

export interface inputDataType {
  value: string;
  label: string;
}
