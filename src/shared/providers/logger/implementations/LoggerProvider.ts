import pino, { Logger } from 'pino';

import { ILoggerDataDTO } from '../dtos/ILoggerDataDTO';
import { ILoggerProvider } from '../ILoggerProvider';

type IParseLoggerInputToPinoFormatParams<T> = {
  message: string;
  loggerData?: ILoggerDataDTO<T>;
};

class PinoProvider implements ILoggerProvider {
  readonly pinoLogger: Logger;

  constructor() {
    this.pinoLogger = pino({
      level: process.env.LOGGER_LEVEL || 'debug',
    });
  }

  private parseLoggerInputToPinoFormat<T>({
    message,
    loggerData,
  }: IParseLoggerInputToPinoFormatParams<T>) {
    return {
      msg: message,
      err: loggerData?.error,
      ...loggerData,
    };
  }

  info<T>(message: string, loggerData?: ILoggerDataDTO<T>): void {
    this.pinoLogger.info(
      this.parseLoggerInputToPinoFormat({ loggerData, message }),
    );
  }

  warn<T>(message: string, loggerData?: ILoggerDataDTO<T>): void {
    this.pinoLogger.warn(
      this.parseLoggerInputToPinoFormat({ loggerData, message }),
    );
  }

  error<T>(message: string, loggerData?: ILoggerDataDTO<T>): void {
    this.pinoLogger.error(
      this.parseLoggerInputToPinoFormat({ loggerData, message }),
    );
  }

  debug<T>(message: string, loggerData?: ILoggerDataDTO<T>): void {
    this.pinoLogger.debug(
      this.parseLoggerInputToPinoFormat({ loggerData, message }),
    );
  }
}

export const logger: ILoggerProvider = new PinoProvider();
