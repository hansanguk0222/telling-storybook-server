import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VoiceRoom } from '@/entities/voiceRooms/voiceRooms.entity';
import { VoiceRoomsService } from '@/services/voiceRooms/voiceRooms.service';
import { VoiceRoomsController } from '@/controllers/voiceRooms/voiceRooms.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VoiceRoom])],
  providers: [VoiceRoomsService],
  controllers: [VoiceRoomsController],
  exports: [TypeOrmModule],
})
export class VoiceRoomsModule {}
