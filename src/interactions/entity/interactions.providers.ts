import { PROVIDERS_REPOSITORY } from '../../constants/providers';
import { User } from '../../users/entity/user.entity';
import { Video } from '../../videos/entity/video.entity';
import { Interaction } from './interaction.entity';

export const interactionProviders = [
  {
    provide: PROVIDERS_REPOSITORY.INTERACTIONS_REPOSITORY,
    useValue: Interaction,
  },
  {
    provide: PROVIDERS_REPOSITORY.USERS_REPOSITORY,
    useValue: User,
  },
  {
    provide: PROVIDERS_REPOSITORY.VIDEOS_REPOSITORY,
    useValue: Video,
  },
];
