import { format } from "date-fns";
import moment from "moment";

export const formatDate = (date: string) => {
  return date ? format(new Date(date), 'yyyy-MM-dd') : '';
}

export function capitalizeFirstLetter(str: any) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function formatDateWithMoment(dateString: any) {
  const formattedDate = moment(dateString).format("DD-MM-YYYY");

  return formattedDate;
}