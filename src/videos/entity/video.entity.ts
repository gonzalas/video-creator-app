import {
  Table,
  Column,
  Model,
  CreatedAt,
  BelongsTo,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../../users/entity/user.entity';
import { Interaction } from '../../interactions/entity/interaction.entity';

@Table
export class Video extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  title: string;

  @Column
  url: string;

  @Column
  @CreatedAt
  createdAt: Date;

  @Column
  published: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Interaction)
  interactions: Interaction[];
}
