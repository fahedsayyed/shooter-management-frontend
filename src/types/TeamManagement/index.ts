export interface ITeamManagement {
  id: number;
  competitionName: string;
  eventName: string;
  representation: string;
  paymentStatus: string;
  status: string;
}

export interface IModalContent {
  tenanttype: string;
  eventname: string;
  club: string;
  receiptno: string;
  amount: string;
}
