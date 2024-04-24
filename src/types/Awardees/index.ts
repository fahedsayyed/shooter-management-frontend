export interface IAwardees {
  id: number;
  shooterID: string;
  shooterName: string;
  AwardType: string;
}

export interface IAddAwardees {
  shootername: string;
  award: string;
  certificate: string;
  description: string;
}

export interface IEditAwardees {
  name: string;
  event: string;
}

export interface ISelectShooterName {
  value: string;
  label: string;
}
export interface ISelectAward {
  value: string;
  label: string;
}
