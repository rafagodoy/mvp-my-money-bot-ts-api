import dotenv from 'dotenv';
dotenv.config();

import { AWSLambdaAdapter } from '../../aws-lambda.adapter';
import { makeGetStockPriceController } from '../../factories/api/get-stock-price.factory';

module.exports.getStockPrice = async (event) => {

  const controller = makeGetStockPriceController();
  const awsLambda = new AWSLambdaAdapter(controller);

  return awsLambda.start(event);
  
};