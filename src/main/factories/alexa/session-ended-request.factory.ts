import { AlexaSkills } from '@/infra/libs/alexa-skills';
import {
  SessionEndedRequestController,
} from '@/presentation/controllers/alexa/SessionEndedRequestController';

const sdk = new AlexaSkills();

const sessionEndedRequestController = new SessionEndedRequestController(
  sdk,
);

export { sessionEndedRequestController };