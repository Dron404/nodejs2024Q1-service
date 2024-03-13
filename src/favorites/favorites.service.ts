import {
  Injectable,
  OnModuleInit,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService implements OnModuleInit {
  constructor(private readonly prisma: PrismaService) {}
  async onModuleInit() {
    await this.prisma.favorites.create({ data: {} });
  }

  async addTrack(id: string) {
    try {
      const favs = await this.prisma.favorites.findFirst();
      return await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { tracks: { connect: { id } } },
      });
    } catch (e) {
      throw new UnprocessableEntityException('Entity not found');
    }
  }

  async addAlbum(id: string) {
    try {
      const favs = await this.prisma.favorites.findFirst();
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { albums: { connect: { id } } },
      });
    } catch (e) {
      throw new UnprocessableEntityException('Entity not found');
    }
  }

  async addArtist(id: string) {
    try {
      const favs = await this.prisma.favorites.findFirst();
      await this.prisma.favorites.update({
        where: { id: favs.id },
        data: { artists: { connect: { id } } },
      });
    } catch (e) {
      throw new UnprocessableEntityException('Entity not found');
    }
  }

  async findAll() {
    return await this.prisma.favorites.findFirst({
      select: {
        artists: { select: { id: true, name: true, grammy: true } },
        tracks: {
          select: {
            id: true,
            duration: true,
            name: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: { id: true, name: true, artistId: true, year: true },
        },
      },
    });
  }

  async remove(args: {
    trackId?: string;
    albumId?: string;
    artistId?: string;
  }) {
    const { trackId, albumId, artistId } = args;

    const data = {
      tracks: trackId ? { disconnect: { id: trackId } } : {},
      albums: albumId ? { disconnect: { id: albumId } } : {},
      artists: artistId ? { disconnect: { id: artistId } } : {},
    };

    const favorites = await this.prisma.favorites.findFirst();
    return await this.prisma.favorites.update({
      where: { id: favorites.id },
      data,
      select: { artists: true, tracks: true, albums: true },
    });
  }
}
