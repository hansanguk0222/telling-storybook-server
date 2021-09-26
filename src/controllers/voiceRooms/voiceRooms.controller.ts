import { VoiceRoomsService } from '@/services/voiceRooms/voiceRooms.service';
import { Controller, Get } from '@nestjs/common';

@Controller('voiceRooms')
export class VoiceRoomsController {
  constructor(private readonly voiceRoomsService: VoiceRoomsService) {}

  @Get()
  async getList() {
    const voiceRoomList = await this.voiceRoomsService.getAllVoiceRoomList();
    return { voiceRoomList };
  }
}
