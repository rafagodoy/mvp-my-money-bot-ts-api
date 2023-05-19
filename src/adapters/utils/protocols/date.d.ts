export type regionOptions = 'EnUs' | 'PtBr';

export interface DateParser {
  EnUs(date: Date): string;
  PtBr(date: Date): string;
}

export interface DateUtils {
  isSameYearAsNow(date: Date): boolean,
  isValid(date: Date): boolean,
  getLastAvailable(region: regionOptions, date?: Date | string): string,
  getNow(region: regionOptions): string,
  setYearToNow(date: Date, region: regionOptions): string
}