import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';
import { Board } from '../boards/boards.entity';
import { ReComment } from '../reComments/reComments.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user) => user.comments, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Board, (board) => board.comments, { nullable: false })
  @JoinColumn({ name: 'board_id' })
  board: Board;

  @OneToMany(() => ReComment, (reComment) => reComment.comment)
  reComments: ReComment[];

  @Column({ nullable: false })
  comment_content: string;

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
