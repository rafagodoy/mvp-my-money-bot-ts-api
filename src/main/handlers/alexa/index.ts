import { SkillBuilders } from 'ask-sdk-core';
import { welcomeIntentController } from '../../factories/alexa/welcome-intent.factory';
import { launchRequestController } from '../../factories/alexa/launch-request.factory';
import { errorHandlerController } from '../../factories/alexa/error-handler.factory';
import { 
  getStockPriceIntentController,
} from '../../factories/alexa/get-stock-price-intent.factory';

exports.handlers = SkillBuilders.custom()
  .addRequestHandlers(
    launchRequestController,
    welcomeIntentController,
    getStockPriceIntentController,
  )
  .addErrorHandlers(errorHandlerController)
  .lambda();