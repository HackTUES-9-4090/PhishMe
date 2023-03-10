import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PassportStrategy } from '@nestjs/passport';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { Strategy } from 'passport-local';
import { AuthErrorCodes } from '@/auth/errors';
import { UserEntity } from '@/users/entities';
import { ContextUser } from '@/common/interfaces';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.usersRepository
      .createQueryBuilder('user')
      .select(['user.id', 'user.password'])
      .where('user.email = :email', { email: email })
      .getOne();

    if (user) {
      const isPasswordMatching = await argon2.verify(user.password, password);

      if (!isPasswordMatching) {
        throw new UnauthorizedException({
          errorCode: AuthErrorCodes.InvalidCredentialsError,
        });
      }

      const contextUser: ContextUser = {
        id: user.id,
      };

      return contextUser;
    }

    throw new UnauthorizedException({
      errorCode: AuthErrorCodes.InvalidCredentialsError,
    });
  }
}
