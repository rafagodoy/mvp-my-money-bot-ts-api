type APIError = {
  name: string
  code: string
  message: string
  stack?: string
};

export type APIRequest = {
  urlParams: string
  token: string
  body?: unknown
};

export type APIResponse = {
  status: number
  body?: unknown
  error?: APIError
};

export interface API {
  post(settings: APIRequest): Promise<APIResponse>
}