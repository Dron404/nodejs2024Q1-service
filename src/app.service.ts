import { Injectable } from '@nestjs/common';
import { OnModuleDestroy } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Injectable()
export class AppService implements OnModuleDestroy {
  constructor(private readonly prisma: PrismaService) {}
  getHello(): string {
    return 'Hello World!';
  }
  async onModuleDestroy() {
    await this.prisma.user.deleteMany({});
    await this.prisma.artist.deleteMany({});
    await this.prisma.album.deleteMany({});
    await this.prisma.track.deleteMany({});
    await this.prisma.favorites.deleteMany({});
  }
}
