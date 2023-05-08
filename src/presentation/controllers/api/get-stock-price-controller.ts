import { HttpRequest, HttpResponse, HttpController } from '@/presentation/protocols';
import { GetStockPriceSchemaForAPI } from '@/presentation/validation/get-stock-price';
import { GetStocksPriceUseCase } from '@/domain/stocks';

export class GetStockPriceController implements HttpController {

  constructor(
    private readonly stocks: GetStocksPriceUseCase,
  ) {}

  async getResponse(stockPrice: number) {
    return stockPrice && !Number.isNaN(stockPrice) ?
      {
        statusCode: 200,
        body: {
          stockPrice,
        },
      }
      :
      {
        statusCode: 404,
        body: {
          msg: 'stock price not found',
        },
      };
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      
      const { pathParams, queryStringParams } = httpRequest;

      const { codeName } = pathParams as GetStockPriceSchemaForAPI;
      const { stockStatus, tradeDate } = queryStringParams as GetStockPriceSchemaForAPI;
      
      const stockPrice = await this.stocks.getStockPrice(
        codeName,
        stockStatus,
        tradeDate,
      );

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