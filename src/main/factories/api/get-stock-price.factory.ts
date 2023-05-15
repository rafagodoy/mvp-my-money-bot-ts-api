import { GetStockPriceAdapter } from '@/adapters/apis/get-stock-price.adapter';
import { AlphaVantage } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { 
  GetStockPriceController,
} from '@/presentation/controllers/api/get-stock-price-controller';
import { DateAdapter } from '@/adapters/utils';

const date = new DateAdapter();
const nodeFetch = new NodeFetch();
const alphaVantage = new AlphaVantage(nodeFetch);
const getStockPriceAdapter = new GetStockPriceAdapter(alphaVantage, date);
const getStockPriceController = new GetStockPriceController(getStockPriceAdapter);

export function makeGetStockPriceController() {
  return getStockPriceController;
}