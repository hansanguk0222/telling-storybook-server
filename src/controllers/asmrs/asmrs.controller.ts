import { ERROR } from '@/ constants';
import { AuthGuard } from '@/middlewares/AuthGuard.middleware';
import { AsmrPipe } from '@/pipes/asmr.pipe';
import { AsmrsService } from '@/services/asmrs/asmrs.service';
import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Req,
  Res,
  Post,
  UseGuards,
  Body,
  Param,
} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { Response } from 'express';
import { Request } from 'express';

@Controller('asmrs')
export class AsmrsController {
  constructor(private readonly asmrsService: AsmrsService) {}

  @Post('/write')
  async createAsmr(
    @Res({ passthrough: true }) res: Response,
    @Body(AsmrPipe)
    asmrInfo: { asmrFileName: string; userId: string; title: string },
  ) {
    try {
      const { userId, asmrFileName, title } = asmrInfo;
      console.log(title, userId, asmrFileName);
      const createAsmrResult = await this.asmrsService.createAsmr({
        userId,
        asmrFileName,
        title,
      });
      return { userId, asmrFileName };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('/')
  async getAsmrs(@Res({ passthrough: true }) res: Response) {
    try {
      const { asmrs } = await this.asmrsService.getAsmrs();
      console.log(asmrs);
      const changeKeyNameAsmrs = asmrs.map((item) => ({
        _id: item._id,
        userId: item.user_id,
        asmrFileName: item.asmr_file_name,
        title: item.title,
        createdAt: item.created_at,
        asmrViews: item.asmr_views,
      }));
      return { asmrList: changeKeyNameAsmrs };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  @Get(':_id')
  async getBoardById(
    @Res({ passthrough: true }) res: Response,
    @Param('_id') _id: number,
  ) {
    try {
      const { asmr } = await this.asmrsService.getAsmrById({
        _id,
      });
      console.log(asmr);
      const changeKeyNameAsmr = {
        _id,
        userId: asmr[0].user_id,
        asmrFileName: asmr[0].asmr_file_name,
        title: asmr[0].title,
        createdAt: asmr[0].created_at,
        asmrViews: asmr[0].asmr_views,
      };
      return { asmr: changeKeyNameAsmr };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        ERROR.INVALID_PARAMERTERS,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
