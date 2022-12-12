import { HttpRequest, HttpResponse, HttpController } from '@/presentation/protocols';
import { ConvertCurrency } from '@/domain/currencies';

export class ConvertCurrencyController implements HttpController {

  constructor(
    private readonly convertCurrency: ConvertCurrency,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const { body, token }: any = httpRequest;
      
      const valueConverted = await this.convertCurrency.convert(
        token,
        {
          currency: body.currency,
          convertTo: body.convertTo,
          value: body.value,
        },
      );

      return {
        statusCode: 200,
        body: {
          valueConverted,
        },
      };
    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: 'An error ocurred',
      };
    }
  }
}