import { HttpRequest, HttpResponse, HttpController } from '@/presentation/protocols';
import { GetStockNameSchema } from '@/presentation/validation/get-stock-name';
import { GetStockNameUseCase } from '@/domain/stocks';

export class GetStockNameController implements HttpController {

  constructor(
    private readonly stocks: GetStockNameUseCase,
  ) {}

  async getResponse(stockName: string) {
    return stockName ?
      {
        statusCode: 200,
        body: {
          stockName,
        },
      }
      :
      {
        statusCode: 404,
        body: {
          msg: 'stock name not found',
        },
      };
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const { queryStringParams } = httpRequest;

      const { companyName } = queryStringParams as GetStockNameSchema;
      
      const stockPrice = await this.stocks.getStockName(companyName);

      return await this.getResponse(stockPrice);

    } catch (err) {
      console.log(err);
      return {
        statusCode: 500,
        body: 'An error ocurred',
      };
    }
  }
}