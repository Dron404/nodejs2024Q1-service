import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule, ConfigModule, PrismaModule, CryptoModule],
})
export class AuthModule {}
