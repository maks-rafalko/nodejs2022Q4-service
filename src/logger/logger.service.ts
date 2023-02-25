import { LoggerService as LoggerInterface, LogLevel } from '@nestjs/common';
import * as process from 'process';

const logLevels: LogLevel[] = ['error', 'warn', 'log', 'verbose', 'debug'];

export class AppLogger implements LoggerInterface {
  private readonly logLevel: number;

  constructor() {
    this.logLevel = logLevels.indexOf(this.getLogLevel());
  }

  debug(message: any, ...optionalParams: any[]): any {
    this.doLog('debug', message, optionalParams);
  }

  error(message: any, ...optionalParams: any[]): any {
    this.doLog('error', message, optionalParams);
  }

  log(message: any, ...optionalParams: any[]): any {
    this.doLog('log', message, optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]): any {
    this.doLog('verbose', message, optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): any {
    this.doLog('warn', message, optionalParams);
  }

  logResponse(
    statusCode: number,
    responseBody: string | object | undefined,
  ): any {
    let responseBodyString = 'N/A';

    if (typeof responseBody === 'string') {
      responseBodyString = responseBody;
    } else if (typeof responseBody === 'object') {
      responseBodyString = JSON.stringify(responseBody);
    }

    this.log(`Response: Status code ${statusCode}; Body ${responseBodyString}`);
  }

  private doLog(level: LogLevel, message: any, optionalParams: any[]): any {
    if (logLevels.indexOf(level) > this.logLevel) {
      return;
    }

    process.stdout.write(
      `${level.toUpperCase()}: ${message} ${optionalParams.join(' ')}` + '\n',
    );
  }

  private getLogLevel(): LogLevel {
    const logLevel = process.env.LOG_LEVEL as unknown;

    if (!logLevels.includes(logLevel as LogLevel)) {
      return 'debug';
    }

    return logLevel as LogLevel;
  }
}
