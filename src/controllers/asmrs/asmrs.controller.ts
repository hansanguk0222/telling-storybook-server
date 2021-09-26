import { AsmrsService } from '@/services/asmrs/asmrs.service';
import { Controller, Get } from '@nestjs/common';

@Controller('asmrs')
export class AsmrsController {
  constructor(private readonly asmrsService: AsmrsService) {}

  @Get()
  async getList() {
    const asmrList = await this.asmrsService.getAllAsmrList();
    return { asmrList };
  }
}
