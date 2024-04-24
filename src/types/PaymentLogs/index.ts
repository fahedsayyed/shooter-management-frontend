export interface IPaymentLogs {
  id: number;
  competition_name: string;
  shooter_name: string;
  dra_club_ru: string;
  transaction_id: string;
  payment_date: string;
  amount: string;
  status: string;
} // This makes the file a module

export interface ISelectPaymentLogs {
  value: string;
  label: string;
}
