import { Sequelize } from 'sequelize-typescript';
import { PROVIDERS_REPOSITORY } from '../constants/providers';
import { User } from '../users/entity/user.entity';
import { Video } from '../videos/entity/video.entity';
import { Interaction } from '../interactions/entity/interaction.entity';
import { UserFollower } from '../users/entity/user-follower.entity';

export const databaseProviders = [
  {
    provide: PROVIDERS_REPOSITORY.SEQUELIZE,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'postgres',
      });
      sequelize.addModels([User, Video, Interaction, UserFollower]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
