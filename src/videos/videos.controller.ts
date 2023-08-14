import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { VideosService } from './videos.service';
import {
  CreateVideoDTO,
  ResponseCreateVideoDTO,
  ResponsePublishVideoDTO,
  ResponseUnpublishVideoDTO,
} from './dto/create-video.dto';
import { GetVideo } from './dto/get-video.dto';

@Controller('videos')
@ApiTags('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Get()
  @ApiBearerAuth()
  async listVideos(): Promise<GetVideo[]> {
    return this.videosService.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async getVideoDetails(@Param('id') id: number): Promise<GetVideo> {
    return this.videosService.findOneById(id);
  }

  @Post('create')
  @ApiBearerAuth()
  async createVideo(
    @Body() createVideo: CreateVideoDTO,
  ): Promise<ResponseCreateVideoDTO> {
    return {
      created: await this.videosService.create(createVideo),
    };
  }

  @Patch('publish/:id')
  @ApiBearerAuth()
  async publishVideo(
    @Param('id') id: number,
  ): Promise<ResponsePublishVideoDTO> {
    return {
      published: await this.videosService.publish(id),
    };
  }

  @Patch('unpublish/:id')
  @ApiBearerAuth()
  async unpublishVideo(
    @Param('id') id: number,
  ): Promise<ResponseUnpublishVideoDTO> {
    return {
      unpublished: await this.videosService.unpublish(id),
    };
  }
}
