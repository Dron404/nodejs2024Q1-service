import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  //constructor() {
  //  super({
  //    log: ['info'],
  //    datasources: {
  //      db: {},
  //    },
  //  });
  //}
  async onModuleInit() {
    await this.$connect();
  }
}
