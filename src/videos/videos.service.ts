import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PROVIDERS_REPOSITORY } from '../constants/providers';
import { Video } from './entity/video.entity';
import { CreateVideoDTO } from './dto/create-video.dto';
import { UpdateVideoDTO } from './dto/edit-video.dto';
import { GetVideo } from './dto/get-video.dto';
import { User } from '../users/entity/user.entity';

@Injectable()
export class VideosService {
  constructor(
    @Inject(PROVIDERS_REPOSITORY.VIDEOS_REPOSITORY)
    private videosRepository: typeof Video,
  ) {}

  async findAll(): Promise<GetVideo[]> {
    return this.videosRepository.findAll();
  }

  async findOneById(id: number): Promise<GetVideo> {
    return this.videosRepository.findOne({ where: { id } });
  }

  async create(createVideo: CreateVideoDTO): Promise<boolean> {
    try {
      const user = await User.findOne({
        where: { id: createVideo.userId },
      });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            error: `User id ${createVideo.userId} not found`,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      const toSave = {
        title: createVideo.title,
        url: createVideo.url,
        userId: createVideo.userId,
        published: createVideo.published ?? false,
      };
      await this.videosRepository.create(toSave);
      return true;
    } catch (e) {
      console.log(`Error while creating video: ${JSON.stringify(e)}`);
      throw e;
    }
  }

  async update(id: number, updateVideo: UpdateVideoDTO): Promise<boolean> {
    try {
      const toUpdate = {
        ...(updateVideo.title && { title: updateVideo.title }),
        ...(updateVideo.url && { url: updateVideo.url }),
        ...(updateVideo.published && { published: updateVideo.published }),
      };
      await this.videosRepository.update(toUpdate, { where: { id } });
      return true;
    } catch (e) {
      console.log(`Error updating video: ${JSON.stringify(e)}`);
      return false;
    }
  }

  async publish(id: number): Promise<boolean> {
    try {
      const toPublish = {
        published: true,
      };
      return this.update(id, toPublish);
    } catch (e) {
      console.log(`Error publishing video: ${JSON.stringify(e)}`);
      return false;
    }
  }

  async unpublish(id: number): Promise<boolean> {
    try {
      const toUnpublish = {
        published: false,
      };
      return this.update(id, toUnpublish);
    } catch (e) {
      console.log(`Error unpublishing video: ${JSON.stringify(e)}`);
      return false;
    }
  }
}
