import { LoggerService as LoggerInterface, LogLevel } from '@nestjs/common';
import * as process from 'process';
import { appendFileSync, mkdirSync, statSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';

const BITES_IN_KILOBYTE = 1024;
const DEFAULT_LOG_FILE_MAX_SIZE_KB = 10;

const logFileMaxSizeInKb = parseInt(process.env.LOG_FILE_MAX_SIZE_KB, 10) || DEFAULT_LOG_FILE_MAX_SIZE_KB;

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

    const logLine = `${level.toUpperCase()}: ${message} ${optionalParams.join(' ')}` + '\n';

    process.stdout.write(logLine);

    this.writeToFile(level, logLine);
  }

  private getLogLevel(): LogLevel {
    const logLevel = process.env.LOG_LEVEL as unknown;

    if (!logLevels.includes(logLevel as LogLevel)) {
      return 'debug';
    }

    return logLevel as LogLevel;
  }

  private writeToFile(level: LogLevel, logLine: string) {
    const fileName = 'application.log';
    const filePath = join('.', 'logs', fileName);
    const dirName = dirname(filePath);

    try {
      const stats = statSync(filePath)
      const fileSizeInBytes = stats.size;

      const fileSizeInKilobytes = fileSizeInBytes / BITES_IN_KILOBYTE;

      if (fileSizeInKilobytes > logFileMaxSizeInKb) {
        const oldFilePath = join(dirName, `${Date.now()}-${fileName}`);
        renameSync(filePath, oldFilePath);
      }
    } catch (error) {

    }

    mkdirSync(dirName, { recursive: true });
    appendFileSync(filePath, logLine);
  }
}
