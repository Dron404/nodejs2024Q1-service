import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseUUIDPipe,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { TrackService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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

@ApiTags('Track')
@Controller('track')
@UseGuards(AuthGuard)
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiCreatedResponse()
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  async create(@Body() createTrackDto: CreateTrackDto) {
    return await this.trackService.create(createTrackDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all track' })
  async findAll() {
    return await this.trackService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by id' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return await this.trackService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiOkResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateTrackDto: UpdateTrackDto,
  ) {
    return await this.trackService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete track' })
  @ApiNoContentResponse()
  @ApiBadRequestResponse()
  @ApiNotFoundResponse()
  async remove(@Param('id', ParseUUIDPipe) id: string, @Res() res) {
    await this.trackService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
