import { PROVIDERS_REPOSITORY } from '../../constants/providers';
import { UserFollower } from './user-follower.entity';
import { User } from './user.entity';

export const usersProviders = [
  {
    provide: PROVIDERS_REPOSITORY.USERS_REPOSITORY,
    useValue: User,
  },
  {
    provide: PROVIDERS_REPOSITORY.USERS_FOLLOW_REPOSITORY,
    useValue: UserFollower,
  },
];
