import { Model, Column, Table } from 'sequelize-typescript';

@Table({
  tableName: 'UserFollowers',
})
export class UserFollower extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  follower_id: number;

  @Column
  followed_id: number;
}
