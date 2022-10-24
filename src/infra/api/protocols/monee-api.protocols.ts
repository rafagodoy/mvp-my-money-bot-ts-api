export interface MoneeApiResponse {
  status: number,
  body: {
    coin: string,
    convertedTo: string,
    entryValue: number,
    responseValue: number
  }
}