import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArtistService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createArtistDto: CreateArtistDto) {
    return await this.prisma.artist.create({ data: createArtistDto });
  }

  async findAll() {
    return await this.prisma.artist.findMany();
  }

  async findOne(id: string) {
    try {
      return await this.prisma.artist.findFirstOrThrow({ where: { id } });
    } catch (e) {
      throw new NotFoundException('Artist not found');
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    try {
      return await this.prisma.artist.update({
        where: { id },
        data: updateArtistDto,
      });
    } catch (e) {
      throw new NotFoundException('Artist not found');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.artist.delete({ where: { id } });
    } catch (e) {
      throw new NotFoundException('Artist not found');
    }
  }
}
