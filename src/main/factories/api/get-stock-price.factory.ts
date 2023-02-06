import { GetStockPriceAdapter } from '@/adapters/apis/get-stock-price.adapter';
import { AlphaVantage } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { 
  GetStockPriceController,
} from '@/presentation/controllers/api/get-stock-price-controller';

const nodeFetch = new NodeFetch();
const alphaVantage = new AlphaVantage(nodeFetch);
const getStockPriceAdapter = new GetStockPriceAdapter(alphaVantage);
const getStockPriceController = new GetStockPriceController(getStockPriceAdapter);

export function makeGetStockPriceController() {
  return getStockPriceController;
}