import { DateUtils } from '@/adapters/utils/protocols';
import { AWS } from '@/infra/libs';

export class CloudWatchLogs {

  private aws: AWS.CloudWatchLogs;
  
  private logStreamName: string;

  private logGroupName: string;

  constructor(
    private readonly date: DateUtils,
  ) {
    this.aws = new AWS.CloudWatchLogs();
  }

  private setLogStreamName(dateNowTimestamp: number) {
    this.logStreamName = `log-stream-${dateNowTimestamp}`;
  }

  private setLogGroupName(groupName: string) {
    this.logGroupName = groupName;
  }

  private getLogStreamName():string {
    return this.logStreamName;
  }

  private getLogGroupName():string {
    return this.logGroupName;
  }

  private getMessageParams(message: string, dateNowTimestamp: number) {
    return {
      logEvents: [
        {
          message,
          timestamp: dateNowTimestamp,
        },
      ],
      logGroupName: this.getLogGroupName(),
      logStreamName: this.getLogStreamName(),
    };
  }

  async sendError(message: string, groupName: string) {

    const dateNowTimestamp = this.date.getNowAndConvertToTimeStamp();

    this.setLogStreamName(dateNowTimestamp);
    this.setLogGroupName(groupName);

    const params = this.getMessageParams(message, dateNowTimestamp);

    await this.aws.createLogStream({
      logGroupName: this.getLogGroupName(),
      logStreamName: this.getLogStreamName(),
    }).promise();

    await this.aws.putLogEvents(params).promise();
  }
}