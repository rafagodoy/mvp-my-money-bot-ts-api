export class CustomError extends Error {
  httpCode: number;

  constructor(error: Error, httpCode: number) {
    const { name, message } = error;
    super(message);
    this.name = name;
    this.httpCode = httpCode;
  }
}