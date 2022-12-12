import { TranslatorAdapter } from '@/adapters/voice-skills/translator.adapter';
import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { Speaker } from '@/infra/interactions/speaker';
import {
  SessionEndedRequestController,
} from '@/presentation/controllers/alexa/SessionEndedRequestController';

const speaker = new Speaker();
const sdk = new AlexaSkills();
const translator = new TranslatorAdapter(speaker);

const sessionEndedRequestController = new SessionEndedRequestController(
  sdk,
  translator,
);

export { sessionEndedRequestController };