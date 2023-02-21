export interface BestMatch {
  '1. symbol': string;
  '2. name': string;
  '3. type': string;
  '4. region': string;
  '5. marketOpen': string;
  '6. marketClose': string;
  '7. timezone': string;
  '8. currency': string;
  '9. matchScore': string;
}

export type GetStockNameAPIRequest = {
  pathParams?: string,
  queryParams: Array<unknown>
};

export interface GetStockNameAPIResponse {
  bestMatches: BestMatch[];
}