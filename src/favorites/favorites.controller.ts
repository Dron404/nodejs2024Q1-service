import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get favorites' })
  async findAll() {
    return await this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  async addTrack(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  async addAlbum(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiUnprocessableEntityResponse()
  async addArtist(@Param('id', ParseUUIDPipe) id: string) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('track/:id')
  @ApiOperation({ summary: 'Delete track from favorites' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async removeTrack(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.favoritesService.remove({ trackId: id });
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('album/:id')
  @ApiOperation({ summary: 'Delete album from favorites' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async removeAlbum(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.favoritesService.remove({ albumId: id });
    res.status(HttpStatus.NO_CONTENT).send();
  }

  @Delete('artist/:id')
  @ApiOperation({ summary: 'Delete artist from favorites' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async removeArtist(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.favoritesService.remove({ artistId: id });
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
