import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthErrorCodes } from '@/auth/errors';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof Error) {
      throw new UnauthorizedException({
        errorCode: AuthErrorCodes.InvalidAccessTokenError,
      });
    }

    return super.handleRequest(err, user, info, context, status);
  }
}
