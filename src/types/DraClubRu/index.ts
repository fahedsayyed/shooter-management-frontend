export interface IClub {
  id: number;
  type_of_association: string;
  name_of_association: string;
  district: string;
  approval_level: string;
}

export interface ISelectAssociationType {
  value: string;
  label: string;
}
