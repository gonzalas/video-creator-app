import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entity/user.entity';
import { RegisterUserDTO } from './dto/register-user.dto';
import { GetUser } from './dto/get-user.dto';
import { encryptPassword } from '../encryption/crypto.utils';
import { PROVIDERS_REPOSITORY } from '../constants/providers';
import { FollowingDTO } from './dto/following.dto';
import { UserFollower } from './entity/user-follower.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(PROVIDERS_REPOSITORY.USERS_REPOSITORY)
    private usersRepository: typeof User,
    @Inject(PROVIDERS_REPOSITORY.USERS_FOLLOW_REPOSITORY)
    private usersFollowRepository: typeof UserFollower,
  ) {}

  async registerUser(user: RegisterUserDTO): Promise<boolean> {
    try {
      await this.verifyUniqueEmail(user.email);
      const toSave = {
        name: user.name,
        email: user.email,
        username: user.username,
        password: await encryptPassword(user.password),
      };
      await this.usersRepository.create(toSave);
      return true;
    } catch (e) {
      console.log(JSON.stringify(e));
      throw e;
    }
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne<User>({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User> {
    return this.usersRepository.findOne<User>({
      where: { id },
    });
  }

  async findAll(): Promise<GetUser[]> {
    const users = await this.usersRepository.findAll();
    return users.map(({ id, name, username, email, password }) => {
      return {
        id,
        name,
        username,
        email,
        password,
      };
    });
  }

  async follow(followDto: FollowingDTO): Promise<boolean> {
    try {
      await this.verifyUserExists(followDto.userId);
      await this.verifyUserExists(followDto.followId);
      const toSave = {
        follower_id: followDto.userId,
        followed_id: followDto.followId,
      };
      await this.usersFollowRepository.create(toSave);
      return true;
    } catch (e) {
      console.log(`Error following user: ${JSON.stringify(e)}`);

      if (e.errors && Array.isArray(e.errors)) {
        const errors = e.errors.map(
          ({ message, value }) => `${message}. Value ${value}`,
        );
        throw new HttpException(
          { status: HttpStatus.BAD_REQUEST, error: errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw e;
    }
  }

  async unfollow(followDto: FollowingDTO): Promise<boolean> {
    try {
      await this.verifyUserExists(followDto.userId);
      await this.verifyUserExists(followDto.unfollowId);
      const toDelete = {
        where: {
          follower_id: followDto.userId,
          followed_id: followDto.unfollowId,
        },
      };
      await this.usersFollowRepository.destroy(toDelete);
      return true;
    } catch (e) {
      console.log(`Error unfollowing user: ${JSON.stringify(e)}`);
      throw e;
    }
  }

  private async verifyUniqueEmail(email: string): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
      const error = `Cannot register this user. Email ${email} already registered`;
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error },
        HttpStatus.BAD_REQUEST,
      );
    }
    return true;
  }

  private async verifyUserExists(userId: number): Promise<boolean> {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      const error = `User ${userId} is not registered`;
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error },
        HttpStatus.NOT_FOUND,
      );
    }
    return true;
  }
}
