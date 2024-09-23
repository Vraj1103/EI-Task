export class AppException extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly cause?: Error;

  constructor(message: string, cause?: Error) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.cause = cause;
    Error.captureStackTrace(this, this.constructor);
  }
}
