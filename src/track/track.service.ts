import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TrackService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prisma.track.create({ data: createTrackDto });
  }

  async findAll() {
    return await this.prisma.track.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.track.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      return await this.prisma.track.update({
        where: { id },
        data: updateTrackDto,
      });
    } catch (e) {
      throw new NotFoundException('Track not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.track.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException('Track not found');
    }
  }
}
