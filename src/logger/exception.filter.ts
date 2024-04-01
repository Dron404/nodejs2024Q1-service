import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CustomLogger } from './logger.service';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  private logger = new CustomLogger();
  catch(error: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    let statusCode: HttpStatus;

    if (error instanceof HttpException) {
      statusCode = error.getStatus();
    }

    if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
      this.logger.error(`\n${error.name}\n${error.message}\n${error.stack}`);
    }

    response.status(statusCode).json({
      statusCode,
      message: error.message,
    });
  }
}
