export interface HttpResponse {
  statusCode: number,
  body: unknown,
  errorStackTrace?: string
}

export interface HttpRequest {
  token?: string,
  queryStringParams?: unknown,
  pathParams?: unknown,
  body?: unknown
}