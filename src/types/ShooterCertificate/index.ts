export interface EventRow {
  id: string;
  EventNo: string;
  EventName: string;
  scoreType: string;
  total: string;
  position: string;
  medal: string;
  score: string;
  mqs: string;
  finalScore: string;
  EventType: string;
}

export interface IShooterCertificate {
  year: string;
  shootername: string;
  sealtype: string;
  signatory: string;
  competition: string;
  conductedby: string;
  signaturetype: string;
}

export interface ISelectRole {
  value: string;
  label: string;
}
export interface ISelectSeal {
  value: string;
  label: string;
}
export interface ISelectYear {
  value: string;
  label: string;
}
export interface ISelectCompetition {
  value: string;
  label: string;
}
export interface ISelectShooterName {
  value: string;
  label: string;
}
