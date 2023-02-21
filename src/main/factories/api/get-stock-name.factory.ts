import { GetStockNameAdapter } from '@/adapters/apis/get-stock-name.adapter';
import { AlphaVantage } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { 
  GetStockNameController,
} from '@/presentation/controllers/api/get-stock-name-controller';

const nodeFetch = new NodeFetch();
const alphaVantage = new AlphaVantage(nodeFetch);
const getStockNameAdapter = new GetStockNameAdapter(alphaVantage);
const getStockNameController = new GetStockNameController(getStockNameAdapter);

export function makeGetStockNameController() {
  return getStockNameController;
}