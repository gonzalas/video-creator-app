import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PROVIDERS_REPOSITORY } from '../constants/providers';
import { Interaction } from './entity/interaction.entity';
import { INTERACTIONS_VIDEO } from '../constants/interactions';
import { User } from '../users/entity/user.entity';
import { Video } from '../videos/entity/video.entity';

@Injectable()
export class InteractionsService {
  constructor(
    @Inject(PROVIDERS_REPOSITORY.INTERACTIONS_REPOSITORY)
    private interactionsRepository: typeof Interaction,
    @Inject(PROVIDERS_REPOSITORY.USERS_REPOSITORY)
    private usersRepository: typeof User,
    @Inject(PROVIDERS_REPOSITORY.VIDEOS_REPOSITORY)
    private videosRepository: typeof Video,
  ) {}

  async interactVideo(
    userId: number,
    videoId: number,
    type: string,
  ): Promise<boolean> {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: userId },
      });
      if (!user) {
        throw this.throwNotFoundException(userId, 'User');
      }
      const video = await this.videosRepository.findOne({
        where: { id: videoId },
      });
      if (!video) {
        throw this.throwNotFoundException(videoId, 'Video');
      }

      const toSave = {
        type,
        userId,
        videoId,
      };
      await this.interactionsRepository.create(toSave);
      return true;
    } catch (e) {
      console.log(`Error liking video: ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async likeVideo(userId: number, videoId): Promise<boolean> {
    return this.interactVideo(userId, videoId, INTERACTIONS_VIDEO.LIKE);
  }

  private throwNotFoundException(
    id: number,
    type: 'User' | 'Video',
  ): HttpException {
    const error = `${type} with id ${id} not found`;
    throw new HttpException(
      { status: HttpStatus.NOT_FOUND, error },
      HttpStatus.NOT_FOUND,
    );
  }
}
