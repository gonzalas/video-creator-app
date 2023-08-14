import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { videosProviders } from './entity/videos.providers';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosService, ...videosProviders],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
