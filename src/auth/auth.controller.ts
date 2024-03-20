import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshDto } from 'src/auth/dto/refresh.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Create user' })
  singUp(@Body() data: CreateUserDto) {
    return this.authService.singUp(data);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: 'Login' })
  login(@Body() data: CreateUserDto) {
    return this.authService.login(data);
  }

  @Post('refresh')
  @HttpCode(200)
  @ApiOperation({ summary: 'Refresh tokens' })
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
