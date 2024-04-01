import { Injectable, Logger, LoggerService } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

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
  async fatal?(type, error) {
    if (this.logLevels >= 0) {
      const message = `\n${type} \n${error}`;
      this.logger.fatal(message);
      await this.writeLogsToFile(message, 'logs');
      await this.writeLogsToFile(message, 'fatales');
    }
  }

  async logRequest(request: any) {
    const message = `\n[REQUEST]:\nMethod: ${request.method}\nUrl: ${request.url + JSON.stringify(Object.values(request.params).join()).replace(/"/g, '')}\nQuery: ${JSON.stringify(request.query)}\nBody: ${JSON.stringify(request.body)}\n`;
    this.log(message);
    await this.writeLogsToFile(message, 'logs');
  }

  async logResponse(body, code) {
    const message = `\n[RESPONSE]:\nStatus code: ${code}\nBody: ${body ? JSON.stringify(body) : null}\n`;
    this.log(message);
    await this.writeLogsToFile(message, 'logs');
  }

  async logError(res, body) {
    const message = `\n[ERROR]:\nstatusCode: ${res.statusCode}\nBody: ${body}\n`;
    this.error(message);
    await this.writeLogsToFile(message, 'errors');
    await this.writeLogsToFile(message, 'logs');
  }

  async logWarn(res, body) {
    const message = `\n[WARN]:\nstatusCode: ${res.statusCode}\nBody: ${body}\n`;
    this.warn(message);
    await this.writeLogsToFile(message, 'warns');
    await this.writeLogsToFile(message, 'logs');
  }

  async writeLogsToFile(logMessage: string, logFile: string) {
    const logFilePath = path.join('./logs/', logFile + '.log');
    try {
      let fileExists = true;
      try {
        await fs.access(logFilePath);
      } catch (error) {
        fileExists = false;
      }

      if (!fileExists) {
        await fs.writeFile(logFilePath, '');
      }

      const stats = await fs.stat(logFilePath);
      const fileSizeInBytes = stats.size;
      if (fileSizeInBytes > +process.env.MAX_FILE_SIZE_MB * 1024) {
        const timestamp = new Date().toISOString().replace(/:/g, '-');
        const newFilePath = path.join('./logs/', `${timestamp}_${logFile}.log`);

        await fs.rename(logFilePath, newFilePath);
        await fs.writeFile(logFilePath, '');
      }

      await fs.appendFile(
        logFilePath,
        `[${new Date().toISOString()}]` + logMessage + '\n',
      );
    } catch (error) {
      this.error('Error while writing logs to file:\n' + JSON.stringify(error));
    }
  }
}
