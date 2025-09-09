import { Response } from 'express';

type Data = any;

interface Options {
  message?: string;
  data?: Data;
  success?: boolean;
  statusCode?: number;
}

export const sendResponse = (res: Response, options: Options) => {
  const {
    message = '',
    data = null,
    success = true,
    statusCode = 200
  } = options;

  if (statusCode === 204) {
    return res.status(204).send();
  }

  return res.status(statusCode).json({
    message,
    success,
    data
  });
};
