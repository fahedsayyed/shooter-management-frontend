export interface IDetails {
  comp_id: any;
  event_group: string;
  lane: string;
  reserved_lane: string;
  defective_lane: string;
  preparation_time: string;
  event_time: string;
  changeover_time: string;
  competition_name: string;
  start_date: string;
  end_date: string;
  detailone?: string;

}

export interface ICreateDetails {
  detailone: string;
}

export interface IselectCompetition {
  value: string;
  label: string;
}
