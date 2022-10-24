import { API, APIRequest, APIResponse } from '@/adapters/api/protocols';
import fetch from 'node-fetch';

export class NodeFetch implements API {

  private setHeaders(token: string) {
    return {
      'Authorization': `Bearer ${token}`,
    };
  }

  async post(settings: APIRequest): Promise<APIResponse> {
    try {
      const response = await fetch(
        settings.urlParams,
        {
          method: 'POST',
          body: JSON.stringify(settings.body),
          headers: this.setHeaders(settings.token),
        },
      );

      return {
        status: 200,
        body: await response.json(),
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async get(settings: APIRequest): Promise<APIResponse> {
    try {
      const response = await fetch(
        settings.urlParams,
        {
          method: 'GET',
          headers: this.setHeaders(settings.token),
        },
      );

      return {
        status: 200,
        body: await response.json(),
      };
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}