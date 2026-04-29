import { CustomError } from '../utils/CustomError.js';

export function notFoundHandler(req, res, next) {
  throw new CustomError({
    message: '페이지를 찾을 수 없습니다',
    statusCode: 404,
  });
}
