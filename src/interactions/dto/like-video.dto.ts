import { IsNotEmpty, IsNumber } from 'class-validator';

export class LikeVideoDTO {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  videoId: number;
}

export class ResponseLikeVideoDTO {
  liked: boolean;
}
