import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Asmr } from '@/entities/asmrs/asmrs.entity';

@Injectable()
export class AsmrsService {
  constructor(
    @InjectRepository(Asmr)
    private readonly asmrsRepository: Repository<Asmr>,
  ) {
    this.asmrsRepository = asmrsRepository;
  }

  getAllAsmrList(): Promise<Asmr[]> {
    return this.asmrsRepository.find();
  }

  async createAsmr({
    asmrFileName,
    userId,
    title,
  }: {
    asmrFileName: string;
    userId: string;
    title: string;
  }) {
    const board = await this.asmrsRepository.save({
      user_id: Number(userId),
      asmr_file_name: asmrFileName,
      title,
    });
    return { board };
  }

  async getAsmrs() {
    const asmrs = await this.asmrsRepository.find({
      is_deleted: false,
    });
    return { asmrs };
  }

  async getAsmrById({ _id }: { _id: number }) {
    const asmr = await this.asmrsRepository.find({
      _id,
    });
    await this.asmrsRepository.update(
      { _id },
      { asmr_views: asmr[0].asmr_views + 1 },
    );
    return { asmr };
  }
}
