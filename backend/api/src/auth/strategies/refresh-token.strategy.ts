import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { ContextUser } from '@/common/interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '@/users/entities';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2';
import { Request } from 'express';
import { AuthErrorCodes } from '@/auth/errors';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(
    readonly configService: ConfigService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('REFRESH_TOKEN_SECRET'),
      ignoreExpiration: true,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    var user = await this.usersRepository.findOne({
      where: {
        id: payload.sub,
      },
      select: ['refreshToken'],
    });

    const refreshToken = req.get('Authorization').replace('Bearer', '').trim();

    if (!user) {
      throw new UnauthorizedException({
        errorCode: AuthErrorCodes.InvalidRefreshTokenError,
      });
    }

    const isRefreshTokensMatching = await argon2.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!isRefreshTokensMatching) {
      user = this.usersRepository.create({
        id: payload.sub,
        refreshToken: null,
      });

      await this.usersRepository.save(user);

      throw new UnauthorizedException({
        errorCode: AuthErrorCodes.InvalidRefreshTokenError,
      });
    }

    const contextUser: ContextUser = {
      id: payload.sub,
    };

    return contextUser;
  }
}
