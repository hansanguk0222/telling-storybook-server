import { AuthGuard } from '@/middlewares/AuthGuard.middleware';
import { AsmrsService } from '@/services/asmrs/asmrs.service';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Request } from 'express';

@Controller('asmrs')
@UseGuards(new AuthGuard(new JwtModule()))
export class AsmrsController {
  constructor(private readonly asmrsService: AsmrsService) {}

  @Get()
  async getList(@Req() req: Request) {
    const asmrList = await this.asmrsService.getAllAsmrList();
    return { asmrList };
  }
}
