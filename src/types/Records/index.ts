export interface IRecords {
  id: number;
  EventName: string;
  CompetitionName: string;
  ShooterName: string;
  score: number;
  role: string;
}

export interface Competition {
  type: string;
  shooter: string;
}
