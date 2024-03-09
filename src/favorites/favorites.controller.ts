import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return await this.favoritesService.findAll();
  }
  @Post('track/:id')
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrack(id);
  }
  @Post('album/:id')
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbum(id);
  }
  @Post('artist/:id')
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  async removeTrack(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.favoritesService.remove({ trackId: id });
    res.status(HttpStatus.NO_CONTENT).send();
  }
  @Delete('album/:id')
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.favoritesService.remove({ albumId: id });
    res.status(HttpStatus.NO_CONTENT).send();
  }
  @Delete('artist/:id')
  async removeArtist(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.favoritesService.remove({ artistId: id });
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
