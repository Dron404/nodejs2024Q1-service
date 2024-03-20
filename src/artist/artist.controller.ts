import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guard/auth.guard';

@ApiTags('Artist')
@UseGuards(AuthGuard)
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async create(@Body() createArtistDto: CreateArtistDto) {
    return await this.artistService.create(createArtistDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all artist' })
  async findAll() {
    return await this.artistService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by id' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.artistService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    return await this.artistService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete artist' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.artistService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
