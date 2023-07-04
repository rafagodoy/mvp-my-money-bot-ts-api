import { DateUtils, DateParser, regionOptions } from '@/adapters/utils/protocols';

export class DateAdapter implements DateUtils {

  parseTo: DateParser = {
    EnUs(date: Date) {
      const year = date.getFullYear().toString().padStart(4, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${year}-${month}-${day}`;
    },
    
    PtBr(date: Date) {
      const year = date.getFullYear().toString().padStart(4, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');

      return `${day}/${month}/${year}`;
    },
  };

  isSameYearAsNow(date: Date) {
    const inputDate = new Date(date);
    const dateNow = new Date();
  
    return inputDate.getFullYear() === dateNow.getFullYear();
  }

  isValid(date: Date) {
    const dateParsed = new Date(date);

    return !isNaN(dateParsed.getTime());
  }

  getNow(region: regionOptions) {
    const now = new Date();

    return this.parseTo[region](now);
  }

  getLastAvailable(region: regionOptions, date = null) {
    const oneDay = 24 * 60 * 60 * 1000;

    if (!date) {
      date = new Date();
      date.setTime(date.getTime() - oneDay);
    }

    date = new Date(date);

    if (date.getDay() === 6) { // Saturday
      date.setTime(date.getTime() - oneDay); // Move back one day to Friday
    }
    if (date.getDay() === 0) { // Sunday
      date.setTime(date.getTime() - 2 * oneDay); // Move back two days to Friday
    }

    return this.parseTo[region](date);
  }

  setYearToNow(date: Date, region: regionOptions) {
    const now = new Date();
    const currentYear = now.getFullYear();
    const dateToFormat = new Date(date);

    const isSameYear = this.isSameYearAsNow(date);

    if (!isSameYear) {
      dateToFormat.setFullYear(currentYear);
    }

    return this.parseTo[region](dateToFormat);
  }

  getNowAndConvertToTimeStamp() {
    const now = new Date();
    return now.getTime();
  }
}