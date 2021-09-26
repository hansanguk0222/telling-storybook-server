import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReComment } from '@/entities/reComments/reComments.entity';
import { ReCommentsService } from '@/services/reComments/reComments.service';
import { ReCommentsController } from '@/controllers/reComments/reComments.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ReComment])],
  providers: [ReCommentsService],
  controllers: [ReCommentsController],
  exports: [TypeOrmModule],
})
export class ReCommentsModule {}
