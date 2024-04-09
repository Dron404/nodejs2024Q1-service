import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CryptoService } from 'src/crypto/crypto.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly crypto: CryptoService,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const { password, ...newUserData } = createUserDto;
    const hashPassword = await this.crypto.hashString(password);
    try {
      const user = await this.prisma.user.create({
        data: {
          password: hashPassword,
          ...newUserData,
        },
        select: {
          id: true,
          login: true,
          createdAt: true,
          updatedAt: true,
          version: true,
        },
      });
      const createdAt = user.createdAt.getTime();
      return { ...user, createdAt: createdAt, updatedAt: createdAt };
    } catch (e) {
      throw new ConflictException('This login already exists');
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
    return users.map((user) => {
      return {
        ...user,
        createdAt: user.createdAt.getTime(),
        updatedAt: user.updatedAt.getTime(),
      };
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return {
      ...user,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { newPassword, oldPassword } = updateUserDto;
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const hashOldPassword = await this.crypto.hashString(oldPassword);
    if (hashOldPassword !== user.password) {
      throw new ForbiddenException('Invalid old password');
    }
    const hashNewPassword = await this.crypto.hashString(newPassword);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashNewPassword,
        version: { increment: 1 },
        updatedAt: new Date(),
      },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
    return {
      ...updatedUser,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };
  }

  async remove(id: string) {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException('User not found');
    }
  }
}
