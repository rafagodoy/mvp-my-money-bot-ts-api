import { SkillBuilders } from 'ask-sdk-core';
import { errorHandlerController } from '../../factories/alexa/error-handler.factory';
import { 
  alexaHandlerController,
} from '../../factories/alexa/alexa-handler-controller.factory';

exports.handlers = SkillBuilders.custom()
  .addRequestHandlers(
    alexaHandlerController,
  )
  .addErrorHandlers(errorHandlerController)
  .lambda();