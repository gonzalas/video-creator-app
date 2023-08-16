import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class FollowingDTO {
  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  followId?: number;

  @ApiProperty()
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
