import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '@/entities/boards/boards.entity';
import { BoardsService } from '@/services/boards/boards.service';
import { BoardsController } from '@/controllers/boards/boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  providers: [BoardsService],
  controllers: [BoardsController],
  exports: [TypeOrmModule],
})
export class BoardsModule {}
