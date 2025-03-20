import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, LoggerService } from '@nestjs/common';
import { Response, Request } from 'express';

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) { }
  catch(exception: HttpException, host: ArgumentsHost) {
    console.log({ exception })
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

    const errorResponse = {
      statusCode: status,
      message: exception.getResponse(),
    };
    this.loggerService.error(`Request With Url ${request.url} ends With Exception ${exception} `, exception)
    response.status(status).json(errorResponse);
  }
}