export interface DateUtils {
  parseToEnUs(date: Date): string,
  parseToPtBr(date: Date): string,
  isSameYearAsNow(date: Date): boolean,
  isValid(date: Date): boolean,
}