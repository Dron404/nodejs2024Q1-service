import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prisma.album.create({ data: createAlbumDto });
  }

  async findAll() {
    return await this.prisma.album.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.album.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      throw new NotFoundException('Album not found');
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      return await this.prisma.album.update({
        where: { id },
        data: updateAlbumDto,
      });
    } catch (e) {
      throw new NotFoundException('Album not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.album.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException('Artist not found');
    }
  }
}
