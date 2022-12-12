import { AWSLambdaAdapter } from '../../aws-lambda.adapter';
import { makeConvertCurrencyController } from '../../factories/api/convert-currency.factory';

module.exports.currencyQuotes = async (event) => {

  const controller = makeConvertCurrencyController();
  const awsLambda = new AWSLambdaAdapter(controller);

  return awsLambda.start(event);
  
};