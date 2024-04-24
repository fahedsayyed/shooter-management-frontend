export interface INationalMedalist {
  id: number;
  shooterid?: string;
  shootername?: string;
  competitionname?: string;
  medalisttype?: string;
  status?: string;
  competition_category?: string;
  name_mscc_nscc?: string;
  match?: string;
  year?: string;
  score?: string;
  medal_type?: string;
  view_certificate?: string;
}

export interface ISelectMedalistType {
  value: string;
  label: string;
}

export interface ISelectStatus {
  value: string;
  label: string;
}
