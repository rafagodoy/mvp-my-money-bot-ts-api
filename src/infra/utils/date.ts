export class DateFormat {

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
}