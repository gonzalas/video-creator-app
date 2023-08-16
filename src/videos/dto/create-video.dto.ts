import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVideoDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  url: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ default: false })
  @IsBoolean()
  published: boolean = false;
}

export class ResponseCreateVideoDTO {
  created: boolean;
}

export class ResponsePublishVideoDTO {
  published: boolean;
}

export class ResponseUnpublishVideoDTO {
  unpublished: boolean;
}
