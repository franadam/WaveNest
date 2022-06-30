import { CustomError } from 'interfaces/CustomError.interface';

export const customError = (error: any): CustomError => {
  const status = error.statusCode;
  const message = error.message;
  const name = error.error;
  const timestamp = new Date();
  return { status, message, name, timestamp };
};
