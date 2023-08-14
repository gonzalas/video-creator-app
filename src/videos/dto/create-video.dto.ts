import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateVideoDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;

  @IsNumber()
  @IsNotEmpty()
  userId: number;

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
