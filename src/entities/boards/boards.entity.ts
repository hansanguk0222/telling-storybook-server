import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Comment } from '../comments/comments.entity';
import { User } from '../users/users.entity';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user) => user.boards, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;

  @OneToMany(() => Comment, (comment) => comment.board)
  comments: Comment[];

  @Column({ nullable: false })
  board_type: string;

  @Column({ nullable: false })
  board_content: string;

  @Column({ nullable: false })
  board_title: string;

  @Column({ default: 0, nullable: true })
  reading_time: number;

  @Column({ default: 0, nullable: false })
  board_views: number;

  @Column({ default: false, nullable: false })
  is_deleted: boolean;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  created_at: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  updated_at: string;
}
