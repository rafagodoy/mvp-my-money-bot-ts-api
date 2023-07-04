export class BadRequestError extends Error {
  
  constructor(paramName: string) {
    super(`Missing param: ${paramName}`);
    this.name = 'BadRequestError';
  }
}