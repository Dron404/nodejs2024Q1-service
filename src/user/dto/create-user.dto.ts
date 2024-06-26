import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty()
  login: string;

  @IsString()
  @ApiProperty()
  password: string;
}
