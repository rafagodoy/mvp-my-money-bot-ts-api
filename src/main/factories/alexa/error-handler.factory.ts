import { AlexaSkills } from '@/infra/libs/alexa-skills';
import { CloudWatchLogs } from '@/infra/logs';
import { DateAdapter } from '@/adapters/utils';
import {
  ErrorHandlerController,
} from '@/presentation/controllers/alexa/ErrorHandlerController';

const date = new DateAdapter();

const sdk = new AlexaSkills();
const logs = new CloudWatchLogs(date);

const errorHandlerController = new ErrorHandlerController(sdk, logs);

export { errorHandlerController };