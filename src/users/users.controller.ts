import { Body, Controller, Post, Get, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import {
  RegisterUserDTO,
  ResponseCreateUserDTO,
} from './dto/register-user.dto';
import { Public } from '../decorators/public.decorator';
import { GetUser } from './dto/get-user.dto';
import {
  FollowingDTO,
  ResponseFollowDTO,
  ResponseUnfollowDTO,
} from './dto/following.dto';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Public()
  @Post('create')
  @ApiBearerAuth()
  async registerUser(
    @Body() newUser: RegisterUserDTO,
  ): Promise<ResponseCreateUserDTO> {
    return {
      created: await this.usersService.registerUser(newUser),
    };
  }

  @Get()
  @ApiBearerAuth()
  async getAllUsers(): Promise<GetUser[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async getOneUser(@Param('id') id: number): Promise<GetUser> {
    return this.usersService.findOneById(id);
  }

  @Post('follow')
  @ApiBearerAuth()
  async followUser(
    @Body() followDTO: FollowingDTO,
  ): Promise<ResponseFollowDTO> {
    return {
      follow: await this.usersService.follow(followDTO),
    };
  }

  @Delete('unfollow')
  @ApiBearerAuth()
  async unfollowUser(
    @Body() followDTO: FollowingDTO,
  ): Promise<ResponseUnfollowDTO> {
    return {
      unfollow: await this.usersService.unfollow(followDTO),
    };
  }
}
