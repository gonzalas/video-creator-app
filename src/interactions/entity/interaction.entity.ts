import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../../users/entity/user.entity';
import { Video } from '../../videos/entity/video.entity';

@Table
export class Interaction extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  type: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Video)
  @Column
  videoId: number;

  @BelongsTo(() => Video)
  video: Video;
}
