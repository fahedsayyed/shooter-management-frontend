export interface ICoachingCamp {
  id: number;
  camp_name: string;
  place: string;
  start_date: string;
  end_date: string;
  shooter_name?: string;
}

export interface ISelectShooterName {
  value: string;
  label: string;
}
