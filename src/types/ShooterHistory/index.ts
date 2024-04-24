export interface IShooterHistory {
  id: number;
  shooter_id: string;
  shooter_name: string;
  gender: string;
  dob: string;
  email: string;
  phone: string;
  state: string;
  address: string;
  events: string;
  club_name: string;
  shoe_size: string;
  weight: string;
  track_suit_size: string;
  trained_by: string;
  gold_medal: string;
  silver_medal: string;
  bronze_medal: string;
}

export interface ISelectShooterName {
  value: string;
  label: string;
}
