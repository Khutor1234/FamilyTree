import { format } from 'date-fns';

export const countYears = (date: number, dateFrom?: number): number => {
  if (dateFrom) {
    return date - dateFrom;
  } else {
    const thisYear = +format(new Date(), 'yyyy');
    return thisYear - date;
  }
};
