export interface CompetitionDetail {
  category: string;
  competitionName: string;
  competitionCode: string;
  mqs: string;
  target: string;
  creation: string;
  fromDate: null | Date;
  toDate: null | Date;
  registrationStart: null | Date;
  registrationEnd: null | Date;
  eligibilityDate: null | Date;
  lateFeeEndDate: null | Date;
  place: string;
  conductedBy: string;
  district: string;
  preferrd: string;
}

export interface EventDetail {
  competitionCategory: string;
  eventType: string;
  eventTypeName: string;
  eventNumber: string;
  eventName: string;
  ageGroup: string;
  isMixed: boolean;
  isPara: boolean;
  eventFee: string;
  teamFee: string;
  penaltyPercentage: string;
  stateMQS: string;
  isFinal: boolean;
  numberOfFinals: string;
  numberOfShots: string;
  maxShots: string;
  qualification: any;
}
