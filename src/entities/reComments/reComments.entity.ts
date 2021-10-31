import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Comment } from '../comments/comments.entity';
import { Board } from '../boards/boards.entity';

@Entity()
export class ReComment {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user) => user.reComments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Comment, (comment) => comment.reComments, {
    nullable: false,
  })
  @JoinColumn({ name: 'comment_id' })
  comment: Comment;

  @Column({ name: 'comment_id' })
  comment_id: number;

  @ManyToOne(() => Board, (board) => board.comments, { nullable: false })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @Column({ name: 'board_id' })
  board_id: number;

  @Column({ nullable: false })
  re_comment_content: string;

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
