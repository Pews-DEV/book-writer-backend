import { ILoggerDataDTO } from './dtos/ILoggerDataDTO';

export interface ILoggerProvider {
  info: <T>(message: string, loggerData?: ILoggerDataDTO<T>) => void;
  warn: <T>(message: string, loggerData?: ILoggerDataDTO<T>) => void;
  error: <T>(message: string, loggerData?: ILoggerDataDTO<T>) => void;
  debug: <T>(message: string, loggerData?: ILoggerDataDTO<T>) => void;
}
