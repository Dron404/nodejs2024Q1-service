import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { RefreshDto } from 'src/auth/dto/refresh.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwt: JwtService,
    private readonly configService: ConfigService,
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}
  async singUp(data: CreateUserDto) {
    return await this.userService.create(data);
  }

  async login(data: CreateUserDto) {
    const { login, password } = data;
    const hashPassword = await this.crypto.hashString(password);
    const user = await this.prisma.user.findFirst({
      where: { login, password: hashPassword },
    });
    if (!user) {
      throw new ForbiddenException('Invalid user login or password');
    }

    return await this.getTokens({ id: user.id, login });
  }

  async getTokens(payload: { id: string; login: string }) {
    const accessToken = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET_KEY'),
    });

    const refreshToken = await this.jwt.signAsync(payload, {
      expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
      secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
    });
    return { refreshToken, accessToken };
  }

  async refresh({ refreshToken }: RefreshDto) {
    try {
      const payload = await this.jwt.verifyAsync(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET_REFRESH_KEY'),
      });
      return await this.getTokens({ id: payload.id, login: payload.login });
    } catch (e) {
      console.log(e);
      throw new ForbiddenException(e.message);
    }
  }
}
