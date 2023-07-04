export class GatewayTimeoutError extends Error {
  
  constructor(resourceName: string, message: string) {
    super(`A time out error is happening from ${resourceName} - details: ${message}`);
    this.name = 'GatewayTimeoutError';
  }
}