import {
  Req,
  Body,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Controller,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import {
  LocalAuthGuard,
  AccessTokenGuard,
  RefreshTokenGuard,
} from '@/common/guards';
import { AuthService } from './auth.service';
import { UserDto } from '@/users/dtos';
import { RequestWithUser } from '@/common/interfaces';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: UserDto })
  @Post('signup')
  async signUp(@Body() dto: UserDto) {
    return await this.authService.signUp(dto);
  }

  @ApiBody({ type: UserDto })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async signIn(@Req() request: RequestWithUser) {
    return await this.authService.refreshTokens(request.user.id);
  }

  @ApiBearerAuth('access-token')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AccessTokenGuard)
  async logout(@Req() request: RequestWithUser) {
    request.res.setHeader('Authorization', null);
    return await this.authService.logout(request.user.id);
  }

  @ApiBearerAuth('refresh-token')
  @Post('token-refresh')
  @UseGuards(RefreshTokenGuard)
  async refreshTokens(@Req() request: RequestWithUser) {
    return await this.authService.refreshTokens(request.user.id);
  }
}
