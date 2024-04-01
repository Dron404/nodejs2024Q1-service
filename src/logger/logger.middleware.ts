import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CustomLogger } from './logger.service';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger = new CustomLogger();
  use(req: Request, res: Response, next: NextFunction) {
    this.logger.logRequest(req);

    const originalSend = res.send;
    res.send = (...args: any[]) => {
      const [body] = args;
      if (res.statusCode < 300) {
        this.logger.logResponse(body, res.statusCode);
      }
      if (res.statusCode >= 300 && res.statusCode < 500) {
        this.logger.logWarn(res, body);
      }
      return originalSend.apply(res, args);
    };
    next();
  }
}
