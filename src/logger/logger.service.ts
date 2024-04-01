import { Injectable, Logger, LoggerService } from '@nestjs/common';
enum LoggerLevel {
  'fatal' = 0,
  'error',
  'warn',
  'log',
}
@Injectable()
export class CustomLogger implements LoggerService {
  private logger = new Logger('Logger');
  private logLevels: number;
  constructor() {
    this.logLevels = LoggerLevel[process.env.LOG || 'log'];
  }
  log(message: any) {
    if (this.logLevels >= 3) {
      this.logger.log(message);
    }
  }
  error(message: string) {
    if (this.logLevels >= 1) {
      this.logger.error(message);
    }
  }
  warn(message: any) {
    if (this.logLevels >= 2) {
      this.logger.warn(message);
    }
  }
  fatal?(type, error) {
    if (this.logLevels >= 0) {
      this.logger.fatal(`\n${type} \n${error}`);
    }
  }

  logRequest(request: any): void {
    this.log(
      `\n[REQUEST]:\nMethod: ${request.method}\nUrl:${request.url}\nQuery: ${JSON.stringify(request.query)}\nBody: ${JSON.stringify(request.body)}\n`,
    );
  }

  logResponse(body, code): void {
    this.log(
      `\n[RESPONSE]:\nStatus code: ${code}\nBody: ${body ? JSON.stringify(body) : null}\n`,
    );
  }

  logError(res, body): void {
    this.error(`\n[ERROR]:\nstatusCode: ${res.statusCode}\nBody: ${body}\n`);
  }

  logWarn(res, body): void {
    this.warn(`\n[WARN]:\nstatusCode: ${res.statusCode}\nBody: ${body}\n`);
  }

  //saveLog(message: string) {

  //}
}
