import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FollowingDTO {
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @IsNumber()
  @IsOptional()
  followId?: number;

  @IsNumber()
  @IsOptional()
  unfollowId?: number;
}

export class ResponseFollowDTO {
  follow: boolean;
}

export class ResponseUnfollowDTO {
  unfollow: boolean;
}
