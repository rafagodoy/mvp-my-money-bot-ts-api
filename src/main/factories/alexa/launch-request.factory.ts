import { LaunchRequestController } from '@/presentation/controllers/alexa/LaunchRequestController';
import { TranslatorAdapter } from '@/adapters/voice-skills/translator.adapter';
import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { Speaker } from '@/infra/interactions/speaker';

const speaker = new Speaker();
const sdk = new AlexaSkills();
const translator = new TranslatorAdapter(speaker);

const launchRequestController = new LaunchRequestController(
  sdk,
  translator,
);

export { launchRequestController };