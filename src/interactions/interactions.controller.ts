import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LikeVideoDTO, ResponseLikeVideoDTO } from './dto/like-video.dto';
import { InteractionsService } from './interactions.service';

@Controller('interactions')
@ApiTags('interactions')
export class InteractionsController {
  constructor(private interactionsService: InteractionsService) {}

  @Post('like')
  @ApiBearerAuth()
  async likeVideo(
    @Body() likeVideo: LikeVideoDTO,
  ): Promise<ResponseLikeVideoDTO> {
    return {
      liked: await this.interactionsService.likeVideo(
        likeVideo.userId,
        likeVideo.videoId,
      ),
    };
  }
}
