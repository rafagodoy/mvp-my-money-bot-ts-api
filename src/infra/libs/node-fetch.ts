import { API, APIRequest, APIResponse } from '@/infra/apis/protocols/api';
import fetch from 'node-fetch';

export class NodeFetch implements API {

  private url: string;

  private bodyParams: any;

  private headersParams: any;

  private pathParams: string;

  private queryParams: string;

  private apiParams: APIRequest;

  private setUrl(url: string) {
    this.url = url;
  }

  private setHeaders(headers?: any, authToken?: string) {
    if (!headers && authToken) {
      this.headersParams = {
        'Authorization': `Bearer ${authToken}`,
      };
    }
    this.headersParams = headers;    
  }

  private setQueryParams(queryParams: Array<any>) {
    if (queryParams) {
      this.queryParams = queryParams.map(obj => {
        const key = Object.keys(obj)[0];
        return `${key}=${obj[key]}`;
      }).join('&');
    }
  }

  private setPathParams(pathParams: string) {
    if (pathParams) {
      this.pathParams = pathParams;
    }
  }

  private setBodyParams(bodyParams: any) {
    if (bodyParams) {
      this.bodyParams = JSON.stringify(bodyParams);
    }
  }

  private setAPIParams(request: APIRequest) {
    
    this.setUrl(request.url);
    this.setHeaders(request.headers, request.authToken);
    this.setPathParams(request.pathParams);
    this.setQueryParams(request.queryParams);
    this.setBodyParams(request.body);
    
    this.apiParams = {
      ...this.apiParams,
      url: this.url,
    };

    if (this.headersParams) {
      this.apiParams = {
        ...this.apiParams,
        headers: this.headersParams,
      };
    }
    if (this.bodyParams) {
      this.apiParams = {
        ...this.apiParams,
        body: this.bodyParams,
      };
    }
    if (this.pathParams) {
      this.apiParams = {
        ...this.apiParams,
        url: `${this.url}${this.setPathParams(request.pathParams)}`,
      };
    }
    if (this.queryParams) {
      this.apiParams = {
        ...this.apiParams,
        url: `${this.url}${this.pathParams}?${this.queryParams}`,
      };
    }
  }

  private getAPIParams() {
    return this.apiParams;
  }

  async post(request: APIRequest): Promise<APIResponse> {

    this.setAPIParams(request);
    const apiParams = this.getAPIParams();
      
    const response = await fetch(
      apiParams.url,
      {
        ...apiParams,
        method: 'POST',
      },
    );

    return {
      status: 200,
      body: await response.json(),
    };
  }

  async get(request: APIRequest): Promise<APIResponse> {

    this.setAPIParams(request);
    const apiParams = this.getAPIParams();
      
    const response = await fetch(
      apiParams.url,
      {
        ...apiParams,
        method: 'GET',
      },
    );

    return {
      status: 200,
      body: await response.json(),
    };

  }
}