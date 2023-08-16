import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';

export class EditVideoDTO {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  url?: string;
}

export class UpdateVideoDTO {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsString()
  url?: string;

  @ApiProperty()
  @IsBoolean()
  published?: boolean;
}
