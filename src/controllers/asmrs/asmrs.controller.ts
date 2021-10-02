import { AsmrsService } from '@/services/asmrs/asmrs.service';
import { Controller, Get, UseGuards } from '@nestjs/common';
import { LocalStrategy } from '@/middlewares/local.strategy';

@Controller('asmrs')
@UseGuards(LocalStrategy)
export class AsmrsController {
  constructor(private readonly asmrsService: AsmrsService) {}

  @Get()
  async getList() {
    const asmrList = await this.asmrsService.getAllAsmrList();
    return { asmrList };
  }
}
