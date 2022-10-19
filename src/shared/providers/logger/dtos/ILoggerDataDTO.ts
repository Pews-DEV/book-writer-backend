export type ILoggerDataDTO<T> = {
  payload?: T;
  error?: Error;
} & (
  | {
      payload: T;
    }
  | {
      error: Error;
    }
);
