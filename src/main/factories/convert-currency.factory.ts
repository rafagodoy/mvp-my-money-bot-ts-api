import { ConvertCurrencyController } from '@/presentation/controllers/ConvertCurrencyController';
import { ApiConvertCurrencyAdapter } from '@/adapters/api/convert-currency.adapter';
import { MoneeApi } from '@/infra/api';
import { NodeFetch } from '@/infra/libs';

const nodeFetch = new NodeFetch();
const moneeApi = new MoneeApi(nodeFetch);
const apiConvertCurrencyAdapter = new ApiConvertCurrencyAdapter(moneeApi);
const convertCurrencyController = new ConvertCurrencyController(apiConvertCurrencyAdapter);

export function makeConvertCurrencyController() {
  return convertCurrencyController;
}