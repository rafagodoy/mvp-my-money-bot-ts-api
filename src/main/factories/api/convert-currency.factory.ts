import { ApiConvertCurrencyAdapter } from '@/adapters/apis/convert-currency.adapter';
import { MoneeApi } from '@/infra/apis';
import { NodeFetch } from '@/infra/libs';
import { 
  ConvertCurrencyController,
} from '@/presentation/controllers/api/ConvertCurrencyController';

const nodeFetch = new NodeFetch();
const moneeApi = new MoneeApi(nodeFetch);
const apiConvertCurrencyAdapter = new ApiConvertCurrencyAdapter(moneeApi);
const convertCurrencyController = new ConvertCurrencyController(apiConvertCurrencyAdapter);

export function makeConvertCurrencyController() {
  return convertCurrencyController;
}