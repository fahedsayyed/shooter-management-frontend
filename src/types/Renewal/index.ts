export interface IRenewal {
  id: number;
  shooterid: string;
  shootername: string;
  DRARCUNITMRA: string;
  renewalType: string;
  status: string;
  competition_category?: string;
  name_mscc_nscc?: string;
  match?: string;
  year?: string;
  score?: string; // Assuming score is represented as a string, modify accordingly
  medal_type?: string;
  view_certificate?: string;
}

export interface ISelectStatus {
  value: string;
  label: string;
}
