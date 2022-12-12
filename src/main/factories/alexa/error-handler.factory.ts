import { AlexaSkills } from '@/infra/libs/alexa-skills';
import {
  ErrorHandlerController,
} from '@/presentation/controllers/alexa/ErrorHandlerController';

const sdk = new AlexaSkills();

const errorHandlerController = new ErrorHandlerController(sdk);

export { errorHandlerController };