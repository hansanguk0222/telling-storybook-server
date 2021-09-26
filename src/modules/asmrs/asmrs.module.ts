import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Asmr } from '@/entities/asmrs/asmrs.entity';
import { AsmrsService } from '@/services/asmrs/asmrs.service';
import { AsmrsController } from '@/controllers/asmrs/asmrs.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Asmr])],
  providers: [AsmrsService],
  controllers: [AsmrsController],
  exports: [TypeOrmModule],
})
export class AsmrsModule {}
