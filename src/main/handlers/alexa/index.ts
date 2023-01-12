import { SkillBuilders } from 'ask-sdk-core';
import { welcomeIntentController } from '../../factories/alexa/welcome-intent.factory';
import { launchRequestController } from '../../factories/alexa/launch-request.factory';
import { errorHandlerController } from '../../factories/alexa/error-handler.factory';

exports.handlers = SkillBuilders.custom()
  .addRequestHandlers(
    welcomeIntentController,
    launchRequestController,
  )
  .addErrorHandlers(errorHandlerController)
  .lambda();