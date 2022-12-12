import { SkillBuilders } from 'ask-sdk-core';
import { welcomeIntentController } from '../../factories/alexa/welcome-intent.factory';
import { launchRequestController } from '../../factories/alexa/launch-request.factory';

exports.handlers = SkillBuilders.custom()
  .addRequestHandlers(
    launchRequestController,
    welcomeIntentController,
  )
  .lambda();