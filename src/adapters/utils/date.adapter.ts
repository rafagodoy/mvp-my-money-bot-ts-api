import { DateUtils } from '@/adapters/utils/protocols';

export class DateAdapter implements DateUtils {

  parseToEnUs(date: Date) {
    return date.toLocaleDateString('default', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }).replace(/\//g, '-');
  }
  
  parseToPtBr(date: Date) {
    return date.toLocaleDateString('default', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).replace(/\//g, '-');
  }
  
  isSameYearAsNow(date: Date) {
    const inputDate = new Date(date);
    const dateNow = new Date();
  
    return inputDate.getFullYear() === dateNow.getFullYear();
  }

  isValid(date: Date) {
    const dateParsed = new Date(date);

    return !isNaN(dateParsed.getTime());
  }
}