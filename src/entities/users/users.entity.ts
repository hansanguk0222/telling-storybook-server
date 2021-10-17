import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Board } from '../boards/boards.entity';
import { Asmr } from '../asmrs/asmrs.entity';
import { BookScoreComment } from '../bookScoreComments/bookScoreComments.entity';
import { ReComment } from '../reComments/reComments.entity';
import { VoiceRoom } from '../voiceRooms/voiceRooms.entity';
import { Comment } from '../comments/comments.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  _id: number;

  @OneToMany(() => Board, (board) => board.user)
  boards: Board[];

  @OneToMany(() => Asmr, (asmr) => asmr.user)
  asmrs: Asmr[];

  @OneToMany(
    () => BookScoreComment,
    (BookScoreComment) => BookScoreComment.user,
  )
  bookScoreComments: BookScoreComment[];

  @OneToMany(() => ReComment, (reComment) => reComment.user)
  reComments: ReComment[];

  @OneToMany(() => VoiceRoom, (voiceRoom) => voiceRoom.user)
  voiceRooms: VoiceRoom[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @Column({ type: 'text', nullable: false })
  email: string;

  @Column({ nullable: false })
  nickname: string;

  @Column({ type: 'text', nullable: false })
  refresh_token: string;

  @Column({ type: 'int', default: 0, nullable: false })
  total_reading_time: number;

  @Column({ type: 'tinyint', default: false, nullable: false })
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
