import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '@/users/dtos';
import { UserEntity } from '@/users/entities';
import { UserAuthTokens } from '@/common/interfaces';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async signUp(dto: UserDto): Promise<UserAuthTokens> {
    const user = await this.usersService.create(dto);

    return await this.refreshTokens(user.id);
  }

  async generateTokens(userId: number): Promise<UserAuthTokens> {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRATION'),
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
        },
        {
          secret: this.configService.get<string>('REFRESH_TOKEN_SECRET'),
          expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRATION'),
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshTokens(userId: number): Promise<UserAuthTokens> {
    const tokens = await this.generateTokens(userId);

    const user = this.usersRepository.create({
      id: userId,
      refreshToken: tokens.refreshToken,
    });

    await this.usersRepository.save(user);

    return tokens;
  }

  async logout(userId: number): Promise<void> {
    const user = this.usersRepository.create({
      id: userId,
      refreshToken: null,
    });

    await this.usersRepository.save(user);
  }
}
