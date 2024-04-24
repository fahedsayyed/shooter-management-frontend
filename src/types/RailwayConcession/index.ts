export interface IRailwayConcession {
  id: number;
  shooterid?: string;
  shootername?: string;
  from?: string;
  to?: string;
  competition_type?: string;
}

export interface ISelectCompetitionType {
  value: string;
  label: string;
}

export interface ISelectShooterName {
  value: string;
  label: string;
}
