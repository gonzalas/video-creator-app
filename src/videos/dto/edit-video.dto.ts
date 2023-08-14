import { IsBoolean, IsString } from 'class-validator';

export class EditVideoDTO {
  @IsString()
  title?: string;

  @IsString()
  url?: string;
}

export class UpdateVideoDTO {
  @IsString()
  title?: string;

  @IsString()
  url?: string;

  @IsBoolean()
  published?: boolean;
}
