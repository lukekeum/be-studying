import * as Express from 'express';

export interface AuthenticatedRequest extends Express.Request {
  user: string;
}
