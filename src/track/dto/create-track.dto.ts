import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID, IsString, IsOptional, IsInt } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  artistId: string;

  @ApiPropertyOptional()
  @IsUUID()
  @IsOptional()
  albumId: string;

  @ApiProperty()
  @IsInt()
  duration: number;
}
