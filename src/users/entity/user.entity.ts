import {
  Table,
  Column,
  Model,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { Video } from '../../videos/entity/video.entity';
import { Interaction } from '../../interactions/entity/interaction.entity';
import { UserFollower } from './user-follower.entity';

@Table
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  name: string;

  @Column
  email: string;

  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => Video)
  videos: Video[];

  @HasMany(() => Interaction)
  interactions: Interaction[];

  @BelongsToMany(() => User, () => UserFollower, 'follower_id', 'followed_id')
  followers: User[];

  @BelongsToMany(() => User, () => UserFollower, 'followed_id', 'follower_id')
  following: User[];
}
