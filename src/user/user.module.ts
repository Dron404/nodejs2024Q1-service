import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CryptoModule } from 'src/crypto/crypto.module';

@Module({
  imports: [PrismaModule, CryptoModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
