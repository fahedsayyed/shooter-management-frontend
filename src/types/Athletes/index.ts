export interface IAthlete {
  id: number;
  draRcUnit: string;
  shootername: string;
  status: string;
  email: string;
}

export interface IProfileBannerProps {
  athleteId: any; // Change the type based on your actual use case
}

export interface ICoachDetailsProps {
  key: React.Key; // Adjust the type based on the actual type of your key
}

export interface IWeaponDetailsProps {
  key: React.Key; // Adjust the type based on the actual type of your key
}
