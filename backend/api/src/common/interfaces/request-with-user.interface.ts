import { Request } from 'express';
import { ContextUser } from './context-user.interface';

export interface RequestWithUser extends Request {
  user: ContextUser;
}
