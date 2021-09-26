import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class BookScoreComment {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user) => user.bookScoreComments, {
    nullable: false,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  author: string;

  @Column({ nullable: false })
  url: string;

  @Column({ nullable: false })
  book_img: string;

  @Column({ nullable: false })
  single_comment_content: string;

  @Column({ nullable: false, default: 0 })
  gpa: number;

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
