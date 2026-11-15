import { Catch, ArgumentsHost, HttpException, HttpStatus, type ExceptionFilter } from '@nestjs/common';
import type { Response } from 'express';
import type { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ClassValidatorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const statusCode = exception.getStatus();

    const cause = exception.cause as ValidationError[] | undefined;
     if (statusCode === HttpStatus.UNPROCESSABLE_ENTITY && Array.isArray(cause)) {
        const fieldErrors: Record<string, string[]> = {};

      for (const err of cause) {
        if (err.constraints) {
          fieldErrors[err.property] = Object.values(err.constraints);
        }
      }

      return response.status(statusCode).json({
        statusCode,
        message: {
          formErrors: [],
          fieldErrors,
        },
      });
    }

    const exceptionResponse = exception.getResponse();
    return response
      .status(statusCode)
      .json(
        typeof exceptionResponse === 'object'
          ? exceptionResponse
          : { statusCode, message: exceptionResponse },
      );
  }
}