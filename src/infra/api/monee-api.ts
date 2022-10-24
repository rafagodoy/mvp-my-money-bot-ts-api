import { NodeFetch } from '../libs/node-fetch';
import { MoneeApiResponse } from './protocols/monee-api.protocols';
import { ConvertCurrencyAPI, ConvertCurrencyAPIRequest } from '@/adapters/api/protocols';

export class MoneeApi implements ConvertCurrencyAPI {
  private readonly urlAPI = 'http://demo8373629.mockable.io';

  constructor(private readonly nodeFetch: NodeFetch) {}

  async convert(settings: ConvertCurrencyAPIRequest): Promise<number> {
    const response = await this.nodeFetch.get({
      urlParams: `${this.urlAPI}/generate-curency`,
      token: settings.token,
    }) as MoneeApiResponse;

    return response.body.responseValue;
  }
}