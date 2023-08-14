import { PROVIDERS_REPOSITORY } from '../../constants/providers';
import { Video } from './video.entity';

export const videosProviders = [
  {
    provide: PROVIDERS_REPOSITORY.VIDEOS_REPOSITORY,
    useValue: Video,
  },
];
