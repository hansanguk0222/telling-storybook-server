import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VoiceRoom } from '@/entities/voiceRooms/voiceRooms.entity';

@Injectable()
export class VoiceRoomsService {
  constructor(
    @InjectRepository(VoiceRoom)
    private readonly voiceRoomRepository: Repository<VoiceRoom>,
  ) {
    this.voiceRoomRepository = voiceRoomRepository;
  }

  getAllVoiceRoomList(): Promise<VoiceRoom[]> {
    return this.voiceRoomRepository.find();
  }
}
