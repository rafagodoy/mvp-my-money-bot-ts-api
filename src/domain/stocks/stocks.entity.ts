export namespace StocksEntity {
  export type companyName = string;
  export type codeName = string;
  export type actualPrice = number;
  export type lowPrice = number;
  export type highPrice = number;
  export type tradeDate = string;
  export type lastUpdate = string;
  export type price = lowPrice | highPrice | actualPrice;
  export type stockStatus = 'low' | 'high' | 'now';
}