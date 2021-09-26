import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/users.entity';

@Entity()
export class Asmr {
  @PrimaryGeneratedColumn()
  _id: number;

  @ManyToOne(() => User, (user) => user.asmrs, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: false })
  asmr_file_name: string;

  @Column({ default: 0, nullable: false })
  asmr_views: number;

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
