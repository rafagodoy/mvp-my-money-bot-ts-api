export class BadGatewayError extends Error {
  
  constructor(resourceName: string, message: string) {
    super(`An external error is hapenning from ${resourceName} - details: ${message}`);
    this.name = 'BadGatewayError';
  }
}